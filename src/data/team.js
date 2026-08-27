
// Core team roster. Photos come from the club's "AI CLUB POST" shoot — full-body
// cutouts on transparent backgrounds, normalised to one 3:4 frame with every
// figure scaled to the same height and bottom-aligned, so heads line up across a
// row. TeamCard supplies the backdrop (see .team-stage in index.css).
//
// Names and roles are transcribed from the shoot filenames. Imported here once so
// Vite hashes each file and the page ships hashed WebP rather than raw uploads.

import antasDubey from "../assets/team/antas-dubey.webp";
import architDubey from "../assets/team/archit-dubey.webp";
import adarshSrivastava from "../assets/team/adarsh-srivastava.webp";
import ganeshKanojiya from "../assets/team/ganesh-kanojiya.webp";
import harshitGupta from "../assets/team/harshit-gupta.webp";
import adityaSingh from "../assets/team/aditya-singh.webp";
import mehakBhatia from "../assets/team/mehak-bhatia.webp";
import ananyaBaranwal from "../assets/team/ananya-baranwal.webp";
import tanyaMisha from "../assets/team/tanya-misha.webp";
import satwikSrivastava from "../assets/team/satwik-srivastava.webp";
import shaswatMishra from "../assets/team/shaswat-mishra.webp";

export const officeBearers = [
  { name: "Antas Kumar Dubey", role: "President", photo: antasDubey },
  { name: "Archit Dubey", role: "Vice President", photo: architDubey },
];

// Nine leads — a clean 3x3 at desktop.
export const leads = [
  { name: "Adarsh Srivastava", role: "ML Lead", photo: adarshSrivastava },
  { name: "Ganesh Kanojiya", role: "AI Security Lead", photo: ganeshKanojiya },
  { name: "Harshit Gupta", role: "Web Lead", photo: harshitGupta },
  { name: "Aditya Singh", role: "Academic Lead", photo: adityaSingh },
  { name: "Mehak Bhatia", role: "Academic Lead", photo: mehakBhatia },
  { name: "Ananya Baranwal", role: "Graphics & Media Lead", photo: ananyaBaranwal },
  { name: "Tanya Misha", role: "PR & Outreach Lead", photo: tanyaMisha },
  { name: "Satwik Srivastava", role: "Management Lead", photo: satwikSrivastava },
  {
    name: "Shaswat Mishra",
    role: "Corporate, Finance & Collaboration Lead",
    photo: shaswatMishra,
  },
];
