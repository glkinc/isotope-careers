# Isotope Careers Canada — Project Notes

Context for resuming this project in a new session. This is a rewrite of an
old PHP/MySQL site (`~/Desktop/public_html`, "Sabertree") as a focused,
public-facing Next.js app about careers in **isotope production and use in
Canada**.

## Origin / decisions made

- Old site was a general career-guidance PHP app with login, onboarding, a
  personality quiz, dashboards, achievements, and an **unauthenticated admin
  panel**. Real problems found in it: business logic inline in ~30 PHP files,
  no ORM, a "one MySQL table per career" pattern with table names built from
  user input (SQL-injection-prone), hardcoded plaintext DB credentials
  duplicated in three files.
- Decided to rebuild narrower and cleaner rather than port it:
  - **Scope**: careers, education paths, skill tree only. Dropped: login/user
    accounts, personality test/survey, achievements, admin panel — **not
    needed for MVP** (public-facing, no auth).
  - **Topic**: narrowed from "all careers" to specifically **isotope
    production and use careers in Canada** (medical isotopes, reactor
    operations, radiopharmaceuticals, regulatory/safety, logistics).
  - **Stack**: Next.js (App Router) + TypeScript + Tailwind CSS, deployed on
    Vercel. Postgres (Neon) + Drizzle ORM for the database, chosen over MySQL
    since a fresh start was fine and Postgres/Drizzle gives real
    foreign keys instead of the old string-matched relationships.
  - **Data**: fresh start, no migration from the old MySQL DB.
- Full written plan is preserved at
  `~/.claude/plans/crispy-snuggling-squirrel.md` (approved plan from the
  planning session) — has the original rationale and full route list.

## What's been built so far

Project scaffolded at `~/Desktop/isotope-careers` via `create-next-app`
(TypeScript, Tailwind, App Router, `src/` dir, Turbopack).

**Database layer** (not yet connected to a real database):
- `src/db/schema.ts` — Drizzle schema, the target relational model:
  - `career_categories`
  - `careers` (FK → category)
  - `institutions`
  - `education_programs` (FK → institution)
  - `career_education_programs` — join table (career ↔ program), replacing
    the old app's per-career dynamic-table anti-pattern
  - `skill_tree_nodes` (FK → career, self-referencing `prerequisite_node_id`)
- `src/db/index.ts` — Drizzle client wired for Neon (`@neondatabase/serverless`),
  reads `DATABASE_URL` from env. **Not connected yet — no database has been
  provisioned.**
- `drizzle.config.ts` — drizzle-kit config for migrations, also reads
  `DATABASE_URL`.
- `.env.example` — documents the `DATABASE_URL` var needed.

**Data-access layer** (currently the real data source):
- `src/data/types.ts` — plain TS types mirroring the DB schema.
- `src/data/seed-data.ts` — placeholder content: 3 categories, 6 careers
  (Nuclear Reactor Operator, Nuclear Engineer, Radiopharmaceutical Chemist,
  Medical Physicist (Nuclear Medicine), Radiation Safety Officer, Isotope
  Logistics Specialist), 4 institutions (Ontario Tech, McMaster, U of T, and
  one generic "Ontario College" placeholder), 5 education programs, the
  career↔program links, and two example skill trees (Reactor Operator,
  Radiopharmaceutical Chemist).
  - **⚠ This content is illustrative, not sourced fact.** Salaries, program
    durations, and requirements are estimates written to look plausible for
    UI-building purposes — they are explicitly commented as such in the file
    and must be fact-checked/replaced before this goes live.
- `src/data/queries.ts` — async functions (`getCareers`, `getCareerBySlug`,
  `getEducationPrograms`, `getSkillTreeForCareer`, etc.) that pages call.
  Currently return data from `seed-data.ts`, but have the same signatures the
  real Drizzle-backed versions will have — swapping the data source later
  should not require changing any page code.

**Pages** (all public, no auth, all verified working):
- `/` — landing page (hero + category grid + featured careers)
- `/about`
- `/careers` — list, grouped/filterable by category
- `/careers/[slug]` — detail: description, salary range, responsibilities,
  day-to-day, linked education programs, link to skill tree
- `/education` — list of programs
- `/education/[slug]` — detail: institution, duration, requirements, careers
  it leads to
- `/skill-tree/[careerSlug]` — tiered visual path from foundational education
  to the role

**Layout**: `src/app/layout.tsx` has a shared header (nav: Careers,
Education, About) and footer, styled with Tailwind, site title "Isotope
Careers Canada".

**Config housekeeping**: `next.config.ts` sets `turbopack.root` to silence a
workspace-root warning caused by a stray `package-lock.json` at
`~/package-lock.json` (unrelated file, left alone, not part of this project).

## Verification done

- `next build` passes clean, all routes statically generated
  (`generateStaticParams` used for the three dynamic routes).
- Dev server manually checked via curl for all routes: `/`, `/careers`,
  `/education`, `/skill-tree/nuclear-reactor-operator`,
  `/careers/isotope-logistics-specialist` (edge case: a career with no linked
  education program — rendered fine), and a nonexistent path (correctly
  404s).

## Not done yet

1. **No real database.** `src/db/*` is scaffolded but nothing has been
   provisioned or migrated. User chose to skip DB setup for now and build
   against mock data first. Next step when ready: provision Neon (via Vercel
   Marketplace or neon.com), set `DATABASE_URL` in `.env.local`, run
   `npx drizzle-kit push` (or generate + migrate), then swap the bodies of
   the functions in `src/data/queries.ts` to real Drizzle queries against
   `src/db`.
2. **Seed content needs fact-checking.** See the warning above — salary
   ranges, program durations/requirements, and institution program details
   need to be verified or sourced before publishing.
3. **Tailwind styling pass** — current styling is functional/clean but
   minimal (slate/teal palette, no custom design system). A deliberate visual
   design pass hasn't happened yet.
4. **SEO basics** (sitemap, richer metadata) and **production deploy** to
   Vercel haven't been done.
5. Not decided/built: any admin/content-editing UI (deliberately deferred —
   MVP uses seed scripts, not a CMS).

## Where to pick this up

Good next steps, in rough order:
1. Decide on and provision the Neon database, wire up `DATABASE_URL`, and
   port `src/data/queries.ts` to real Drizzle queries.
2. Replace placeholder seed content with real, sourced isotope-industry data.
3. Do the Tailwind visual design pass.
4. SEO + deploy to Vercel.
