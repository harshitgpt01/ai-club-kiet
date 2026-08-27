/**
 * Client half of the contact form.
 *
 * Home and Contact each render their own markup — the two panels are laid out
 * differently — but they share the validation and the POST from here, the same way
 * JoinUs shares its Supabase writes through src/lib/applications.js. The rules
 * below are mirrored server-side in api/contact.js, which is the copy that
 * actually decides what gets sent; this one is here to answer the visitor without
 * a round trip.
 */

const ENDPOINT = "/api/contact";

/** Where messages land. Shown in the failure copy so nothing is a dead end. */
export const CLUB_EMAIL = "aiclubkiet@gmail.com";

// maxLength on the inputs, so the field stops accepting text before it can trip
// the matching server-side ceiling. Keep in sync with RULES in api/contact.js.
export const CONTACT_LIMITS = { name: 80, email: 254, subject: 120, message: 4000 };

export const EMPTY_CONTACT_FORM = { name: "", email: "", subject: "", message: "" };

/** Focus order for jumping to the first invalid field on a failed submit. */
export const CONTACT_FIELDS = ["name", "email", "subject", "message"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Please enter your full name.";

  if (!email) errors.email = "Enter an email address we can reply to.";
  else if (!EMAIL_RE.test(email)) errors.email = "That doesn't look like a valid email address.";

  if (!subject) errors.subject = "Add a subject so we know what this is about.";
  else if (subject.length < 3) errors.subject = "Add a few more words to the subject.";

  if (!message) errors.message = "Tell us what you'd like to say.";
  else if (message.length < 10) errors.message = "A little more detail helps us reply properly.";

  return errors;
}

const OFFLINE_MESSAGE = "We couldn't reach our server. Check your connection and try again.";

const FALLBACK_MESSAGE =
  `Something went wrong on our end. Please try again in a moment, or email ${CLUB_EMAIL} directly.`;

/**
 * Send one message to the club inbox.
 * @returns {Promise<{ok: true} | {ok: false, field?: string, message: string}>}
 */
export async function sendContactMessage(form) {
  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim().replace(/\s+/g, " "),
        email: form.email.trim(),
        subject: form.subject.trim().replace(/\s+/g, " "),
        message: form.message.trim(),
      }),
    });
  } catch (error) {
    console.error("[contact] request failed:", error);
    return { ok: false, message: OFFLINE_MESSAGE };
  }

  // A 200 is not proof the function ran. `vite dev` serves no /api routes, and on
  // Vercel an unmatched path falls through the SPA rewrite in vercel.json and
  // comes back as index.html — both of which look like success. Only a JSON reply
  // is a real answer from the handler.
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    if (import.meta.env.DEV) {
      console.warn(
        `[contact] ${ENDPOINT} did not return JSON. \`vite dev\` does not run the ` +
          "functions under api/ — use `npx vercel dev` to test sending locally."
      );
    }
    return { ok: false, message: FALLBACK_MESSAGE };
  }

  const payload = await response.json().catch(() => null);

  if (response.ok && payload?.ok) return { ok: true };

  // The server names a field when it can be pointed at one, so the error lands on
  // the input instead of in a banner.
  if (payload?.field) return { ok: false, field: payload.field, message: payload.message };

  return { ok: false, message: payload?.message || FALLBACK_MESSAGE };
}
