import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

const allEvents = [
  { id: 1, title: "Neural Nexus Hackathon 2026", date: "Mar 15–16, 2026", type: "Hackathon", status: "upcoming", desc: "48-hour AI hackathon open to all KIET students. Build projects with real-world impact across healthcare, climate, and education.", tags: ["AI", "Open Data", "Cash Prizes", "Team"] },
  { id: 2, title: "Industry Connect: Google AI", date: "Apr 5, 2026", type: "Talk", status: "upcoming", desc: "Live session with Google Brain researchers on deploying large-scale language models in production environments.", tags: ["LLM", "MLOps", "Career"] },
  { id: 3, title: "Python for Data Science Bootcamp", date: "May 10–12, 2026", type: "Workshop", status: "upcoming", desc: "3-day intensive covering NumPy, Pandas, Matplotlib, and end-to-end ML pipelines. Perfect for beginners.", tags: ["Python", "Pandas", "Beginners"] },
  { id: 4, title: "Deep Learning Bootcamp", date: "Feb 20–22, 2026", type: "Workshop", status: "past", desc: "Hands-on 3-day series covering CNNs, RNNs, and Transformers using PyTorch. Attended by 120+ students.", tags: ["PyTorch", "NLP", "CV"] },
  { id: 5, title: "Kaggle Competition Sprint", date: "Jan 28, 2026", type: "Competition", status: "past", desc: "Guided sprint through a live Kaggle competition. Teams formed on the spot, mentors assigned to each group.", tags: ["Kaggle", "Competitive ML", "Teamwork"] },
  { id: 6, title: "AI Ethics Panel Discussion", date: "Dec 12, 2025", type: "Talk", status: "past", desc: "Faculty and industry experts discuss bias, fairness, and the societal impact of AI systems.", tags: ["Ethics", "Policy", "Discussion"] },
  { id: 7, title: "Computer Vision Workshop", date: "Nov 5, 2025", type: "Workshop", status: "past", desc: "From edge detection to YOLO object detection. Hands-on session with live webcam demos.", tags: ["OpenCV", "YOLO", "Real-time"] },
  { id: 8, title: "Resume & LinkedIn for AI Roles", date: "Oct 15, 2025", type: "Career", status: "past", desc: "Senior students and alumni review resumes and share what top AI companies actually look for.", tags: ["Career", "LinkedIn", "Internship"] },
];

const filters = ["All", "Upcoming", "Past", "Workshop", "Hackathon", "Talk", "Career", "Competition"];

function Events() {
  const [active, setActive] = useState("All");

  const filtered = allEvents.filter(e => {
    if (active === "All") return true;
    if (active === "Upcoming") return e.status === "upcoming";
    if (active === "Past") return e.status === "past";
    return e.type === active;
  });

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "10rem 1.5rem 5rem", textAlign: "center", background: "linear-gradient(180deg,#0A0A0F 0%,#0D0D1A 100%)" }}>
        <span style={{ fontSize: "0.78rem", color: "#6366F1", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Calendar</span>
        <h1 style={{ fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 900, color: "#fff", marginTop: "0.75rem", letterSpacing: "-2px", fontFamily: "'Inter',sans-serif", lineHeight: 1.1 }}>
          Events &{" "}
          <span style={{ background: "linear-gradient(90deg,#6366F1,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Workshops</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "1rem", maxWidth: "480px", margin: "1rem auto 0", fontFamily: "'Inter',sans-serif", lineHeight: 1.7 }}>
          Hackathons, workshops, talks, and career sessions — something every month for every skill level.
        </p>
      </section>

      {/* Filter pills */}
      <section style={{ padding: "0 1.5rem 3rem", background: "#0A0A0F" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2.5rem" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)}
                style={{
                  background: active === f ? "linear-gradient(135deg,#6366F1,#06B6D4)" : "rgba(255,255,255,0.04)",
                  border: active === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: active === f ? "#fff" : "rgba(255,255,255,0.5)",
                  padding: "8px 18px", borderRadius: "999px",
                  fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                  fontFamily: "'Inter',sans-serif", transition: "all 0.2s",
                  boxShadow: active === f ? "0 0 16px rgba(99,102,241,0.4)" : "none"
                }}>
                {f}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.5rem" }}>
            {filtered.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.3)", fontFamily: "'Inter',sans-serif" }}>
              No events found for this filter.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Events;
