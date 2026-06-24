import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const canvasRef = useRef(null);
  const brainRef = useRef(null);

  // Star/particle background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += s.speed;
        const alpha = (Math.sin(s.a) + 1) / 2 * 0.7 + 0.1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Brain canvas — glowing polygon sphere
  useEffect(() => {
    const canvas = brainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const SIZE = canvas.width = canvas.height = 420;
    const cx = SIZE / 2, cy = SIZE / 2;

    // Generate brain-like nodes
    const nodes = Array.from({ length: 80 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      // Slightly flatten into brain shape
      const r = 130 + Math.random() * 28;
      return {
        x: cx + r * Math.sin(phi) * Math.cos(theta),
        y: cy + r * Math.sin(phi) * Math.sin(theta) * 0.75,
        z: r * Math.cos(phi),
        baseX: cx + r * Math.sin(phi) * Math.cos(theta),
        baseY: cy + r * Math.sin(phi) * Math.sin(theta) * 0.75,
        theta, phi, r,
        speed: (Math.random() - 0.5) * 0.003,
        vr: (Math.random() - 0.5) * 0.2,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Outer glow rings
      for (let ring = 3; ring >= 1; ring--) {
        const grad = ctx.createRadialGradient(cx, cy, 80 * ring * 0.3, cx, cy, 80 * ring * 0.55);
        grad.addColorStop(0, `rgba(6,182,212,${0.04 / ring})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, 80 * ring * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Update node positions (slight rotation)
      nodes.forEach(n => {
        n.theta += n.speed;
        const pulse = Math.sin(t * 2 + n.pulseOffset) * 8;
        n.x = cx + (n.r + pulse) * Math.sin(n.phi) * Math.cos(n.theta);
        n.y = cy + (n.r + pulse) * Math.sin(n.phi) * Math.sin(n.theta) * 0.72;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.55;
            // Color gradient blue→purple based on position
            const mix = (nodes[i].x - (cx - 140)) / 280;
            const r = Math.round(6 + mix * (124 - 6));
            const g = Math.round(182 - mix * 120);
            const b = Math.round(212 - mix * (212 - 237));
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = (Math.sin(t * 3 + n.pulseOffset) + 1) / 2;
        const mix = (n.x - (cx - 140)) / 280;
        const r2 = Math.round(6 + mix * 118);
        const g2 = Math.round(182 - mix * 60);
        const b2 = 212;
        const nodeAlpha = 0.5 + pulse * 0.5;
        const nodeR = 1.8 + pulse * 1.5;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, nodeR * 4);
        grad.addColorStop(0, `rgba(${r2},${g2},${b2},${nodeAlpha})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(n.x, n.y, nodeR * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central AI chip glow
      const chipGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      chipGrad.addColorStop(0, `rgba(6,182,212,${0.25 + Math.sin(t * 2) * 0.1})`);
      chipGrad.addColorStop(0.5, `rgba(124,58,237,${0.12 + Math.sin(t * 2) * 0.05})`);
      chipGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.fillStyle = chipGrad;
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      // "AI" text in center
      ctx.font = "bold 42px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textGrad = ctx.createLinearGradient(cx - 30, cy, cx + 30, cy);
      textGrad.addColorStop(0, "#06B6D4");
      textGrad.addColorStop(1, "#7C3AED");
      ctx.fillStyle = textGrad;
      ctx.shadowColor = "#06B6D4";
      ctx.shadowBlur = 20 + Math.sin(t * 2) * 8;
      ctx.fillText("AI", cx, cy);
      ctx.shadowBlur = 0;

      // Hologram base ring
      const baseY = cy + 148;
      for (let ring = 1; ring <= 3; ring++) {
        const rx = 55 * ring * 0.55;
        const ry = rx * 0.22;
        const alpha = (0.4 - ring * 0.1) * (0.7 + Math.sin(t * 3) * 0.3);
        ctx.beginPath();
        ctx.ellipse(cx, baseY, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
        ctx.lineWidth = ring === 1 ? 2 : 1;
        ctx.stroke();
      }
      // Beam from center to base
      const beamGrad = ctx.createLinearGradient(cx, cy + 130, cx, baseY);
      beamGrad.addColorStop(0, `rgba(6,182,212,${0.35 + Math.sin(t * 2) * 0.1})`);
      beamGrad.addColorStop(1, "rgba(6,182,212,0)");
      ctx.beginPath();
      ctx.fillStyle = beamGrad;
      ctx.ellipse(cx, (cy + 130 + baseY) / 2, 10, (baseY - cy - 130) / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020617 0%, #0a0f2e 40%, #0d0730 70%, #020617 100%)",
      display: "flex", alignItems: "center",
      overflow: "hidden",
      paddingTop: "70px",
    }}>
      {/* Star background */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Deep blue radial glow left */}
      <div style={{ position: "absolute", top: "20%", left: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      {/* Purple glow right */}
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Wave bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", overflow: "hidden", pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(6,182,212,0.04)" />
          <path d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z" fill="rgba(124,58,237,0.04)" />
        </svg>
      </div>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 2.5rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center", position: "relative", zIndex: 2 }} className="hero-grid">

        {/* LEFT COLUMN */}
        <div>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)",
            borderRadius: "6px", padding: "5px 14px", marginBottom: "1.75rem",
            fontSize: "0.75rem", color: "#06B6D4", fontWeight: 700,
            fontFamily: "Inter, sans-serif", letterSpacing: "1.5px",
          }}>
            &lt; CODE · LEARN · INNOVATE /&gt;
          </div>

          <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: "#fff", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", display: "block" }}>EXPLORE THE FUTURE</span>
            <span style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)", display: "block" }}>
              WITH{" "}
              <span style={{ background: "linear-gradient(90deg,#06B6D4,#38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI</span>
              {" "}&{" "}
              <span style={{ background: "linear-gradient(90deg,#7C3AED,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ML</span>
            </span>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "440px", marginBottom: "2.25rem", fontFamily: "Inter, sans-serif" }}>
            AI Club KIET is a community of innovators and learners exploring the endless possibilities of Artificial Intelligence and Machine Learning.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <Link to="/events" style={{ textDecoration: "none" }}>
              <button
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 40px rgba(6,182,212,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 25px rgba(6,182,212,0.35)"; e.currentTarget.style.transform = ""; }}
                style={{ background: "linear-gradient(135deg,#06B6D4,#0284C7)", border: "none", color: "#fff", padding: "13px 30px", borderRadius: "8px", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 0 25px rgba(6,182,212,0.35)", transition: "all 0.2s" }}>
                Explore More <span>→</span>
              </button>
            </Link>
            <Link to="/join" style={{ textDecoration: "none" }}>
              <button
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = ""; }}
                style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" }}>
                👥 Join Our Community
              </button>
            </Link>
          </div>

          {/* Scroll down */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", fontFamily: "Inter, sans-serif" }}>
            <div style={{ width: 24, height: 36, border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "12px", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4px" }}>
              <div style={{ width: 3, height: 8, background: "#06B6D4", borderRadius: "999px", animation: "scrollBob 1.5s ease-in-out infinite" }} />
            </div>
            Scroll Down
          </div>
        </div>

        {/* RIGHT COLUMN — 3-column micro-grid: [left tags] [brain] [right tags] */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "110px 1fr 110px", alignItems: "center", gap: "0", height: "520px" }}>

          {/* LEFT TAGS column — stacked, vertically centred */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start", paddingRight: "8px" }}>
            {/* MACHINE LEARNING tag */}
            <div style={{ background: "rgba(6,10,30,0.85)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.62rem", fontWeight: 800, color: "#06B6D4", letterSpacing: "1.2px", fontFamily: "Inter, sans-serif", backdropFilter: "blur(12px)", textAlign: "center", lineHeight: 1.5, animation: "floatTag 3s ease-in-out infinite", animationDelay: "0s", boxShadow: "0 0 14px rgba(6,182,212,0.2)", whiteSpace: "pre" }}>{"MACHINE\nLEARNING"}</div>
            {/* Robot icon */}
            <div style={{ fontSize: "1.8rem", animation: "floatTag 2.5s ease-in-out infinite", animationDelay: "0.6s", filter: "drop-shadow(0 0 8px rgba(6,182,212,0.6))", paddingLeft: "8px" }}>🤖</div>
            {/* NEURAL NETWORKS tag */}
            <div style={{ background: "rgba(6,10,30,0.85)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.62rem", fontWeight: 800, color: "#06B6D4", letterSpacing: "1.2px", fontFamily: "Inter, sans-serif", backdropFilter: "blur(12px)", textAlign: "center", lineHeight: 1.5, animation: "floatTag 3.5s ease-in-out infinite", animationDelay: "0.8s", boxShadow: "0 0 14px rgba(6,182,212,0.2)", whiteSpace: "pre" }}>{"NEURAL\nNETWORKS"}</div>
          </div>

          {/* CENTRE — Brain canvas only, no tags overlap */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 3 }}>
            <canvas ref={brainRef} style={{ width: "360px", height: "360px" }} width={420} height={420} />
          </div>

          {/* RIGHT TAGS column — stacked, vertically centred */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-end", paddingLeft: "8px" }}>
            {/* DEEP LEARNING tag */}
            <div style={{ background: "rgba(6,10,30,0.85)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.62rem", fontWeight: 800, color: "#06B6D4", letterSpacing: "1.2px", fontFamily: "Inter, sans-serif", backdropFilter: "blur(12px)", textAlign: "center", lineHeight: 1.5, animation: "floatTag 3.2s ease-in-out infinite", animationDelay: "0.4s", boxShadow: "0 0 14px rgba(6,182,212,0.2)", whiteSpace: "pre" }}>{"DEEP\nLEARNING"}</div>
            {/* Spacer icon */}
            <div style={{ fontSize: "1.4rem", opacity: 0.5, animation: "floatTag 2.8s ease-in-out infinite", animationDelay: "1s" }}>📊</div>
            {/* DATA SCIENCE tag */}
            <div style={{ background: "rgba(6,10,30,0.85)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.62rem", fontWeight: 800, color: "#06B6D4", letterSpacing: "1.2px", fontFamily: "Inter, sans-serif", backdropFilter: "blur(12px)", textAlign: "center", lineHeight: 1.5, animation: "floatTag 3s ease-in-out infinite", animationDelay: "1.2s", boxShadow: "0 0 14px rgba(6,182,212,0.2)", whiteSpace: "pre" }}>{"DATA\nSCIENCE"}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollBob { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(10px);opacity:0.3} }
        @keyframes floatTag { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @media (max-width:900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
