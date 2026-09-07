import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiUsers } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import EventCard from "../components/EventCard";
import { fadeUp, stagger } from "../lib/motion";
import { eventCovers } from "../data/gallery";
import { REGISTRATIONS_OPEN } from "../lib/recruitment";

const allEvents = [
  { id: 1, title: "Internal Mentorship Program", date: "Ongoing", venue: "KIET Campus", type: "Program", status: "ongoing", cover: eventCovers.mentorship, desc: "An ongoing mentorship initiative for first-year students, where senior members provide guidance, structured learning paths, and continuous support to build strong foundations in AI/ML.", tags: ["50+ Students", "1st Year Guidance", "Mentorship"] },
  { id: 2, title: "Python & ML Classes", date: "Ongoing", venue: "KIET Campus", type: "Classes", status: "ongoing", desc: "Regular classes conducted to strengthen programming and machine learning skills. The sessions included hands-on coding, concept building, and practical implementation.", tags: ["30+ Students", "Python", "Machine Learning"] },
  { id: 3, title: "End-to-End Machine Learning Pipeline Session", date: "2-Day Session", venue: "TBI, KIET Campus", type: "Workshop", status: "past", cover: eventCovers.mlPipeline, desc: "A 2-day session on end-to-end machine learning pipelines. Day 1 covered AI and ML fundamentals, problem formalization, and every pipeline stage with NumPy, Pandas, Seaborn, and Scikit-learn. Day 2 was a hands-on build, closing with a Project Presentation & Felicitation Ceremony.", tags: ["37 Projects", "Google Colab", "Scikit-learn"], internalLink: "/projects", linkLabel: "Browse the 37 projects" },
  { id: 4, title: "Docker Session", date: "Feb, 2026", venue: "AI Lab", type: "Session", status: "past", desc: "A session focused on promoting structured documentation and knowledge-sharing practices within the club. Members were guided on maintaining technical records and organizing project workflows effectively.", tags: ["50+ Students", "Documentation", "Workflows"] },
  { id: 5, title: "Innotech Presentation", date: "Nov, 2025", venue: "KIET Ground", type: "Showcase", status: "past", cover: eventCovers.innotech, desc: "The club presented its project ProPredict, a protein function prediction system based on machine learning, at Innotech. The project secured a finalist position and showcased strong innovation and technical depth.", tags: ["1000+ Attendees", "ProPredict", "Finalist"], link: "https://www.linkedin.com/posts/antas01_propredict-with-team-bexarc-proud-to-activity-7402772961960845312-EDH5", linkLabel: "View on LinkedIn", organizer: "KIET" },
  { id: 6, title: "SkillSprint 3.0", date: "Nov, 2025", venue: "H-Block Lab", type: "Bootcamp", status: "past", cover: eventCovers.skillsprint, desc: "A 3-day intensive bootcamp focused on Generative AI and Retrieval-Augmented Generation (RAG) systems. Participants gained hands-on experience in building AI applications and understanding modern AI workflows.", tags: ["100+ Students", "Generative AI", "RAG"], link: "https://www.instagram.com/p/DQiedfgkomT/", linkLabel: "View on Instagram" },
  { id: 7, title: "Recruitment Drive", date: "Oct, 2025", venue: "KIC", type: "Recruitment", status: "past", desc: "A structured recruitment process conducted in multiple rounds, including screening, technical evaluation, and interviews. The drive successfully onboarded passionate and skilled students into the club.", tags: ["500+ Applicants", "Multi-round", "Interviews"] },
  { id: 8, title: "Introduction to AI", date: "Oct, 2025", venue: "D-Block", type: "Session", status: "past", cover: eventCovers.introAi, desc: "An introductory session aimed at building foundational understanding of Artificial Intelligence. The event covered basic concepts, real-world applications, and career opportunities in AI, encouraging students to explore the domain.", tags: ["200+ Students", "Foundations", "Careers"], link: "https://www.instagram.com/p/DO2sIagElzd/", linkLabel: "View on Instagram" },
];

const filters = ["All", "Ongoing", "Past", "Session", "Workshop", "Bootcamp", "Program", "Classes", "Recruitment", "Showcase"];

function matches(event, filter) {
  if (filter === "All") return true;
  if (filter === "Ongoing") return event.status === "ongoing";
  if (filter === "Past") return event.status === "past";
  return event.type === filter;
}

function Events() {
  const [active, setActive] = useState("All");
  const filtered = allEvents.filter((event) => matches(event, active));

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_16%_38%,rgba(56,189,248,0.1),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container-page relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Activities
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="cyber-title mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
          >
            Events &amp; <span className="neon-text">Programs</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[600px] text-lg leading-8 text-white/85">
            Sessions, bootcamps, recruitment drives, mentorship, and showcases run by AI Club KIET.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="section-wrap pb-24 pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        variants={stagger}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="The archive" title="Everything We Have Run">
            {allEvents.length} events across the year — filter by status or by the kind of session.
          </SectionHeader>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
                className="filter-pill"
              >
                {filter}{" "}
                <span className="filter-pill-count">
                  {allEvents.filter((event) => matches(event, filter)).length}
                </span>
              </button>
            ))}
          </motion.div>

          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((event) => (
              <motion.div key={event.id} variants={fadeUp} className="flex">
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.p variants={fadeUp} className="py-16 text-center text-base text-slate-400">
              No events found for this filter.
            </motion.p>
          )}
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
          <h2 className="relative z-10 text-3xl font-black text-white sm:text-4xl">Want in on the next one?</h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
            {REGISTRATIONS_OPEN
              ? "Members hear about sessions first. Applications stay open through the semester."
              : "Membership applications are closed for this cycle, but sessions and showcases stay open to everyone."}
          </p>
          <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/join" className="primary-button min-w-48">
              {REGISTRATIONS_OPEN ? "Join the Club" : "See recruitment status"}{" "}
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/gallery" className="ghost-button min-w-48">
              <FiUsers aria-hidden="true" /> See the Photos
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Events;
