import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiExternalLink, FiHome, FiMapPin } from "react-icons/fi";

// Fallback banner for events with no photo in the source docs (Recruitment Drive,
// Docker Session, Python & ML Classes).
const typeVisuals = {
  Session: { emoji: "🎤", gradient: "linear-gradient(135deg,#0b1b4a,#14306e)" },
  Bootcamp: { emoji: "⚡", gradient: "linear-gradient(135deg,#071a3a,#0d3a6b)" },
  Program: { emoji: "🤝", gradient: "linear-gradient(135deg,#07203a,#0d4b6b)" },
  Recruitment: { emoji: "📝", gradient: "linear-gradient(135deg,#101a3f,#1e3a8a)" },
  Showcase: { emoji: "🏆", gradient: "linear-gradient(135deg,#0a1636,#2a2a6b)" },
  Classes: { emoji: "🐍", gradient: "linear-gradient(135deg,#08153a,#123a7a)" },
  Workshop: { emoji: "📊", gradient: "linear-gradient(135deg,#061530,#173a6b)" },
};

// Status is semantic, so these keep their own hues rather than folding into the
// blue brand ramp.
const statusMap = {
  upcoming: { className: "text-emerald-200 border-emerald-300/35 bg-emerald-400/12", label: "● Upcoming" },
  ongoing: { className: "text-sky-200 border-sky-300/35 bg-sky-400/12", label: "◆ Ongoing" },
  live: { className: "text-red-200 border-red-400/35 bg-red-500/12", label: "🔴 Live Now" },
  past: { className: "text-slate-300 border-slate-400/25 bg-slate-500/12", label: "○ Past" },
};

function EventCard({ event }) {
  const { title, date, venue, type, desc, tags, status, link, internalLink, linkLabel, organizer, cover } = event;
  const badge = statusMap[status] || statusMap.past;
  const visual = typeVisuals[type] || typeVisuals.Session;

  return (
    <article className="glass-panel glow-card flex flex-col overflow-hidden rounded-xl transition hover:-translate-y-1 hover:border-sky-300/40">
      {/* Banner */}
      <div className="relative h-42 shrink-0 overflow-hidden" style={{ background: visual.gradient }}>
        {cover ? (
          <img
            src={cover}
            alt={`${title} — AI Club KIET`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-6xl opacity-25"
            aria-hidden="true"
          >
            {visual.emoji}
          </div>
        )}
        {/* Fade into the card body so the banner doesn't cut off hard */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,10,26,0.15)] via-transparent to-[rgba(3,10,26,0.85)]" />
        <span
          className={`absolute right-3.5 top-3.5 rounded-full border px-2.5 py-1 text-xs font-bold backdrop-blur-sm ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-sky-300">{type}</span>
        <h3 className="text-lg font-black leading-snug text-white">{title}</h3>
        <p className="text-sm leading-7 text-slate-400">{desc}</p>

        <div className="mt-1 space-y-1.5 text-xs text-slate-500">
          <p className="flex items-center gap-2">
            <FiCalendar className="shrink-0 text-sky-300/70" aria-hidden="true" /> {date}
            {venue && (
              <>
                <FiMapPin className="ml-1 shrink-0 text-sky-300/70" aria-hidden="true" /> {venue}
              </>
            )}
          </p>
          <p className="flex items-center gap-2">
            <FiHome className="shrink-0 text-sky-300/70" aria-hidden="true" /> Organized by{" "}
            {organizer || "AI Club KIET"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sky-300/25 bg-sky-400/10 px-2.5 py-0.5 text-xs font-semibold text-sky-100"
            >
              {tag}
            </span>
          ))}
        </div>

        {internalLink && (
          <Link
            to={internalLink}
            className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-sky-300 no-underline transition-colors hover:text-sky-100"
          >
            {linkLabel || "View details"} <FiArrowRight aria-hidden="true" />
          </Link>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-sky-300 no-underline transition-colors hover:text-sky-100"
          >
            {linkLabel || "View post"} <FiExternalLink aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default EventCard;
