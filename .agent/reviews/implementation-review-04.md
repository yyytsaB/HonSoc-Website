## Milestone 4 — Implementation Review

### Scope
- **In Scope:**
  - GWA Calculator React island (`src/components/interactive/GwaCalculator.tsx`) hydrated via `client:visible`.
  - Comprehensive unit test suite (`test/GwaCalculator.test.tsx`) covering standard, decimal, zero-unit, non-numeric validation, and threshold-null / threshold-numeric cases.
  - Shared shadcn/ui Dialog primitive (`src/components/ui/dialog.tsx`) built on `@radix-ui/react-dialog` with 150ms 96%→100% scale/fade animation.
  - Merch showcase section (`src/components/sections/Merch.astro`) and order modal island (`src/components/interactive/MerchModal.tsx`) with unit tests (`test/MerchModal.test.tsx`).
  - Dean's List application section (`src/components/sections/DlApplication.astro`) and application modal island (`src/components/interactive/DlApplicationModal.tsx`) with unit tests (`test/DlApplicationModal.test.tsx`).
  - Section wrapper for GWA Calculator (`src/components/sections/GwaCalculatorSection.astro`).
  - Neutral SVG placeholders for Google Form QR codes (`public/images/qr-placeholder.svg`) and merchandise mockups (`public/images/merch-placeholder.svg`).
  - Assembly of all interactive sections into `src/pages/index.astro`.
  - Full bundle payload measurement verifying total page JS stays within the 100KB gzip budget.
  - CDP viewport audits at 375px, 768px, and 1280px confirming zero horizontal overflow.
  - Automated zero-banned-word scans across code and docs.
- **Explicitly Out of Scope:**
  - Milestone 5 Hall of Fame database filtering and search.
  - Official client brand crest in `Logo.astro` / `favicon.svg` (pending client vector insignia).
  - Permanent hero backdrop photo (pending client photo review).
  - Hardcoding a Dean's List cutoff number (remains `DL_GWA_THRESHOLD = null` in `src/config.ts`).
  - Live Google Form backend connections (remain provisional QR placeholders).

### Decisions Made
- **Shared Dialog Architecture (Zero Logic Duplication):** Created a single, reusable `src/components/ui/dialog.tsx` primitive wrapping `@radix-ui/react-dialog`. Both `MerchModal.tsx` and `DlApplicationModal.tsx` consume this shared component, ensuring uniform accessibility, focus management, and motion timing without duplicate modal logic.
- **Strict Motion & Animation Constraint:** Dialog entrance and exit transitions are configured for 150ms scale/fade (from `scale(0.96)` and `opacity: 0` to `scale(1)` and `opacity: 1`) using explicit keyframes in `src/styles/global.css`. All slide-from-off-screen animations and `transition-all` declarations are strictly avoided. Full `prefers-reduced-motion` overrides are enforced.
- **`clsx` Bundle Optimization for 100KB Gzip Budget:** During bundle analysis, including `tailwind-merge` in client-side utility chunks introduced 12.17 KB of gzipped dictionary tables, pushing the total transitive page JS to 105.02 KB. Refactoring `src/lib/utils.ts` to use `clsx` directly reduced the utility chunk to 4.04 KB gzip, bringing the total page transitive JS to **96.89 KB gzip** (passing the 100KB budget).
- **GWA Calculator Row UX & Minimum Constraint:** Implemented dynamic course addition and removal with an explicit minimum constraint of 1 course row (the removal button is disabled when only one course remains). Course inputs support real-time reactive re-computation on every keystroke, rejecting invalid or non-numeric grades inline before math execution without throwing console errors or rendering `NaN`.
- **Threshold-Toggle Decoupled Architecture:** `GwaCalculator.tsx` accepts `threshold` as a prop defaulting to `DL_GWA_THRESHOLD` from `src/config.ts`. When `null`, it displays the Dean's Office pending criteria notice. If a collegiate cutoff is set in the future (e.g. `1.75`), the component immediately activates threshold evaluation (`gwa <= threshold`) with zero architectural or component rewrites.
- **Philippine Academic Grading Scale Bound (1.00–5.00 Validation Constraint):** Implemented validation enforcing the standard collegiate grading scale utilized across Philippine universities (1.00 = highest honor/excellent, 3.00 = passing, 5.00 = failing). Entries below 1.00 (e.g. 0.00 or 0.75) or above 5.00 (e.g. 6.00 or 100) are flagged immediately by the inline validator as out-of-range, preventing corrupted GWA calculations. Non-numeric characters or negative unit inputs are halted prior to weighted arithmetic execution.
- **Fabrication-Discipline Framing Across New Content Types:** All merchandise records in `src/content/merch.json` are explicitly prefixed `[Provisional]`, and pricing is prominently badged with `"Estimated Target — Subject to Executive Committee Approval"`. The Dean's List application section and modal prominently render a `[Provisional Criteria Notice]` banner, omitting fabricated penalty rules and focusing strictly on confirmed structural steps.
- **JavaScript Payload Headroom Advisory (Milestone 5 Planning):** The measured total transitive page JS is 96.89 KB gzip, leaving ~3.11 KB of headroom against the 100KB budget. For Milestone 5 (Hall of Fame & Launch Readiness), filtering and search architecture will prioritize lightweight DOM manipulation or pure-CSS approaches rather than introducing heavyweight client-side dependencies, preserving compliance with `AGENTS.md` §3.

