import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ background: "#070710", borderTop: "1px solid rgba(99,102,241,0.12)", padding: "3.5rem 1.5rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "2.5rem", marginBottom: "3rem" }}>
          <div>
            <h3 style={{ fontWeight: 800, color: "#fff", fontSize: "1.2rem", fontFamily: "'Inter',sans-serif", marginBottom: "1rem" }}>
              AI Club <span style={{ color: "#6366F1" }}>KIET</span>
            </h3>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.87rem", lineHeight: 1.75, fontFamily: "'Inter',sans-serif" }}>
              Empowering students with AI, ML, and innovation at KIET Group of Institutions, Ghaziabad.
            </p>
          </div>

          <div>
            <h4 style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", letterSpacing: "1.8px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif", marginBottom: "1.25rem" }}>Navigate</h4>
            {[["Home","/"],["About","/about"],["Team","/team"],["Events","/events"],["Gallery","/gallery"],["Contact","/contact"]].map(([l,t]) => (
              <Link key={l} to={t}
                onMouseEnter={e => e.currentTarget.style.color = "#6366F1"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                style={{ display: "block", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", marginBottom: "0.6rem", transition: "color 0.2s" }}>{l}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", letterSpacing: "1.8px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif", marginBottom: "1.25rem" }}>Social</h4>
            {[["GitHub","#"],["LinkedIn","#"],["Instagram","#"],["Discord","#"],["YouTube","#"]].map(([label,href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                onMouseEnter={e => e.currentTarget.style.color = "#06B6D4"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                style={{ display: "block", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", marginBottom: "0.6rem", transition: "color 0.2s" }}>{label}</a>
            ))}
          </div>

          <div>
            <h4 style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", letterSpacing: "1.8px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif", marginBottom: "1.25rem" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.87rem", lineHeight: 1.8, fontFamily: "'Inter',sans-serif" }}>
              KIET Group of Institutions<br />
              13 Km Stone, Delhi-Meerut<br />
              Expressway, Ghaziabad, UP<br />
              <a href="mailto:aiclub@kiet.edu" style={{ color: "#6366F1", textDecoration: "none" }}>aiclub@kiet.edu</a>
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.82rem", fontFamily: "'Inter',sans-serif" }}>© 2026 AI Club KIET. All Rights Reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.82rem", fontFamily: "'Inter',sans-serif" }}>Built with ❤️ by the club team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
