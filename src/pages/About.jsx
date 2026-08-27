import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCode,
  FiCompass,
  FiCpu,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMail,
  FiMic,
  FiMinus,
  FiPenTool,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import StatsBand from "../components/StatsBand";
import { fadeUp, stagger } from "../lib/motion";

const stats = [
  { value: 1900, suffix: "+", label: "Students Reached", icon: FiUsers },
  { value: 8, suffix: "", label: "Events Conducted", icon: FiCalendar },
  { value: 37, suffix: "", label: "Student Projects", icon: FiCode },
  { value: 50, suffix: "+", label: "Mentees Guided", icon: FiBookOpen },
];

const pillars = [
  {
    title: "Mission",
    icon: FiTarget,
    body:
      "Bridge the gap between theoretical learning and real-world application through hands-on sessions, bootcamps, and project-based learning.",
  },
  {
    title: "Vision",
    icon: FiCompass,
    body:
      "Foster innovation, research, and collaboration among students while building strong technical foundations in AI, ML, and Data Science.",
  },
  {
    title: "Approach",
    icon: FiZap,
    body:
      "Encourage real-world problem solving using AI-driven approaches — seniors mentor juniors, and every batch builds on the last one's work.",
  },
];

const values = [
  {
    title: "Hands-on Exposure",
    icon: FiLayers,
    body: "Workshops and bootcamps like SkillSprint 3.0 end with something you have actually built and run.",
  },
  {
    title: "Inclusive Community",
    icon: FiHeart,
    body: "A collaborative technical community — the mentorship program starts guiding students from the first year.",
  },
  {
    title: "Research Mindset",
    icon: FiSearch,
    body: "Members are prepared for research and competitions, from paper-backed problems to national showcases.",
  },
  {
    title: "Real Project Work",
    icon: FiTrendingUp,
    body: "Real-world project development — 37 student pipelines shipped to GitHub, and ProPredict reached the Innotech finals.",
  },
];

const tracks = [
  ["Machine Learning", "End-to-end ML pipelines, model building, and the Python and ML classes behind them.", FiCpu],
  ["Generative AI & RAG", "Gen AI and Retrieval-Augmented Generation systems, covered in SkillSprint 3.0.", FiTarget],
  ["Data Science", "Analytics, statistics, and decisions drawn from real-world datasets.", FiGlobe],
  ["AI Research", "Research-driven projects, competitions, and emerging technologies.", FiBookOpen],
];

// The club runs on two tiers: the technical co-domains everyone is recruited
// into, and the working domains that keep events, funding and outreach moving.
// Both titles below are the same strings the recruitment form offers — see
// `coDomains` in src/pages/JoinUs.jsx.
const coreDomains = [
  {
    title: "AI & ML",
    icon: FiCpu,
    body:
      "The technical core — model building, end-to-end ML pipelines, and the Python & ML classes that get every batch there.",
    tags: ["Machine Learning", "Deep Learning", "Gen AI & RAG", "Data Science"],
  },
  {
    title: "AI Security",
    icon: FiShield,
    body:
      "Where the models get stress-tested — adversarial attacks, model robustness, and shipping AI systems that hold up in the real world.",
    tags: ["Adversarial ML", "Model Robustness", "Secure Deployment", "AI Ethics"],
  },
];

// Same four teams, in the same order, as `workingDomains` in src/pages/JoinUs.jsx.
const workingDomains = [
  {
    title: "Web Development",
    icon: FiCode,
    body: "Builds and maintains the club site, event portals, and the demos that carry member projects.",
  },
  {
    title: "Media & Graphics",
    icon: FiPenTool,
    body: "Posters, session decks, reels, and the visual identity behind every event the club runs.",
  },
  {
    title: "Management & PR",
    icon: FiMic,
    body: "Runs events end to end — scheduling, volunteers, campus outreach, and the club's public voice across platforms.",
  },
  {
    title: "Corporate & Finance",
    icon: FiBriefcase,
    body: "Sponsorships, budgets, and vendor coordination — the side that keeps events funded and on schedule.",
  },
];

