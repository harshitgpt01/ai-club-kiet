# AI Club KIET

The club website — React 19 + Vite 8, Tailwind CSS v4, Framer Motion, and
Supabase for recruitment applications.

## Results announcement

The homepage announces “Results are Out.” after the intro animation. Dismissing
the popup or selecting View Results hides it for the current browser session.
The Results navigation item and homepage button remain available afterward.

`/results` displays the approved workbook data in domain-separated
tables, with separate learning and working domain columns. Duplicate entries are
intentional. The downloadable files live in `public/results/`; the displayed data
lives in `src/data/results.json`. Update all three together when results change.
Only the five published columns are included; the original registration details
and contact information are not bundled. No new environment variables are needed.

## Local development

```bash
npm install
cp .env.example .env    # then fill in your own Supabase and Resend values
npm run dev
```

The site runs without Supabase credentials — the join form falls back to
browser-only `localStorage` and warns in the console. Set the env vars when you
want submissions to reach the database.

`npm run dev` serves the React app only: Vite does not run the functions under
`api/`, so **the contact form cannot send under `npm run dev`** — a submit logs a
console warning and shows the generic failure copy. To exercise it locally, use
the Vercel CLI, which loads `.env` and actually runs `api/contact.js`:

```bash
npx vercel dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint |

## Supabase

Run `supabase/schema.sql` in the dashboard (SQL Editor → New query → paste →
Run). It creates the `applications` table, its validation constraints, and the
Row Level Security policies. Re-running it is safe, and is how you apply changes
to the form: the file also migrates a table left by an earlier revision. If it
reports that existing rows are blocking the new constraints, fill in or delete
those rows as the notice describes and run it again.

RLS is deliberately insert-only for the `anon` role: there is no select, update,
or delete policy, so the publishable key that ships in the client bundle cannot
read the applicant list back out. Read applications through the dashboard, which
bypasses RLS.

**Key hygiene:** `VITE_SUPABASE_ANON_KEY` must be the **publishable** key
(`sb_publishable_…`, or a legacy anon JWT starting `eyJ`). Every `VITE_`-prefixed
variable is compiled into the public JavaScript bundle, so a `sb_secret_` key or
a `service_role` JWT placed here would be world-readable and would bypass RLS
entirely. If a secret key is ever committed or deployed, rotate it in Project
Settings → API.

## Contact form

The form on `/` and `/contact` posts to `api/contact.js`, a Vercel Serverless
Function that relays the message through [Resend](https://resend.com). It runs
server-side on purpose: none of its three variables carry a `VITE_` prefix, and
they must not gain one — every `VITE_`-prefixed value is compiled into the public
JavaScript bundle, and a leaked sending key lets anyone send mail as the club.

| Name | Purpose |
| --- | --- |
| `RESEND_API_KEY` | From resend.com → API Keys. Without it the form still renders and validates, but tells the visitor to email the club directly rather than pretending to have sent. |
| `CONTACT_TO_EMAIL` | Where messages land. Defaults to `aiclubkiet@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Must be an address on a domain verified in Resend. Defaults to the shared sandbox sender, `AI Club KIET <onboarding@resend.dev>`. |

Until a club domain is verified in Resend, the shared sandbox sender only
delivers to the address that owns the Resend account — so keep that account
registered to `CONTACT_TO_EMAIL`. Once a domain is verified, point
`CONTACT_FROM_EMAIL` at an address on it and mail to any recipient starts
working.

Validation lives in two places by design: `src/lib/contact.js` answers the
visitor without a round trip, and `api/contact.js` repeats the same rules because
anyone can POST straight at the endpoint with `curl`. Change one, change both.

## Deploying to Vercel

`vercel.json` holds the deploy config. The rewrite rule matters: this is a
single-page app using `BrowserRouter`, so without it a hard refresh on
`/team` or `/join` would 404 — Vercel would look for a file at that path.
Hashed files under `/assets/` are cached immutably for a year; `index.html` is
never cached, so a new deploy is picked up immediately.

1. Push the repo to GitHub, then import it at
   [vercel.com/new](https://vercel.com/new). Framework preset, build command,
   and output directory are already set by `vercel.json`.
2. Add the environment variables in Project Settings → Environment Variables,
   for the Production, Preview, and Development environments:

   | Name | Value |
   | --- | --- |
   | `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `sb_publishable_…` |
   | `RESEND_API_KEY` | `re_…` — **required, or the contact form reports itself unconfigured** |
   | `CONTACT_TO_EMAIL` | `aiclubkiet@gmail.com` (optional; same default in code) |
   | `CONTACT_FROM_EMAIL` | `AI Club KIET <onboarding@resend.dev>` (optional; same default in code) |

3. Deploy.

Vite reads the `VITE_` values at **build** time, not run time, and Vercel injects
the rest into the function from the deployment's own config — so a change to any
of them needs a **redeploy** before it takes effect. Adding `RESEND_API_KEY` to
Project Settings does nothing for the deployment already serving traffic.

To deploy straight from this directory without GitHub:

```bash
npx vercel          # preview deployment
npx vercel --prod   # production
```
