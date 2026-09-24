# Phase 1 Audit & Porting Specification

> Reference: Porting `./Design/` HTML prototype into the Astro project.
> Standards authority: `AGENTS.md` (§0–§5).

---

## 1. Inventory of Files in `./Design/`

| File | Target Route | Purpose & Structural Scope |
|---|---|---|
| `Design/index.html` | `/` (`src/pages/index.astro`) | **Homepage**: Clocktower hero, dual crests, brand typography, 8-module portal hub (featured GWA Matrix Calc & DL Application cards, 6 secondary modules), society philosophy broadside plaque ("In Scientia Veritas, In Virtute Prudentia"), Dean's List benchmark preview, executive leadership spotlight (Dean, Adviser, President), flagship accomplishments grid (3 projects), universal frosted nav, and broadsheet footer. |
| `Design/background.html` | `/background` (`src/pages/background.astro`) | **Background & Charter**: Subpage header banner, institutional masthead (Re-accreditation Charter Attachment C), dual-flank narrative hero with illuminated philosophy plaque, Vision & Mission with 2 archival photographic plates, Strategic Charter ledger (7 Goals §1.1–§1.7 and 3 Objective Pillars with accreditation docket), Constitutional Framework & By-Laws Highlights (Articles II, IV, VII), cross-page router to Officers, universal frosted nav, and broadsheet footer. |
| `Design/officers.html` | `/officers` (`src/pages/officers.astro`) | **Executive Officers & Directorate**: Subpage header banner, Tier 1 Institutional Supervision & Advisory (Dean Dr. Anna Maria V. Rivera, Faculty Adviser Dr. Jonelyn B. Sandoval, Head of Student Organizations Dr. Cristina Dt. Geron), Tier 2 Executive Student Secretariat (President Lian Beatrice S. Catipon, Secretary Cristal B. Coliat), 4 Standing Working Committees, Secretariat Consultation Protocol & Weekly Office Hours schedule table, cross-page router to Dean's List, universal frosted nav, and broadsheet footer. |
| `Design/deans-list.html` | `/deans-list` (`src/pages/deans-list.astro`) | **Dean's List Gazette & GWA Calculator**: Subpage header banner, 3-column academic distinction benchmarks (First Honors, Second Honors, Academic Disqualifications), interactive GWA Matrix Calculator (reactive calculation, row additions/deletions, unit counter, status badge), 3-phase application pathway & submission gateway docket, AY 2023–2024 Semester 2 Distinction Roster table, 4-item FAQ accordion, cross-page router to Fees, universal frosted nav, and broadsheet footer. |
| `Design/fees.html` | `/fees` (`src/pages/fees.astro`) | **Membership Fees & Transparency**: Subpage header banner, membership dues schedule (₱75.00/sem and ₱130.00/AY), audited fund allocation progress meters (Awards 45%, Outreach 25%, Workshops 20%, Logistics 10%), Resolution No. 2024-03 plaque (Zero Personal Pecuniary Benefit, Semestral Audit Disclosure, Indigent Scholar Exemption), 3-step remittance protocol, cross-page router to Merch, universal frosted nav, and broadsheet footer. |
| `Design/merch.html` | `/merch` (`src/pages/merch.astro`) | **Official Collegiate Merchandise**: Subpage header banner, collection showcase with pricing callouts (Varsity Jacket ₱650, Lanyard ₱120, Lapel Pin ₱80) and product mockups, unisex sizing table (XS–3XL with chest, length, sleeve, and fit recommendations), claiming protocol cards (Venue, ID, Proxy policy), cross-page router to Home, universal frosted nav, and broadsheet footer. |
| `Design/scratch_find_opacity.js` | *None* | Developer regex scratch script. Excluded from compilation, runtime, and output. |

---

## 2. Shared Markup Mapped to Typed Astro Components

### A. Navigation Bar (`src/components/navigation/Navbar.astro`)
- **Markup:** Sticky container `#main-header` over `#scroll-sentinel`, pill container `#main-nav` with `backdrop-blur-xl`, dual crests, Alice brand text, desktop navigation links, `GWA Calc` CTA, `Apply DL` modal button, and mobile hamburger toggle.
- **Mobile Drawer:** Floating sheet `#mobile-nav-drawer` with backdrop `#mobile-menu-backdrop` rendered via React island `MobileNavDrawer.tsx` (`client:load`).
- **Typed Props:**
  ```ts
  interface Props {
    currentPath?: string;
  }
  ```

