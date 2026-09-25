# ROADMAP.md — HonSoc Website

Stack: Astro + Tailwind + TypeScript + React islands (shadcn/ui).
See `AGENTS.md` for engineering and design standards — every milestone below
is bound by that document.

## Milestone 1 — Scaffolding & Foundations <!-- completed: 2026-09-05 -->

- [x] Initialize Astro project (`output: 'static'`), TypeScript strict mode on
- [x] Install and configure Tailwind CSS
- [x] Self-host Alice + Montserrat as `.woff2`, wire up `@font-face` with
      `font-display: swap`
- [x] Define design tokens in `tailwind.config.ts` (colors, gradient, radius,
      fluid type scale) per `AGENTS.md` §4
- [x] Install `@astrojs/react`, initialize `shadcn/ui`
- [x] Set up `src/content/config.ts` with Zod schemas for officers, merch,
      hall-of-fame, accomplishments
- [x] Build base primitives: `<Button>`, `<Card>`, `<Pill>` (rounded-full tag/
      toggle base), `<SectionHeading>`
- [x] Confirm Lighthouse mobile baseline on a blank page (target: ≥95)
      <!-- result: 100/100/100/100 -->

## Milestone 2 — Navigation & Hero <!-- completed: 2026-09-05 -->

- [x] Frosted-glass navbar (`backdrop-filter: blur`, semi-transparent
      surface), sticky on scroll
- [x] Logo component — links to homepage, used in navbar and footer
- [x] Section toggle tabs (Homepage / Membership / Officers / Accomplishments
      / Merch / DL / Hall of Fame) — instant switch, no fade-lag
- [x] Hero section: headline (Alice), subheading (Montserrat 600), CTA button
- [x] Mobile nav drawer (shadcn `Drawer`) with focus trap and `Esc`-to-close
- [x] Verify nav is fully keyboard-navigable

## Milestone 3 — Transparency & Information Sections <!-- completed: 2026-09-05 -->

- [x] HonSoc history section (homepage) <!-- completed: 2026-09-05 -->
- [x] Photo documentation gallery — lazy-loaded, `astro:assets` optimized <!-- completed: 2026-09-05 -->
- [x] Membership section: fee breakdown, 1st/2nd sem payment options, plain-
      language explanation of where fees go, simple financial report display <!-- completed: 2026-09-05 -->
- [x] Officer/Committee/Adviser/Dean directory — sourced from
      `officers.json`, photo + position + program per card <!-- completed: 2026-09-05 -->
- [x] Accomplishments section — event name, project head, sponsors,
      summarized description, sourced from `accomplishments.json` <!-- completed: 2026-09-05 -->
- [x] All copy in this milestone checked against `AGENTS.md` §2 banned-word
      list <!-- completed: 2026-09-05 -->

## Milestone 4 — Interactive Features <!-- completed: 2026-09-05 -->

- [x] GWA Calculator (React island, `client:visible`): course + units + grade
      inputs, computed GWA, DL-eligibility check against a named threshold
      constant, inline validation (no silent `NaN`) <!-- completed: 2026-09-05 -->
- [x] Merch showcase: mockup images, size/color selectors, sourced from
      `merch.json` <!-- completed: 2026-09-05 -->
- [x] Merch order modal (shadcn `Dialog`): Google Form QR code, focus-trapped <!-- completed: 2026-09-05 -->
- [x] DL Application section: requirements, open/close dates, link to GWA
      calculator <!-- completed: 2026-09-05 -->
- [x] DL Application modal (shadcn `Dialog`): Google Form QR code <!-- completed: 2026-09-05 -->
- [x] All modals verified for focus-trap, `Esc`-close, and return-focus
      behavior <!-- completed: 2026-09-05 -->
- [x] All motion in this milestone at 100–150ms per `AGENTS.md` §4 <!-- completed: 2026-09-05 -->

## Milestone 5 — Hall of Fame & Launch Readiness

- [x] Dean's Listers & Topnotchers Hall of Fame — filterable by year/category,
      sourced from `hall-of-fame.json` <!-- completed: 2026-09-05 -->
- [x] Full mobile pass: audit every section at 375px, fix any overflow/
      overlap <!-- completed: 2026-09-05 -->
