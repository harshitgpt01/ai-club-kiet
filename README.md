# AI Club KIET

The club website — React 19 + Vite 8, Tailwind CSS v4, Framer Motion, and
Supabase for recruitment applications.

## Local development

```bash
npm install
cp .env.example .env    # then fill in your Supabase values
npm run dev
```

The site runs without Supabase credentials — the join form falls back to
browser-only `localStorage` and warns in the console. Set the env vars when you
want submissions to reach the database.

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

3. Deploy.

Vite reads env vars at **build** time, not run time — after changing either
value in Vercel, redeploy for it to take effect.

To deploy straight from this directory without GitHub:

```bash
npx vercel          # preview deployment
npx vercel --prod   # production
```
