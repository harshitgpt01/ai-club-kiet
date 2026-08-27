/**
 * POST /api/contact — relays one contact-form message to the club inbox.
 *
 * Vercel builds every file under /api as a Serverless Function, independently of
 * the Vite build, so this runs on the server and the Resend key never reaches the
 * browser. That is the whole reason the send happens here instead of in the page:
 * every VITE_-prefixed value is compiled into the public JavaScript bundle, and a
 * leaked sending key would let anyone send mail as the club.
 *
 * The validation below is deliberately a second copy of the rules in
 * src/lib/contact.js. The client copy only exists to give visitors fast feedback —
 * anyone can POST straight at this endpoint with curl, so this is the copy that
 * actually decides what gets sent.
 *
 * `vite dev` does not serve this file. Use `npx vercel dev` to exercise the form
 * locally; see the README.
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "aiclubkiet@gmail.com";

// Resend's shared sandbox sender works with no DNS setup, but it may only deliver
// to the address that owns the Resend account — so keep that account registered
// to TO_EMAIL. Once a club domain is verified in Resend, set CONTACT_FROM_EMAIL
// to an address on it (e.g. "AI Club KIET <contact@aiclub.example>") and mail to
// any recipient starts working.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "AI Club KIET <onboarding@resend.dev>";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 10_000;

/* -------------------------------- validation -------------------------------- */

// Loose on purpose. Unlike the recruitment form this is open to the public, so the
// only address worth rejecting is one the club could not possibly reply to.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RULES = [
  { field: "name", min: 2, max: 80, missing: "Please enter your name." },
  { field: "email", min: 3, max: 254, missing: "Enter an email address we can reply to." },
  { field: "subject", min: 3, max: 120, missing: "Add a subject." },
  { field: "message", min: 10, max: 4000, missing: "Add a message." },
];

/** @returns {{field: string, message: string} | null} the first problem found. */
function findProblem(values) {
  for (const { field, min, max, missing } of RULES) {
    const value = values[field];
    if (!value) return { field, message: missing };
    if (value.length < min) return { field, message: `Your ${field} is too short.` };
    if (value.length > max) {
      return { field, message: `Your ${field} is too long — keep it under ${max} characters.` };
    }
  }

  if (!EMAIL_RE.test(values.email)) {
    return { field: "email", message: "That doesn't look like a valid email address." };
  }

  return null;
}

/* ------------------------------ rate limiting ------------------------------ */
/* Best effort only. Fluid Compute reuses an instance across requests so this Map
   does survive between calls, but several instances can be live at once and each
   keeps its own copy. It is here to blunt a script hammering the endpoint, not as
   a real quota — Vercel's WAF and BotID are the escalation path if the form ever
   attracts sustained spam. */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_CLIENTS = 500;

/** @type {Map<string, number[]>} caller → timestamps of its recent sends */
const sendLog = new Map();

function clientIp(req) {
  // Vercel always sets x-forwarded-for; the client's own address is the first entry.
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : String(forwarded || "").split(",")[0];
  return first.trim() || req.headers["x-real-ip"] || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();

  // Sweep callers whose window has fully expired, so a long-lived instance cannot
  // accumulate one entry per visitor forever.
  if (sendLog.size > MAX_TRACKED_CLIENTS) {
    for (const [key, times] of sendLog) {
      if (times.every((time) => now - time >= WINDOW_MS)) sendLog.delete(key);
    }
  }

  const recent = (sendLog.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  sendLog.set(ip, recent);

  if (recent.length >= MAX_PER_WINDOW) return true;

  recent.push(now);
  return false;
}

/* -------------------------------- composition -------------------------------- */

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

// Everything interpolated into the HTML body below is visitor-supplied, so it all
// goes through here first.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

function textBody({ name, email, subject, message }) {
  return [
    "New message from the AI Club KIET website.",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subject}`,
    "",
    message,
    "",
    "—",
    `Reply directly to this email to answer ${name}.`,
  ].join("\n");
}

function htmlBody({ name, email, subject, message }) {
  const rows = [
    ["Name", escapeHtml(name)],
    ["Email", `<a href="mailto:${escapeHtml(email)}" style="color:#0284c7">${escapeHtml(email)}</a>`],
    ["Subject", escapeHtml(subject)],
  ]
    .map(
      ([term, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#64748b;white-space:nowrap">${term}</td>` +
        `<td style="padding:4px 0;color:#0f172a">${value}</td></tr>`
    )
    .join("");

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
  <p style="margin:0 0 18px;font-weight:700">New message from the AI Club KIET website</p>
  <table style="border-collapse:collapse;margin:0 0 20px;font-size:14px"><tbody>${rows}</tbody></table>
  <div style="white-space:pre-wrap;border-left:3px solid #38bdf8;padding:2px 0 2px 14px;margin:0 0 22px">${escapeHtml(message)}</div>
  <p style="margin:0;font-size:13px;color:#64748b">Reply directly to this email to answer ${escapeHtml(name)}.</p>
</div>`;
}

/* --------------------------------- handler --------------------------------- */

function readBody(req) {
  // @vercel/node parses a JSON body for us; fall back for anything it hands over
  // as a raw string.
  if (req.body && typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body || "{}");
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — the message could not be sent.");
    return res.status(500).json({
      ok: false,
      message: `The contact form isn't configured yet. Please email ${TO_EMAIL} directly.`,
    });
  }

  const body = readBody(req);
  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, message: "Expected a JSON body." });
  }

  // Collapse runs of whitespace in the single-line fields so a padded-out name or
  // subject cannot be used to push the real content out of an inbox preview.
  const values = {
    name: String(body.name ?? "").trim().replace(/\s+/g, " "),
    email: String(body.email ?? "").trim(),
    subject: String(body.subject ?? "").trim().replace(/\s+/g, " "),
    message: String(body.message ?? "").trim(),
  };

  const problem = findProblem(values);
  if (problem) return res.status(400).json({ ok: false, ...problem });

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({
      ok: false,
      message: `You've sent a few messages already. Please wait a few minutes, or email ${TO_EMAIL} directly.`,
    });
  }

  let response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        // So the club can hit reply and answer the visitor. The From stays a club
        // address: sending as the visitor's domain would fail SPF/DKIM and land
        // the whole thing in spam.
        reply_to: values.email,
        subject: `[Website] ${values.subject}`,
        text: textBody(values),
        html: htmlBody(values),
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
  } catch (error) {
    console.error("[contact] could not reach Resend:", error);
    return res.status(502).json({
      ok: false,
      message: `We couldn't send that just now. Please try again shortly, or email ${TO_EMAIL} directly.`,
    });
  }

  if (!response.ok) {
    // Resend's body can name the account, the domain, or the key. Log it for the
    // club and hand the visitor something plain — never the upstream text.
    const detail = await response.text().catch(() => "");
    console.error(`[contact] Resend rejected the send (${response.status}):`, detail);
    return res.status(502).json({
      ok: false,
      message: `We couldn't send that just now. Please try again shortly, or email ${TO_EMAIL} directly.`,
    });
  }

  return res.status(200).json({ ok: true });
}
