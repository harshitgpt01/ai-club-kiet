import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const domains = ["Machine Learning", "Data Science", "Web Development", "Computer Vision", "NLP / Research", "Reinforcement Learning", "Design / Creative", "Event Management"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const perks = [
  { icon: "🧠", title: "Learn from Peers", desc: "Weekly sessions run by students who've interned at top companies." },
  { icon: "🏆", title: "Win Competitions", desc: "Club teams have placed in national-level hackathons and Kaggle competitions." },
  { icon: "💼", title: "Career Support", desc: "Resume reviews, referrals, and alumni connections at Google, Microsoft, and startups." },
  { icon: "🔗", title: "Real Projects", desc: "Build things that ship — not just course assignments." },
  { icon: "🌐", title: "Industry Network", desc: "Direct access to industry sessions with engineers and researchers." },
  { icon: "📜", title: "Certificate & Recognition", desc: "Official club membership certificate and profile on our website." },
];

function JoinUs() {
  const [form, setForm] = useState({ name: "", email: "", roll: "", year: "", domain: "", why: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleDomain = (d) => setSelected(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.roll || !form.year) return;
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "10rem 1.5rem 5rem", textAlign: "center", background: "linear-gradient(180deg,#0A0A0F 0%,#0D0D1A 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(99,102,241,0.13) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{ fontSize: "0.78rem", color: "#6366F1", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Applications Open</span>
          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, color: "#fff", marginTop: "0.75rem", letterSpacing: "-2px", fontFamily: "'Inter',sans-serif", lineHeight: 1.1 }}>
            Join AI Club{" "}
            <span style={{ background: "linear-gradient(90deg,#6366F1,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>KIET</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1rem", maxWidth: "480px", margin: "1rem auto 0", fontFamily: "'Inter',sans-serif", lineHeight: 1.7 }}>
            No prior experience required. Just curiosity, commitment, and a willingness to build things.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding: "3rem 1.5rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "1rem", fontFamily: "'Inter',sans-serif", marginBottom: "1.5rem", letterSpacing: "0.5px" }}>— Why Join?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
            {perks.map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: "1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>{icon}</div>
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", fontFamily: "'Inter',sans-serif", marginBottom: "0.3rem" }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.85rem", lineHeight: 1.6, fontFamily: "'Inter',sans-serif" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "3rem 1.5rem 7rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2.5rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ color: "#fff", fontWeight: 800, fontFamily: "'Inter',sans-serif", fontSize: "1.4rem", marginBottom: "0.75rem" }}>Application Received!</h3>
                <p style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  Welcome aboard, {form.name}! We'll review your application and reach out to <strong style={{ color: "#6366F1" }}>{form.email}</strong> within 3–5 days.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem", fontFamily: "'Inter',sans-serif", marginBottom: "1.75rem" }}>Membership Application</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-grid">
                  {[["name","Full Name","text"],["roll","Roll Number","text"],["email","Email Address","email"]].map(([k,p,t]) => (
                    <input key={k} type={t} placeholder={p}
                      value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                      style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", padding:"12px 14px", color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", outline:"none", gridColumn: k==="email" ? "span 2" : "auto" }}
                      onFocus={e=>e.target.style.borderColor="#6366F1"}
                      onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}
                    />
                  ))}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.4)", fontFamily:"'Inter',sans-serif", marginBottom:"0.5rem", display:"block" }}>Year of Study</label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {years.map(y => (
                      <button key={y} onClick={()=>setForm({...form,year:y})}
                        style={{ background:form.year===y?"linear-gradient(135deg,#6366F1,#06B6D4)":"rgba(255,255,255,0.04)", border:form.year===y?"none":"1px solid rgba(255,255,255,0.1)", color:form.year===y?"#fff":"rgba(255,255,255,0.5)", padding:"8px 16px", borderRadius:"999px", fontSize:"0.85rem", fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"all 0.2s" }}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.4)", fontFamily:"'Inter',sans-serif", marginBottom:"0.5rem", display:"block" }}>Domains of Interest (select all that apply)</label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                    {domains.map(d => (
                      <button key={d} onClick={()=>toggleDomain(d)}
                        style={{ background:selected.includes(d)?"rgba(99,102,241,0.25)":"rgba(255,255,255,0.04)", border:selected.includes(d)?"1px solid #6366F1":"1px solid rgba(255,255,255,0.1)", color:selected.includes(d)?"#a5b4fc":"rgba(255,255,255,0.5)", padding:"7px 14px", borderRadius:"999px", fontSize:"0.82rem", fontWeight:600, cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"all 0.2s" }}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea placeholder="Why do you want to join? (optional)" rows={4}
                  value={form.why} onChange={e=>setForm({...form,why:e.target.value})}
                  style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", padding:"12px 14px", color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", marginBottom:"1.25rem", outline:"none", resize:"vertical", boxSizing:"border-box" }}
                  onFocus={e=>e.target.style.borderColor="#6366F1"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}
                />

                <button onClick={handleSubmit}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 0 35px rgba(99,102,241,0.55)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 0 20px rgba(99,102,241,0.35)";}}
                  style={{ width:"100%", background:"linear-gradient(135deg,#6366F1,#06B6D4)", border:"none", color:"#fff", padding:"15px", borderRadius:"10px", fontWeight:700, fontSize:"1rem", cursor:"pointer", fontFamily:"'Inter',sans-serif", boxShadow:"0 0 20px rgba(99,102,241,0.35)", transition:"all 0.2s" }}>
                  Submit Application →
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width:500px) { .form-grid { grid-template-columns:1fr !important; } .form-grid input { grid-column: auto !important; } }
      `}</style>
    </div>
  );
}

export default JoinUs;
