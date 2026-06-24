import { Link } from "react-router-dom";

function AboutSection() {
  return (
    <section style={{ background: "#020617", padding: "5rem 2.5rem 6rem", position: "relative", overflow: "hidden" }}>
      {/* Purple glow right */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">

        {/* Left — 3D neural head visual */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Glowing head silhouette built with CSS + SVG */}
          <div style={{ position: "relative", width: 380, height: 420 }}>
            {/* Background glow */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 320, height: 320, background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(124,58,237,0.1) 50%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)" }} />

            <svg viewBox="0 0 380 420" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 20px rgba(6,182,212,0.4))" }}>
              <defs>
                <radialGradient id="headGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Head outline */}
              <path d="M190,60 C130,60 90,100 85,155 C80,200 90,240 100,265 C110,290 115,305 115,320 L265,320 C265,305 270,290 280,265 C290,240 300,200 295,155 C290,100 250,60 190,60 Z"
                fill="none" stroke="url(#headGrad)" strokeWidth="1.5" opacity="0.8" />

              {/* Neck */}
              <path d="M145,320 L145,360 C145,365 150,370 155,370 L225,370 C230,370 235,365 235,360 L235,320"
                fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />

              {/* Neural network dots on head */}
              {[
                [190,90],[160,110],[220,110],[135,145],[190,140],[245,145],
                [115,185],[165,175],[215,175],[255,185],[130,225],[185,215],
                [240,225],[150,260],[225,260],[190,290],
                [160,130],[220,130],[148,165],[232,165],[175,200],[205,200],
                [148,245],[232,245],[170,275],[210,275],
              ].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill="#06B6D4" opacity={0.5 + (i % 5) * 0.1}
                  style={{ animation: `nodePulse ${1.5 + (i%4)*0.4}s ease-in-out infinite`, animationDelay: `${i*0.08}s` }} />
              ))}

              {/* Connections */}
              {[
                "190,90 160,110","190,90 220,110","160,110 135,145","220,110 245,145",
                "160,110 190,140","220,110 190,140","135,145 115,185","245,145 255,185",
                "190,140 165,175","190,140 215,175","115,185 130,225","255,185 240,225",
                "165,175 130,225","215,175 240,225","165,175 185,215","215,175 185,215",
                "130,225 150,260","240,225 225,260","185,215 150,260","185,215 225,260",
                "150,260 190,290","225,260 190,290",
              ].map((pair,i) => {
                const [p1,p2] = pair.split(" ");
                const [x1,y1] = p1.split(",");
                const [x2,y2] = p2.split(",");
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(6,182,212,0.25)" strokeWidth="0.8" />;
              })}

              {/* Floating dots around head */}
              {[[80,120,4],[300,150,3],[70,220,5],[310,260,3],[160,55,4],[240,65,3]].map(([x,y,r],i) => (
                <circle key={`f${i}`} cx={x} cy={y} r={r} fill="#06B6D4" opacity="0.6"
                  style={{ animation: `floatDot ${2+i*0.5}s ease-in-out infinite`, animationDelay: `${i*0.3}s` }} />
              ))}

              {/* Connection lines to floating dots */}
              <line x1="85" y1="155" x2="80" y2="120" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" strokeDasharray="4,4" />
              <line x1="295" y1="155" x2="300" y2="150" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" strokeDasharray="4,4" />
              <line x1="190" y1="60" x2="160" y2="55" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" strokeDasharray="4,4" />
              <line x1="190" y1="60" x2="240" y2="65" stroke="rgba(6,182,212,0.2)" strokeWidth="0.8" strokeDasharray="4,4" />
            </svg>

            {/* Glow base */}
            <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 160, height: 12, background: "rgba(6,182,212,0.3)", borderRadius: "50%", filter: "blur(12px)" }} />
          </div>
        </div>

        {/* Right — Text */}
        <div>
          <span style={{ fontSize: "0.72rem", color: "#06B6D4", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "Inter, sans-serif", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: "4px", padding: "4px 12px" }}>ABOUT US</span>

          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "#fff", marginTop: "1.25rem", lineHeight: 1.2, fontFamily: "Inter, sans-serif", letterSpacing: "-0.5px" }}>
            Building the Future<br />
            <span style={{ textDecoration: "underline", textDecorationColor: "#06B6D4", textUnderlineOffset: "6px" }}>with Intelligence</span>
          </h2>

          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8, marginTop: "1.25rem", marginBottom: "2rem", fontFamily: "Inter, sans-serif" }}>
            We aim to foster innovation, encourage research, and provide hands-on experience in the field of AI &amp; ML through workshops, hackathons, seminars, and collaborative projects.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.25rem" }}>
            {[
              { icon: "🎓", label: "Learn by Doing" },
              { icon: "🤝", label: "Inclusive Community" },
              { icon: "🔬", label: "Research Mindset" },
              { icon: "🚀", label: "Career Growth" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(6,15,50,0.6)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: "10px", padding: "12px 16px" }}>
                <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>

          <Link to="/about" style={{ textDecoration: "none" }}>
            <button
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.12)"; e.currentTarget.style.boxShadow = "0 0 25px rgba(6,182,212,0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
              style={{ background: "transparent", border: "1.5px solid rgba(6,182,212,0.5)", color: "#06B6D4", padding: "12px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "0.92rem", cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}>
              Know More About Us →
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes nodePulse { 0%,100%{opacity:0.4;r:2} 50%{opacity:1;r:3.5} }
        @keyframes floatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @media(max-width:900px){ .about-grid{grid-template-columns:1fr !important; gap:2rem !important;} }
      `}</style>
    </section>
  );
}
export default AboutSection;
