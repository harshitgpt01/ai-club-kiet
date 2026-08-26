import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCode,
  FiCompass,
  FiCpu,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMail,
  FiMinus,
  FiPlus,
  FiSearch,
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

const journey = [
  ["01", "Apply in the drive", "The recruitment drive runs in rounds — screening, technical evaluation, and interviews.", FiUsers],
  ["02", "Learn the core", "Python & ML classes cover hands-on coding, concept building, and practical implementation.", FiBookOpen],
  ["03", "Sprint through a bootcamp", "Intensive bootcamps like SkillSprint 3.0 take you through Gen AI and RAG systems in three days.", FiCode],
  ["04", "Build and present", "Build it in Colab, push it to GitHub, then present it — the ML Pipeline session ended in a felicitation ceremony.", FiAward],
  ["05", "Mentor the next batch", "Seniors join the internal mentorship program and guide first-year students.", FiTrendingUp],
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

// Layer geometry for the neural-network diagram in the hero.
const netLayers = [
  { x: 68, ys: [130, 210, 290], label: "Curiosity" },
  { x: 208, ys: [72, 150, 228, 306, 372], label: "Sessions" },
  { x: 348, ys: [96, 174, 252, 330], label: "Bootcamps" },
  { x: 488, ys: [174, 252], label: "Real projects" },
];

const netEdges = netLayers.slice(0, -1).flatMap((layer, index) =>
  layer.ys.flatMap((fromY) =>
    netLayers[index + 1].ys.map((toY) => ({
      x1: layer.x,
      y1: fromY,
      x2: netLayers[index + 1].x,
      y2: toY,
      depth: index,
    }))
  )
);

function NeuralFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="glass-panel glow-card relative rounded-xl p-5 sm:p-7"
    >
      <div className="grid-overlay" aria-hidden="true" />

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
          4 domains
        </span>
      </div>

      <svg
        viewBox="0 0 556 440"
        className="relative z-10 mt-4 h-auto w-full"
        role="img"
        aria-label="Diagram of a neural network: curiosity flows through sessions and bootcamps into real projects"
      >
        <defs>
          <linearGradient id="aboutFlow" x1="0" x2="1">
            <stop stopColor="#7dd3fc" />
            <stop offset="0.55" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <filter id="aboutGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {netEdges.map((edge, index) => (
          <line
            key={`edge-${index}`}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="url(#aboutFlow)"
            strokeOpacity="0.42"
            strokeWidth="1.1"
            strokeDasharray="7 11"
            style={{
              animation: `dashFlow ${2.4 + edge.depth * 0.5}s linear infinite`,
              animationDelay: `${(index % 7) * 0.16}s`,
            }}
          />
        ))}

        {netLayers.map((layer, layerIndex) => (
          <g key={`layer-${layer.x}`}>
            {layer.ys.map((y, nodeIndex) => (
              <circle
                key={`node-${layer.x}-${y}`}
                cx={layer.x}
                cy={y}
                r={layerIndex === netLayers.length - 1 ? 9 : 6.5}
                fill={layerIndex > 1 ? "#2563eb" : "#38bdf8"}
                filter="url(#aboutGlow)"
                style={{
                  animation: `nodeGlow ${1.8 + (nodeIndex % 4) * 0.35}s ease-in-out infinite`,
                  animationDelay: `${(layerIndex * 3 + nodeIndex) * 0.12}s`,
                }}
              />
            ))}
            <text x={layer.x} y="424" textAnchor="middle" className="fill-slate-400 text-[13px] font-bold">
              {layer.label}
            </text>
          </g>
        ))}
      </svg>
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
              AI Club KIET is a student-driven technical community at KIET Group of Institutions,
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

          <NeuralFlow />
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
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="section-inner grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader eyebrow="Your first year" align="left" title={<>From Curious<br />to Shipping</>}>
              Nobody is expected to arrive knowing gradient descent. This is the path most members walk.
            </SectionHeader>
            <motion.div variants={fadeUp}>
              <Link to="/join" className="ghost-button">
                Start at step one <FiArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <motion.ol variants={stagger} className="relative m-0 list-none space-y-4 p-0">
            <span
              className="absolute bottom-6 left-[26px] top-6 w-px bg-gradient-to-b from-sky-300/60 via-blue-600/40 to-transparent"
              aria-hidden="true"
            />
            {journey.map(([step, title, body, Icon]) => (
              <motion.li key={step} variants={fadeUp} className="relative flex gap-5 pl-0">
                <span className="relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-sky-300/35 bg-[#081436] text-xl text-sky-300 shadow-[0_0_22px_rgba(56,189,248,0.28)]">
                  <Icon aria-hidden="true" />
                </span>
                <div className="glass-panel flex-1 rounded-xl p-5">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-sky-300/85">Step {step}</span>
                  <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
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
