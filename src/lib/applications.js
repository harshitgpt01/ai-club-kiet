import { supabase, isSupabaseConfigured } from "./supabase";

const TABLE = "applications";
const STORAGE_KEY = "aiclub_recruitment_applications";

// Postgres error codes surfaced through PostgREST.
const UNIQUE_VIOLATION = "23505";
const CHECK_VIOLATION = "23514";

/* ------------------------------ local cache ------------------------------ */
/* Supabase is the source of truth. The copy below exists so a submission
   survives a dropped connection, and so the club can still export a backup. */

export function readApplications() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // unreadable, or storage blocked (private mode)
  }
}

function writeApplications(rows) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    /* quota exceeded or storage blocked — the remote write is what matters */
  }
  return rows;
}

// `synced: false` marks a record the server has not accepted yet;
// `rejected: true` marks one it refused outright, so retrying is pointless.
function cacheLocally(record, flags) {
  const rows = readApplications();
  const entry = { ...record, synced: false, rejected: false, ...flags };
  const index = rows.findIndex((r) => r.email === record.email);
  if (index === -1) rows.push(entry);
  else rows[index] = entry;
  return writeApplications(rows);
}

export function countPending() {
  return readApplications().filter((r) => !r.synced && !r.rejected).length;
}

// Cheap pre-checks so a repeat applicant gets told before a round trip — one per
// UNIQUE column in the table. A record the server refused is deliberately
// ignored: it never became a real application, so it must not lock the applicant
// out of correcting and retrying.
export function hasLocalApplication(email) {
  const target = email.trim().toLowerCase();
  return readApplications().some((r) => !r.rejected && String(r.email).toLowerCase() === target);
}

export function hasLocalRegistrationNumber(regNo) {
  const target = regNo.trim().toUpperCase();
  return readApplications().some((r) => !r.rejected && String(r.regNo).toUpperCase() === target);
}

/* -------------------------------- transport -------------------------------- */

function toRow(record) {
  return {
    name: record.name,
    gender: record.gender,
    registration_number: record.regNo,
    branch: record.branch,
    section: record.section,
    year: record.year,
    accommodation: record.accommodation,
    email: record.email,
    phone: record.phone,
    working_domain: record.workingDomain,
    // Empty string would fail the co_domain CHECK; the column is nullable for
    // exactly the case where the applicant only chose a working domain.
    co_domain: record.coDomain || null,
    submitted_at: record.submittedAt,
  };
}

// Everything the table requires. A record queued by an older build predates the
// gender / registration number / accommodation / year / split-domain columns, so
// there is nothing to send for them and no way to invent one.
function isComplete(record) {
  return Boolean(
    record.gender && record.regNo && record.accommodation && record.year && record.workingDomain,
  );
}

// Two columns are UNIQUE, so a 23505 has to be attributed to one of them before
// it can be pointed at a field. PostgREST carries the constraint name through.
function uniqueViolationField(error) {
  const text = `${error.message || ""} ${error.details || ""}`.toLowerCase();
  return text.includes("registration_number") ? "regNo" : "email";
}

const DUPLICATE_MESSAGE = {
  email: "An application with this KIET email already exists.",
  regNo: "An application with this registration number already exists.",
};

// A dropped connection is recoverable and should be retried; anything carrying a
// Postgres/PostgREST code is a decision the server made and won't take back.
function isNetworkError(error) {
  return !error.code || /failed to fetch|networkerror|load failed|network request failed|timeout/i.test(String(error.message));
}

/**
 * Insert one application.
 * @returns {Promise<{ok: true, synced: boolean} | {ok: false, field?: string, message: string}>}
 */
export async function submitApplication(record) {
  if (!isSupabaseConfigured) {
    cacheLocally(record, { synced: false });
    return { ok: true, synced: false };
  }

  const { error } = await supabase.from(TABLE).insert(toRow(record));

  if (!error) {
    cacheLocally(record, { synced: true });
    return { ok: true, synced: true };
  }

  if (error.code === UNIQUE_VIOLATION) {
    const field = uniqueViolationField(error);
    return { ok: false, field, message: DUPLICATE_MESSAGE[field] };
  }

  if (isNetworkError(error)) {
    // Hold onto it and retry on a later visit rather than losing the applicant.
    cacheLocally(record, { synced: false });
    return { ok: true, synced: false };
  }

  // A check violation, an RLS denial, or a server fault. Keep a local copy so
  // nothing is lost, but tell the applicant the truth — silently "succeeding"
  // here would hide a misconfigured table until recruitment was over.
  console.error("[applications] submission refused by Supabase:", error);
  cacheLocally(record, { synced: false, rejected: true });

  return {
    ok: false,
    message:
      error.code === CHECK_VIOLATION
        ? "The server rejected those details. Please double-check your email, phone, and section."
        : "Something went wrong on our end. Please try again in a moment, or email the club directly.",
  };
}

/** Retry anything queued by an earlier offline submission. Returns the count pushed. */
export async function syncPendingApplications() {
  if (!isSupabaseConfigured) return 0;

  const rows = readApplications();
  const pending = rows.filter((r) => !r.synced && !r.rejected);
  if (pending.length === 0) return 0;

  let pushed = 0;
  for (const record of pending) {
    // Retire anything the current table can no longer accept instead of burning
    // a request per visit on a row that will always be refused. It stays in
    // localStorage, so downloadCsv() can still export it.
    if (!isComplete(record)) {
      record.rejected = true;
      continue;
    }

    const { error } = await supabase.from(TABLE).insert(toRow(record));

    if (!error || error.code === UNIQUE_VIOLATION) {
      // No error, or it is already on the server — either way, nothing left to send.
      record.synced = true;
      pushed += 1;
    } else if (isNetworkError(error)) {
      break; // still offline; leave the remainder queued for the next visit
    } else {
      record.rejected = true;
    }
  }

  writeApplications(rows);
  return pushed;
}

/* ---------------------------------- export ---------------------------------- */

const CSV_COLUMNS = [
  "Name",
  "Gender",
  "Registration No.",
  "Branch",
  "Section",
  "Year",
  "Accommodation",
  "KIET Email",
  "Phone",
  "Working Domain",
  "Co-Domain",
  "Submitted At",
  "Synced",
];

// Rows cached before the working/co-domain split still carry the old `domains`
// array. Map them across so an export of the club's backup is never silently
// blank for the applications that came in first.
function domainPair(record) {
  if (record.workingDomain || record.coDomain) {
    return [record.workingDomain || "", record.coDomain || ""];
  }
  const legacy = Array.isArray(record.domains) ? record.domains : [];
  return [legacy[0] || "", legacy.slice(1).join("; ")];
}

export function toCsv(rows) {
  const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const body = rows.map((r) => [
    r.name,
    r.gender,
    r.regNo,
    r.branch,
    r.section,
    r.year,
    r.accommodation,
    r.email,
    r.phone,
    ...domainPair(r),
    r.submittedAt,
    r.synced ? "yes" : "no",
  ]);
  return [CSV_COLUMNS, ...body].map((cols) => cols.map(cell).join(",")).join("\r\n");
}

export function downloadCsv() {
  const rows = readApplications();
  if (rows.length === 0) return;
  // Leading BOM so Excel opens UTF-8 names correctly.
  const url = URL.createObjectURL(new Blob([`\uFEFF${toCsv(rows)}`], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-club-applications.csv";
  link.click();
  URL.revokeObjectURL(url);
}
