-- AI Club KIET — recruitment applications
--
-- Run this in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Re-running it is safe. A fresh database gets everything from the create table
-- below; a database that already has an `applications` table from an earlier
-- revision of this file is brought up to date by the migration block at the end.
--
-- IMPORTANT: the anon key ships inside the client bundle, so anyone can POST
-- straight at this table with curl. Every rule that matters is enforced here,
-- not in src/pages/JoinUs.jsx — the client-side validation is only there to
-- give applicants fast feedback.

-- The two domain lists live in functions so the CHECK constraints below and the
-- migration block at the end all read them from one place. IMMUTABLE is what
-- makes them legal inside a CHECK; note that editing one later does NOT
-- re-validate rows already in the table. Keep them in sync with `coDomains` and
-- `workingDomains` in src/pages/JoinUs.jsx.
--
-- The lists are deliberately disjoint: a co-domain is the technical track, a
-- working domain is the team that runs events. Earlier revisions drew both picks
-- from one combined list.
create or replace function public.ai_club_co_domains()
  returns text[]
  language sql
  immutable
  parallel safe
  set search_path = ''
  as $fn$
    select array['AI & ML', 'AI Security']
  $fn$;

create or replace function public.ai_club_working_domains()
  returns text[]
  language sql
  immutable
  parallel safe
  set search_path = ''
  as $fn$
    select array[
      'Web Development', 'Media & Graphics', 'Management & PR', 'Corporate & Finance'
    ]
  $fn$;

