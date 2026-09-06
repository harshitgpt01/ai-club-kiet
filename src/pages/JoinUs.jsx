import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiBriefcase,
  FiClock,
  FiCpu,
  FiFileText,
  FiGlobe,
  FiLink,
  FiUsers,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoticeMarquee from "../components/NoticeMarquee";
import SectionHeader from "../components/SectionHeader";
import FieldError, { FormError } from "../components/FieldError";
import { fadeUp, stagger } from "../lib/motion";
import {
  hasLocalApplication,
  hasLocalRegistrationNumber,
  submitApplication,
  syncPendingApplications,
} from "../lib/applications";

const branches = [
  "CSE",
  "CS",
  "IT",
  "CSIT",
  "CSE(AI)",
  "CSE(AIML)",
  "CSE(DS)",
  "CSE(Cyber Security)",
  "ECE",
  "EEE",
  "ELCE",
  "ECE(VLSI)",
  "ME",
  "AMIA",
  // Non-B.Tech programmes. The branch column has no CHECK constraint, so this
  // list is the only place it is defined.
  "MBA",
  "MCA",
  "B.Pharma",
];

// Recruitment is open to first and second years only — seniors are past the
// point where a two-year membership makes sense. Keep in sync with
// `applications_year_valid` in supabase/schema.sql.
const years = ["1st Year", "2nd Year"];

// Keep in sync with `applications_gender_valid` in supabase/schema.sql.
const genders = ["Male", "Female"];

// Hosteller = lives on campus; Day Scholar / PG = commutes in, either from home
// or from a rented room off campus.
const accommodations = ["Hosteller", "Day Scholar / PG"];

// Two separate lists, matching how the club is actually structured: the
// co-domain is the technical track, the working domain is the team that keeps
// events, funding and outreach moving. Keep in sync with
// public.ai_club_co_domains() / public.ai_club_working_domains() in
// supabase/schema.sql, and with coreDomains / workingDomains in About.jsx.
const coDomains = ["AI & ML", "AI Security"];

const workingDomains = [
  "Web Development",
  "Media & Graphics",
  "Management & PR",
  "Corporate & Finance",
];

const perks = [
  { icon: FiCpu, title: "Learn from Peers", desc: "Weekly sessions run by students who've interned at top companies." },
  { icon: FiAward, title: "Win Competitions", desc: "Club teams have placed in national-level hackathons and Kaggle competitions." },
  { icon: FiBriefcase, title: "Career Support", desc: "Resume reviews, referrals, and alumni connections at Google, Microsoft, and startups." },
  { icon: FiLink, title: "Real Projects", desc: "Build things that ship — not just course assignments." },
  { icon: FiGlobe, title: "Industry Network", desc: "Direct access to industry sessions with engineers and researchers." },
  { icon: FiFileText, title: "Certificate & Recognition", desc: "Official club membership certificate and profile on our website." },
];

// Shown as the next step on the confirmation screen — every applicant is asked
// to join the group, because that is where shortlists, interview slots and
// session timings are announced. Invite links can be reset from the group
// admin screen, so this is the single place to change it.
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BbfIZ5eTEBECYVDg4o60B8";

const EMPTY_FORM = {
  name: "",
  gender: "",
  regNo: "",
  branch: "",
  section: "",
  year: "",
  accommodation: "",
  email: "",
  phone: "",
  coDomain: "",
  workingDomain: "",
};

/* ---------------------------------- validation --------------------------------- */

const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]*$/;
const SECTION_RE = /^[A-Za-z0-9]{1,3}$/;
// Deliberately loose: KIET has issued more than one roll-number format, and
// rejecting a real one costs a real applicant their submission.
const REG_NO_RE = /^[A-Za-z0-9]{6,20}$/;
// Case-insensitive: students commonly type KIET.edu or Kiet.edu.
const KIET_EMAIL_RE = /^[A-Za-z0-9._%+-]+@kiet\.edu$/i;

