import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import JoinUs from "./pages/JoinUs";
import SplashScreen from "./components/SplashScreen";
import ResultsAnnouncement from "./components/ResultsAnnouncement";
import Results from "./pages/Results";

function ScrollTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function App() {
  // Show splash only once per browser session (on first load / fresh tab).
  const [showSplash, setShowSplash] = useState(() => {
    try { return !sessionStorage.getItem("aiclub_splash_shown"); }
    catch { return true; }
  });

  const handleSplashDone = () => {
    try { sessionStorage.setItem("aiclub_splash_shown", "true"); }
    catch { /* Keep navigation usable if browser storage is unavailable. */ }
    setShowSplash(false);
  };

  return (
    <BrowserRouter>
      <ScrollTop />

      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      {!showSplash && <ResultsAnnouncement />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