### B. Subpage Header Banner (`src/components/sections/SubpageHeader.astro`)
- **Markup:** Crimson gradient header (`from-maroon-dark via-maroon-wine to-maroon`), breadcrumb trail, uppercase tracking-widest eyebrow, Alice H1, Montserrat subtitle, and document dossier docket tag.
- **Typed Props:**
  ```ts
  interface Props {
    title: string;
    eyebrow: string;
    description: string;
    breadcrumbCurrent: string;
    dossierCode?: string;
    dossierLabel?: string;
  }
  ```

### C. Cross-Page Routing Banner (`src/components/sections/CrossPageBanner.astro`)
- **Markup:** Bottom callout card in gradient (`from-maroon-wine to-maroon`), gold eyebrow, Alice H3, subtitle, and gold CTA button linking to next section.
- **Typed Props:**
  ```ts
  interface Props {
    eyebrow: string;
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    buttonIcon?: string;
  }
  ```

### D. Universal Broadsheet Footer (`src/components/navigation/Footer.astro`)
- **Markup:** Dual crest branding, institutional narrative, doc serial reference (`DOC: CAS-HS-PB-2025`), 2-column directory links ("Society Pages" and "Student Services"), secretariat social links, physical campus address, copyright notice, and accreditation disclaimer.
- **Typed Props:**
  ```ts
  interface Props {
    class?: string;
  }
  ```

### E. Section Heading / Editorial Masthead (`src/components/primitives/SectionHeading.astro`)
- **Markup:** Eyebrow with decorative bar/indicator, Alice H2, Montserrat description.
- **Typed Props:**
  ```ts
  interface Props {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    align?: 'left' | 'center';
    badge?: string;
    class?: string;
  }
  ```

### F. Pressable Button (`src/components/primitives/Button.astro`)
- **Markup:** Shimmer gradient / gold CTA button (`scale(0.97)` active, `translateY(-1px)` hover per Emil standard), secondary outline button, or ghost variant.
- **Typed Props:**
  ```ts
  interface Props {
    variant?: 'gold' | 'outline' | 'maroon' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
    id?: string;
    'aria-label'?: string;
  }
  ```

### G. Card Primitive (`src/components/primitives/Card.astro`)
- **Markup:** 1px solid border (`border-border`), `rounded-card` (`rounded-2xl`), shadow reserved for hover state.
- **Typed Props:**
  ```ts
  interface Props {
    as?: 'div' | 'article' | 'section' | 'a';
    href?: string;
    variant?: 'surface' | 'stone' | 'dark' | 'glass';
    hoverEffect?: boolean;
    class?: string;
  }
  ```

---

## 3. Design Tokens & Styling Mapping

