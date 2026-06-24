import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiChevronDown,
  FiCode,
  FiCpu,
  FiGithub,
  FiGlobe,
  FiImage,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { value: 500, suffix: "+", label: "Active Members", icon: FiUsers },
  { value: 25, suffix: "+", label: "Events Organized", icon: FiCalendar },
  { value: 30, suffix: "+", label: "Projects Completed", icon: FiCode },
  { value: 15, suffix: "+", label: "Achievements", icon: FiAward },
];

const domains = [
  ["Machine Learning", "Predictive models, Kaggle sprints, feature engineering, and ML deployment.", FiCpu],
  ["Deep Learning", "Neural nets, transformers, generative models, and GPU-powered experiments.", FiTarget],
  ["Data Science", "Analytics, dashboards, statistics, SQL, and decisions from messy datasets.", FiGlobe],
  ["AI Research", "Paper reading groups, replication, prompt engineering, RAG, and model evaluation.", FiBookOpen],
];

const events = [
  ["Hackathon", "Neural Nexus 2026", "Mar 15-16, 2026"],
  ["Workshop", "Deep Learning Bootcamp", "Apr 08, 2026"],
  ["Talk", "AI Careers Night", "May 03, 2026"],
];

const projects = [
  ["CampusGPT", "A RAG assistant for club notes, events, FAQs, and college resources."],
  ["Vision Guard", "Computer vision prototypes for safety, smart labs, and real-time demos."],
  ["Placement Pulse", "Analytics that turn practice, projects, and interview logs into insight."],
];

const team = [
  ["Aryan Sharma", "President"],
  ["Priya Gupta", "Vice President"],
  ["Rohit Verma", "Technical Lead"],
  ["Sneha Patel", "Event Coordinator"],
];

const gallery = [
  ["Hackathon Arena", "Build Night"],
  ["Deep Learning Lab", "Workshop"],
  ["AI Talk Session", "Mentorship"],
  ["Demo Day", "Projects"],
  ["Kaggle Sprint", "Competition"],
  ["Club Summit", "Community"],
];

