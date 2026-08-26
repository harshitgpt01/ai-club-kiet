import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiMail } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import TeamCard from "../components/TeamCard";
import { fadeUp, stagger, staggerTight } from "../lib/motion";
import { officeBearers, leads } from "../data/team";

// One roster on this page: the office bearers lead the grid, then the domain leads.
const coreMembers = [...officeBearers, ...leads];

// The three rounds the club's own copy names. Deliberately just the names — the
// source material does not describe what happens inside each round.
const rounds = ["Screening", "Technical evaluation", "Interview"];

function Team() {
  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_18%_40%,rgba(56,189,248,0.1),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container-page relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            The People
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="cyber-title mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
          >
            Meet the <span className="neon-text">Team</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[560px] text-lg leading-8 text-white/85">
            A student-driven technical community, guided by faculty and led by students of KIET
            Ghaziabad.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="section-wrap pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={staggerTight}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Core Members" title="Who Runs the Club">
            Two office bearers hold the club's mandate for the current cycle, and each lead owns a
            domain — from machine learning and AI security to academics, media and outreach.
          </SectionHeader>
          <motion.div
            variants={staggerTight}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {coreMembers.map((member) => (
              <motion.div key={member.name} variants={fadeUp}>
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="mx-auto mt-10 max-w-xl text-center text-sm leading-7 text-slate-400">
            The core team is onboarded through the club's multi-round recruitment drive, which drew 500+
            applicants in its last cycle.
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className="section-wrap pt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Recruitment" title="How You Get In">
            The drive runs in multiple rounds once a cycle. Its last cycle drew 500+ applicants at KIC.
          </SectionHeader>
          <motion.ol variants={stagger} className="mx-auto grid max-w-3xl list-none gap-4 p-0 m-0 sm:grid-cols-3">
            {rounds.map((round, index) => (
              <motion.li
                key={round}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-300/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sky-300/35 bg-sky-300/5 text-sm font-black text-sky-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-bold leading-6 text-slate-200">{round}</p>
              </motion.li>
            ))}
          </motion.ol>
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
          <h2 className="relative z-10 text-3xl font-black text-white sm:text-4xl">Want to be part of this?</h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
            Recruitment runs in multiple rounds — screening, technical evaluation, and interviews.
          </p>
          <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/join" className="primary-button min-w-48">
              Apply Now <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact" className="ghost-button min-w-48">
              <FiMail aria-hidden="true" /> Ask a Question
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Team;