### Flags for Human Input
1. **Dean's List GWA Cutoff Threshold (`DL_GWA_THRESHOLD`):** `src/config.ts` maintains `DL_GWA_THRESHOLD: number | null = null;`. The official academic cutoff constant must be confirmed by the College of Accountancy Dean's Office / Academic Affairs before production launch.
2. **Dean's List Application Calendar Dates:** `src/components/sections/DlApplication.astro` and `DlApplicationModal.tsx` display provisional application dates (`Term 1 Window: October 15 – October 30, 2026 [Provisional — Subject to Registrar Calendar]`). Official intake windows must be synchronized with the collegiate academic calendar memo.
3. **Dean's List Application Intake Google Form:** `DlApplicationModal.tsx` currently displays a provisional vector QR placeholder (`/images/qr-placeholder.svg`). The live Google Form URL and production QR code must be provided by the Academic Committee upon memorandum release.
4. **Merchandise Pre-order Intake Google Form:** `MerchModal.tsx` currently displays a provisional vector QR placeholder (`/images/qr-placeholder.svg`). The live pre-order Google Form URL and QR code must be provided by the student Merch Committee upon batch approval.
5. **Merchandise Pricing & Product Catalog Specifications:** `src/content/merch.json` items are preliminary mockups with estimated baseline target prices (`₱950`, `₱550`, `₱220`). Final commercial pricing, production sizing, and manufacturer proofs must be authorized by the Executive Committee and student Treasury.
6. **Official Vector Crest Insignia (Carried Forward):** `src/components/navigation/Logo.astro` / `public/favicon.svg` continues to use an interim geometric lotus SVG crest pending delivery of official vector branding assets.
7. **Hero Background Photo (Carried Forward):** `src/assets/hero-bg.webp` remains active pending client photo review.

### Files Changed
| File | Action | Notes |
|------|--------|-------|
| `src/components/ui/dialog.tsx` | CREATED | Shared shadcn Dialog primitive built on `@radix-ui/react-dialog` with 150ms motion |
| `src/components/interactive/GwaCalculator.tsx` | CREATED | Reactive GWA calculator island with live math, validation, and null-threshold branch |
| `src/components/interactive/MerchModal.tsx` | CREATED | Merchandise order modal dialog with sizes, colors, and provisional QR placeholder |
| `src/components/interactive/DlApplicationModal.tsx` | CREATED | Dean's List application modal dialog with provisional criteria banner and GWA anchor |
| `src/components/sections/GwaCalculatorSection.astro` | CREATED | Section wrapper with anchor `#gwa-calculator` for GWA calculator island |
| `src/components/sections/Merch.astro` | CREATED | Merchandise showcase section sourcing `merch.json` with draft badges and modals |
| `src/components/sections/DlApplication.astro` | CREATED | Dean's List application section with provisional criteria notice, step cards, and modal trigger |
| `src/content/merch.json` | MODIFIED | Populated 3 provisional merchandise mockup records strictly conforming to schema |
| `public/images/qr-placeholder.svg` | CREATED | Clean vector placeholder for provisional Google Form QR codes |
| `public/images/merch-placeholder.svg` | CREATED | Neutral vector placeholder for apparel and accessory mockups |
| `src/lib/utils.ts` | MODIFIED | Optimized `cn` utility to use `clsx` directly, keeping JS bundle under 100KB gzip |
| `src/styles/global.css` | MODIFIED | Added 150ms scale/fade dialog keyframes with `prefers-reduced-motion` support |
| `src/pages/index.astro` | MODIFIED | Assembled Merch, DlApplication, and GwaCalculatorSection into homepage layout |
| `test/GwaCalculator.test.tsx` | CREATED | Unit tests for GWA calculation math, zero units, validation, and threshold branches |
| `test/MerchModal.test.tsx` | CREATED | Unit tests for Merch modal open/close, focus-trap, Esc key, and provisional badges |
| `test/DlApplicationModal.test.tsx` | CREATED | Unit tests for DL modal open/close, focus-trap, Esc key, criteria banner, and anchor |
| `.agent/ROADMAP.md` | MODIFIED | Marked all Milestone 4 tasks completed with timestamp |
| `.agent/reviews/implementation-review-04.md` | CREATED | Comprehensive implementation review for Milestone 4 |
| `.agent/walkthroughs/walkthrough-04.md` | CREATED | Developer and architectural walkthrough for Milestone 4 |

