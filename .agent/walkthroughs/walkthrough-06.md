## Milestone 6 — Walkthrough

### What Was Built
Ported the complete HTML prototype in `./Design/` into a multi-page Astro static application spanning 6 dedicated collegiate routes (`/`, `/background`, `/officers`, `/deans-list`, `/fees`, `/merch`). All prototype violations—such as banned SaaS marketing phrases, render-blocking Google Font CDN links, raw `<img>` tags, and unconstrained animations—were eliminated and replaced with strict `AGENTS.md` engineering tokens, typed Astro Content Collections, self-hosted WOFF2 fonts, and accessible Radix/shadcn UI islands.

### Component / Feature Tour

- **Navigation & Layout Primitives:**
  - `Navbar.astro`: Sticky frosted-glass header (`backdrop-blur-md bg-surface/90`) providing navigation across all 6 routes with active route styling, desktop GWA Calc shortcut, Dean's List CTA, and mobile drawer trigger.
  - `MobileNavDrawer.tsx` (`client:load`): Accessible slide-over drawer with focus trap, `Esc` key dismissal, route items with active pill styling, and quick portal links.
  - `SubpageHeader.astro`: Universal broadsheet subpage header with crimson/wine gradient background (`from-maroon-dark via-maroon-wine to-maroon`), breadcrumb trail, uppercase tracking-widest eyebrow, Alice H1, and document dossier docket tag.
  - `CrossPageBanner.astro`: Editorial callout card placed at the base of subpages directing students to subsequent collegiate procedures.
  - `Footer.astro`: Broadsheet footer with dual directory columns ("Society Pages" and "Student Services"), CAS building secretariat address, document docket serial (`DOC: CAS-HS-PB-2025`), and official university accreditation notice.

- **Interactive React Islands:**
  - `GwaCalculator.tsx` (`client:visible`): Dynamic GWA computation matrix supporting course additions, unit weighting, grade selection, and instant qualification verification against named threshold constants (`DL_CONFIG`) from `src/config.ts`.
  - `FaqAccordion.tsx` (`client:visible`): Radix-powered accessible disclosure accordion covering academic units, Incomplete/Conditional grade disqualifications, non-academic courses (NSTP/PATHFit), and honours pinning convocation details.
  - `DlApplicationModal.tsx` & `MerchModal.tsx` (`client:visible`): Accessible Dialog modals with focus trapping, `Esc` dismissal, return-to-trigger focus, and fallback direct student portal links.

- **Dedicated Collegiate Pages:**
  - `src/pages/index.astro`: Clocktower hero with dual crests (`crest.png` and `cas-shield.png`), 8-module portal hub, society philosophy broadside plaque, Dean's List benchmarks preview, executive leadership spotlight, and flagship accomplishments.
  - `src/pages/background.astro`: Institutional re-accreditation charter masthead (Attachment C), dual-flank narrative hero with illuminated philosophy plaque, Vision & Mission archival plates, Strategic Charter ledger (7 Goals & 3 Objective Pillars), and Constitutional Framework cards.
  - `src/pages/officers.astro`: Tier 1 Institutional Supervision (Dean Dr. Anna Maria V. Rivera, Faculty Adviser Dr. Jonelyn B. Sandoval, Student Org Head Dr. Cristina Dt. Geron), Tier 2 Student Secretariat (President Lian Beatrice S. Catipon, Secretary Cristal B. Coliat), 4 Standing Working Committees, and weekly secretariat office hours schedule.
  - `src/pages/deans-list.astro`: 3-column distinction benchmarks (First Honors, Second Honors, Academic Disqualifications), interactive GWA Matrix Calculator, 3-phase application pathway, AY 2023–2024 Distinction Roster table, and FAQ accordion.
  - `src/pages/fees.astro`: Membership dues schedule (₱75/sem and ₱130/AY), audited fund allocation progress meters (Awards 45%, Outreach 25%, Workshops 20%, Logistics 10%), Resolution No. 2024-03 plaque, and 3-step remittance protocol.
  - `src/pages/merch.astro`: Collegiate merchandise catalog with pricing cards (Varsity Jacket ₱650, Lanyard ₱120, Lapel Pin ₱80), unisex sizing table (XS–3XL), claiming protocol cards, and pre-order intake modal.

### Integration Notes
- All repeatable content is backed by build-time Zod validated Content Collections in `src/content.config.ts` (`officers.json`, `merch.json`, `hall-of-fame.json`, `accomplishments.json`). Non-technical officers can update roster entries and pricing without touching Astro or JSX components.
- The build pipeline outputs static HTML (`output: 'static'`) ready for static hosting deployment (Cloudflare Pages, Vercel, or GitHub Pages) with 0 server functions.
- Source material in `./Design/` was maintained strictly read-only and no files or imports leaked into `src/pages/` or `public/`.

### Known Gaps
- Official high-resolution officer portrait headshots and batch intake Google Form URLs remain pending from the Executive Secretariat; placeholder badges and direct portal fallbacks (`https://dione.batstate-u.edu.ph`) are safely in place.
