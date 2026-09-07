// Whether the recruitment form accepts submissions. Flip this to true to reopen
// the drive — the Join Us page, the deadline strip, and the About CTA all read
// it, so there is one switch and no copy left saying "open" after it closes.
export const REGISTRATIONS_OPEN = false;

// The deadline that just passed. Kept even while closed so the strip can say
// when the window shut rather than only that it did.
export const REGISTRATION_DEADLINE = "7 September, 12 PM";

// Shown in the scrolling strip on Home and Join Us.
export const REGISTRATION_NOTICE = REGISTRATIONS_OPEN
  ? `Registrations will be closing on ${REGISTRATION_DEADLINE}`
  : `Registrations closed on ${REGISTRATION_DEADLINE} — follow the WhatsApp group for the next drive`;

// Every applicant is pointed here, because that is where shortlists, interview
// slots and the next drive get announced. Invite links can be reset from the
// group admin screen, so this is the single place to change it.
export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/BbfIZ5eTEBECYVDg4o60B8";
