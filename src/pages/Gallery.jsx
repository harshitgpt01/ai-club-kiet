import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiX } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { fadeUp, staggerTight } from "../lib/motion";
import { REGISTRATIONS_OPEN } from "../lib/recruitment";
import { photos } from "../data/gallery";

// Categorical, not decorative: each tag keeps its own hue so the archive stays
// scannable by event type. Tuned to read against the navy ground.
const tagColors = {
  Session: "#38bdf8",
  Bootcamp: "#22d3ee",
  Program: "#34d399",
  Recruitment: "#fbbf24",
  Showcase: "#f472b6",
  Classes: "#a78bfa",
  Workshop: "#60a5fa",
  Felicitation: "#fb7185",
};

// The grid uses an 8px row unit with a 16px gap, so a card of N rows is
// N * 8 + (N - 1) * 16 px tall. These spans reproduce the previous 200 / 280 /
// 340px heights. CSS `columns` used to do this, but multi-column fills
// top-to-bottom per column, which scrambled the chronological reading order and
// left the column feet ragged.
const rowSpan = { normal: 9, wide: 12, tall: 15 };

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const tags = ["All", ...Array.from(new Set(photos.map((photo) => photo.tag)))];

  const filtered = filter === "All" ? photos : photos.filter((photo) => photo.tag === filter);
  const close = useCallback(() => setLightbox(null), []);

  // Escape closes the lightbox, and the page behind it stops scrolling while it
  // is open.
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close]);

  return (
    <motion.div
      className="site-shell relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar />

      <section className="cyber-hero page-hero relative overflow-hidden pb-16 gutter">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(37,99,235,0.22),transparent_30rem),radial-gradient(circle_at_18%_40%,rgba(56,189,248,0.1),transparent_24rem)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerTight}
          className="container-page relative z-10 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Memories
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="cyber-title mx-auto mt-6 max-w-3xl text-4xl font-black uppercase leading-[1.16] text-white sm:text-5xl xl:text-[3.6rem]"
          >
            Our <span className="neon-text">Gallery</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-[560px] text-lg leading-8 text-white/85">
            Sessions, bootcamps, drives, and showcases — and the moments in between. This is us.
          </motion.p>
        </motion.div>
      </section>

      <motion.section
        className="section-wrap pb-24 pt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.04 }}
        variants={staggerTight}
      >
        <div className="section-inner">
          <SectionHeader eyebrow="Archive" title="Club Moments">
            {photos.length} shots from the year. Pick a tag to narrow it down, or open any card full size.
          </SectionHeader>

          <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                aria-pressed={filter === tag}
                className="filter-pill"
              >
                {tag}{" "}
                <span className="filter-pill-count">
                  {tag === "All" ? photos.length : photos.filter((photo) => photo.tag === tag).length}
                </span>
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={staggerTight}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gridAutoRows: "8px" }}
          >
            {filtered.map((photo) => {
              const accent = tagColors[photo.tag] || tagColors.Session;
              return (
                <motion.button
                  key={photo.id}
                  type="button"
                  variants={fadeUp}
                  onClick={() => setLightbox(photo)}
                  aria-label={`Open ${photo.title}`}
                  className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#081436] p-5 text-left transition duration-300 hover:-translate-y-1"
                  style={{ gridRow: `span ${rowSpan[photo.span] || rowSpan.normal}` }}
                >
                  {photo.src ? (
                    <>
                      <img
                        src={photo.src}
                        alt={photo.alt || photo.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                      />
                      {/* Scrim so the tag pill and title stay readable over the photo */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,10,26,0.55)] via-[rgba(3,10,26,0.1)] to-[rgba(3,10,26,0.9)]" />
                    </>
                  ) : (
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-6xl opacity-15"
                      aria-hidden="true"
                    >
                      {photo.emoji}
                    </div>
                  )}

                  <span
                    className="relative w-fit rounded-full border px-2.5 py-1 text-xs font-bold backdrop-blur-sm"
                    style={{
                      color: accent,
                      borderColor: `${accent}66`,
                      background: photo.src ? "rgba(3,10,26,0.55)" : `${accent}1f`,
                    }}
                  >
                    {photo.tag}
                  </span>

                  <p className="relative mt-3 text-sm font-bold leading-snug text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">
                    {photo.title}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={close}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 p-6 backdrop-blur-lg"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={`glass-panel relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl ${
              lightbox.src ? "max-w-[860px]" : "max-w-lg p-10"
            }`}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#030a1a]/70 text-slate-200 backdrop-blur-sm transition hover:text-white"
            >
              <FiX />
            </button>

            {lightbox.src ? (
              <img
                src={lightbox.src}
                alt={lightbox.alt || lightbox.title}
                className="block max-h-[68vh] w-full bg-[#030a1a] object-contain"
              />
            ) : (
              <div className="text-center text-7xl" aria-hidden="true">
                {lightbox.emoji}
              </div>
            )}

            <div className={lightbox.src ? "p-6 text-center" : "mt-6 text-center"}>
              <span
                className="text-xs font-black uppercase tracking-[0.16em]"
                style={{ color: tagColors[lightbox.tag] || tagColors.Session }}
              >
                {lightbox.tag}
              </span>
              <h2 className="mt-2 text-xl font-black text-white">{lightbox.title}</h2>
              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-400">
                <FiCalendar aria-hidden="true" /> AI Club KIET — Event Archive
              </p>
            </div>
          </div>
        </div>
      )}

      <motion.section
        className="section-wrap pb-24 pt-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerTight}
      >
        <motion.div
          variants={fadeUp}
          className="section-inner relative overflow-hidden rounded-xl border border-sky-300/25 bg-gradient-to-br from-sky-500/12 via-transparent to-blue-700/25 p-8 text-center sm:p-12"
        >
          <div className="grid-overlay" aria-hidden="true" />
          <h2 className="relative z-10 text-3xl font-black text-white sm:text-4xl">Be in the next batch of photos</h2>
          <p className="relative z-10 mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
            {REGISTRATIONS_OPEN
              ? "Every shot here started with someone applying. Applications stay open through the semester."
              : "Every shot here started with someone applying. This cycle's applications are closed — the next drive is announced on the Join Us page."}
          </p>
          <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/join" className="primary-button min-w-48">
              {REGISTRATIONS_OPEN ? "Join the Club" : "See recruitment status"}{" "}
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/events" className="ghost-button min-w-48">
              <FiCalendar aria-hidden="true" /> Browse Events
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Gallery;
