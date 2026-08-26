import { motion } from "framer-motion";
import Counter from "./Counter";
import { fadeUp, stagger } from "../lib/motion";

// Tailwind needs literal class names to generate them, so the column count is
// looked up rather than interpolated.
const COLS = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

// The band that straddles the seam between a page hero and the first content
// section. It owns its own negative margin so every page overlaps the hero by
// the same amount — Home used -mt-12 while About and Projects used -mt-8.
//
// `value` counts up when it is a number and renders as-is when it is a string.
function StatsBand({ items }) {
  return (
    <section className="relative z-20 -mt-10 gutter">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
        className={`container-page grid rounded-xl border border-sky-300/30 bg-[#081436]/80 shadow-[0_0_46px_rgba(37,99,235,0.26)] backdrop-blur-xl ${
          COLS[items.length] || COLS[4]
        }`}
      >
        {items.map(({ icon: Icon, value, suffix, label }, index) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className={`flex items-center gap-5 px-8 py-7 ${
              index ? "border-t border-sky-300/15 md:border-l md:border-t-0" : ""
            }`}
          >
            <Icon className="shrink-0 text-4xl text-sky-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.85)]" aria-hidden="true" />
            <div className="min-w-0">
              <div className="cyber-title text-3xl font-black text-white">
                {typeof value === "number" ? <Counter value={value} suffix={suffix} /> : value}
              </div>
              <p className="mt-1 text-sm text-white/72">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default StatsBand;
