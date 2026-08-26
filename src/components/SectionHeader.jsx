import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

// The section heading used by every content section on the site.
// `align="left"` drops the centering for two-column sections.
function SectionHeader({ eyebrow, title, children, align = "center" }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`mb-11 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-8 text-slate-400">{children}</p>}
    </motion.div>
  );
}

export default SectionHeader;