### ROADMAP.md Diff (§7d Verification)
```diff
diff --git a/.agent/ROADMAP.md b/.agent/ROADMAP.md
index 98c2323..af16d8a 100644
--- a/.agent/ROADMAP.md
+++ b/.agent/ROADMAP.md
@@ -45,18 +45,18 @@ is bound by that document.
       list <!-- completed: 2026-09-05 -->
 
-## Milestone 4 — Interactive Features
+## Milestone 4 — Interactive Features <!-- completed: 2026-09-05 -->
 
-- [ ] GWA Calculator (React island, `client:visible`): course + units + grade
+- [x] GWA Calculator (React island, `client:visible`): course + units + grade
       inputs, computed GWA, DL-eligibility check against a named threshold
-      constant, inline validation (no silent `NaN`)
-- [ ] Merch showcase: mockup images, size/color selectors, sourced from
-      `merch.json`
-- [ ] Merch order modal (shadcn `Dialog`): Google Form QR code, focus-trapped
-- [ ] DL Application section: requirements, open/close dates, link to GWA
-      calculator
-- [ ] DL Application modal (shadcn `Dialog`): Google Form QR code
-- [ ] All modals verified for focus-trap, `Esc`-close, and return-focus
-      behavior
-- [ ] All motion in this milestone at 100–150ms per `AGENTS.md` §4
+- [x] Merch showcase: mockup images, size/color selectors, sourced from
+      `merch.json` <!-- completed: 2026-09-05 -->
+- [x] Merch order modal (shadcn `Dialog`): Google Form QR code, focus-trapped <!-- completed: 2026-09-05 -->
+- [x] DL Application section: requirements, open/close dates, link to GWA
+      calculator <!-- completed: 2026-09-05 -->
+- [x] DL Application modal (shadcn `Dialog`): Google Form QR code <!-- completed: 2026-09-05 -->
+- [x] All modals verified for focus-trap, `Esc`-close, and return-focus
+      behavior <!-- completed: 2026-09-05 -->
+- [x] All motion in this milestone at 100–150ms per `AGENTS.md` §4 <!-- completed: 2026-09-05 -->
 
 ## Milestone 5 — Hall of Fame & Launch Readiness
```

### §5 DoD Self-Assessment
- ✅ **GWA calculator unit tests written and passing BEFORE UI build:** Verified — `test/GwaCalculator.test.tsx` covers standard math, decimal grades, zero units, non-numeric validation, and threshold branches (10/10 tests passing).
- ✅ **Null-threshold state renders "Threshold TBD":** Verified in automated test and browser DOM via CDP (`thresholdTbdText: true`).
- ✅ **Merch modal focus-trap/Esc/return-focus & provisional rendering verified:** Verified via `test/MerchModal.test.tsx` (5/5 tests passing). Specifically, the named test `'opens modal on trigger click and displays provisional merchandise details'` explicitly asserts and passes that provisional pricing and placeholder notices render in the DOM:
  - `expect(screen.getByText(/estimated target: ₱950/i)).toBeInTheDocument()`
  - `expect(screen.getByText(/subject to executive committee approval/i)).toBeInTheDocument()`
  - `expect(screen.getByAltText(/provisional google form qr placeholder/i)).toBeInTheDocument()`
- ✅ **DL modal focus-trap/Esc/return-focus & provisional banner rendering verified:** Verified via `test/DlApplicationModal.test.tsx` (4/4 tests passing). Specifically, the named test `'opens modal on trigger click and displays provisional criteria and structural guidelines'` explicitly asserts and passes that the provisional criteria banner and placeholder assets render in the DOM:
  - `expect(screen.getByTestId('dl-provisional-banner')).toHaveTextContent(/provisional criteria/i)`
  - `expect(screen.getByTestId('dl-provisional-banner')).toHaveTextContent(/pending confirmation from the dean's office/i)`
  - `expect(screen.getByText(/subject to registrar calendar/i)).toBeInTheDocument()`
  - `expect(screen.getByAltText(/provisional google form qr placeholder/i)).toBeInTheDocument()`
- ✅ **Both modals share one Dialog primitive:** Verified — `src/components/ui/dialog.tsx` wraps `@radix-ui/react-dialog` and is shared by both components without duplicated modal logic.
- ✅ **Modal motion: 150ms scale/fade, prefers-reduced-motion respected:** Verified — keyframes in `global.css` use 150ms cubic-bezier transitions with `prefers-reduced-motion` overrides; zero `transition-all` used.
- ✅ **Zero banned words across full repository:** Verified via AST scanner — 0 violations across `src/`, `public/`, and `.agent/`.
- ✅ **Placeholder QR codes, dates, and merch details explicitly flagged:** Verified — itemized in standalone Flags section with respective stakeholder responsibilities.
- ✅ **`npx tsc --noEmit` exits 0:** Verified — TypeScript compiler runs cleanly with zero errors.
- ✅ **`npm run build` exits 0:** Verified — static Astro production build completes in 3.96s.
- ✅ **Total JS payload within 100KB gzip budget:** Verified — total transitive JavaScript for the page is **96.89 KB gzip** (GWA calculator island alone is 2.76 KB gzip).
