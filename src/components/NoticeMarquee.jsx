import { FiAlertCircle } from "react-icons/fi";
import { REGISTRATION_NOTICE } from "../lib/recruitment";

// The deadline banner, shown on Home and Join Us. The sentence itself lives in
// lib/recruitment so the strip, the form, and the CTAs can never disagree about
// whether the drive is open. Re-exported here because that is where the two
// pages already import it from.
export { REGISTRATION_NOTICE };

// A continuously scrolling notice strip. Same two-copy trick as TeamMarquee: the
// track carries the items twice and slides by exactly half its width, so copy 2
// lands where copy 1 started and the seam never shows. Spacing lives on each
// item as a margin, not as a flex gap on the track — a gap would also sit
// between the copies and every loop would jump by that difference.
//
// The strip itself is aria-hidden: repeated, moving text is noise to a screen
// reader. The sr-only paragraph exposes the sentence once, in reading order —
// it is present on load rather than announced, so no live region is needed.
function NoticeMarquee({ text = REGISTRATION_NOTICE, repeat = 4 }) {
  const copy = (duplicate) => (
    <div className="notice-marquee-copy" key={duplicate ? "b" : "a"}>
      {Array.from({ length: repeat }, (_, index) => (
        <span key={index} className="notice-marquee-item">
          <FiAlertCircle className="notice-marquee-icon" aria-hidden="true" />
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className="notice-marquee-bar">
      <p className="sr-only">{text}</p>
      <div className="notice-marquee" aria-hidden="true">
        <div className="notice-marquee-track">
          {copy(false)}
          {copy(true)}
        </div>
      </div>
    </div>
  );
}

export default NoticeMarquee;
