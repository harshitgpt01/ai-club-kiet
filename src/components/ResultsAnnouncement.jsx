import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiAward, FiX } from "react-icons/fi";

const sessionKey = "aiclub_results_2026_09_seen";

export default function ResultsAnnouncement() {
  const dialogRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
    } catch { /* The announcement still works when browser storage is blocked. */ }
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const restoreScroll = () => {
      if (!dialog.open) document.body.style.overflow = previousOverflow;
    };
    dialog.addEventListener("close", restoreScroll);
    return () => {
      dialog.removeEventListener("close", restoreScroll);
      dialog.close();
      restoreScroll();
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [pathname]);

  const dismiss = () => {
    try { sessionStorage.setItem(sessionKey, "true"); } catch { /* Optional storage. */ }
    dialogRef.current.close();
  };

  return (
    <dialog ref={dialogRef} className="results-announcement" aria-labelledby="results-announcement-title"
      aria-describedby="results-announcement-description" onCancel={(event) => { event.preventDefault(); dismiss(); }}>
      <button type="button" className="icon-button results-close" aria-label="Close results announcement" onClick={dismiss}><FiX /></button>
      <span className="results-announcement-icon"><FiAward aria-hidden="true" /></span>
      <p className="eyebrow">AI Club KIET</p>
      <h2 id="results-announcement-title">Results are Out.</h2>
      <p id="results-announcement-description">Explore the results across all learning and working domains.</p>
      <Link to="/results" className="primary-button" onClick={dismiss}>View Results <FiArrowRight aria-hidden="true" /></Link>
    </dialog>
  );
}
