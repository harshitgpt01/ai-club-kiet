import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import StatsBand from "../components/StatsBand";
import { fadeUp, staggerTight } from "../lib/motion";
import {
  DOMAINS,
  domainCounts,
  flagshipProject,
  pipelineStages,
  studentProjects,
} from "../data/projects";

const filters = ["All", ...DOMAINS];

// Semantic per-domain colours: these encode which domain a project belongs to,
// so they stay distinct rather than folding into the blue brand ramp.
const domainAccent = {
  Finance: "text-emerald-200 border-emerald-300/30 bg-emerald-300/10",
  "E-commerce": "text-sky-200 border-sky-300/30 bg-sky-300/10",
  Healthcare: "text-rose-200 border-rose-300/30 bg-rose-300/10",
  Other: "text-violet-200 border-violet-300/30 bg-violet-300/10",
};

const projectStats = [
  { icon: FiGithub, value: `${studentProjects.length}`, label: "Projects Shipped" },
  { icon: FiUsers, value: `${studentProjects.length}`, label: "Student Builders" },
  { icon: FiAward, value: "3", label: "Judging Criteria" },
];

// "https://github.com/owner/repo" -> "owner/repo"
function repoSlug(url) {
  return url.replace(/^https:\/\/github\.com\//, "");
}

function Projects() {
  const [domain, setDomain] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return studentProjects.filter((project) => {
      if (domain !== "All" && project.domain !== domain) return false;
      if (!needle) return true;
      return [project.title, project.student, project.dataset, project.domain]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [domain, query]);

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_16%_34%,rgba(56,189,248,0.12),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerTight}
          className="container-page relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Projects
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="cyber-title mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
          >
            Built by <span className="neon-text">Our Students</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[620px] text-lg leading-8 text-white/85">
            Every project below is an end-to-end machine learning pipeline — picked from a curated list of
            real-world datasets, built in Google Colab, and pushed to GitHub by the student who wrote it.
          </motion.p>
        </motion.div>
      </section>

      <StatsBand items={projectStats} />

      {/* Flagship project */}
      <motion.section
        className="section-wrap pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={staggerTight}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Flagship" title="The Club Project">
            Project squads turn club learning into systems worth presenting on a national stage.
          </SectionHeader>
          <motion.article
            variants={fadeUp}
            className="glass-panel relative overflow-hidden rounded-xl p-6 sm:p-9"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-300 to-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">{flagshipProject.badge}</span>
            <h3 className="mt-4 text-3xl font-black text-white">{flagshipProject.title}</h3>
            <p className="mt-2 text-sm font-bold text-sky-200">{flagshipProject.team}</p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">{flagshipProject.desc}</p>
            <div className="mt-7">
              <a href={flagshipProject.link} target="_blank" rel="noreferrer" className="ghost-button">
                <FiLinkedin aria-hidden="true" /> Read the announcement
              </a>
            </div>
          </motion.article>
        </div>
      </motion.section>

      {/* How the projects were built */}
      <motion.section
        className="section-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerTight}
      >
        <div className="section-inner grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="The pipeline" align="left" title={<>Five Stages,<br />Start to Finish</>}>
              Day 1 walked through each stage of a machine learning pipeline in sequence, with NumPy, Pandas,
              Seaborn, and Scikit-learn demonstrated in practical context.
            </SectionHeader>
            <motion.div variants={fadeUp}>
              <Link to="/events" className="ghost-button">
                See the session <FiArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <motion.ol variants={staggerTight} className="relative m-0 list-none space-y-3 p-0">
            {pipelineStages.map((stage, index) => (
              <motion.li
                key={stage}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-300/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sky-300/35 bg-sky-300/5 text-sm font-black text-sky-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-semibold leading-7 text-slate-300">{stage}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Student project directory */}
      <motion.section
        className="section-wrap pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        variants={staggerTight}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Directory" title="Student Projects">
            {studentProjects.length} end-to-end pipelines across finance, e-commerce, healthcare, and more.
            Search by project, student, or dataset.
          </SectionHeader>

          <motion.div variants={fadeUp} className="mb-8 grid gap-4">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-sky-300" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, students, or datasets…"
                aria-label="Search student projects"
                className="field pl-12"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {filters.map((item) => {
                const active = domain === item;
                const count = item === "All" ? studentProjects.length : domainCounts[item];
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDomain(item)}
                    aria-pressed={active}
                    className="filter-pill"
                  >
                    {item} <span className="filter-pill-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={staggerTight} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <motion.article
                key={project.student}
                variants={fadeUp}
                className="glass-panel glow-card flex flex-col rounded-xl p-6"
              >
                <span
                  className={`relative z-10 w-fit rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                    domainAccent[project.domain] || domainAccent.Other
                  }`}
                >
                  {project.domain}
                </span>
                <h3 className="relative z-10 mt-5 text-lg font-black leading-snug text-white">{project.title}</h3>
                <p className="relative z-10 mt-2 text-sm text-slate-400">{project.dataset}</p>
                <p className="relative z-10 mt-4 flex items-center gap-2 text-sm font-bold text-sky-200">
                  <FiUsers className="shrink-0" aria-hidden="true" /> {project.student}
                </p>
                {project.repoAvailable === false ? (
                  <p className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <FiGithub className="shrink-0" aria-hidden="true" /> Repository unavailable
                  </p>
                ) : (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 mt-6 inline-flex items-center gap-2 break-all text-sm font-bold text-sky-300 no-underline transition hover:text-sky-100"
                  >
                    <FiGithub className="shrink-0" aria-hidden="true" /> {repoSlug(project.repo)}
                  </a>
                )}
              </motion.article>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.p variants={fadeUp} className="py-16 text-center text-base text-slate-400">
              No projects match that search. Try a different dataset or domain.
            </motion.p>
          )}
        </div>
      </motion.section>

      {/* Submission process */}
      <motion.section
        className="section-wrap pb-24 pt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerTight}
      >
        <motion.div
          variants={fadeUp}
          className="section-inner relative overflow-hidden rounded-xl border border-sky-300/25 bg-gradient-to-br from-sky-500/12 via-transparent to-blue-700/25 p-8 sm:p-12"
        >
          <div className="grid-overlay" aria-hidden="true" />
          <div className="relative z-10">
            <span className="eyebrow">Submission process</span>
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">Documented, Versioned, Public</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Every participant completed their project on Google Colab and uploaded the notebook to GitHub.
              Top performers were then recognised at the Project Presentation &amp; Felicitation Ceremony.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Quality of implementation", "Understanding of concepts", "Clarity of presentation"].map((criterion) => (
                <div
                  key={criterion}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-sky-300" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-slate-300">{criterion}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link to="/join" className="primary-button min-w-48">
                Build with us <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/events" className="ghost-button min-w-48">
                <FiAward aria-hidden="true" /> All events
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Projects;
