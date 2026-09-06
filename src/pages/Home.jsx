import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiCode,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiShare2,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoticeMarquee from "../components/NoticeMarquee";
import SectionHeader from "../components/SectionHeader";
import StatsBand from "../components/StatsBand";
import TeamMarquee from "../components/TeamMarquee";
import FieldError, { FormError } from "../components/FieldError";
import { fadeUp, stagger } from "../lib/motion";
import { useContactForm } from "../lib/useContactForm";
import { DOMAINS, domainCounts, studentProjects } from "../data/projects";
import { homeHighlights } from "../data/gallery";
import { officeBearers, leads } from "../data/team";
import logoMark from "../assets/logo-mark.png";

const stats = [
  { value: 1900, suffix: "+", label: "Students Reached", icon: FiUsers },
  { value: 8, suffix: "", label: "Events Conducted", icon: FiCalendar },
  { value: 37, suffix: "", label: "Student Projects", icon: FiCode },
  { value: 50, suffix: "+", label: "Mentees Guided", icon: FiBookOpen },
];

// area maps onto the named grid areas in .brain-grid (see index.css).
const brainLabels = [
  { area: "l1", icon: FiCpu, label: "Machine Learning" },
  { area: "l2", icon: FiShare2, label: "Neural Networks" },
  { area: "r1", icon: FiLayers, label: "Deep Learning" },
  { area: "r2", icon: FiBarChart2, label: "Data Science" },
];

const domains = [
  ["Machine Learning", "Model building, Python and ML classes, and practical implementation of ML workflows.", FiCpu],
  ["Generative AI & RAG", "Gen AI and Retrieval-Augmented Generation systems, covered hands-on in SkillSprint 3.0.", FiTarget],
  ["Data Science", "Analytics, statistics, and drawing decisions out of real-world datasets.", FiGlobe],
  ["AI Research", "Research-driven projects, competitions, and paper-backed problem solving.", FiBookOpen],
];

const objectives = [
  ["Promote learning in AI, ML, and Data Science", FiBookOpen],
  ["Provide hands-on exposure through workshops and bootcamps", FiCode],
  ["Encourage real-world project development", FiCpu],
  ["Prepare students for research and competitions", FiAward],
  ["Build a strong collaborative technical community", FiUsers],
];

const events = [
  ["Workshop", "End-to-End ML Pipeline", "2-Day Session · TBI, KIET"],
  ["Session", "Docker Session", "Feb 2026 · AI Lab"],
  ["Bootcamp", "SkillSprint 3.0", "Nov 2025 · H-Block Lab"],
  ["Showcase", "Innotech Presentation", "Nov 2025 · KIET Ground"],
];

// Office bearers first, then the leads, in the same order the Team page lists
// them. One roster, imported from data/team — Home used to keep its own copy of
// the president's name and role, which is how the two drifted apart.
const roster = [...officeBearers, ...leads];

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let frame;
    let nodes = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = Array.from({ length: Math.min(135, Math.floor((width * height) / 11000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.7 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance < 115) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - distance / 115) * 0.24})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(125, 211, 252, 0.75)";
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-45" aria-hidden="true" />;
}

