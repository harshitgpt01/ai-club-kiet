import { Link } from "react-router-dom";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import KietLogo from "./KietLogo";
import logoMark from "../assets/logo-mark.png";

const navigate = [
  ["Home", "/"],
  ["About", "/about"],
  ["Events", "/events"],
  ["Projects", "/projects"],
  ["Gallery", "/gallery"],
  ["Team", "/team"],
  ["Contact", "/contact"],
];

const programs = [
  ["Internal Mentorship Program", "/events"],
  ["Python & ML Classes", "/events"],
  ["SkillSprint Bootcamps", "/events"],
  ["ML Pipeline Session", "/events"],
  ["Student Projects", "/projects"],
];

const columnHead = "text-xs font-extrabold uppercase tracking-[0.16em] text-sky-300/85";
const columnLink =
  "block text-sm text-slate-400 no-underline transition-colors hover:text-sky-200";

function Footer() {
  return (
    <footer className="relative border-t border-sky-300/12 bg-[#030a1a] pb-6 pt-14 gutter">
      {/* Faint brand wash so the footer reads as part of the page, not a slab. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.16),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3 text-white no-underline">
              <img
                src={logoMark}
                alt=""
                className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]"
                aria-hidden="true"
              />
              <span className="text-lg font-black uppercase leading-5 tracking-[0.02em]">
                AI Club <span className="text-sky-300">KIET</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A student-driven technical community focused on Artificial Intelligence, Machine
              Learning, Data Science, and emerging technologies at KIET Deemed to be University,
              Ghaziabad.
            </p>
            <KietLogo label="A student club at" className="mt-7" />
          </div>

          <nav aria-label="Site">
            <h2 className={columnHead}>Navigate</h2>
            <div className="mt-5 space-y-2.5">
              {navigate.map(([label, to]) => (
                <Link key={label} to={to} className={columnLink}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Programs">
            <h2 className={columnHead}>Programs</h2>
            <div className="mt-5 space-y-2.5">
              {programs.map(([label, to]) => (
                <Link key={label} to={to} className={columnLink}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className={columnHead}>Contact</h2>
            <ul className="mt-5 space-y-3.5 list-none p-0">
              <li className="flex gap-3 text-sm leading-6 text-slate-400">
                <FiMapPin className="mt-0.5 shrink-0 text-sky-300" aria-hidden="true" />
                <span>
                  KIET Deemed to be University
                  <br />
                  13 Km Stone, Delhi-Meerut Expressway
                  <br />
                  Ghaziabad, Uttar Pradesh — 201206
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FiMail className="shrink-0 text-sky-300" aria-hidden="true" />
                <a
                  href="mailto:aischool.ic@kiet.edu"
                  className="no-underline transition-colors hover:text-sky-200"
                >
                  aischool.ic@kiet.edu
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FiPhone className="shrink-0 text-sky-300" aria-hidden="true" />
                <a href="tel:+918581060205" className="no-underline transition-colors hover:text-sky-200">
                  8581060205
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/8 pt-6">
          <p className="text-xs text-slate-500">© 2026 AI Club KIET. All Rights Reserved.</p>
          <p className="text-xs text-slate-500">Built with ❤️ by the Web team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