const brainNodes = [
  [118, 132], [156, 94], [210, 82], [268, 96], [318, 132], [354, 184], [342, 248],
  [294, 302], [226, 326], [160, 306], [110, 252], [88, 194], [178, 166], [238, 152],
  [296, 190], [278, 250], [214, 258], [154, 226], [404, 138], [462, 104], [528, 114],
  [582, 160], [606, 224], [588, 288], [532, 332], [462, 328], [398, 286], [380, 216],
  [456, 184], [524, 206], [514, 270], [446, 260],
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let frame;
    let nodes = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = Array.from({ length: Math.min(135, Math.floor((width * height) / 11000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.7 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance < 115) {
            ctx.strokeStyle = `rgba(58, 124, 255, ${(1 - distance / 115) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 187, 255, 0.72)";
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-45" aria-hidden="true" />;
}

function BrainHologram() {
  const connections = brainNodes.flatMap((node, i) =>
    brainNodes.slice(i + 1).map((other, j) => [i, i + j + 1, Math.hypot(node[0] - other[0], node[1] - other[1])])
  ).filter(([, , distance]) => distance < 88);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="brain-stage"
    >
      <div className="brain-label left-[6%] top-[15%]">Machine<br />Learning</div>
      <div className="brain-label right-[1%] top-[18%]">Deep<br />Learning</div>
      <div className="brain-label bottom-[25%] left-[7%]">Neural<br />Networks</div>
      <div className="brain-label bottom-[28%] right-[1%]">Data<br />Science</div>
      <FiCpu className="absolute left-[2%] top-[43%] text-4xl text-cyan-300 drop-shadow-[0_0_16px_rgba(6,182,212,0.8)]" />
      <FiGlobe className="absolute right-[7%] top-[43%] text-3xl text-violet-300 opacity-70" />
      <FiCalendar className="absolute right-[35%] top-[5%] text-3xl text-cyan-300 opacity-70" />

      <svg className="relative z-10 h-full w-full" viewBox="0 0 700 520" role="img" aria-label="Animated AI neural brain illustration">
        <defs>
          <linearGradient id="brainStroke" x1="0" x2="1">
            <stop stopColor="#00d5ff" />
            <stop offset="0.52" stopColor="#2f7bff" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <radialGradient id="chipGlow" cx="50%" cy="50%" r="60%">
            <stop stopColor="#38f8ff" stopOpacity="0.95" />
            <stop offset="0.65" stopColor="#7c3aed" stopOpacity="0.42" />
            <stop offset="1" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <filter id="brainGlow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M101 189C91 112 168 58 244 75c38-46 121-37 152 9 73-18 151 36 147 112 63 27 75 119 23 166 5 73-74 122-139 91-47 43-131 38-171-13-75 25-154-29-151-108-54-31-56-112-4-143Z"
          fill="rgba(3, 13, 41, 0.24)"
          stroke="url(#brainStroke)"
          strokeWidth="2"
          filter="url(#brainGlow)"
        />
        {connections.map(([from, to], index) => (
          <line
            key={`${from}-${to}`}
            x1={brainNodes[from][0]}
            y1={brainNodes[from][1]}
            x2={brainNodes[to][0]}
            y2={brainNodes[to][1]}
            stroke={index % 3 === 0 ? "#a855f7" : "#00d5ff"}
            strokeOpacity="0.48"
            strokeWidth="1.1"
          />
        ))}
        {brainNodes.map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index % 5 === 0 ? 4.4 : 3}
            fill={index > 17 ? "#a855f7" : "#00d5ff"}
            opacity="0.92"
            filter="url(#brainGlow)"
          />
        ))}
        <g transform="translate(318 177)">
          <rect width="86" height="86" rx="10" fill="rgba(20, 18, 96, 0.88)" stroke="url(#brainStroke)" strokeWidth="2" filter="url(#brainGlow)" />
          <rect x="-14" y="18" width="14" height="4" fill="#00d5ff" opacity="0.7" />
          <rect x="-14" y="38" width="14" height="4" fill="#00d5ff" opacity="0.7" />
          <rect x="-14" y="58" width="14" height="4" fill="#00d5ff" opacity="0.7" />
          <rect x="86" y="18" width="14" height="4" fill="#a855f7" opacity="0.7" />
          <rect x="86" y="38" width="14" height="4" fill="#a855f7" opacity="0.7" />
          <rect x="86" y="58" width="14" height="4" fill="#a855f7" opacity="0.7" />
          <text x="43" y="57" textAnchor="middle" className="fill-cyan-200 text-[44px] font-black">AI</text>
        </g>
        <path d="M362 264 C362 306 362 355 362 390" stroke="#00d5ff" strokeOpacity="0.42" strokeDasharray="5 8" />
        <ellipse cx="362" cy="405" rx="122" ry="27" fill="url(#chipGlow)" opacity="0.9" />
        <ellipse cx="362" cy="405" rx="150" ry="36" fill="none" stroke="#00d5ff" strokeOpacity="0.5" />
        <ellipse cx="362" cy="405" rx="98" ry="20" fill="none" stroke="#a855f7" strokeOpacity="0.55" />
        <ellipse cx="362" cy="405" rx="58" ry="11" fill="none" stroke="#38f8ff" strokeOpacity="0.8" />
      </svg>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, children, align = "center" }) {
  return (
    <motion.div variants={fadeUp} className={`mb-11 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-8 text-slate-400">{children}</p>}
    </motion.div>
  );
}

function Home() {
  return (
    <motion.div className="site-shell relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <Navbar />

      <section id="hero" className="cyber-hero relative min-h-[760px] overflow-hidden px-5 pb-10 pt-28 lg:min-h-screen">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(21,95,255,0.22),transparent_30rem),radial-gradient(circle_at_20%_32%,rgba(6,182,212,0.12),transparent_24rem)]" />
        <div className="mesh-floor" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-[1360px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="pt-6">
            <motion.span variants={fadeUp} className="eyebrow">
              &lt; Code · Learn · Innovate /&gt;
            </motion.span>
            <motion.h1 variants={fadeUp} className="cyber-title mt-6 max-w-2xl text-5xl font-black uppercase leading-[1.18] text-white sm:text-6xl xl:text-[4.35rem]">
              Explore the Future<br />
              With <span className="neon-text">AI &amp; ML</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[520px] text-lg leading-8 text-white/86">
              AI Club KIET is a community of innovators and learners exploring the endless possibilities
              of Artificial Intelligence and Machine Learning.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/#about" className="primary-button min-w-44">
                Explore More <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/join" className="ghost-button min-w-60">
                <FiUsers aria-hidden="true" /> Join Our Community
              </Link>
            </motion.div>
            <motion.a variants={fadeUp} href="#about" className="mt-9 inline-flex items-center gap-3 text-cyan-300 no-underline">
              <span className="grid h-8 w-5 place-items-center rounded-full border border-cyan-300/70">
                <FiChevronDown aria-hidden="true" />
              </span>
              Scroll Down
            </motion.a>
          </motion.div>

          <BrainHologram />
        </div>
      </section>

      <section className="relative z-20 -mt-12 px-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="mx-auto grid max-w-[1180px] rounded-lg border border-cyan-300/30 bg-[#04112d]/78 shadow-[0_0_46px_rgba(46,72,255,0.24)] backdrop-blur-xl md:grid-cols-4"
        >
          {stats.map(({ value, suffix, label, icon: Icon }, index) => (
            <motion.div key={label} variants={fadeUp} className={`flex items-center gap-5 px-8 py-7 ${index ? "border-t border-cyan-300/16 md:border-l md:border-t-0" : ""}`}>
              <Icon className="text-4xl text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.85)]" aria-hidden="true" />
              <div>
                <div className="cyber-title text-3xl font-black text-white">
                  <Counter value={value} suffix={suffix} />
                </div>
                <p className="mt-1 text-sm text-white/72">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section id="about" className="section-wrap pt-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <div className="section-inner grid items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
          <motion.div variants={fadeUp} className="neural-head min-h-[360px]" aria-label="Neural network human head illustration" />
          <div>
            <SectionHeader eyebrow="About Us" align="left" title={<>Building the Future<br />with Intelligence</>}>
              We aim to foster innovation, encourage research, and provide hands-on experience in the
              field of AI &amp; ML through workshops, hackathons, seminars, and collaborative projects.
            </SectionHeader>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="ghost-button">
                Know More About Us <FiArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section id="domains" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Domains" title="Areas We Explore">
            Four focused tracks help students move from fundamentals to real AI products.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {domains.map(([title, desc, Icon]) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel glow-card rounded-lg p-6">
                <Icon className="relative z-10 text-3xl text-cyan-300" aria-hidden="true" />
                <h3 className="relative z-10 mt-5 text-xl font-black text-white">{title}</h3>
                <p className="relative z-10 mt-3 text-sm leading-7 text-slate-400">{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="events" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Events" title="Recent and Upcoming">
            Workshops, talks, competitions, and build nights for every skill level.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-3">
            {events.map(([type, title, date]) => (
              <motion.article key={title} variants={fadeUp} className="glass-panel rounded-lg p-6">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">{type}</span>
                <h3 className="mt-5 text-2xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm text-slate-400">{date}</p>
                <Link to="/events" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 no-underline">
                  View Details <FiArrowRight aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="projects" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Projects" title="Ship Real AI Systems">
            Project squads build things that belong on GitHub, resumes, and demo day.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 lg:grid-cols-3">
            {projects.map(([title, desc], index) => (
              <motion.article key={title} variants={fadeUp} className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/60 p-6">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 to-violet-500" />
                <span className="text-5xl font-black text-white/5">0{index + 1}</span>
                <h3 className="mt-6 text-2xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{desc}</p>
                <div className="mt-7 flex gap-3">
                  <a href="#" className="icon-button" aria-label={`${title} GitHub`}><FiGithub /></a>
                  <a href="#" className="icon-button" aria-label={`${title} demo`}><FiGlobe /></a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="resources" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Resources" title="Learn Faster Together">
            Curated notebooks, roadmaps, datasets, and starter repositories for club members.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-3">
            {["Roadmaps", "Notebooks", "Datasets"].map((item) => (
              <motion.div key={item} variants={fadeUp} className="glass-panel rounded-lg p-6 text-center">
                <FiBookOpen className="mx-auto text-3xl text-cyan-300" />
                <h3 className="mt-4 text-xl font-black text-white">{item}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="team" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Team" title="Meet the Core Team">
            Student leaders running tracks, mentoring members, and organizing club experiences.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(([name, role]) => (
              <motion.article key={name} variants={fadeUp} className="glass-panel rounded-lg p-6 text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-2xl font-black text-cyan-100">
                  {name.split(" ").map((part) => part[0]).join("")}
                </div>
                <h3 className="mt-5 text-lg font-black text-white">{name}</h3>
                <p className="mt-1 text-sm font-bold text-cyan-200">{role}</p>
                <div className="mt-5 flex justify-center gap-3">
                  <a href="#" className="icon-button" aria-label={`${name} LinkedIn`}><FiLinkedin /></a>
                  <a href="#" className="icon-button" aria-label={`${name} GitHub`}><FiGithub /></a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="gallery" className="section-wrap" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner">
          <SectionHeader eyebrow="Gallery" title="Club Moments">
            A glimpse of workshops, hackathons, demos, and community sessions.
          </SectionHeader>
          <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(([title, label], index) => (
              <motion.article key={title} variants={fadeUp} className={`relative min-h-56 overflow-hidden rounded-lg border border-white/10 bg-slate-950/70 p-5 ${index === 0 || index === 5 ? "lg:col-span-2" : ""}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/16 via-transparent to-violet-600/24" />
                <FiImage className="absolute right-5 top-5 text-7xl text-cyan-300/20" />
                <span className="relative rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-cyan-100">{label}</span>
                <h3 className="relative mt-24 max-w-sm text-2xl font-black text-white">{title}</h3>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section id="contact" className="section-wrap pb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        <div className="section-inner grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Contact" align="left" title="Let's Build Together">
              Reach the club for memberships, event partnerships, speaker sessions, sponsorships, and
              student-led AI initiatives.
            </SectionHeader>
            <motion.div variants={stagger} className="grid gap-4">
              {[[FiMapPin, "KIET Group of Institutions, Ghaziabad"], [FiMail, "aiclub@kiet.edu"], [FiGlobe, "Weekly labs, hackathons, and demo days"]].map(([Icon, text]) => (
                <motion.div key={text} variants={fadeUp} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <Icon className="text-xl text-cyan-300" />
                  <span className="text-sm font-semibold text-slate-300">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.form variants={fadeUp} className="glass-panel rounded-lg p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-md border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" placeholder="Full name" />
              <input className="rounded-md border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" placeholder="Email address" />
            </div>
            <input className="mt-4 w-full rounded-md border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" placeholder="Subject" />
            <textarea className="mt-4 min-h-36 w-full resize-y rounded-md border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition focus:border-cyan-300/60" placeholder="Tell us what you want to build." />
            <button type="button" className="primary-button mt-5 w-full">
              Send Message <FiSend aria-hidden="true" />
            </button>
          </motion.form>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

export default Home;
