import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logoMark from "../assets/logo-mark.png";

// Every entry points at a real route, so all eight pages are reachable from the
// nav and the nav agrees with the footer. Home keeps its section ids, so older
// /#about style deep links still scroll correctly.
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Covers browser back/forward; the per-link handler covers tapping the route
  // you are already on, which leaves the pathname unchanged.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`gutter h-[var(--nav-h)] border-b transition-all duration-300 ${
          scrolled
            ? "border-sky-300/12 bg-[#050e24]/85 shadow-[0_12px_45px_rgba(1,5,18,0.42)] backdrop-blur-2xl"
            : "border-sky-300/5 bg-[#050e24]/45 backdrop-blur-lg"
        }`}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link to="/" className="flex min-w-0 items-center gap-3 text-white no-underline">
            <img
              src={logoMark}
              alt="AI Club KIET logo"
              className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
            />
            <span className="min-w-0 truncate text-xl font-black uppercase leading-5 tracking-[0.02em]">
              AI CLUB <span className="text-sky-300">KIET</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-1 py-2 text-[0.95rem] font-medium no-underline transition-colors ${
                  pathname === link.to ? "text-sky-300" : "text-white/85 hover:text-sky-200"
                }`}
              >
                {link.label}
                {pathname === link.to && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-sky-300 to-blue-600 shadow-[0_0_14px_rgba(56,189,248,0.8)]"
                  />
                )}
              </Link>
            ))}
          </div>

          <Link
            to="/join"
            className="hidden shrink-0 rounded-full border border-sky-300/70 px-6 py-2.5 font-semibold text-white no-underline shadow-[0_0_24px_rgba(37,99,235,0.45)] transition hover:border-sky-200 hover:bg-white/5 lg:inline-flex"
          >
            Join Us
          </Link>

          <button
            type="button"
            className="icon-button lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-panel mx-4 mt-3 rounded-xl p-3 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg border px-3 py-3 text-sm font-bold no-underline ${
                    pathname === link.to
                      ? "border-sky-300/40 bg-sky-300/10 text-sky-100"
                      : "border-white/10 bg-white/[0.03] text-slate-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link to="/join" onClick={() => setMenuOpen(false)} className="primary-button mt-3 w-full">
              Join Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
