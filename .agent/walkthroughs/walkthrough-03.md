## Milestone 3 — Walkthrough

### What Was Built
Milestone 3 delivers the foundational transparency and informational sections for the HonSoc website. These include the society's History & Purpose section, a photo documentation gallery, the Membership & Financial Transparency dashboard (featuring an explicit visual branch for provisional pending status, pure-CSS payment option toggles, and a semestral budget breakdown table), an executive leadership directory composed using `Card.astro`, and documented society accomplishments. All data is managed through typed Astro Content Collections with zero fabricated numbers or unverified names.

### Component / Feature Tour

#### `<History />` (`src/components/sections/History.astro`)
- **Purpose:** Outlines society foundation, constitutional mission, and organizational pillars.
- **Key Props/API:** `class?: string`.
- **Usage Example:**
  ```astro
  ---
  import History from '../components/sections/History.astro';
  ---
  <History />
  ```
- **Features:**
  - Editorial narrative format paired with three core pillar cards: Academic Rigor, Fiduciary Trust, and Peer Service.
  - Prominent archival notice pill badge designating historical text as provisional pending official college archive indexation.

#### `<Gallery />` (`src/components/sections/Gallery.astro`)
- **Purpose:** Visual activity archives documenting academic orientations, study clinics, and assemblies.
- **Key Props/API:** `class?: string`.
- **Usage Example:**
  ```astro
  ---
  import Gallery from '../components/sections/Gallery.astro';
  ---
  <Gallery />
  ```
- **Features:**
  - Sourced from `src/content/gallery.json` via Astro Content Collections.
  - Responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop.
  - Image optimization with explicit `width={800}` and `height={600}` dimensions, `loading="lazy"`, and `decoding="async"`.
  - Category pill badges and date metadata on each card.

#### `<Membership />` (`src/components/sections/Membership.astro`)
- **Purpose:** Full financial transparency portal detailing student dues, collection statuses, and budget allocations.
- **Key Props/API:** `class?: string`.
- **Usage Example:**
  ```astro
  ---
  import Membership from '../components/sections/Membership.astro';
  ---
  <Membership />
  ```
- **Features:**
  - **Explicit Status Branching (Open Check):** Inspects `report.status === 'pending'` to render `#financial-pending-banner` (`role="status"`), visibly alerting viewers that figures represent draft budget targets awaiting audit reconciliation.
  - **Pure-CSS Payment Switcher:** Zero-JavaScript radio-pill switcher allowing students to preview 1st Semester, 2nd Semester, or Full Year payment options without client hydration overhead.
  - **Budget Distribution Table:** Responsive tabular breakdown showing allocation categories, percentage shares, projected amounts, and operational purposes, contained in an `overflow-x-auto` wrapper to eliminate viewport overflow on small screens.

#### `<Officers />` (`src/components/sections/Officers.astro`)
- **Purpose:** Leadership directory of elected student officers and committee directors.
- **Key Props/API:** `class?: string`.
- **Usage Example:**
  ```astro
  ---
  import Officers from '../components/sections/Officers.astro';
  ---
  <Officers />
  ```
- **Features:**
  - Sourced from `src/content/officers.json` sorted by `order`.
  - Composed using existing `Card.astro` (`as="article" variant="hover"`).
  - Responsive layout: 1 column at 375px, 2 columns at 768px, 4 columns at 1280px.
  - Circular avatar container with neutral monochrome SVG placeholder.
  - Alice serif name, Montserrat position/program, and committee badge pills.

#### `<Accomplishments />` (`src/components/sections/Accomplishments.astro`)
- **Purpose:** Permanent archive of society events, academic clinics, and community service projects.
- **Key Props/API:** `class?: string`.
- **Usage Example:**
  ```astro
  ---
  import Accomplishments from '../components/sections/Accomplishments.astro';
  ---
  <Accomplishments />
  ```
- **Features:**
  - Sourced from `src/content/accomplishments.json` sorted chronologically descending.
  - Composed using `Card.astro` with date tags, project head metadata, and sponsor pills.
  - Strict copy constraint: all event summaries kept under 400 characters without banned marketing words.

### How to Test / Run

1. **Type Checking:**
   ```bash
   node ./node_modules/typescript/bin/tsc --noEmit
   ```
   *Expected result: Exits with code 0.*

2. **Automated Unit Tests:**
   ```bash
   node ./node_modules/vitest/vitest.mjs run
   ```
   *Expected result: All 5 test suites pass.*

3. **Production Static Build:**
   ```bash
   node ./node_modules/astro/bin/astro.mjs build
   ```
   *Expected result: 1 page built into `dist/` in < 4s.*

4. **Milestone 3 Viewport & DOM Verification (CDP):**
   ```bash
   node C:\Users\user\.gemini\antigravity-ide\brain\06b5f713-4336-4ee8-a9ad-5bd11e733b99\scratch\test_m3.js
   ```
   *Expected result: `hasOverflow: false` across 375px, 768px, 1280px; `#financial-pending-banner` verified present in DOM; table scrolls internally within container.*

5. **Banned Words Scanner:**
   ```bash
   node C:\Users\user\.gemini\antigravity-ide\brain\06b5f713-4336-4ee8-a9ad-5bd11e733b99\scratch\banned_words_scan.js
   ```
   *Expected result: 0 violations across `src/`, `public/`, and `.agent/`.*