| Prototype Property | Prototype Inline Value | Existing `tailwind.config.ts` Token | Resolution & Enforcement |
|---|---|---|---|
| **Primary Maroon** | `#7A1315` | `maroon.DEFAULT: '#8B1E1E'`, `maroon.hover: '#7A1919'` | **AGENTS.md §4 locks token**: Enforce `#8B1E1E`. |
| **Dark Maroon / Wine** | `#2A0406`, `#3B0709`, `#4D090B` | *None* | **Add semantic tokens**: `maroon.dark: '#2A0406'`, `maroon.wine: '#3B0709'` in `tailwind.config.ts` for dark section backdrops. |
| **Secondary Gold** | `#D4AF37`, `#F5E4A8`, `#B8860B` | `gold.DEFAULT: '#EAA838'`, `gold.hover: '#D4962F'` | **AGENTS.md §4 locks token**: Enforce `#EAA838`. |
| **Accessible Gold Text** | `#D4AF37` on white (contrast 2.1:1 ❌) | `gold-accessible: '#8A5E00'` (contrast ≥ 4.5:1 ✅) | **Fix violation**: Replace low-contrast gold text with `text-gold-accessible`. |
| **Page Background** | `softGray: '#F8FAFC'` | `stone.DEFAULT: '#FAFAF9'` | **AGENTS.md §4 locks token**: Enforce `bg-stone`. |
| **Card Surface** | `#FFFFFF` | `surface: '#FFFFFF'` | Match `bg-surface`. |
| **Card Border** | `#E5E7EB` / `#E8DFD8` | `border: '#E7E5E4'` | Match `border-border` (1px solid). |
| **Gradient Shimmer** | `#F5E4A8` → `#D4AF37` → `#B8860B` | `shimmer: 'linear-gradient(135deg, #F3CF7A 0%, #D8982D 50%, #C47F18 100%)'` | Match `bg-shimmer`. |
| **Heading Font** | `'Alice', serif` | `font-heading: ['Alice', 'serif']` | Self-hosted WOFF2 `Alice` (H1–H3 per §4). |
| **UI & Body Font** | `'Montserrat', sans-serif` | `font-ui`, `font-body: ['Montserrat', ...sans]` | Self-hosted WOFF2 `Montserrat` (600 for UI, 400 for body). |
| **Type Scale** | Fixed `text-3xl`, `text-5xl`, `text-6xl`, `text-xs` | Fluid `clamp()` scale (`display`, `h1`, `h2`, `h3`, `body`, `label`) | **AGENTS.md §4 locks scale**: All fixed type sizes convert to fluid `clamp()` tokens. |
| **Border Radius** | `rounded-2xl`, `rounded-3xl`, `rounded-full` | `card: '1rem'` (`rounded-card`), `pill: '9999px'` (`rounded-pill`) | Map cards to `rounded-card`, tags/badges/buttons to `rounded-pill`. |
| **Shadows** | `shadow-2xl`, `shadow-gold-glow`, `shadow-card-soft` | `boxShadow.card`, `boxShadow['card-hover']`, `boxShadow.modal` | **Enforce §4**: Borders do the work of borders; shadows reserved for `:hover` and modals. |
| **Motion Duration** | `160ms`, `200ms`, `240ms`, `300ms` | `transitionDuration.DEFAULT: '120ms'` | **AGENTS.md §4 locks duration**: 100–150ms range. |
| **Motion Timing** | Custom cubic beziers, `ease` | `enter: 'cubic-bezier(0, 0, 0.2, 1)'`, `exit: 'cubic-bezier(0.4, 0, 1, 1)'` | Standardize on `ease-enter` (entrances) and `ease-exit` (exits). |
| **Transition Properties** | `transition: all` / `transition-all` | Targeted (`transition-transform`, `transition-opacity`, `transition-colors`) | **Enforce §4**: Eliminate all `transition-all` instances. |

---

## 4. Script & Handler Mapping

| Script / Handler in Prototype | Source File(s) | Mapping Strategy | Target Implementation |
|---|---|---|---|
| **Mobile Drawer Toggle & Backdrop** | All 6 HTML files | **(c) React island** (`client:load`) | Handled via shadcn/ui `Sheet` (`src/components/navigation/MobileNavDrawer.tsx`). Manages focus trap, `Esc` dismissal, body scroll lock, and return focus to hamburger trigger. |
| **Header Scroll Dynamic Elevation** | All 6 HTML files | **(b) Astro `<script>`** (TypeScript) | Lightweight vanilla TS `IntersectionObserver` observing `#scroll-sentinel` inside `Navbar.astro`. 0 KB client framework overhead. |
| **GWA Matrix Calculator** | `deans-list.html` | **(c) React island** (`client:visible`) | `src/components/interactive/GwaCalculator.tsx`. Reactive unit/grade tracking, course row additions/removals, inline error states without `NaN`, and threshold constants from `src/config.ts`. |
| **FAQ Accordions** | `deans-list.html` | **(c) React island** (`client:visible`) | `src/components/interactive/FaqAccordion.tsx` using shadcn/ui `Accordion`. Full ARIA disclosure compliance and keyboard arrow navigation. |
| **External DIONE Portal Links** | `index.html`, `deans-list.html`, `fees.html`, `merch.html` | **(c) React island** (`client:idle` / `client:visible`) | Accessible shadcn/ui `Dialog` modals (`QrModal.tsx` for DL Application and Merch Order QR codes) with direct portal fallback link inside. |

---

## 5. Content Architecture & Zod Schemas

All repeatable data lives in `src/content/*.json` validated at build-time in `src/content.config.ts`:

