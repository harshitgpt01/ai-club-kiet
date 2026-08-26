-- AI Club KIET — recruitment applications
--
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- IMPORTANT: the anon key ships inside the client bundle, so anyone can POST
-- straight at this table with curl. Every rule that matters is enforced here,
-- not in src/pages/JoinUs.jsx — the client-side validation is only there to
-- give applicants fast feedback.

create table if not exists public.applications (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  branch       text        not null,
  section      text        not null,
  email        text        not null unique,
  phone        text        not null,
  domains      text[]      not null,
  submitted_at timestamptz not null,
  created_at   timestamptz not null default now(),

  -- Mirrors of the client-side validation in src/pages/JoinUs.jsx.
  constraint applications_name_valid
    check (name ~ '^[A-Za-z][A-Za-z\s.''-]*$' and char_length(name) between 3 and 49),
  constraint applications_section_valid
    check (section ~ '^[A-Z0-9]{1,3}$'),
  constraint applications_email_kiet
    check (email ~ '^[a-z0-9._%+-]+@kiet\.edu$'),
  -- The unique index above is case-sensitive, so force one canonical form of
  -- each address — otherwise a@kiet.edu and A@kiet.edu both get in.
  constraint applications_email_lowercase
    check (email = lower(email)),
  constraint applications_phone_valid
    check (phone ~ '^[6-9][0-9]{9}$'),
  -- array_length() returns NULL for '{}', and a NULL check passes, so the
  -- length test alone would let an empty array through — hence the coalesce.
  -- Keep this list in sync with `domains` in src/pages/JoinUs.jsx.
  constraint applications_domains_valid check (
    coalesce(array_length(domains, 1), 0) between 1 and 8
    and array_position(domains, null) is null
    and domains <@ array[
      'Machine Learning', 'Data Science', 'Web Development', 'Computer Vision',
      'NLP / Research', 'Reinforcement Learning', 'Design / Creative', 'Event Management'
    ]::text[]
  ),
  -- Stops a spammer backdating or future-dating rows to skew the log.
  constraint applications_submitted_at_sane
    check (submitted_at > '2024-01-01' and submitted_at < now() + interval '1 day')
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

alter table public.applications enable row level security;

-- Applicants may only ever add a row. There is deliberately NO select, update,
-- or delete policy for anon/authenticated, so the public key cannot read the
-- applicant list back out — RLS denies anything a policy does not allow.
-- The club reads records through the dashboard, which bypasses RLS.
drop policy if exists "anon can submit an application" on public.applications;
create policy "anon can submit an application"
  on public.applications
  for insert
  to anon
  with check (true);
