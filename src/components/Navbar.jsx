import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiMenu, FiX } from "react-icons/fi";

const links = [
  { to: "/#hero", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/#events", label: "Events" },
  { to: "/#projects", label: "Projects" },
  { to: "/#resources", label: "Resources" },
  { to: "/#team", label: "Team" },
  { to: "/#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => {
    const [, hash] = to.split("#");
    if (location.pathname !== "/") return false;
    if (hash === "hero") return !location.hash || location.hash === "#hero";
    return location.hash === `#${hash}`;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`h-20 border-b px-5 transition-all duration-300 ${
          scrolled
            ? "border-cyan-300/10 bg-[#020817]/82 shadow-[0_12px_45px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
            : "border-cyan-300/5 bg-[#020817]/42 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between gap-6">
          <Link to="/#hero" className="flex min-w-0 items-center gap-3 text-white no-underline">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/5 text-2xl text-cyan-300 shadow-[0_0_26px_rgba(6,182,212,0.34)]">
              <FiCpu aria-hidden="true" />
              <span className="absolute -right-1 top-1 h-4 w-4 rounded-full border border-violet-300/60 bg-violet-400/20" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xl font-black uppercase leading-5 tracking-[0.02em]">
                AI CLUB <span className="text-cyan-300">KIET</span>
              </span>
              <span className="block truncate text-xs font-medium tracking-[0.02em] text-white/78">
                Innovate. Learn. Create.
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`relative px-1 py-2 text-[0.98rem] font-medium no-underline transition-colors ${
                  isActive(link.to) ? "text-cyan-300" : "text-white/86 hover:text-cyan-200"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-cyan-300 to-violet-500 shadow-[0_0_14px_rgba(6,182,212,0.8)]"
                  />
                )}
              </Link>
            ))}
          </div>

          <Link to="/join" className="hidden rounded-full border border-cyan-300/70 px-7 py-3 font-semibold text-white no-underline shadow-[0_0_24px_rgba(124,58,237,0.45)] transition hover:border-violet-300 hover:bg-white/5 lg:inline-flex">
            Join Us
          </Link>

          <button
            type="button"
            className="icon-button lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            className="mx-4 mt-3 rounded-lg border border-cyan-300/15 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-md border px-3 py-3 text-sm font-bold no-underline ${
                    isActive(link.to)
                      ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
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