### A. Officers (`src/content/officers.json`)
Canonical roster: Dean Dr. Anna Maria V. Rivera, Faculty Adviser Dr. Jonelyn B. Sandoval, Student Org Head Dr. Cristina Dt. Geron, President Lian Beatrice S. Catipon, Secretary Cristal B. Coliat, plus 4 Standing Committees.
```ts
const officersCollection = defineCollection({
  loader: file('src/content/officers.json'),
  schema: z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    position: z.string().min(1, 'Position is required'),
    tier: z.enum(['institutional', 'secretariat', 'committee']),
    roleTitle: z.string().min(1),
    affiliation: z.string().min(1),
    bio: z.string().optional(),
    photo: z.string().min(1),
    email: z.string().email().optional(),
    linkedin: z.string().url().optional(),
    activeProject: z.string().optional(),
    order: z.number().int().default(99),
  }),
});
```

### B. Merchandise (`src/content/merch.json`)
Items: Varsity Jacket (₱650), Society Lanyard (₱120), Golden Lotus Pin (₱80).
```ts
const merchCollection = defineCollection({
  loader: file('src/content/merch.json'),
  schema: z.object({
    id: z.string(),
    name: z.string().min(1, 'Item name is required'),
    price: z.number().positive('Price must be greater than 0'),
    badge: z.string().optional(),
    description: z.string().min(1),
    sizes: z.array(z.string()).default([]),
    image: z.string().min(1),
    available: z.boolean().default(true),
    order: z.number().int().default(99),
  }),
});
```

### C. Hall of Fame / Honors Roster (`src/content/hall-of-fame.json`)
Roster: AY 2023–2024 Semester 2 honorees (Castillo, Mendoza, Hernandez, Dimaano, Ramirez).
```ts
const hallOfFameCollection = defineCollection({
  loader: file('src/content/hall-of-fame.json'),
  schema: z.object({
    id: z.string(),
    academicYear: z.string().min(1),
    semester: z.enum(['1st', '2nd']),
    name: z.string().min(1, 'Honoree name is required'),
    program: z.string().min(1, 'Program is required'),
    gwa: z.number().min(1.00).max(5.00),
    classification: z.enum(["First Honors", "Second Honors"]),
    badge: z.string().min(1),
    rank: z.number().int().positive().optional(),
  }),
});
```

### D. Accomplishments (`src/content/accomplishments.json`)
Projects: Project Dunong, Red Spartan Colloquium, Padayon Aid.
```ts
const accomplishmentsCollection = defineCollection({
  loader: file('src/content/accomplishments.json'),
  schema: z.object({
    id: z.string(),
    eventName: z.string().min(1, 'Event name is required'),
    tag: z.string().min(1),
    projectHead: z.string().min(1, 'Project head is required'),
    status: z.string().min(1),
    summary: z.string().min(1).max(400, 'Keep summary under 400 characters'),
    image: z.string().min(1),
  }),
});
```

---

## 6. Modals & Interactive Primitives Mapped to `shadcn/ui`

1. **Dean's List Application Modal (`DlApplicationModal.tsx`)**:
   - Primitive: shadcn/ui `Dialog` (`@radix-ui/react-dialog`).
   - Trigger: "Apply DL" button in navbar, hero, and subpage CTAs.
   - Content: Application checklist, Google Form QR code, and fallback DIONE student portal link.
   - Behavior: Traps focus, closes on `Escape` / overlay tap, restores focus to trigger.
2. **Merch Order Modal (`MerchOrderModal.tsx`)**:
   - Primitive: shadcn/ui `Dialog`.
   - Trigger: "Access Official Pre-Order Portal" button in `/merch`.
   - Content: Pre-order batch guidelines, Google Form QR code, and direct intake URL.
3. **Mobile Navigation Drawer (`MobileNavDrawer.tsx`)**:
   - Primitive: shadcn/ui `Sheet` (Radix Dialog primitive).
   - Trigger: Hamburger button (`#mobile-menu-btn`).
   - Behavior: Slide-over navigation drawer with backdrop, focus trap, and touch-dismissal.
4. **FAQ Accordion (`FaqAccordion.tsx`)**:
   - Primitive: shadcn/ui `Accordion` (`@radix-ui/react-accordion`).
   - Behavior: WAI-ARIA compliant disclosure pattern with ArrowUp/Down keyboard navigation and smooth height transition.

---