create table if not exists public.applications (
  id                  uuid        primary key default gen_random_uuid(),
  name                text        not null,
  gender              text        not null,
  registration_number text        not null unique,
  branch              text        not null,
  section             text        not null,
  -- Hosteller = lives on campus; Day Scholar / PG = commutes in, either from
  -- home or from a rented room off campus.
  accommodation       text        not null,
  email               text        not null unique,
  phone               text        not null,
  -- The applicant picks exactly one working domain and may add a co-domain from
  -- the separate technical list, so co_domain is the only nullable column here.
  working_domain      text        not null,
  co_domain           text,
  submitted_at        timestamptz not null,
  created_at          timestamptz not null default now(),

  -- Mirrors of the client-side validation in src/pages/JoinUs.jsx.
  constraint applications_name_valid
    check (name ~ '^[A-Za-z][A-Za-z\s.''-]*$' and char_length(name) between 3 and 49),
  -- Keep this list in sync with `genders` in src/pages/JoinUs.jsx.
  constraint applications_gender_valid
    check (gender in ('Male', 'Female', 'Other', 'Prefer not to say')),
  -- Uppercased by the client. Deliberately loose about shape: KIET has issued
  -- more than one roll-number format, and rejecting a real one costs a real
  -- applicant their submission.
  constraint applications_registration_number_valid
    check (registration_number ~ '^[A-Z0-9]{6,20}$'),
  constraint applications_section_valid
    check (section ~ '^[A-Z0-9]{1,3}$'),
  -- Keep this list in sync with `accommodations` in src/pages/JoinUs.jsx.
  constraint applications_accommodation_valid
    check (accommodation in ('Hosteller', 'Day Scholar / PG')),
  constraint applications_email_kiet
    check (email ~ '^[a-z0-9._%+-]+@kiet\.edu$'),
  -- The unique index above is case-sensitive, so force one canonical form of
  -- each address — otherwise a@kiet.edu and A@kiet.edu both get in.
  constraint applications_email_lowercase
    check (email = lower(email)),
  constraint applications_phone_valid
    check (phone ~ '^[6-9][0-9]{9}$'),
  constraint applications_working_domain_valid
    check (working_domain = any (public.ai_club_working_domains())),
  -- Optional, but when it is set it has to be a real co-domain. The two lists
  -- are disjoint now, so unlike earlier revisions there is nothing to check
  -- against the working domain.
  constraint applications_co_domain_valid
    check (co_domain is null or co_domain = any (public.ai_club_co_domains())),
  -- Stops a spammer backdating or future-dating rows to skew the log.
  constraint applications_submitted_at_sane
    check (submitted_at > '2024-01-01' and submitted_at < now() + interval '1 day')
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Migration. `create table if not exists` skips an existing table outright, so
-- this is what brings a table made by an earlier revision — no gender,
-- registration number or accommodation, all domains in one text[], and the old
-- three-way accommodation split — up to the shape above. Every statement is a
-- no-op on a database the create just built, and the whole block is safe to run
-- repeatedly.
-- ─────────────────────────────────────────────────────────────────────────────
do $$
begin
  alter table public.applications add column if not exists gender              text;
  alter table public.applications add column if not exists registration_number text;
  alter table public.applications add column if not exists accommodation       text;
  alter table public.applications add column if not exists working_domain      text;
  alter table public.applications add column if not exists co_domain           text;

  if exists (
    select 1 from information_schema.columns
     where table_schema = 'public'
       and table_name   = 'applications'
       and column_name  = 'domains'
  ) then
    -- The old form collected up to eight domains at once. Move the first pick
    -- into working_domain, then park the original array under a legacy name
    -- instead of dropping the rest on the floor. It becomes nullable, so inserts
    -- from the current form (which never mention it) still go through; drop the
    -- column by hand once those applications are exported.
    --
    -- co_domain is deliberately left null: the co-domain list is now its own
    -- technical pair, and no value from the old combined list belongs in it.
    -- working_domain gets domains[1] because the column is NOT NULL, but that
    -- value may well be one of the retired domains — the notice below says so.
    alter table public.applications drop constraint if exists applications_domains_valid;
    execute $backfill$
      update public.applications
         set working_domain = domains[1]
       where working_domain is null
    $backfill$;
    alter table public.applications alter column domains drop not null;
    alter table public.applications rename column domains to legacy_domains;
  end if;

  -- These three constraints still name the *old* value lists, so they have to go
  -- before the remap below can write a new value, and before the old
  -- ai_club_domains() they reference can be dropped at the end of this file.
  -- They are dropped out here rather than inside the guarded block so the drops
  -- survive even if that block rolls back.
  alter table public.applications drop constraint if exists applications_accommodation_valid;
  alter table public.applications drop constraint if exists applications_working_domain_valid;
  alter table public.applications drop constraint if exists applications_co_domain_valid;

  -- Accommodation used to be three values. 'Hostel' was renamed and the two
  -- commuter cases collapsed into one option, and both moves are unambiguous —
  -- so remap in place instead of leaving rows the new CHECK would refuse.
  update public.applications
     set accommodation = 'Hosteller'
   where accommodation = 'Hostel';
  update public.applications
     set accommodation = 'Day Scholar / PG'
   where accommodation in ('Day Scholar', 'PG');

  -- Everything below scans the rows already in the table, so a row written
  -- before this revision — no gender, registration number or accommodation, or a
  -- domain pick from a list that no longer exists — would abort the whole script
  -- on the first constraint it reaches. Catching that narrow case keeps the
  -- column adds, the domain backfill and the accommodation remap above committed
  -- and the live form working, and reports what to repair. plpgsql runs the block
  -- below as a subtransaction, so a failure here rolls back cleanly rather than
  -- half-applying constraints.
  begin
    alter table public.applications alter column gender              set not null;
    alter table public.applications alter column registration_number set not null;
    alter table public.applications alter column accommodation       set not null;
    alter table public.applications alter column working_domain      set not null;

    -- The same definitions as the create table above, re-stated because ALTER TABLE
    -- has no ADD CONSTRAINT IF NOT EXISTS. Drop-then-add keeps re-runs idempotent.
    -- Edit both copies together.
    alter table public.applications drop constraint if exists applications_registration_number_key;
    alter table public.applications add  constraint applications_registration_number_key
      unique (registration_number);

    alter table public.applications drop constraint if exists applications_gender_valid;
    alter table public.applications add  constraint applications_gender_valid
      check (gender in ('Male', 'Female', 'Other', 'Prefer not to say'));

    alter table public.applications drop constraint if exists applications_registration_number_valid;
    alter table public.applications add  constraint applications_registration_number_valid
      check (registration_number ~ '^[A-Z0-9]{6,20}$');

    alter table public.applications drop constraint if exists applications_accommodation_valid;
    alter table public.applications add  constraint applications_accommodation_valid
      check (accommodation in ('Hosteller', 'Day Scholar / PG'));

    alter table public.applications drop constraint if exists applications_working_domain_valid;
    alter table public.applications add  constraint applications_working_domain_valid
      check (working_domain = any (public.ai_club_working_domains()));

    alter table public.applications drop constraint if exists applications_co_domain_valid;
    alter table public.applications add  constraint applications_co_domain_valid
      check (co_domain is null or co_domain = any (public.ai_club_co_domains()));
  exception
    -- Deliberately narrow: a typo in this file raises a different SQLSTATE and
    -- still fails loudly instead of being swallowed as a notice.
    when not_null_violation or check_violation or unique_violation then
      raise notice
        'public.applications: existing rows are blocking the new constraints (%). Every row needs a gender (Male / Female / Other / Prefer not to say), a registration_number (6-20 characters, A-Z and 0-9 only), an accommodation (either Hosteller or the single value "Day Scholar / PG"), a working_domain (Web Development / Media & Graphics / Management & PR / Corporate & Finance) and either a null co_domain or one of AI & ML / AI Security. Domain picks made under the old combined list have no automatic equivalent, so remap or delete those rows by hand — the original array is kept in legacy_domains — then run this file again. Until then the new columns are unconstrained, so keep the window short.',
        sqlerrm;
  end;
end $$;

-- The combined list the working and co-domain CHECKs used to share. Both
-- constraints that referenced it were dropped above, so this is safe to run
-- whether or not an earlier revision ever created it.
drop function if exists public.ai_club_domains();

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
