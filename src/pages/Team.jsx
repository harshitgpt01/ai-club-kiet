import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamCard from "../components/TeamCard";

const leads = [
  { name: "Aryan Sharma", role: "President", dept: "CSE — Final Year", avatar: "🧠", github: "#", linkedin: "#" },
  { name: "Priya Gupta", role: "Vice President", dept: "CSE — Third Year", avatar: "⚡", github: "#", linkedin: "#" },
  { name: "Rohit Verma", role: "Technical Lead", dept: "CSE (AI/ML) — Third Year", avatar: "🔬", github: "#", linkedin: "#" },
  { name: "Sneha Patel", role: "Event Coordinator", dept: "IT — Third Year", avatar: "🎯", github: "#", linkedin: "#" },
];

const coreteam = [
  { name: "Ankit Mishra", role: "ML Domain Lead", dept: "CSE — Second Year", avatar: "🤖", github: "#", linkedin: "#" },
  { name: "Divya Singh", role: "Web Dev Lead", dept: "CSE — Second Year", avatar: "🌐", github: "#", linkedin: "#" },
  { name: "Karan Joshi", role: "Data Science Lead", dept: "CSE (DS) — Second Year", avatar: "📊", github: "#", linkedin: "#" },
  { name: "Meera Reddy", role: "Research Lead", dept: "CSE — Third Year", avatar: "📝", github: "#", linkedin: "#" },
  { name: "Vikram Nair", role: "Design Lead", dept: "CSE — Second Year", avatar: "🎨", github: "#", linkedin: "#" },
  { name: "Aisha Khan", role: "Community Manager", dept: "IT — Second Year", avatar: "💬", github: "#", linkedin: "#" },
];

function Team() {
  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "10rem 1.5rem 5rem", textAlign: "center", background: "linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)" }}>
        <span style={{ fontSize: "0.78rem", color: "#6366F1", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>The People</span>
        <h1 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, color: "#fff", marginTop: "0.75rem", letterSpacing: "-2px", fontFamily: "'Inter',sans-serif", lineHeight: 1.1 }}>
          Meet the <span style={{ background: "linear-gradient(90deg,#6366F1,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Team</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1rem", maxWidth: "480px", margin: "1rem auto 0", fontFamily: "'Inter',sans-serif", lineHeight: 1.7 }}>
          Built by students, for students. Every person here volunteered because they believe learning AI should be hands-on and collaborative.
        </p>
      </section>

      {/* Leadership */}
      <section style={{ padding: "4rem 1.5rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", marginBottom: "1.75rem", letterSpacing: "0.5px" }}>
            — Leadership
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1.25rem" }}>
            {leads.map(m => <TeamCard key={m.name} member={m} />)}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section style={{ padding: "2rem 1.5rem 6rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter',sans-serif", marginBottom: "1.75rem", letterSpacing: "0.5px" }}>
            — Core Team
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.25rem" }}>
            {coreteam.map(m => <TeamCard key={m.name} member={m} />)}
          </div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "#0D0D1A", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", fontFamily: "'Inter',sans-serif", letterSpacing: "-1px", marginBottom: "1rem" }}>
          Want to be part of this?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", fontFamily: "'Inter',sans-serif", marginBottom: "2rem" }}>We're always looking for passionate people to join the core team.</p>
        <a href="/join" style={{ textDecoration: "none" }}>
          <button
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(99,102,241,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 25px rgba(99,102,241,0.35)"; }}
            style={{ background: "linear-gradient(135deg,#6366F1,#06B6D4)", border: "none", color: "#fff", padding: "14px 38px", borderRadius: "10px", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 0 25px rgba(99,102,241,0.35)", fontFamily: "'Inter',sans-serif", transition: "all 0.2s" }}>
            Apply Now
          </button>
        </a>
      </section>

      <Footer />
    </div>
  );
}

export default Team;
