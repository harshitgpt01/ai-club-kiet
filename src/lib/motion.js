// Shared framer-motion variants. Home, About and Projects each declared their
// own identical copies of these, which is how their reveal timings drifted
// apart; they all import from here now.

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Denser stagger for long lists (the 37-card project directory).
export const staggerTight = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
