import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";

/**
 * The two error shapes every form on the site uses. They live together because
 * they are one pattern seen at two altitudes — a note under a single input, and a
 * banner for a failure that belongs to the whole form — and JoinUs, Home and
 * Contact each need both.
 */

/**
 * A note under one input. `id` is what that input points its aria-describedby at,
 * so the message is announced with the field rather than read out in isolation.
 */
export default function FieldError({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
      <FiAlertCircle className="shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * A banner for a failure that is not any one field's fault — the server refused,
 * or the network dropped. role="alert" so it is announced the moment it appears,
 * which for a submit failure is the only cue a screen-reader user gets.
 */
export function FormError({ children, className = "mt-5" }) {
  return (
    <p
      role="alert"
      className={`flex gap-2.5 rounded-lg border border-red-400/30 bg-red-400/8 p-3.5 text-xs leading-6 text-red-300 ${className}`}
    >
      <FiAlertTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
