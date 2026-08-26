import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// The site still builds and runs without credentials — applications just fall
// back to browser-only storage. See .env.example.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      // Nothing here signs in, so there is no session worth persisting.
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — " +
      "applications will only be saved in this browser. See .env.example."
  );
}
