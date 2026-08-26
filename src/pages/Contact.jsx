import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { fadeUp, stagger } from "../lib/motion";

const socials = [
  { label: "Introduction to AI — Instagram", icon: FiInstagram, href: "https://www.instagram.com/p/DO2sIagElzd/" },
  { label: "SkillSprint 3.0 — Instagram", icon: FiInstagram, href: "https://www.instagram.com/p/DQiedfgkomT/" },
  {
    label: "ProPredict at Innotech — LinkedIn",
    icon: FiLinkedin,
    href: "https://www.linkedin.com/posts/antas01_propredict-with-team-bexarc-proud-to-activity-7402772961960845312-EDH5",
  },
];

const details = [
  {
    icon: FiMapPin,
    title: "Address",
    body: (
      <>
        KIET Group of Institutions
        <br />
        13 Km Stone, Delhi-Meerut Expressway
        <br />
        Ghaziabad, Uttar Pradesh — 201206
      </>
    ),
  },
  {
    icon: FiMail,
    title: "Email",
    body: (
      <a href="mailto:aischool.ic@kiet.edu" className="text-sky-300 no-underline transition-colors hover:text-sky-200">
        aischool.ic@kiet.edu
      </a>
    ),
  },
  {
    icon: FiPhone,
    title: "Phone",
    body: (
      <>
        <a href="tel:+918581060205" className="text-sky-300 no-underline transition-colors hover:text-sky-200">
          8581060205
        </a>
        <span className="mt-1 block text-xs text-slate-500">Antas Kumar Dubey — Student President</span>
      </>
    ),
  },
];

const fields = [
  { key: "name", placeholder: "Your Name", label: "Your name", type: "text", autoComplete: "name" },
  { key: "email", placeholder: "Your Email", label: "Your email", type: "email", autoComplete: "email" },
  { key: "subject", placeholder: "Subject", label: "Subject", type: "text" },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_16%_40%,rgba(56,189,248,0.1),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container-page relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="cyber-title mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
          >
            Let's <span className="neon-text">Connect</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[560px] text-lg leading-8 text-white/85">
            Questions, collaborations, event partnerships, or just a hello — we read every message.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="section-wrap pb-24 pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        {/* Was 1fr 1.4fr collapsing only at 700px, which squeezed the form
            between 700 and 900px. Matches the rest of the site's lg split now. */}
        <div className="section-inner grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Reach us" align="left" title="Where to Find Us">
              We are on the KIET campus in Ghaziabad.
            </SectionHeader>

            <motion.div variants={stagger} className="grid gap-4">
              {details.map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-sky-300/40"
                >
                  <Icon className="mt-0.5 shrink-0 text-xl text-sky-300" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-400">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.h3 variants={fadeUp} className="mt-8 text-xs font-extrabold uppercase tracking-[0.16em] text-sky-300/85">
              Website &amp; Highlights
            </motion.h3>
            <motion.div variants={stagger} className="mt-4 grid gap-2.5">
              {socials.map(({ label, icon: Icon, href }) => (
                <motion.a
                  key={label}
                  variants={fadeUp}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-300 no-underline transition hover:border-sky-300/40 hover:text-sky-100"
                >
                  <Icon className="shrink-0 text-sky-300" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                  <FiExternalLink className="shrink-0 text-slate-500" aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="glass-panel rounded-xl p-6 sm:p-8">
            {sent ? (
              <div className="py-10 text-center">
                <FiCheckCircle className="mx-auto text-5xl text-emerald-300" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black text-white">Message Sent!</h3>
                <p className="mt-2 text-sm text-slate-400">We'll get back to you within 24 hours.</p>
                <button type="button" onClick={() => setSent(false)} className="ghost-button mt-6">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-black text-white">Send a Message</h2>
                <p className="mt-1 text-sm text-slate-400">We read everything that lands here.</p>

                <div className="mt-6 grid gap-4">
                  {fields.map(({ key, placeholder, label, type, autoComplete }) => (
                    <input
                      key={key}
                      type={type}
                      className="field"
                      placeholder={placeholder}
                      aria-label={label}
                      autoComplete={autoComplete}
                      value={form[key]}
                      onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                    />
                  ))}
                  <textarea
                    rows={5}
                    className="field min-h-36 resize-y"
                    placeholder="Your Message"
                    aria-label="Your message"
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                  />
                </div>

                <button type="submit" className="primary-button mt-6 w-full">
                  Send Message <FiSend aria-hidden="true" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap pb-24 pt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="section-inner relative overflow-hidden rounded-xl border border-sky-300/25 bg-gradient-to-br from-sky-500/12 via-transparent to-blue-700/25 p-8 text-center sm:p-12"
        >
          <div className="grid-overlay" aria-hidden="true" />
          <h2 className="relative z-10 text-3xl font-black text-white sm:text-4xl">Looking to join instead?</h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
            Membership runs through the recruitment application, not this form.
          </p>
          <div className="relative z-10 mt-8 flex justify-center">
            <Link to="/join" className="primary-button min-w-48">
              Apply for Membership <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Contact;