const faqs = [
  [
    "Who can join AI Club KIET?",
    "Any KIET student interested in Artificial Intelligence, Machine Learning, Data Science, or emerging technologies. The internal mentorship program is built specifically to guide first-year students.",
  ],
  [
    "How does recruitment work?",
    "Through a structured drive conducted in multiple rounds — screening, technical evaluation, and interviews. The last cycle drew 500+ applicants at KIC.",
  ],
  [
    "Do I need prior AI or coding experience?",
    "No. Sessions like Introduction to AI build foundational understanding from scratch, and the regular Python & ML classes take you from basics to practical implementation.",
  ],
  [
    "What does the club actually run?",
    "Introductory sessions, bootcamps on Gen AI and RAG, a 2-day end-to-end ML pipeline session that produced 37 student projects, ongoing Python & ML classes, an internal mentorship program, and project showcases such as Innotech.",
  ],
];

// The hero card: what actually happens to a student between walking in and
// shipping something. Each metric is the same figure `stats` above reports, so
// the two never drift. --tint walks the brand ramp sky -> royal down the list.
const flowStages = [
  {
    icon: FiCompass,
    title: "Curiosity",
    tint: "#7dd3fc",
    body: "Anyone walks in — first years included. No prior AI or coding experience needed.",
    metric: "1,900+ reached",
  },
  {
    icon: FiMic,
    title: "Sessions",
    tint: "#38bdf8",
    body: "Introduction to AI, then regular Python & ML classes that take you from basics to code.",
    metric: "8 events",
  },
  {
    icon: FiZap,
    title: "Bootcamps",
    tint: "#3b82f6",
    body: "SkillSprint 3.0 on Gen AI & RAG, and the 2-day end-to-end ML pipeline sprint.",
    metric: "50+ mentored",
  },
  {
    icon: FiTrendingUp,
    title: "Real projects",
    tint: "#2563eb",
    body: "Pipelines shipped to GitHub and showcased — ProPredict reached the Innotech finals.",
    metric: "37 projects",
  },
];

function ClubFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-panel glow-card relative overflow-hidden rounded-xl p-5 sm:p-7"
    >
      <div className="grid-overlay" aria-hidden="true" />
      <div className="flow-aura" aria-hidden="true" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">How the club works</p>
          <p className="mt-1 text-sm text-slate-400">Curiosity in, real projects out.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/5 px-3 py-1 text-xs font-bold text-sky-100">
          <span
            className="h-2 w-2 rounded-full bg-sky-300"
            style={{ animation: "nodeGlow 1.8s ease-in-out infinite" }}
          />
          Intake open
        </span>
      </div>

      <ol className="relative z-10 mt-7 list-none p-0">
        {flowStages.map(({ icon: Icon, title, body, metric, tint }, index) => (
          <li
            key={title}
            className="flow-step grid grid-cols-[2.4rem_1fr] gap-x-4"
            style={{ "--tint": tint, "--delay": `${index * 0.45}s` }}
          >
            <span className="flow-node" aria-hidden="true">
              <Icon />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                <h3 className="text-base font-black leading-none text-white">{title}</h3>
                <span className="flow-metric">{metric}</span>
              </div>
              <p className="mt-2 text-[13px] leading-6 text-slate-400">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* The pipeline is a loop, not a line — the last batch's output is what
          the next one starts from, which is the whole point of the mentorship
          program. Saying so closes the card. */}
      <p className="relative z-10 mt-6 flex items-center gap-2.5 border-t border-white/8 pt-4 text-xs font-semibold text-slate-400">
        <FiRefreshCw className="shrink-0 text-sm text-sky-300" aria-hidden="true" />
        Then it loops — seniors mentor juniors, and every batch builds on the last one&apos;s work.
      </p>
    </motion.div>
  );
}

// Tier heading for the club-structure section: label, count, then a rule that
// runs to the edge so both tiers line up on the same left and right margins.
function TierLabel({ label, count, note }) {
  return (
    <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-sky-300/85">{label}</span>
      <span className="rounded-full border border-sky-300/25 bg-sky-300/5 px-2.5 py-0.5 text-[11px] font-black tabular-nums text-sky-100">
        {count}
      </span>
      <span className="h-px min-w-8 flex-1 bg-gradient-to-r from-sky-300/35 to-transparent" aria-hidden="true" />
      <span className="text-xs font-semibold text-slate-500">{note}</span>
    </motion.div>
  );
}

