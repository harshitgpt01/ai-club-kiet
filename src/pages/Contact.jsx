import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const socials = [
  { label: "GitHub", icon: "🐙", href: "#", color: "#fff" },
  { label: "LinkedIn", icon: "💼", href: "#", color: "#0077B5" },
  { label: "Instagram", icon: "📷", href: "#", color: "#E1306C" },
  { label: "Discord", icon: "💬", href: "#", color: "#5865F2" },
  { label: "YouTube", icon: "▶️", href: "#", color: "#FF0000" },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "10rem 1.5rem 5rem", textAlign: "center", background: "linear-gradient(180deg,#0A0A0F 0%,#0D0D1A 100%)" }}>
        <span style={{ fontSize: "0.78rem", color: "#6366F1", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Get in Touch</span>
        <h1 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, color: "#fff", marginTop: "0.75rem", letterSpacing: "-2px", fontFamily: "'Inter',sans-serif", lineHeight: 1.1 }}>
          Let's{" "}
          <span style={{ background: "linear-gradient(90deg,#6366F1,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Connect</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1rem", maxWidth: "440px", margin: "1rem auto 0", fontFamily: "'Inter',sans-serif", lineHeight: 1.7 }}>
          Questions, collaborations, sponsorships, or just a hello — we read every message.
        </p>
      </section>

      <section style={{ padding: "2rem 1.5rem 6rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem", alignItems: "start" }} className="contact-grid">

          {/* Info side */}
          <div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Inter',sans-serif", marginBottom: "0.5rem" }}>📍 Address</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.75, fontFamily: "'Inter',sans-serif" }}>
                KIET Group of Institutions<br />
                13 Km Stone, Delhi-Meerut Expressway<br />
                Ghaziabad, Uttar Pradesh — 201206
              </p>
            </div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Inter',sans-serif", marginBottom: "0.5rem" }}>✉️ Email</h3>
              <a href="mailto:aiclub@kiet.edu" style={{ color: "#6366F1", fontSize: "0.9rem", fontFamily: "'Inter',sans-serif", textDecoration: "none" }}>aiclub@kiet.edu</a>
            </div>
            <div style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Inter',sans-serif", marginBottom: "1rem" }}>🌐 Social Media</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {socials.map(({ label, icon, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 16px", textDecoration: "none", color: "rgba(255,255,255,0.6)", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 500, transition: "border-color 0.2s" }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form side */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontFamily: "'Inter',sans-serif", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem" }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "none", border: "1px solid rgba(99,102,241,0.4)", color: "#a5b4fc", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "0.88rem" }}>Send another</button>
              </div>
            ) : (
              <div>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Inter',sans-serif", marginBottom: "1.5rem" }}>Send a Message</h3>
                {[
                  { key: "name", placeholder: "Your Name", type: "text" },
                  { key: "email", placeholder: "Your Email", type: "email" },
                  { key: "subject", placeholder: "Subject", type: "text" },
                ].map(({ key, placeholder, type }) => (
                  <input key={key} type={type} placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 16px", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", marginBottom: "1rem", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#6366F1"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                ))}
                <textarea placeholder="Your Message" rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 16px", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", marginBottom: "1.25rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = "#6366F1"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button onClick={handleSubmit}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 18px rgba(99,102,241,0.3)"; }}
                  style={{ width: "100%", background: "linear-gradient(135deg,#6366F1,#06B6D4)", border: "none", color: "#fff", padding: "14px", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: "0 0 18px rgba(99,102,241,0.3)", transition: "all 0.2s" }}>
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 700px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Contact;
