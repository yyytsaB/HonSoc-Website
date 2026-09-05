## Milestone 4 — Walkthrough

### What Was Built
Milestone 4 introduces the key interactive systems of the HonSoc website:
1. A reactive **General Weighted Average (GWA) Calculator** island (`client:visible`) featuring real-time calculation, inline input validation, dynamic course row additions/removals, and a decoupled Dean's List threshold evaluation system that gracefully handles the unconfirmed threshold constant.
2. An official **Merchandise Showcase & Order Modal** system powered by typed content collections (`src/content/merch.json`), featuring responsive product cards, draft badges, color/size selectors, provisional pricing notices, and a Google Form QR code placeholder.
3. A **Dean's List Application Section & Modal** detailing academic qualification preparation guidelines, a provisional application calendar, an anchor link to the GWA tool, and an application intake dialog.
4. A shared, accessible **Dialog primitive** (`src/components/ui/dialog.tsx`) built on `@radix-ui/react-dialog` enforcing a 150ms scale/fade motion profile without off-screen sliding or `transition-all`.

---

### Component / Feature Tour

#### `<GwaCalculator />` (`src/components/interactive/GwaCalculator.tsx`)
- **Hydration Strategy:** `client:visible` below the fold.
- **Features:**
  - Dynamic course list with minimum 1-row constraint.
  - Reactive GWA computation formula: `sum(units * grade) / sum(units)`.
  - Zero-unit edge case protection: returns clean dash output without dividing by zero or throwing `NaN`.
  - Inline input validation alert for invalid characters or grades outside the 1.00–5.00 range.
  - Decoupled threshold state: renders `"Threshold TBD — official criteria pending confirmation from the Dean's office."` when `DL_GWA_THRESHOLD === null`. When a numeric threshold is provided in `src/config.ts`, it automatically evaluates standing without code modifications.

#### `<MerchModal />` (`src/components/interactive/MerchModal.tsx`)
- **Hydration Strategy:** `client:visible`.
- **Features:**
  - Wraps shared `src/components/ui/dialog.tsx`.
  - Displays product title, description, and prominent `"Draft Mockup"` badge.
  - Formats price as `"Estimated Target: ₱[Price] — Subject to Executive Committee Approval"`.
  - Interactive size selection pill buttons and color swatch toggles with accessible `aria-pressed` states.
  - Neutral SVG QR code placeholder (`/images/qr-placeholder.svg`) for pre-order intake.
  - Complete keyboard accessibility: focus trap within modal, Escape key close, and return of focus to initiating trigger button.

#### `<DlApplicationModal />` (`src/components/interactive/DlApplicationModal.tsx`)
- **Hydration Strategy:** `client:visible`.
- **Features:**
  - Wraps shared `src/components/ui/dialog.tsx`.
  - Prominent alert banner: `"Provisional Criteria Notice — Official qualification guidelines, minimum credit unit loads, and grade retention policies are currently under review, pending confirmation from the Dean's Office / Registrar."`
  - Step-by-step applicant preparation guidance cards.
  - Direct link/anchor to `#gwa-calculator` allowing students to verify their average.
  - Neutral SVG QR code placeholder for intake forms.
  - Focus trap, Escape key close, and return focus to trigger button.

#### Shared `<Dialog />` (`src/components/ui/dialog.tsx`)
- **Underlying Primitive:** `@radix-ui/react-dialog`.
- **Motion Profile:** 150ms entrance scale from 96% to 100% and opacity from 0 to 1 (`cubic-bezier(0, 0, 0.2, 1)`). 120ms exit. Respects `prefers-reduced-motion` with instant transitions. Zero `transition-all`.

---

### How to Test / Run

1. **Automated Unit Tests (Vitest):**
   ```bash
   node ./node_modules/vitest/vitest.mjs run
   ```
   *Expected: All 24 tests across 5 test suites pass.*

2. **TypeScript Strict Verification:**
   ```bash
   node ./node_modules/typescript/bin/tsc --noEmit
   ```
   *Expected: Exits with code 0.*

3. **Production Static Build:**
   ```bash
   node ./node_modules/astro/bin/astro.mjs build
   ```
   *Expected: Exits with code 0 in < 4s.*

4. **JS Bundle Gzip Payload Verification:**
   ```bash
   node scratch/trace_page_js.js
   ```
   *Expected: Total transitive page JS is 96.89 KB gzip (< 100KB budget).*

5. **CDP Viewport & DOM Audit:**
   ```bash
   node scratch/test_m4.cjs
   ```
   *Expected: Zero overflow across 375px, 768px, 1280px (`hasOverflow: false`); GWA Calculator and modals verified in browser DOM.*

6. **Banned Words Scan:**
   ```bash
   node C:\Users\user\.gemini\antigravity-ide\brain\06b5f713-4336-4ee8-a9ad-5bd11e733b99\scratch\banned_words_scan.js
   ```
   *Expected: 0 violations across repository copy.*