// Accepts "+91 98765 43210", "098765-43210", "9876543210" — all reduce to 10 digits.
function normalizePhone(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const regNo = form.regNo.trim();
  const section = form.section.trim();
  const email = form.email.trim();
  const phone = normalizePhone(form.phone);

  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 3) errors.name = "Please enter your full name.";
  else if (!NAME_RE.test(name)) errors.name = "Letters only — no digits or special characters.";

  if (!form.gender) errors.gender = "Select your gender.";

  if (!regNo) errors.regNo = "Enter your university registration number.";
  else if (!REG_NO_RE.test(regNo)) errors.regNo = "6–20 letters or digits, exactly as printed on your ID card.";

  if (!form.branch) errors.branch = "Select your branch.";

  if (!section) errors.section = "Enter your section.";
  else if (!SECTION_RE.test(section)) errors.section = "1–3 letters or digits (e.g. A, B2, C).";

  if (!form.year) errors.year = "Select your year of study.";

  if (!form.accommodation) errors.accommodation = "Tell us where you stay during the semester.";

  if (!email) errors.email = "Enter your KIET email address.";
  else if (!KIET_EMAIL_RE.test(email)) errors.email = "Must be your official @kiet.edu address.";

  if (!phone) errors.phone = "Enter your phone number.";
  else if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";

  // The working domain is the required pick; the co-domain is the optional one.
  // The two lists are disjoint now, so there is no same-pick-twice case left to
  // guard against.
  if (!form.workingDomain) errors.workingDomain = "Pick the one domain you want to work in.";

  return errors;
}

/* ---------------------------------- ui atoms ---------------------------------- */

function Required() {
  return (
    <span className="text-sky-300" aria-hidden="true">
      {" *"}
    </span>
  );
}