- [x] Image audit: confirm all images are WebP/AVIF with explicit dimensions <!-- completed: 2026-09-05 -->
- [x] JS payload audit: confirm each page is within the 100KB gzip budget per
      `AGENTS.md` §3 <!-- completed: 2026-09-05 -->
- [x] SEO pre-flight: meta titles/descriptions per page, OG image, favicon,
      `sitemap.xml`, semantic heading order (single `<h1>` per page) <!-- completed: 2026-09-05 -->
- [x] Lighthouse mobile: performance ≥95, accessibility ≥95 on every page <!-- completed: 2026-09-05 -->
- [x] Final content-editing dry run: hand `officers.json`/`merch.json` to a
      non-technical committee member, confirm they can edit without touching
      `.astro` files <!-- completed: 2026-09-05 -->
- [ ] Deploy to Cloudflare Pages / Vercel, confirm production build matches
      dev <!-- ON HOLD: client redesigning UI/UX before launch, 2026-09-05 -->

## Milestone 6 — Design Prototype Port & Multi-Page Architecture <!-- completed: 2026-09-25 -->

- [x] Phase 1 Audit: Complete inventory of `./Design/`, mapped shared components, token alignment, and violation fixes logged <!-- completed: 2026-09-25 -->
- [x] Multi-Page Route Architecture: 6 dedicated routes (`/`, `/background`, `/officers`, `/deans-list`, `/fees`, `/merch`) <!-- completed: 2026-09-25 -->
- [x] Shared Navigation & Layouts: Sticky frosted navbar with 6-route active states, mobile drawer, SubpageHeader, CrossPageBanner, broadsheet Footer <!-- completed: 2026-09-25 -->
- [x] Interactive Islands: GwaCalculator with named thresholds, accessible FaqAccordion, DlApplicationModal, MerchModal <!-- completed: 2026-09-25 -->
- [x] Content Integration: Typed Content Collections for officers, merch, hall-of-fame, accomplishments with zero banned words <!-- completed: 2026-09-25 -->
- [x] Quality & Standards Verification: All 33 unit/component tests pass, 100% clean production build with 0 errors, no `./Design/` leak <!-- completed: 2026-09-25 -->

## Milestone 7 — Revised Mockup Overhaul & CASHONSITE Architecture <!-- completed: 2026-09-26 -->

- [x] Design System Port: Integrated Material Design 3 Academic Heritage tokens from `revised_mockup/academic_heritage/DESIGN.md` (`primary: #6a020a`, `secondary: #805600`, `surface: #fff8f5`, `on-surface: #1e1b19`).
- [x] Self-Hosted Typography: Downloaded and wired `Newsreader` (weights 400, 500, 600) + `Montserrat` fonts locally as `.woff2` with zero external Google font requests.
- [x] Home Page Harmonization: Redesigned `/index.astro` to eliminate design discrepancies, aligning its color palette, typography, badges, and layout with the rest of the site.
- [x] Route Architecture: Ported all 7 provided mockup sections into dedicated static routes:
  - `/` — CASHONSITE Portal & Search Registry
  - `/about` — About CAS Honor Society, Founding Pillars, Leadership Roster, Standing Committees, Stole Heritage
  - `/transparency` — Audited Financial Ledger, Budget Allocations, Resolutions, Board Minutes
  - `/activities` — Convocations, Outreach, General Assemblies, Document Verification
  - `/academic-recognition` — Collegiate Honor Rolls, Distinction Benchmarks, Live Search Roster
  - `/request` — Document Request Portal with accessible modal dialog
  - `/feedback` — Society Inquiries & Incident Ticketing with accessible feedback modal dialog
  - `/404` — Archival Record Not Found registry error page
- [x] Media Sanitization: Replaced all remote Google User Content image URLs with clean local vector SVGs (`officer-placeholder.svg`, `stole-placeholder.svg`, `activity-*.svg`).
- [x] Scope Guardrails: Unprovided legacy features (GWA calculator, merch shop, etc.) retired into `legacy_pages/` to route naturally to `/404` pending dedicated mockups.
- [x] Verification: 39 unit/layout tests passing in Vitest, 8/8 static HTML pages generated cleanly in ~10s with zero errors.
