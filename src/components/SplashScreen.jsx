import { useEffect, useRef, useState } from "react";
import logoMark from "../assets/logo-mark.png";

export default function SplashScreen({ onDone }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showKiet, setShowKiet] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.002,
    }));
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += s.speed;
        const alpha = (Math.sin(s.a) + 1) / 2 * 0.6 + 0.1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${alpha})`;
        ctx.fill();
      });
      nodes.forEach(n => {
        nodes.forEach(m => {
          const dx = n.x - m.x, dy = n.y - m.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${(1-d/120)*0.2})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        });
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const T = [];
    T.push(setTimeout(() => setPhase(1), 350));
    const full = "AI Club";
    T.push(setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++; setTypedText(full.slice(0, i));
        if (i === full.length) clearInterval(iv);
      }, 85);
    }, 1100));
    T.push(setTimeout(() => setShowKiet(true), 2200));
    T.push(setTimeout(() => setShowTagline(true), 3000));
    T.push(setTimeout(() => {
      let p = 0;
      const iv = setInterval(() => { p += 2; setProgress(p); if (p >= 100) clearInterval(iv); }, 16);
    }, 3600));
    T.push(setTimeout(() => setLeaving(true), 4500));
    T.push(setTimeout(() => onDone(), 5200));
    return () => T.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #050e24 0%, #0a1a45 50%, #071233 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      transition: leaving ? "transform 0.85s cubic-bezier(0.76,0,0.24,1), opacity 0.85s ease" : "none",
      transform: leaving ? "translateY(-100%)" : "translateY(0)",
      opacity: leaving ? 0 : 1,
    }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Center radial glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(37,99,235,0.1) 40%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        {/* Logo mark */}
        <img
          src={logoMark}
          alt="AI Club KIET logo"
          style={{
            width: 110, height: 110, objectFit: "contain",
            filter: phase >= 1
              ? "drop-shadow(0 0 32px rgba(56,189,248,0.6)) drop-shadow(0 0 70px rgba(37,99,235,0.35))"
              : "none",
            transform: phase >= 1 ? "scale(1) rotate(0deg)" : "scale(0.2) rotate(-45deg)",
            opacity: phase >= 1 ? 1 : 0,
            transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />

        {/* Eyebrow */}
        <div style={{ fontSize: "0.7rem", color: "rgba(56,189,248,0.75)", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "Inter,sans-serif", fontWeight: 600, opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}>
          &lt; CODE · LEARN · INNOVATE /&gt;
        </div>

        {/* AI Club typewriter */}
        <div style={{ fontSize: "clamp(3rem,10vw,6rem)", fontWeight: 900, color: "#fff", letterSpacing: "-3px", fontFamily: "Inter,sans-serif", lineHeight: 1, minHeight: "1.1em" }}>
          {typedText}
          {typedText.length > 0 && typedText.length < 7 && (
            <span style={{ display: "inline-block", width: "3px", height: "0.85em", background: "#38BDF8", marginLeft: "4px", verticalAlign: "middle", animation: "blink 0.65s step-end infinite" }} />
          )}
        </div>

        {/* KIET gradient */}
        <div style={{
          fontSize: "clamp(3rem,10vw,6rem)", fontWeight: 900,
          background: "linear-gradient(90deg, #7DD3FC, #38BDF8, #2563EB)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          letterSpacing: "-3px", fontFamily: "Inter,sans-serif", lineHeight: 1, marginTop: "-0.4rem",
          opacity: showKiet ? 1 : 0,
          transform: showKiet ? "scale(1) translateY(0)" : "scale(0.7) translateY(12px)",
          transition: "all 0.75s cubic-bezier(0.34,1.2,0.64,1)",
          filter: showKiet ? "drop-shadow(0 0 30px rgba(56,189,248,0.7))" : "none",
        }}>KIET</div>

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(0.85rem,2vw,1rem)", color: "rgba(255,255,255,0.4)",
          letterSpacing: "4px", textTransform: "uppercase", fontFamily: "Inter,sans-serif",
          fontWeight: 500, marginTop: "0.25rem",
          opacity: showTagline ? 1 : 0, transform: showTagline ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.6s ease",
        }}>Innovate · Learn · Create</p>

        {/* Progress bar */}
        <div style={{ width: "clamp(160px,28vw,280px)", height: "2px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", marginTop: "1.75rem", overflow: "hidden", opacity: showTagline ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#38BDF8,#2563EB)", borderRadius: "999px", transition: "width 0.05s linear", boxShadow: "0 0 12px rgba(56,189,248,0.8)" }} />
        </div>

        {/* Loading dots */}
        <div style={{ display: "flex", gap: "6px", opacity: showTagline ? 0.5 : 0, transition: "opacity 0.4s ease 0.2s" }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 5, height: 5, background: "#38BDF8", borderRadius: "50%", animation: `dotBounce 1.2s ease-in-out infinite`, animationDelay: `${i*0.2}s` }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </div>
  );
}