function TextField({ name, label, value, error, onChange, hint, className = "", ...inputProps }) {
  const id = `ru-${name}`;
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        <Required />
      </label>
      {/* .field styles focus and the aria-invalid error border in CSS, so this
          no longer needs onFocus/onBlur handlers to repaint the border. */}
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={`field ${className}`}
        {...inputProps}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-opacity='0.45' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

function SelectField({ name, label, value, error, onChange, options, placeholder }) {
  const id = `ru-${name}`;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        <Required />
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className="field cursor-pointer appearance-none pr-10 [color-scheme:dark]"
        style={{
          backgroundImage: SELECT_CHEVRON,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          backgroundSize: "18px",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

/**
 * A pick-one pill group. `noneLabel` adds a leading opt-out pill for the group
 * that is allowed to stay empty.
 */
function DomainPicker({ name, legend, note, options, value, error, required, onPick, noneLabel }) {
  const errorId = error ? `ru-${name}-error` : undefined;

  return (
    <fieldset className="m-0 min-w-0 border-none p-0">
      <legend className="field-label p-0">
        {legend}
        {required && <Required />}
        {note && <span className="font-medium text-slate-500"> — {note}</span>}
      </legend>
      <div className="flex flex-wrap gap-2" aria-describedby={errorId}>
        {noneLabel && (
          <button
            type="button"
            id={`ru-${name}`}
            onClick={() => onPick("")}
            aria-pressed={value === ""}
            className="filter-pill"
          >
            {noneLabel}
          </button>
        )}
        {options.map((option, index) => (
          <button
            key={option}
            id={!noneLabel && index === 0 ? `ru-${name}` : undefined}
            type="button"
            onClick={() => onPick(option)}
            aria-pressed={value === option}
            className={`filter-pill ${error ? "border-red-400/50" : ""}`}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
}

/* ---------------------------------- the page ---------------------------------- */

const FOCUS_ORDER = [
  "name",
  "gender",
  "regNo",
  "branch",
  "section",
  "year",
  "accommodation",
  "email",
  "phone",
  "coDomain",
  "workingDomain",
];

function JoinUs() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Flush anything a previous visit queued while offline.
  useEffect(() => {
    syncPendingApplications().catch(() => {
      /* still offline — the queue stays put for the next visit */
    });
  }, []);

  // Once the user has tried to submit, re-check on every change so errors clear live.
  const patch = (changes) => {
    const next = { ...form, ...changes };
    setForm(next);
    if (attempted) setErrors(validate(next));
  };

  const updateField = (event) => patch({ [event.target.name]: event.target.value });

  // The two lists no longer overlap, so each pick is independent of the other.
  const pickCoDomain = (domain) => patch({ coDomain: domain });

  const pickWorkingDomain = (domain) => patch({ workingDomain: domain });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return; // ignore a double-click on the submit button
    setAttempted(true);
    setSubmitError("");

    const found = validate(form);
    const email = form.email.trim().toLowerCase();
    const regNo = form.regNo.trim().toUpperCase();

    // Cheap local checks first; the table's two UNIQUE columns are what actually
    // enforce this.
    if (!found.email && hasLocalApplication(email)) {
      found.email = "An application with this KIET email already exists.";
    }
    if (!found.regNo && hasLocalRegistrationNumber(regNo)) {
      found.regNo = "An application with this registration number already exists.";
    }

    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = FOCUS_ORDER.find((key) => found[key]);
      document.getElementById(`ru-${first}`)?.focus();
      return;
    }

    const record = {
      name: form.name.trim().replace(/\s+/g, " "),
      gender: form.gender,
      regNo,
      branch: form.branch,
      section: form.section.trim().toUpperCase(),
      year: form.year,
      accommodation: form.accommodation,
      email,
      phone: normalizePhone(form.phone),
      coDomain: form.coDomain || null,
      workingDomain: form.workingDomain,
      submittedAt: new Date().toISOString(),
    };

    setSending(true);
    let result;
    try {
      result = await submitApplication(record);
    } catch (error) {
      // submitApplication handles Supabase's own errors; this is a thrown fault.
      console.error("[JoinUs] unexpected submission failure:", error);
      result = { ok: false, message: "Something went wrong on our end. Please try again in a moment." };
    } finally {
      setSending(false);
    }

    if (!result.ok) {
      if (result.field) {
        setErrors({ [result.field]: result.message });
        document.getElementById(`ru-${result.field}`)?.focus();
      } else {
        setSubmitError(result.message);
      }
      return;
    }

    setSubmitted({ ...record, synced: result.synced });
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setAttempted(false);
    setSubmitted(null);
    setSubmitError("");
  };

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <NoticeMarquee />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.24),transparent_30rem),radial-gradient(circle_at_16%_40%,rgba(56,189,248,0.1),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container-page relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Recruitment Open
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="cyber-title mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
          >
            Join AI Club <span className="neon-text">KIET</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[560px] text-lg leading-8 text-white/85">
            No prior experience required. Just curiosity, commitment, and a willingness to build things.
          </motion.p>
        </motion.div>
      </section>

      {/* Recruitment form — first, so the form is the first thing a visitor
          who already knows they want in can act on. The "why join" perks sit
          below it for anyone still deciding. */}
      <motion.section
        className="section-wrap pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        variants={stagger}
      >
        <div className="section-inner">
          <motion.div variants={fadeUp} className="mx-auto w-full max-w-[640px]">
            <div className="glass-panel rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="text-5xl" aria-hidden="true">
                    🎉
                  </div>
                  <h2 className="mt-4 text-2xl font-black text-white">Application Received!</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Welcome aboard, {submitted.name.split(" ")[0]}! We'll review your application and reach
                    out to <strong className="text-sky-300">{submitted.email}</strong> within 3–5 days.
                  </p>

                  {/* The one thing left for the applicant to do. WhatsApp is the
                      club's announcement channel, so this is deliberately the
                      loudest element on the confirmation screen. */}
                  <div className="mt-7 rounded-xl border border-[#25d366]/30 bg-[#25d366]/[0.07] p-5 text-left">
                    <h3 className="flex items-center gap-2 text-sm font-black text-white">
                      <FaWhatsapp className="text-lg text-[#25d366]" aria-hidden="true" />
                      One last step — join the WhatsApp group
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      Shortlists, interview slots and session timings go out here first. Joining now means
                      you won't miss anything.
                    </p>
                    <a
                      href={WHATSAPP_GROUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-lg border border-[#25d366]/45 bg-gradient-to-br from-[#25d366] to-[#128c7e] px-5 py-3 text-[0.94rem] font-extrabold text-white no-underline shadow-[0_0_26px_rgba(37,211,102,0.32)] transition duration-200 hover:-translate-y-0.5 hover:border-[#25d366]/70 hover:shadow-[0_0_34px_rgba(37,211,102,0.45)]"
                    >
                      <FaWhatsapp className="text-lg" aria-hidden="true" />
                      Join the AI Club WhatsApp Group
                    </a>
                    <p className="mt-2.5 break-all text-[0.7rem] leading-5 text-slate-500">
                      Link not opening? Copy it: {WHATSAPP_GROUP_URL}
                    </p>
                  </div>

                  <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left text-sm">
                    {[
                      ["Registration No.", submitted.regNo],
                      ["Gender", submitted.gender],
                      ["Branch", `${submitted.branch} · Section ${submitted.section}`],
                      ["Year", submitted.year],
                      ["Accommodation", submitted.accommodation],
                      ["Phone", submitted.phone],
                      ["Domain", submitted.coDomain || "—"],
                      ["Working Domain", submitted.workingDomain],
                    ].map(([term, value]) => (
                      <div key={term} className="contents">
                        <dt className="text-slate-500">{term}</dt>
                        <dd className="m-0 text-slate-300">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  {!submitted.synced && (
                    <p
                      role="status"
                      className="mt-4 flex gap-2.5 rounded-lg border border-amber-400/30 bg-amber-400/8 p-3.5 text-left text-xs leading-6 text-amber-200"
                    >
                      <FiClock className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        Saved on this device, but we couldn't reach our server. Revisit this page while
                        online and it will be sent automatically — keep this browser until then.
                      </span>
                    </p>
                  )}

                  <button type="button" onClick={resetForm} className="ghost-button mt-7">
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="text-xl font-black text-white">Recruitment Application</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Takes about a minute.
                  </p>

                  <div className="mt-7 grid gap-5">
                    <TextField
                      name="name"
                      label="Full Name"
                      value={form.name}
                      error={errors.name}
                      onChange={updateField}
                      type="text"
                      placeholder="e.g. Harshit Sharma"
                      autoComplete="name"
                      maxLength={49}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <SelectField
                        name="gender"
                        label="Gender"
                        value={form.gender}
                        error={errors.gender}
                        onChange={updateField}
                        options={genders}
                        placeholder="Select gender"
                      />

                      <TextField
                        name="regNo"
                        label="Registration No."
                        value={form.regNo}
                        error={errors.regNo}
                        onChange={updateField}
                        type="text"
                        placeholder="e.g. 202401040123"
                        maxLength={20}
                        autoComplete="off"
                        className="uppercase"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
                      <SelectField
                        name="branch"
                        label="Branch"
                        value={form.branch}
                        error={errors.branch}
                        onChange={updateField}
                        options={branches}
                        placeholder="Select branch"
                      />

                      <TextField
                        name="section"
                        label="Section"
                        value={form.section}
                        error={errors.section}
                        onChange={updateField}
                        type="text"
                        placeholder="A"
                        maxLength={3}
                        autoComplete="off"
                        className="uppercase"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <SelectField
                        name="year"
                        label="Year"
                        value={form.year}
                        error={errors.year}
                        onChange={updateField}
                        options={years}
                        placeholder="Select year"
                      />

                      <SelectField
                        name="accommodation"
                        label="Mode of Accommodation"
                        value={form.accommodation}
                        error={errors.accommodation}
                        onChange={updateField}
                        options={accommodations}
                        placeholder="Select accommodation"
                      />
                    </div>

                    <TextField
                      name="email"
                      label="KIET Email"
                      value={form.email}
                      error={errors.email}
                      onChange={updateField}
                      type="email"
                      placeholder="yourname@kiet.edu"
                      autoComplete="email"
                      hint="Only official @kiet.edu addresses are accepted."
                    />

                    <TextField
                      name="phone"
                      label="Phone Number"
                      value={form.phone}
                      error={errors.phone}
                      onChange={updateField}
                      type="tel"
                      inputMode="numeric"
                      placeholder="9876543210"
                      autoComplete="tel"
                      maxLength={15}
                    />

                    {/* Domains, in the order the club presents them: the
                        technical co-domain first, then the working domain the
                        applicant runs events with. The lists are disjoint, so
                        neither pick constrains the other. */}
                    <DomainPicker
                      name="coDomain"
                      legend="Domain"
                      options={coDomains}
                      value={form.coDomain}
                      error={errors.coDomain}
                      onPick={pickCoDomain}
                      noneLabel="None"
                    />

                    <DomainPicker
                      name="workingDomain"
                      legend="Working Domain"
                      note="pick one"
                      options={workingDomains}
                      value={form.workingDomain}
                      error={errors.workingDomain}
                      required
                      onPick={pickWorkingDomain}
                    />
                  </div>

                  {attempted && Object.keys(errors).length > 0 && (
                    <p role="status" className="mt-5 text-center text-xs text-red-300">
                      Please fix the {Object.keys(errors).length} highlighted field
                      {Object.keys(errors).length > 1 ? "s" : ""} above.
                    </p>
                  )}

                  {submitError && <FormError>{submitError}</FormError>}

                  <button type="submit" disabled={sending} aria-busy={sending ? "true" : undefined} className="primary-button mt-7 w-full">
                    {sending ? "Submitting…" : "Submit Application"}
                    {!sending && <FiUsers aria-hidden="true" />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Perks */}
      <motion.section
        className="section-wrap pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Why join" title="What You Get Out of It">
            Six things every member gets, from the first session onward.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {perks.map(({ icon: Icon, title, desc }) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel glow-card rounded-xl p-6">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-lg border border-sky-300/25 bg-sky-300/5 text-xl text-sky-300">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="relative z-10 mt-5 text-base font-black text-white">{title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-7 text-slate-400">{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
      <style>{`
        select.field option { background: #081436; color: #fff; }
        /* .uppercase is there to echo the value back the way it gets stored, but
           it also shouts the placeholder ("E.G. 2024…"). Exempt it. */
        .field.uppercase::placeholder { text-transform: none; }
      `}</style>
    </motion.div>
  );
}

export default JoinUs;
