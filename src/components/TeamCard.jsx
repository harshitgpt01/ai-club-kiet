import { FiGithub, FiLinkedin } from "react-icons/fi";

// Two layouts share this component. `photo` members (the roster shoot) get the
// staged full-body cutout with a left-aligned name plate; members without a photo
// fall back to the centred avatar/initial card.
function TeamCard({ member }) {
  const { name, role, dept, avatar, photo, github, linkedin } = member;

  const socials = (github || linkedin) && (
    <div className="flex shrink-0 gap-2">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="icon-button"
          aria-label={`${name} on GitHub`}
        >
          <FiGithub />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="icon-button"
          aria-label={`${name} on LinkedIn`}
        >
          <FiLinkedin />
        </a>
      )}
    </div>
  );

  if (photo) {
    return (
      <article className="team-photo-card glass-panel flex h-full flex-col overflow-hidden rounded-xl transition hover:border-sky-300/40">
        <div className="team-stage">
          <img
            src={photo}
            alt={`${name}, ${role}`}
            width={640}
            height={854}
            loading="lazy"
            decoding="async"
            className="team-figure"
          />
        </div>

        <div className="flex flex-1 items-start justify-between gap-3 border-t border-white/10 px-5 py-4">
          <div className="min-w-0">
            <h3 className="text-base font-black leading-6 text-white">{name}</h3>
            <p className="mt-1 text-sm font-bold leading-5 text-sky-200">{role}</p>
            {dept && <p className="mt-1 text-xs text-slate-400">{dept}</p>}
          </div>
          {socials}
        </div>
      </article>
    );
  }

  return (
    <article className="glass-panel glow-card flex h-full flex-col items-center gap-3 rounded-xl p-7 text-center transition hover:border-sky-300/40">
      <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full border border-sky-300/30 bg-gradient-to-br from-sky-400/25 to-blue-700/30 text-3xl shadow-[0_0_22px_rgba(56,189,248,0.3)] select-none">
        {avatar || <span className="text-2xl font-black text-sky-100">{name[0]}</span>}
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-black text-white">{name}</h3>
        <p className="mt-1 text-sm font-bold text-sky-200">{role}</p>
        {dept && <p className="mt-1 text-xs text-slate-400">{dept}</p>}
      </div>

      {socials && <div className="relative z-10 mt-1">{socials}</div>}
    </article>
  );
}

export default TeamCard;