function FaqItem({ question, answer, open, onToggle, id }) {
  return (
    <motion.div variants={fadeUp} className="glass-panel overflow-hidden rounded-xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        className="flex w-full items-center justify-between gap-4 bg-transparent p-5 text-left text-base font-bold text-white sm:text-lg"
      >
        {question}
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-sky-300/30 bg-sky-300/5 text-sky-200">
          {open ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-7 text-slate-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_14%_36%,rgba(56,189,248,0.12),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <motion.span variants={fadeUp} className="eyebrow">
              About Us
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="cyber-title mt-6 text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
            >
              Bridging theory
              <br />
              and <span className="neon-text">application</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[560px] text-lg leading-8 text-white/85">
              AI Club KIET is a student-driven technical community at KIET Deemed to be University,
              Ghaziabad, focused on Artificial Intelligence, Machine Learning, Data Science, and emerging
              technologies. The club bridges the gap between theoretical learning and real-world
              application through hands-on sessions, bootcamps, and project-based learning.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              {["KIET Ghaziabad", "Student-driven", "Faculty guided"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link to="/join" className="primary-button min-w-48">
                Join the Club <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/contact" className="ghost-button min-w-48">
                <FiMail aria-hidden="true" /> Talk to Us
              </Link>
            </motion.div>
          </div>

          <ClubFlow />
        </motion.div>
      </section>

      <StatsBand items={stats} />

      <motion.section
        className="section-wrap pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Why we exist" title="Mission, Vision, Approach">
            Three things keep the club pointed in the same direction every semester.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-3">
            {pillars.map(({ title, body, icon: Icon }) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel glow-card rounded-xl p-7">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-lg border border-sky-300/25 bg-sky-300/5 text-2xl text-sky-300">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="relative z-10 mt-6 text-2xl font-black text-white">{title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-7 text-slate-400">{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="What we value" title="How This Club Feels">
            The culture matters more than the syllabus — these four ideas shape every session.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map(({ title, body, icon: Icon }) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel glow-card rounded-xl p-6">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-lg border border-sky-300/25 bg-sky-300/5 text-xl text-sky-300">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="relative z-10 mt-5 text-xl font-black text-white">{title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-7 text-slate-400">{body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Club structure" title="Two Cores, Four Engines">
            Every member sits in one of two technical co-domains, and the club runs on four working
            domains that carry everything around them.
          </SectionHeader>

          <TierLabel label="Co-Domains" count="02" note="Technical tracks" />
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
            {coreDomains.map(({ title, body, tags, icon: Icon }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="glass-panel glow-card flex h-full flex-col rounded-xl border-sky-300/25 bg-gradient-to-br from-sky-500/12 via-[#0a1a44]/70 to-blue-700/20 p-7"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-sky-300/30 bg-sky-300/10 text-2xl text-sky-300">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-black text-white">{title}</h3>
                </div>
                <p className="relative z-10 mt-4 text-sm leading-7 text-slate-400">{body}</p>
                <ul className="relative z-10 mt-auto flex list-none flex-wrap gap-2 p-0 pt-6">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>

          <div className="relative flex h-16 items-center justify-center" aria-hidden="true">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-sky-300/60 via-sky-300/30 to-blue-600/10" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.85)]" />
          </div>

          <TierLabel label="Working Domains" count="04" note="Operations & outreach" />
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {workingDomains.map(({ title, body, icon: Icon }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-300/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-sky-300/25 bg-sky-300/5 text-xl text-sky-300">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-black leading-snug text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{body}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-11 text-center">
            <Link to="/join" className="ghost-button">
              Pick your domain <FiArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Tracks" title="Pick Where You Go Deep">
            Four focused tracks, each with its own lead, reading list, and project squads.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2">
            {tracks.map(([title, desc, Icon]) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-300/40"
              >
                <Icon className="mt-1 shrink-0 text-2xl text-sky-300" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="FAQ" title="Before You Join">
            The four questions we get asked in every orientation session.
          </SectionHeader>
          <motion.div variants={stagger} className="mx-auto grid max-w-3xl gap-4">
            {faqs.map(([question, answer], index) => (
              <FaqItem
                key={question}
                id={index}
                question={question}
                answer={answer}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap pb-24"
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
          <h2 className="relative z-10 text-3xl font-black text-white sm:text-4xl">Ready to build with us?</h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
            Applications stay open through the semester. Bring curiosity — we will handle the rest.
          </p>
          <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/join" className="primary-button min-w-48">
              Apply for Membership <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/team" className="ghost-button min-w-48">
              <FiUsers aria-hidden="true" /> Meet the Team
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default About;
