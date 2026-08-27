import { useState } from "react";
import {
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  EMPTY_CONTACT_FORM,
  sendContactMessage,
  validateContact,
} from "./contact";

/**
 * Everything the contact form does, minus how it looks.
 *
 * Home and Contact show the same four fields in two different layouts — a
 * two-column panel on the landing page, a stacked card with a success screen on
 * /contact — so the markup stays in the pages and only the behaviour lives here.
 * Without this the whole submit path (validate, focus the first bad field, send,
 * attribute a server-side field error, clear) would be copied into both.
 *
 * @param idPrefix distinguishes the DOM ids, so the two forms keep working if they
 *   ever end up on one page together.
 */
export function useContactForm(idPrefix) {
  const [form, setForm] = useState(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fieldId = (name) => `${idPrefix}-${name}`;

  const update = (event) => {
    const next = { ...form, [event.target.name]: event.target.value };
    setForm(next);
    // Once they have tried to submit once, re-check on every change so the errors
    // clear as they are fixed instead of sitting there until the next attempt.
    if (attempted) setErrors(validateContact(next));
  };

  /**
   * Spread onto an input or textarea. maxLength stops the field short of the
   * matching server-side ceiling, and aria-describedby wires it to the FieldError
   * the page renders underneath.
   */
  const fieldProps = (name) => {
    const id = fieldId(name);
    return {
      id,
      name,
      value: form[name],
      onChange: update,
      maxLength: CONTACT_LIMITS[name],
      "aria-invalid": errors[name] ? "true" : undefined,
      "aria-describedby": errors[name] ? `${id}-error` : undefined,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending) return; // ignore a double-click on the submit button
    setAttempted(true);
    setSubmitError("");

    const found = validateContact(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = CONTACT_FIELDS.find((name) => found[name]);
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setSending(true);
    let result;
    try {
      result = await sendContactMessage(form);
    } catch (error) {
      // sendContactMessage handles the network and the server's own refusals; this
      // is a thrown fault on top of that.
      console.error("[contact] unexpected send failure:", error);
      result = { ok: false, message: "Something went wrong on our end. Please try again in a moment." };
    } finally {
      setSending(false);
    }

    if (!result.ok) {
      if (result.field) {
        setErrors({ [result.field]: result.message });
        document.getElementById(fieldId(result.field))?.focus();
      } else {
        setSubmitError(result.message);
      }
      return;
    }

    // Clear the fields on the way to the confirmation, so going back to the form
    // starts a genuinely new message rather than re-showing the sent one.
    setForm(EMPTY_CONTACT_FORM);
    setErrors({});
    setAttempted(false);
    setSent(true);
  };

  const reset = () => {
    setForm(EMPTY_CONTACT_FORM);
    setErrors({});
    setAttempted(false);
    setSent(false);
    setSubmitError("");
  };

  return {
    form,
    errors,
    // Only worth showing after a failed attempt — before that, an empty form is
    // not an invalid one.
    errorCount: attempted ? Object.keys(errors).length : 0,
    sending,
    sent,
    submitError,
    fieldId,
    fieldProps,
    handleSubmit,
    reset,
  };
}
