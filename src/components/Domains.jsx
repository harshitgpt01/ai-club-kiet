const domains = [
  { icon: "🤖", title: "Machine Learning", desc: "Build intelligent models — regression, classification, Kaggle competitions, and real datasets.", tags: ["PyTorch", "scikit-learn", "XGBoost"], accent: "#06B6D4" },
  { icon: "📊", title: "Data Science", desc: "Master pandas, visualization, statistical modeling, and end-to-end ML pipelines.", tags: ["Pandas", "Matplotlib", "SQL"], accent: "#7C3AED" },
  { icon: "🌐", title: "Web Development", desc: "Ship full-stack applications — React frontends, FastAPI backends, and cloud deployments.", tags: ["React", "Node.js", "FastAPI"], accent: "#06B6D4" },
  { icon: "🔬", title: "Research & NLP", desc: "LLMs, prompt engineering, fine-tuning, and AI safety. Read papers. Publish results.", tags: ["HuggingFace", "LangChain", "RAG"], accent: "#7C3AED" },
  { icon: "👁️", title: "Computer Vision", desc: "Teach machines to see — YOLO, diffusion models, segmentation, real-time detection.", tags: ["OpenCV", "YOLO", "CNNs"], accent: "#06B6D4" },
  { icon: "🎮", title: "Reinforcement Learning", desc: "Train agents that learn by doing — game AI, robotics, autonomous decision systems.", tags: ["Gym", "Stable Baselines", "PPO"], accent: "#7C3AED" },
];

function Domains() {
  return (
    <section style={{ background: "#020617", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "#06B6D4", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, fontFamily: "Inter, sans-serif", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: "4px", padding: "4px 14px" }}>DOMAINS</span>
          <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", marginTop: "1rem", letterSpacing: "-1px", fontFamily: "Inter, sans-serif" }}>
            Areas We <span style={{ background: "linear-gradient(90deg,#06B6D4,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Explore</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", maxWidth: "460px", margin: "0.75rem auto 0", fontFamily: "Inter, sans-serif" }}>Six tracks. Pick your path. Build something real.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.5rem" }}>
          {domains.map(({ icon, title, desc, tags, accent }) => (
            <div key={title}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent + "66"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accent}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
              style={{ background: "rgba(6,15,50,0.5)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "2rem", transition: "all 0.3s", backdropFilter: "blur(10px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{icon}</div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", fontFamily: "Inter, sans-serif", marginBottom: "0.6rem" }}>{title}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem", fontFamily: "Inter, sans-serif" }}>{desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {tags.map(t => (
                  <span key={t} style={{ fontSize: "0.72rem", color: accent, background: accent + "18", border: `1px solid ${accent}44`, borderRadius: "999px", padding: "3px 12px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Domains;