// Event photos from the two AI Club KIET source docs (the club profile and the
// End-to-End ML Pipeline event report). Every file is imported once here so Vite
// hashes and optimizes it, then shared by the Gallery grid and the Events cards.
//
// Recruitment Drive, the Docker Session, and Python & ML Classes have no photos in
// either doc, so they carry no `src` and fall back to the emoji/gradient card.

import introAiTalk from "../assets/gallery/intro-ai-talk.jpg";
import introAiGroup from "../assets/gallery/intro-ai-group.jpg";
import skillsprintHall from "../assets/gallery/skillsprint-hall.jpg";
import skillsprintLab from "../assets/gallery/skillsprint-lab.jpg";
import skillsprintGroup from "../assets/gallery/skillsprint-group.jpg";
import mentorshipSession from "../assets/gallery/mentorship-session.jpg";
import innotechBooth from "../assets/gallery/innotech-booth.jpg";
import innotechPoster from "../assets/gallery/innotech-poster.jpg";
import mlDay1Workflow from "../assets/gallery/ml-day1-workflow.jpg";
import mlDay1Session from "../assets/gallery/ml-day1-session.jpg";
import mlDay2Handson from "../assets/gallery/ml-day2-handson.jpg";
import mlDay2Hall from "../assets/gallery/ml-day2-hall.jpg";
import mlDay2Mentoring from "../assets/gallery/ml-day2-mentoring.jpg";
import mlDay2Lab from "../assets/gallery/ml-day2-lab.jpg";
import mlDay2Group from "../assets/gallery/ml-day2-group.jpg";
import felicitationCertificates from "../assets/gallery/felicitation-certificates.jpg";
import felicitationGroup from "../assets/gallery/felicitation-group.jpg";
import felicitationTbiLab from "../assets/gallery/felicitation-tbi-lab.jpg";

// `span` drives card height in the masonry grid: tall > wide > normal.
// Portrait shots get "tall" so they aren't cropped to a letterbox.
export const photos = [
  { id: 1, src: mlDay1Workflow, title: "ML Pipeline — The End-to-End Workflow", tag: "Workshop", span: "wide", alt: "Mentor presenting the end-to-end ML workflow diagram on a large screen" },
  { id: 2, src: mlDay1Session, title: "ML Pipeline — Day 1 Learning Session", tag: "Workshop", span: "normal", alt: "Students seated at round tables during the Day 1 learning session" },
  { id: 3, src: mlDay2Hall, title: "ML Pipeline — Day 2 Full House", tag: "Workshop", span: "wide", alt: "Packed lab of students building projects on laptops" },
  { id: 4, src: mlDay2Handson, title: "ML Pipeline — Day 2 Hands-on Build", tag: "Workshop", span: "normal", alt: "Students coding their ML pipelines in Google Colab" },
  { id: 5, src: mlDay2Mentoring, title: "ML Pipeline — Mentor Walkthrough", tag: "Workshop", span: "normal", alt: "Mentor explaining a notebook on screen to a student" },
  { id: 6, src: mlDay2Lab, title: "ML Pipeline — Day 2 Lab Session", tag: "Workshop", span: "wide", alt: "Wide view of the AI lab during the Day 2 build session" },
  { id: 7, src: mlDay2Group, title: "ML Pipeline — The Day 2 Cohort", tag: "Workshop", span: "normal", alt: "Group photo of the Day 2 cohort in front of the presentation screen" },
  { id: 8, src: felicitationCertificates, title: "Felicitation — Top Performers", tag: "Felicitation", span: "tall", alt: "Top performers holding their certificates in front of the AI Club screen" },
  { id: 9, src: felicitationTbiLab, title: "Project Presentations at TBI", tag: "Felicitation", span: "wide", alt: "Students presenting their projects at the TBI ground floor" },
  { id: 10, src: felicitationGroup, title: "Felicitation Ceremony — TBI", tag: "Felicitation", span: "normal", alt: "Group photo from the project presentation and felicitation ceremony" },
  { id: 11, title: "Docker Session — AI Lab", tag: "Session", span: "normal", emoji: "🐳" },
  { id: 12, src: innotechBooth, title: "Innotech — ProPredict Booth", tag: "Showcase", span: "wide", alt: "Team Bexarc standing at the ProPredict booth at Innotech" },
  { id: 13, src: innotechPoster, title: "Innotech — ProPredict Feedback Wall", tag: "Showcase", span: "tall", alt: "ProPredict poster board covered in sticky-note visitor feedback" },
  { id: 14, src: skillsprintHall, title: "SkillSprint 3.0 — Gen AI & RAG Bootcamp", tag: "Bootcamp", span: "wide", alt: "Mentor presenting to a full hall during the SkillSprint 3.0 bootcamp" },
  { id: 15, src: skillsprintLab, title: "SkillSprint 3.0 — H-Block Lab", tag: "Bootcamp", span: "normal", alt: "Students working on laptops during SkillSprint 3.0" },
  { id: 16, src: skillsprintGroup, title: "SkillSprint 3.0 — The Cohort", tag: "Bootcamp", span: "normal", alt: "Group photo of the SkillSprint 3.0 participants" },
  { id: 17, src: introAiTalk, title: "Introduction to AI — D-Block", tag: "Session", span: "wide", alt: "Speaker presenting an AI demo on screen at the Introduction to AI session" },
  { id: 18, src: introAiGroup, title: "Introduction to AI — 200+ Attendees", tag: "Session", span: "normal", alt: "Group photo of attendees at the Introduction to AI session" },
  { id: 19, title: "Recruitment Drive — KIC", tag: "Recruitment", span: "normal", emoji: "📝" },
  { id: 20, src: mentorshipSession, title: "Internal Mentorship Program", tag: "Program", span: "normal", alt: "Senior member mentoring first-year students in a classroom" },
  { id: 21, title: "Python & ML Classes", tag: "Classes", span: "normal", emoji: "🐍" },
];

// The seven cards in the Home page's "Club Moments" reel — same photos as the
// Gallery grid, but titled with the short event name instead of the archive
// caption. Only events that have a photo appear here; Recruitment Drive, the
// Docker Session, and Python & ML Classes are covered on Events and Gallery.
// Slots 0 and 5 render double-width on desktop, so both take a landscape shot.
const highlight = (id, title) => ({ ...photos.find((photo) => photo.id === id), title });

export const homeHighlights = [
  highlight(1, "End-to-End ML Pipeline Session"),
  highlight(17, "Introduction to AI"),
  highlight(14, "SkillSprint 3.0"),
  highlight(20, "Internal Mentorship Program"),
  highlight(12, "Innotech Presentation"),
  highlight(9, "Project Presentations at TBI"),
  highlight(7, "ML Pipeline — The Day 2 Cohort"),
];

// Cover shot for each card on the Events page. Events with no photo in the source
// docs are absent here and render a gradient banner instead.
export const eventCovers = {
  mentorship: mentorshipSession,
  mlPipeline: mlDay1Workflow,
  innotech: innotechBooth,
  skillsprint: skillsprintHall,
  introAi: introAiTalk,
};
