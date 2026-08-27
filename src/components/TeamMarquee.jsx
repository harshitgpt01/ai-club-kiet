// One continuously scrolling row of the roster cutouts, used on Home where the
// full card grid would swallow the page. The track carries the roster twice
// and slides by exactly half its width, so copy 2 lands where copy 1 started and
// the seam never shows (see .team-marquee in index.css for why the spacing is a
// card margin rather than a flex gap).
//
// The cards reuse .team-stage/.team-figure from TeamCard so the backdrop, rim
// light and hover lift match the Team page. No links inside — they would be
// moving targets, and the second copy is aria-hidden, which must not contain
// anything focusable. The section links to /team for the full cards instead.
function TeamMarquee({ members }) {
  const copy = (duplicate) => (
    <div className="team-marquee-copy" aria-hidden={duplicate || undefined}>
      {members.map((member) => (
        <article
          key={member.name}
          className="team-marquee-card team-photo-card glass-panel overflow-hidden rounded-xl"
        >
          <div className="team-stage">
            <img
              src={member.photo}
              /* The duplicate is decorative: alt="" keeps it out of the
                 accessibility tree along with its aria-hidden parent. */
              alt={duplicate ? "" : `${member.name}, ${member.role}`}
              width={640}
              height={854}
              loading="lazy"
              decoding="async"
              className="team-figure"
            />
          </div>

          <div className="team-marquee-plate border-t border-white/10 px-4 py-3">
            <h3 className="text-sm font-black leading-5 text-white">{member.name}</h3>
            <p className="mt-1 text-xs font-bold leading-4 text-sky-200">{member.role}</p>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="team-marquee">
      <div className="team-marquee-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

export default TeamMarquee;
