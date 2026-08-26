import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiAward,
  FiBriefcase,
  FiClock,
  FiCpu,
  FiFileText,
  FiGlobe,
  FiLink,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { fadeUp, stagger } from "../lib/motion";
import {
  readApplications,
  submitApplication,
  syncPendingApplications,
} from "../lib/applications";

const branches = [
  "CSE",
  "CSE (AI & ML)",
  "CSE (AI)",
  "CS",
  "CS & IT",
  "IT",
  "ECE",
  "EN (Electronics)",
  "EE",
  "ME",
  "CE",
  "B.Pharm",
  "MCA",
  "MBA",
];

const domains = [
  "Machine Learning",
  "Data Science",
  "Web Development",
  "Computer Vision",
  "NLP / Research",
  "Reinforcement Learning",
  "Design / Creative",
  "Event Management",
];

const perks = [
  { icon: FiCpu, title: "Learn from Peers", desc: "Weekly sessions run by students who've interned at top companies." },
  { icon: FiAward, title: "Win Competitions", desc: "Club teams have placed in national-level hackathons and Kaggle competitions." },
  { icon: FiBriefcase, title: "Career Support", desc: "Resume reviews, referrals, and alumni connections at Google, Microsoft, and startups." },
  { icon: FiLink, title: "Real Projects", desc: "Build things that ship — not just course assignments." },
  { icon: FiGlobe, title: "Industry Network", desc: "Direct access to industry sessions with engineers and researchers." },
  { icon: FiFileText, title: "Certificate & Recognition", desc: "Official club membership certificate and profile on our website." },
];

const EMPTY_FORM = { name: "", branch: "", section: "", email: "", phone: "" };

/* ---------------------------------- validation --------------------------------- */

const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]*$/;
const SECTION_RE = /^[A-Za-z0-9]{1,3}$/;
// Case-insensitive: students commonly type KIET.edu or Kiet.edu.
const KIET_EMAIL_RE = /^[A-Za-z0-9._%+-]+@kiet\.edu$/i;

