import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const photos = [
  { id: 1, title: "Neural Nexus Hackathon 2025", tag: "Hackathon", emoji: "💻", span: "wide" },
  { id: 2, title: "Deep Learning Workshop", tag: "Workshop", emoji: "🧠", span: "normal" },
  { id: 3, title: "Team Photoshoot 2025", tag: "Team", emoji: "📸", span: "normal" },
  { id: 4, title: "Google AI Talk Session", tag: "Talk", emoji: "🎤", span: "normal" },
  { id: 5, title: "Kaggle Sprint Finals", tag: "Competition", emoji: "🏆", span: "wide" },
  { id: 6, title: "Campus Orientation Stall", tag: "Outreach", emoji: "🎯", span: "normal" },
  { id: 7, title: "CV Workshop Highlights", tag: "Workshop", emoji: "👁️", span: "normal" },
  { id: 8, title: "Industry Visit 2025", tag: "Career", emoji: "🏢", span: "normal" },
  { id: 9, title: "Annual Club Meet 2025", tag: "Team", emoji: "🎉", span: "wide" },
];

const gradients = [
  "linear-gradient(135deg, #1a1040 0%, #2d1b6b 100%)",
  "linear-gradient(135deg, #0a2040 0%, #0d4b6b 100%)",
  "linear-gradient(135deg, #1a0a2e 0%, #3b1a6b 100%)",
  "linear-gradient(135deg, #0d2b1a 0%, #0d5a2b 100%)",
  "linear-gradient(135deg, #2b1a0a 0%, #5a3000 100%)",
  "linear-gradient(135deg, #1a0a0a 0%, #4b1a1a 100%)",
  "linear-gradient(135deg, #0a1a2b 0%, #1a3a5a 100%)",
  "linear-gradient(135deg, #1a1a0a 0%, #3a3a0a 100%)",
  "linear-gradient(135deg, #1a0a1a 0%, #4b0a5a 100%)",
];

const tagColors = {
  Hackathon: "#6366F1", Workshop: "#06B6D4", Team: "#34D399",
  Talk: "#F59E0B", Competition: "#EC4899", Outreach: "#a78bfa",
  Career: "#06B6D4",
};

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const tags = ["All", ...Array.from(new Set(photos.map(p => p.tag)))];

  const filtered = filter === "All" ? photos : photos.filter(p => p.tag === filter);

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "10rem 1.5rem 5rem", textAlign: "center", background: "linear-gradient(180deg,#0A0A0F 0%,#0D0D1A 100%)" }}>
        <span style={{ fontSize: "0.78rem", color: "#6366F1", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Memories</span>
        <h1 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, color: "#fff", marginTop: "0.75rem", letterSpacing: "-2px", fontFamily: "'Inter',sans-serif", lineHeight: 1.1 }}>
          Our{" "}
          <span style={{ background: "linear-gradient(90deg,#6366F1,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Gallery</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1rem", maxWidth: "420px", margin: "1rem auto 0", fontFamily: "'Inter',sans-serif", lineHeight: 1.7 }}>
          Workshops, hackathons, talks, and the moments in between. This is us.
        </p>
      </section>

      <section style={{ padding: "0 1.5rem 6rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Filter */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.5rem" }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                style={{
                  background: filter === t ? "linear-gradient(135deg,#6366F1,#06B6D4)" : "rgba(255,255,255,0.04)",
                  border: filter === t ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: filter === t ? "#fff" : "rgba(255,255,255,0.5)",
                  padding: "8px 18px", borderRadius: "999px", fontWeight: 600,
                  fontSize: "0.85rem", cursor: "pointer", fontFamily: "'Inter',sans-serif",
                  transition: "all 0.2s",
                  boxShadow: filter === t ? "0 0 16px rgba(99,102,241,0.4)" : "none",
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div style={{ columns: "3 280px", gap: "1rem" }}>
            {filtered.map((p, i) => {
              const accent = tagColors[p.tag] || "#6366F1";
              return (
                <div key={p.id}
                  onClick={() => setLightbox(p)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 8px 32px ${accent}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
                  style={{
                    background: gradients[i % gradients.length],
                    borderRadius: "12px", marginBottom: "1rem",
                    height: p.span === "wide" ? "240px" : "180px",
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between", padding: "1.25rem",
                    cursor: "pointer", transition: "all 0.3s",
                    border: "1px solid rgba(255,255,255,0.06)",
                    breakInside: "avoid",
                    position: "relative", overflow: "hidden",
                  }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "4rem", opacity: 0.15, userSelect: "none" }}>{p.emoji}</div>
                  <span style={{ fontSize: "0.72rem", color: accent, background: accent + "22", border: `1px solid ${accent}44`, borderRadius: "999px", padding: "3px 10px", fontWeight: 600, fontFamily: "'Inter',sans-serif", alignSelf: "flex-start" }}>{p.tag}</span>
                  <div>
                    <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{p.emoji}</div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Inter',sans-serif" }}>{p.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", backdropFilter: "blur(8px)" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "#0D0D1A", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "20px", padding: "3rem", maxWidth: "500px", width: "100%", textAlign: "center", position: "relative" }}>
            <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "1rem", right: "1.25rem", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
            <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>{lightbox.emoji}</div>
            <span style={{ fontSize: "0.72rem", color: tagColors[lightbox.tag] || "#6366F1", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>{lightbox.tag}</span>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.4rem", fontFamily: "'Inter',sans-serif", marginTop: "0.5rem" }}>{lightbox.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", fontFamily: "'Inter',sans-serif", marginTop: "0.5rem" }}>AI Club KIET — Event Archive</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Gallery;
