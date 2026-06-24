function TeamCard({ member }) {
  const { name, role, dept, avatar, github, linkedin } = member;
  return (
    <div
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = ""; }}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2rem 1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", transition: "all 0.3s" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #6366F1, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: avatar ? "2.5rem" : "1.8rem", fontWeight: 800, color: "#fff", boxShadow: "0 0 22px rgba(99,102,241,0.4)", border: "3px solid rgba(99,102,241,0.3)", userSelect: "none" }}>
        {avatar || name[0]}
      </div>
      <div>
        <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "1rem", fontFamily: "'Inter',sans-serif" }}>{name}</h3>
        <p style={{ color: "#6366F1", fontSize: "0.82rem", fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: "3px" }}>{role}</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.76rem", fontFamily: "'Inter',sans-serif", marginTop: "2px" }}>{dept}</p>
      </div>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        {github && (
          <a href={github} target="_blank" rel="noreferrer"
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
            style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.8rem", fontFamily: "Inter", transition: "color 0.2s", fontWeight: 600 }}>GitHub</a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer"
            onMouseEnter={e => e.currentTarget.style.color = "#0077B5"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
            style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.8rem", fontFamily: "Inter", transition: "color 0.2s", fontWeight: 600 }}>LinkedIn</a>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
