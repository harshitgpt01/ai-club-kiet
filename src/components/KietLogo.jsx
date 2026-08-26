import kietLogo from "../assets/kiet-logo.webp";

// The university's dark-background lockup (kiet.edu ships this variant alongside
// the light one), so the white wordmark stays legible on the site's navy base.
// Sizing is width-driven: the lockup is ~2.37:1 and the "Deemed to be University"
// line stops being readable much under 170px, so keep imageClassName widths above
// that.
function KietLogo({ label, className = "", imageClassName = "w-[200px]" }) {
  return (
    <a
      href="https://www.kiet.edu"
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex flex-col items-start gap-2.5 no-underline ${className}`}
    >
      {label && (
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:text-slate-400">
          {label}
        </span>
      )}
      <img
        src={kietLogo}
        alt="KIET Deemed to be University"
        width={760}
        height={320}
        loading="lazy"
        decoding="async"
        className={`h-auto max-w-full opacity-90 transition-opacity group-hover:opacity-100 ${imageClassName}`}
      />
    </a>
  );
}

export default KietLogo;
