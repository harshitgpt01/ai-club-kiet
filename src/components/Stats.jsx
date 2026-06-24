import { useEffect, useRef, useState } from "react";

const stats = [
  { icon: "👥", value: 500, suffix: "+", label: "Active Members" },
  { icon: "📅", value: 25, suffix: "+", label: "Events Organized" },
  { icon: "</>", value: 30, suffix: "+", label: "Projects Completed" },
  { icon: "🏆", value: 15, suffix: "+", label: "Achievements" },
];

function Counter({ end, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const step = Math.ceil(end / 50);
        const t = setInterval(() => { cur += step; if (cur >= end) { setCount(end); clearInterval(t); } else setCount(cur); }, 28);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Stats() {
  return (
    <section style={{ background: "rgba(2,6,23,0.9)", padding: "0 2.5rem", position: "relative", zIndex: 10 }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        background: "rgba(6,15,50,0.8)",
        border: "1px solid rgba(6,182,212,0.15)",
        borderRadius: "16px",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        padding: "0",
        transform: "translateY(-50px)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.08)",
        overflow: "hidden",
      }} className="stats-grid">
        {stats.map(({ icon, value, suffix, label }, i) => (
          <div key={label} style={{
            padding: "2.25rem 1.5rem",
            display: "flex", alignItems: "center", gap: "1rem",
            borderRight: i < 3 ? "1px solid rgba(6,182,212,0.1)" : "none",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(6,182,212,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ fontSize: icon === "</>" ? "1.3rem" : "1.8rem", color: "#7C3AED", flexShrink: 0, width: 40, textAlign: "center", fontFamily: "monospace", fontWeight: 900 }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", fontFamily: "Inter, sans-serif", lineHeight: 1 }}>
                <Counter end={value} suffix={suffix} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontFamily: "Inter, sans-serif", marginTop: "3px" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:700px){.stats-grid{grid-template-columns:1fr 1fr !important;}}`}</style>
    </section>
  );
}
export default Stats;