// Final selection list for the 2025 recruitment drive (AI Security domain).
// Source: the club's "AI CLUB FINAL SHEET", read once and copied in here.
//
// Deliberately NOT fetched from that sheet at runtime. The sheet also holds
// every applicant's email, phone number, registration number and gender, and a
// browser-side fetch would hand all of it to every visitor — sitting in the
// Network tab in full even though the popup renders two columns. Copying the
// two publishable columns across is the only version where the private ones
// cannot leak, and it also means the announcement cannot break if the sheet is
// renamed, re-shared, or edited mid-drive.
//
// To refresh after the next drive: re-export the sheet and rewrite this array.

// The popup only mounts while this is true. Flip it to false once the
// announcement has run its course — that retires the popup without deleting
// the list, so /results-style deep links and the nav entry keep working.
export const RESULTS_LIVE = true;

// Heading copy lives here so the popup, the nav pill and the strip can never
// disagree about which drive is being announced.
export const RESULTS_TITLE = "Recruitment Results";
export const RESULTS_SUBTITLE = "AI Security domain · 2025 drive";

// Names are title-cased and branch labels normalised to one spelling each
// ("CSE - AIML", "CSE AIML" and "AIML" all arrive from the sheet as separate
// strings for the same branch). Only the presentation is normalised; no row was
// added, dropped or reassigned.
//
// Sorted by name, not by year or domain: the one thing a visitor does with this
// list is look for themselves in it.
export const selectedMembers = [
  { name: "Abhinav Agarwal", branch: "CSE (AIML)" },
  { name: "Abhyuday Arya", branch: "CSIT" },
  { name: "Aditya Raj Jain", branch: "CS" },
  { name: "Aditya Rastogi", branch: "CSIT" },
  { name: "Akshat Kumar Singh", branch: "CSE (AI)" },
  { name: "Aman Jha", branch: "CS" },
  { name: "Amit Singh", branch: "CSE (Cyber Security)" },
  { name: "Ankush", branch: "CSE (AIML)" },
  { name: "Anshita Sharma", branch: "CSIT" },
  { name: "Anshul", branch: "CSIT" },
  { name: "Arya Shah", branch: "CSIT" },
  { name: "Bhavya Garg", branch: "IT" },
  { name: "Bhavya Tayal", branch: "IT" },
  { name: "Divya Verma", branch: "CSE (AIML)" },
  { name: "Harshika Tyagi", branch: "CS" },
  { name: "Madhav Muthreja", branch: "CS" },
  { name: "Meenal Mishra", branch: "CSE (AIML)" },
  { name: "Prabhat Rajput", branch: "CSE (Cyber Security)" },
  { name: "Purva Jain", branch: "CSE (AIML)" },
  { name: "Ravi Kumar", branch: "CS" },
  { name: "Ravleen Kaur", branch: "CSE" },
  { name: "Ronak Tyagi", branch: "CSE (CS)" },
  { name: "Shah Inzamamul Haque", branch: "CSE" },
  { name: "Tarasha", branch: "CSE" },
  { name: "Tejsvi Kalunia", branch: "CSIT" },
  { name: "Umang Jaiswal", branch: "CSE (Cyber Security)" },
  { name: "Vaibhav Maurya", branch: "CSE (AI)" },
  { name: "Vaibhavi Garg", branch: "CSE (Cyber Security)" },
  { name: "Vimal Shukla", branch: "CSE (Cyber Security)" },
];

export const selectedCount = selectedMembers.length;
