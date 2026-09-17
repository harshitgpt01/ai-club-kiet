import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiSearch, FiUsers, FiX } from "react-icons/fi";
import {
  RESULTS_SUBTITLE,
  RESULTS_TITLE,
  selectedCount,
  selectedMembers,
} from "../data/results";
import { WHATSAPP_GROUP_URL } from "../lib/recruitment";

// Moves focus into the dialog, traps Tab inside it, locks the page behind it,
// and hands focus back to whatever opened it on the way out.
function useDialogBehaviour(onClose) {
  const panelRef = useRef(null);

  useEffect(() => {
    // Captured once: the cleanup below needs the same node the effect set up,
    // and reading panelRef.current at teardown could see a different one.
    const panel = panelRef.current;
    const opener = document.activeElement;

    // Focus the panel itself rather than the close button: landing on "close"
    // reads to a screen reader as if dismissing were the point of the dialog,
    // and an Enter keypress meant for the page would throw the list away.
    panel?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Tab has to cycle inside the panel. Without this it walks straight out
      // into the page behind the backdrop, where nothing is visibly focused
      // and the dialog looks frozen.
      const focusable = panel?.querySelectorAll(
        'a[href], button:not(:disabled), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      // Only pull focus back if it is still inside the dialog. If the user
      // clicked a link on the page as the dialog left, that click already
      // decided where focus belongs.
      if (panel?.contains(document.activeElement)) {
        opener?.focus?.();
      }
    };
  }, [onClose]);

  return panelRef;
}

// The results announcement. Opens by itself on the first page load of a browser
// session (see App), and can be reopened from the nav afterwards.
function ResultsModal({ onClose }) {
  const [query, setQuery] = useState("");
  const panelRef = useDialogBehaviour(onClose);

  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!needle) return selectedMembers;
    return selectedMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(needle) ||
        member.branch.toLowerCase().includes(needle),
    );
  }, [needle]);

  return (
    <motion.div
      className="results-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      // mousedown, not click: a click that starts inside the panel and drifts
      // onto the backdrop (selecting a name) would otherwise close the dialog.
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
        className="glass-panel results-panel"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className="results-close" onClick={onClose} aria-label="Close results">
          <FiX />
        </button>

        <header className="results-head">
          <span className="eyebrow">
            <FiCheckCircle aria-hidden="true" />
            Results Out
          </span>
          <h2 id="results-title" className="cyber-title results-title">
            <span className="neon-text">{RESULTS_TITLE}</span>
          </h2>
          <p className="results-subtitle">{RESULTS_SUBTITLE}</p>
          <p className="results-count">
            <FiUsers aria-hidden="true" />
            {selectedCount} students selected — congratulations!
          </p>
        </header>

        <div className="results-search">
          <FiSearch className="results-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="field results-search-field"
            placeholder="Find your name…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search the selected students by name or branch"
          />
        </div>

        {/* The count is the live region, not the list: announcing 29 rows on
            every keystroke would bury the one fact that changed. */}
        <p className="sr-only" aria-live="polite">
          {matches.length} of {selectedCount} students shown
        </p>

        <div className="results-scroll">
          {matches.length > 0 ? (
            <ol className="results-list">
              {matches.map((member) => (
                <li key={member.name} className="results-row">
                  <span className="results-person">
                    <span className="results-name">{member.name}</span>
                    <span className="results-branch">{member.branch}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="results-empty">
              No match for “{query.trim()}”. Check the spelling, or search your branch instead.
            </p>
          )}
        </div>

        <footer className="results-foot">
          <p className="results-note">
            Selected students: join the WhatsApp group for onboarding and the first task.
          </p>
          <div className="results-actions">
            <a
              className="primary-button"
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              Join WhatsApp Group
            </a>
            <button type="button" className="ghost-button" onClick={onClose}>
              Close
            </button>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  );
}

export default ResultsModal;