## 7. Prototype Violations of AGENTS.md & Mandated Fixes

| Violation Category | Prototype Location | Specific Violation | Mandated Fix |
|---|---|---|---|
| **Banned Words (§2)** | `index.html:658` | *"empowering over 350 public school elementary students"* (`empower` is strictly banned) | **Rewrite:** *"Volunteer scholar tutorials teaching over 350 public school elementary students in foundational math and reading comprehension."* |
| **Banned Words (§2)** | `index.html:256` | *"Leading Innovations, Transforming Lives, Building the Nation"* (SaaS marketing slogan) | **Rewrite:** *"Official Academic Society of the College of Arts and Sciences, Batangas State University Pablo Borbon."* |
| **Banned Words (§2)** | `deans-list.html:639` | *"Saluting the academic titans who raise the bar"* (melodramatic SaaS phrasing) | **Rewrite:** *"Students recognized for First and Second Honors distinction under College of Arts and Sciences evaluation standards."* |
| **Banned Words (§2)** | `background.html:353` | *"uplifting the integrity of the students"* | **Rewrite:** *"maintaining academic integrity and scholarly standards"* |
| **Raw `<img>` Tags (§3)** | All 6 HTML files | Unoptimized external Google CDN `<img>` tags without explicit width/height causing layout shift | Replace all instances with `astro:assets` `<Image />` referencing optimized local WebP assets with explicit `width` and `height`. |
| **Google Fonts CDN (§3)** | `<head>` of all 6 files | External render-blocking calls to `fonts.googleapis.com` and `cdnjs.cloudflare.com` FontAwesome | Remove all CDN calls. Self-host Alice and Montserrat WOFF2 via `@font-face` with `font-display: swap`. Replace FontAwesome with inline SVG icons. |
| **`transition: all` (§4)** | Throughout all 6 files (e.g. `index.html:161, 163, 178-183`) | `transition: all duration-300`, `transition-all` | Replace with targeted `transition-colors`, `transition-transform`, or `transition-opacity` over 120ms with `ease-enter`/`ease-exit`. |
| **`outline: none` (§3)** | `deans-list.html:404, 407, 410, 431` | `outline-none` on form inputs without accessible focus ring | Add `focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none`. |
| **Shadows as Borders (§4)** | Featured cards in all files | `shadow-2xl`, `shadow-xl`, `drop-shadow-[...]` used without borders | Enforce `1px solid border-border` on all cards; reserve shadows exclusively for hover states and modal elevation. |
| **Hand-Rolled ARIA (§1)** | Drawer & FAQ scripts in all files | Hand-rolled DOM class toggling without focus trapping, WAI-ARIA tab/accordion roles, or arrow keys | Replace completely with shadcn/ui primitives. |
| **Desktop-First CSS (§3)** | Breakpoints across all files | `w-64`, fixed pixel dimensions, non-fluid typography (`text-3xl sm:text-5xl`) | Refactor to mobile-first (375px baseline) with fluid `clamp()` type scale tokens. |
| **Magic Numbers (§3)** | `deans-list.html:970, 971, 1000, 1007` | Hardcoded `2.00`, `2.25`, `2.50`, `1.45`, `1.75`, `15` in GWA calculation | Define named typed constants in `src/config.ts` (`DL_CONFIG.FIRST_HONORS_MAX_GWA`, etc.). |

---

## 8. Decisions Made for Phase 2

1. **Route Architecture:** Multi-page routing across 6 routes: `/`, `/background`, `/officers`, `/deans-list`, `/fees`, `/merch`.
2. **Canonical Roster:** Sourced from `officers.html` (Dean Dr. Anna Maria V. Rivera, Faculty Adviser Dr. Jonelyn B. Sandoval, Head of Student Organizations Dr. Cristina Dt. Geron, President Lian Beatrice S. Catipon, Secretary Cristal B. Coliat).
3. **Modal Interactions:** Accessible shadcn/ui `Dialog` modals for Merch order QR and DL application QR, retaining DIONE student portal link inside the modal.
4. **Hero Image Asset:** Use existing optimized WebP asset (`src/assets/hero-bg.webp`) rather than uncompressed or missing prototype references.
5. **No File Leakage:** Confirmed that `./Design/` remains read-only; no files or imports from `./Design/` will exist in `src/pages/` or `public/`.
