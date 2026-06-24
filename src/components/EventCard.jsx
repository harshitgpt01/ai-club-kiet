function EventCard({ event }) {
  const { title, date, type, desc, tags, status } = event;
  const statusMap = {
    upcoming: { color: "#34D399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.35)", label: "● Upcoming" },
    live:     { color: "#EF4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.35)",   label: "🔴 Live Now" },
    past:     { color: "#6B7280", bg: "rgba(107,114,128,0.1)",  border: "rgba(107,114,128,0.25)", label: "○ Past" },
  };
  const s = statusMap[status] || statusMap.past;

  return (
    <div
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.45)"; e.currentTarget.style.background = "rgba(99,102,241,0.05)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = ""; }}
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.85rem", transition: "all 0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.72rem", color: "#6366F1", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>{type}</span>
        <span style={{ fontSize: "0.75rem", color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: "999px", padding: "3px 10px", fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{s.label}</span>
      </div>
      <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "1.05rem", fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.87rem", lineHeight: 1.65, fontFamily: "'Inter',sans-serif" }}>{desc}</p>
      <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.78rem", fontFamily: "'Inter',sans-serif" }}>📅 {date}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {tags.map(t => (
          <span key={t} style={{ fontSize: "0.72rem", color: "#a5b4fc", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "999px", padding: "2px 10px", fontFamily: "'Inter',sans-serif" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default EventCard;