// Accepts "+91 98765 43210", "098765-43210", "9876543210" — all reduce to 10 digits.
function normalizePhone(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function validate(form, picked) {
  const errors = {};
  const name = form.name.trim();
  const section = form.section.trim();
  const email = form.email.trim();
  const phone = normalizePhone(form.phone);

  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 3) errors.name = "Please enter your full name.";
  else if (!NAME_RE.test(name)) errors.name = "Letters only — no digits or special characters.";

  if (!form.branch) errors.branch = "Select your branch.";

  if (!section) errors.section = "Enter your section.";
  else if (!SECTION_RE.test(section)) errors.section = "1–3 letters or digits (e.g. A, B2, C).";

  if (!email) errors.email = "Enter your KIET email address.";
  else if (!KIET_EMAIL_RE.test(email)) errors.email = "Must be your official @kiet.edu address.";

  if (!phone) errors.phone = "Enter your phone number.";
  else if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";

  if (picked.length === 0) errors.domains = "Pick at least one domain you're interested in.";

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

function FieldError({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
      <FiAlertCircle className="shrink-0" aria-hidden="true" />
      {children}
    </p>
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

/* ---------------------------------- the page ---------------------------------- */

const FOCUS_ORDER = ["name", "branch", "section", "email", "phone", "domains"];

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-opacity='0.45' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

function JoinUs() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [picked, setPicked] = useState([]);
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

  // Once the user has tried to submit, re-check on every keystroke so errors clear live.
  const revalidate = (nextForm, nextPicked) => {
    if (attempted) setErrors(validate(nextForm, nextPicked));
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    const next = { ...form, [name]: value };
    setForm(next);
    revalidate(next, picked);
  };

  const toggleDomain = (domain) => {
    const next = picked.includes(domain) ? picked.filter((d) => d !== domain) : [...picked, domain];
    setPicked(next);
    revalidate(form, next);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return; // ignore a double-click on the submit button
    setAttempted(true);
    setSubmitError("");

    const found = validate(form, picked);
    const email = form.email.trim().toLowerCase();

    // Cheap local check first; the table's UNIQUE(email) is what actually enforces this.
    if (!found.email && readApplications().some((a) => a.email.toLowerCase() === email)) {
      found.email = "An application with this KIET email already exists.";
    }

    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = FOCUS_ORDER.find((key) => found[key]);
      document.getElementById(`ru-${first}`)?.focus();
      return;
    }

    const record = {
      name: form.name.trim().replace(/\s+/g, " "),
      branch: form.branch,
      section: form.section.trim().toUpperCase(),
      email,
      phone: normalizePhone(form.phone),
      domains: picked,
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
    setPicked([]);
    setErrors({});
    setAttempted(false);
    setSubmitted(null);
    setSubmitError("");
  };

  const branchError = errors.branch;

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

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

      {/* Perks */}
      <motion.section
        className="section-wrap pt-20"
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

      {/* Recruitment form */}
      <motion.section
        className="section-wrap pb-24"
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

                  <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left text-sm">
                    {[
                      ["Branch", `${submitted.branch} · Section ${submitted.section}`],
                      ["Phone", submitted.phone],
                      ["Domains", submitted.domains.join(", ")],
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
                  <p className="mt-1 text-sm text-slate-400">All fields are required. Takes about a minute.</p>

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

                    <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
                      {/* Branch */}
                      <div>
                        <label htmlFor="ru-branch" className="field-label">
                          Branch
                          <Required />
                        </label>
                        <select
                          id="ru-branch"
                          name="branch"
                          value={form.branch}
                          onChange={updateField}
                          required
                          aria-invalid={branchError ? "true" : undefined}
                          aria-describedby={branchError ? "ru-branch-error" : undefined}
                          className="field cursor-pointer appearance-none pr-10 [color-scheme:dark]"
                          style={{
                            backgroundImage: SELECT_CHEVRON,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 12px center",
                            backgroundSize: "18px",
                          }}
                        >
                          <option value="">Select branch</option>
                          {branches.map((branch) => (
                            <option key={branch} value={branch}>
                              {branch}
                            </option>
                          ))}
                        </select>
                        {branchError && <FieldError id="ru-branch-error">{branchError}</FieldError>}
                      </div>

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

                    {/* Domains */}
                    <fieldset className="m-0 min-w-0 border-none p-0">
                      <legend className="field-label p-0">
                        Domains of Interest
                        <Required />
                        <span className="font-medium text-slate-500"> — select all that apply</span>
                      </legend>
                      <div
                        className="flex flex-wrap gap-2"
                        aria-describedby={errors.domains ? "ru-domains-error" : undefined}
                      >
                        {domains.map((domain, index) => (
                          <button
                            key={domain}
                            id={index === 0 ? "ru-domains" : undefined}
                            type="button"
                            onClick={() => toggleDomain(domain)}
                            aria-pressed={picked.includes(domain)}
                            className={`filter-pill ${errors.domains ? "border-red-400/50" : ""}`}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                      {errors.domains && <FieldError id="ru-domains-error">{errors.domains}</FieldError>}
                    </fieldset>
                  </div>

                  {attempted && Object.keys(errors).length > 0 && (
                    <p role="status" className="mt-5 text-center text-xs text-red-300">
                      Please fix the {Object.keys(errors).length} highlighted field
                      {Object.keys(errors).length > 1 ? "s" : ""} above.
                    </p>
                  )}

                  {submitError && (
                    <p
                      role="alert"
                      className="mt-5 flex gap-2.5 rounded-lg border border-red-400/30 bg-red-400/8 p-3.5 text-xs leading-6 text-red-300"
                    >
                      <FiAlertTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{submitError}</span>
                    </p>
                  )}

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

      <Footer />
      <style>{`
        #ru-branch option { background: #081436; color: #fff; }
      `}</style>
    </motion.div>
  );
}

export default JoinUs;