function BrainHologram() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="brain-stage"
    >
      <div className="brain-grid">
        <motion.img
          src={logoMark}
          alt="AI Club KIET logo"
          className="brain-mark w-full max-w-[390px] object-contain drop-shadow-[0_0_46px_rgba(56,189,248,0.5)] xl:max-w-[460px]"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {brainLabels.map(({ area, icon: Icon, label }) => (
          <div key={label} className="brain-label" style={{ gridArea: area }}>
            <Icon aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Home() {
  const contact = useContactForm("home-contact");

  return (
    <motion.div className="site-shell relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <Navbar />

      <NoticeMarquee />

      <section id="hero" className="cyber-hero page-hero relative min-h-[760px] overflow-hidden pb-16 gutter lg:min-h-screen">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(37,99,235,0.24),transparent_30rem),radial-gradient(circle_at_20%_32%,rgba(56,189,248,0.12),transparent_24rem)]" />
        <div className="mesh-floor" aria-hidden="true" />

        <div className="container-page relative z-10 grid min-h-[620px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="eyebrow">
              &lt; AI Club · KIET Ghaziabad /&gt;
            </motion.span>
            <motion.h1 variants={fadeUp} className="cyber-title mt-6 max-w-2xl text-5xl font-black uppercase leading-[1.18] text-white sm:text-6xl xl:text-[4.35rem]">
              From Theory<br />
              To <span className="neon-text">Real AI Work</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[520px] text-lg leading-8 text-white/85">
              AI Club KIET is a student-driven technical community focused on Artificial Intelligence,
              Machine Learning, Data Science, and emerging technologies.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link to="/about" className="primary-button min-w-44">
                Explore More <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/join" className="ghost-button min-w-60">
                <FiUsers aria-hidden="true" /> Join Our Community
              </Link>
            </motion.div>
            <motion.a variants={fadeUp} href="#about" className="mt-9 inline-flex items-center gap-3 text-sky-300 no-underline">
              <span className="grid h-8 w-5 place-items-center rounded-full border border-sky-300/70">
                <FiChevronDown aria-hidden="true" />
              </span>
              Scroll Down
            </motion.a>
          </motion.div>

          <BrainHologram />
        </div>
      </section>

      <StatsBand items={stats} />

      <motion.section id="about" className="section-wrap pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <div className="section-inner grid items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
          <motion.div variants={fadeUp} className="neural-head min-h-[360px]" aria-label="Neural network human head illustration" />
          <div>
            <SectionHeader eyebrow="About Us" align="left" title={<>Bridging Theory<br />and Application</>}>
              The club bridges the gap between theoretical learning and real-world application through
              hands-on sessions, bootcamps, and project-based learning. It fosters innovation, research,
              and collaboration among students while building strong technical foundations and encouraging
              real-world problem solving using AI-driven approaches.
            </SectionHeader>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="ghost-button">
                Know More About Us <FiArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="domains" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Domains" title="Areas We Explore">
            Four focused areas take members from fundamentals to working AI systems.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {domains.map(([title, desc, Icon]) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel glow-card rounded-xl p-6">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-lg border border-sky-300/25 bg-sky-300/5 text-xl text-sky-300">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="relative z-10 mt-5 text-xl font-black text-white">{title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-7 text-slate-400">{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="events" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Events" title="Recent Activities">
            Sessions, bootcamps, recruitment drives, and showcases across the year.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {events.map(([type, title, date]) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel glow-card flex flex-col rounded-xl p-6">
                <span className="relative z-10 text-xs font-black uppercase tracking-[0.16em] text-sky-300">{type}</span>
                <h3 className="relative z-10 mt-4 text-2xl font-black leading-snug text-white">{title}</h3>
                <p className="relative z-10 mt-3 text-sm text-slate-400">{date}</p>
                <Link to="/events" className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-200 no-underline transition-colors hover:text-sky-100">
                  View Details <FiArrowRight aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="projects" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Projects" title="What Members Build">
            Project squads turn club learning into systems worth presenting.
          </SectionHeader>
          <motion.article variants={fadeUp} className="glass-panel relative overflow-hidden rounded-xl p-6 sm:p-9">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-300 to-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">Innotech Finalist</span>
            <h3 className="mt-4 text-3xl font-black text-white">ProPredict</h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
              A protein function prediction system based on machine learning, built by Team Bexarc and
              presented at Innotech in front of 1000+ attendees. The project secured a finalist position
              and showcased strong innovation and technical depth.
            </p>
            <div className="mt-7">
              <a
                href="https://www.linkedin.com/posts/antas01_propredict-with-team-bexarc-proud-to-activity-7402772961960845312-EDH5"
                target="_blank"
                rel="noreferrer"
                className="ghost-button"
              >
                <FiLinkedin aria-hidden="true" /> Read the announcement
              </a>
            </div>
          </motion.article>

          <motion.article
            variants={fadeUp}
            className="relative mt-5 overflow-hidden rounded-xl border border-sky-300/25 bg-gradient-to-br from-sky-500/12 via-transparent to-blue-700/25 p-6 sm:p-9"
          >
            <div className="grid-overlay" aria-hidden="true" />
            <div className="relative z-10">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">ML Pipeline Session</span>
              <h3 className="mt-4 text-3xl font-black text-white">
                {studentProjects.length} Student Projects
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
                Participants each built an end-to-end machine learning pipeline on a real-world dataset —
                across finance, e-commerce, and healthcare — in Google Colab, then published the notebook
                to GitHub. Every repository is browsable.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {DOMAINS.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-300"
                  >
                    {item} <span className="opacity-60">{domainCounts[item]}</span>
                  </span>
                ))}
              </div>
              <div className="mt-7">
                <Link to="/projects" className="primary-button">
                  Browse all projects <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </motion.section>

      <motion.section id="objectives" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Objectives" title="What the Club Sets Out to Do">
            Five commitments shape every session, bootcamp, and project the club runs.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {objectives.map(([text, Icon]) => (
              <motion.div key={text} variants={fadeUp} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-300/40">
                <Icon className="mt-1 shrink-0 text-2xl text-sky-300" aria-hidden="true" />
                <p className="text-sm font-semibold leading-7 text-slate-300">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="team" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Team" title="Who Leads the Club">
            Student leadership keeps the club running every semester.
          </SectionHeader>
          <motion.div variants={fadeUp}>
            <TeamMarquee members={roster} />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Link to="/team" className="ghost-button">
              Meet the full team <FiArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="gallery" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Gallery" title="Club Moments">
            A glimpse of the sessions, bootcamps, drives, and showcases from the year.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeHighlights.map((photo, index) => (
              <motion.article
                key={photo.id}
                variants={fadeUp}
                /* The img and scrim are absolutely positioned, so the pill and the
                   caption are the only flex items: justify-between pins one to
                   each edge. The old fixed mt-24 left captions at different
                   heights depending on whether the title wrapped. */
                className={`group relative flex min-h-60 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 p-5 ${
                  index === 0 || index === 5 ? "lg:col-span-2" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                {/* Scrim keeps the tag pill and title legible over the photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-[rgba(3,10,26,0.45)] to-[rgba(3,10,26,0.25)]" />
                <span className="relative w-fit rounded-full border border-white/10 bg-[rgba(3,10,26,0.6)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-sky-100 backdrop-blur-sm">
                  {photo.tag}
                </span>
                <h3 className="relative mt-6 max-w-sm text-2xl font-black leading-snug text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                  {photo.title}
                </h3>
              </motion.article>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 text-center">
            <Link to="/gallery" className="ghost-button">
              See the full gallery <FiArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="contact" className="section-wrap pb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Contact" align="left" title="Let's Build Together">
              Reach AI Club KIET for membership, event collaborations, sessions, and student-led
              AI initiatives.
            </SectionHeader>
            <motion.div variants={stagger} className="grid gap-4">
              {[
                [FiMapPin, "KIET Deemed to be University, Ghaziabad"],
                [FiMail, "aischool.ic@kiet.edu"],
                [FiPhone, "8581060205 · Antas Kumar Dubey (President)"],
              ].map(([Icon, text]) => (
                <motion.div key={text} variants={fadeUp} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                  <Icon className="shrink-0 text-xl text-sky-300" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-300">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="glass-panel rounded-xl p-6 sm:p-8">
            {contact.sent ? (
              <div className="py-10 text-center">
                <FiCheckCircle className="mx-auto text-5xl text-emerald-300" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black text-white">Message Sent!</h3>
                <p className="mt-2 text-sm text-slate-400">
                  It's in the club inbox — we'll reply to the address you gave us.
                </p>
                <button type="button" onClick={contact.reset} className="ghost-button mt-6">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={contact.handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      className="field"
                      type="text"
                      placeholder="Full name"
                      aria-label="Full name"
                      autoComplete="name"
                      {...contact.fieldProps("name")}
                    />
                    {contact.errors.name && (
                      <FieldError id={`${contact.fieldId("name")}-error`}>{contact.errors.name}</FieldError>
                    )}
                  </div>
                  <div>
                    <input
                      className="field"
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                      autoComplete="email"
                      {...contact.fieldProps("email")}
                    />
                    {contact.errors.email && (
                      <FieldError id={`${contact.fieldId("email")}-error`}>{contact.errors.email}</FieldError>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    className="field"
                    type="text"
                    placeholder="Subject"
                    aria-label="Subject"
                    {...contact.fieldProps("subject")}
                  />
                  {contact.errors.subject && (
                    <FieldError id={`${contact.fieldId("subject")}-error`}>{contact.errors.subject}</FieldError>
                  )}
                </div>

                <div className="mt-4">
                  <textarea
                    className="field min-h-36 resize-y"
                    placeholder="Tell us what you want to build."
                    aria-label="Message"
                    {...contact.fieldProps("message")}
                  />
                  {contact.errors.message && (
                    <FieldError id={`${contact.fieldId("message")}-error`}>{contact.errors.message}</FieldError>
                  )}
                </div>

                {contact.submitError && <FormError>{contact.submitError}</FormError>}

                <button
                  type="submit"
                  disabled={contact.sending}
                  aria-busy={contact.sending ? "true" : undefined}
                  className="primary-button mt-5 w-full"
                >
                  {contact.sending ? "Sending…" : "Send Message"}
                  {!contact.sending && <FiSend aria-hidden="true" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Home;
