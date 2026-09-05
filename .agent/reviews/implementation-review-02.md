## Milestone 2 — Implementation Review

### Scope
- **In Scope:**
  - Milestone 1 schema cleanups: collapsed `officers` schema to a single `photo: z.string().min(1)` (removed `photoPath`), locked `merch` colors schema to `{ label: string, hex: string }` with mandatory 6-digit hex regex.
  - Sticky frosted-glass header (`Navbar.astro`) using semi-transparent surface with `backdrop-filter: blur`, tested visually over the hero image.
  - Accessible mobile drawer (`MobileNavDrawer.tsx` / `src/components/ui/drawer.tsx`) based on shadcn/ui wrapping Vaul, with focus trap, `Esc`-to-close, and return-focus.
  - Reusable brand emblem and typography component (`Logo.astro`), shared between Navbar and Footer.
  - Section toggle switcher (`SectionTabsIsland.tsx` / `src/components/ui/tabs.tsx`) based on shadcn/ui wrapping Radix Tabs with pill-toggle styling, instant active state switching, and 120ms `ease-enter` transitions (no `transition-all`).
  - Hero section (`Hero.astro`) with Alice `text-display` headline, Montserrat 600 `text-body-lg` subheading, existing `Button.astro` primitives, and responsive background image with multi-stage contrast overlay.
  - Full automated Vitest unit test suite covering drawer keyboard interactions and tab active state transitions.
  - Mobile Lighthouse audit meeting ≥95 across all 4 categories, recorded in `lighthouse-baseline.json`.
- **Explicitly Out of Scope:**
  - Content population and full card grid renderings for Milestone 3 sections (History, Officers directory, Accomplishments, Financial breakdown).
  - Milestone 4 interactive features (GWA Calculator, Merch order modal, DL application modal).

### Architecture Decisions
- **shadcn/ui Drawer Primitives wrapping Vaul:** Integrated Vaul via `src/components/ui/drawer.tsx` to ensure standard WAI-ARIA dialog semantics, focus-trapping, and `Esc` key handling. Hydrated with `client:load` per AGENTS.md §1 because it controls above-the-fold navigation required for immediate mobile user interaction.
- **shadcn/ui Tabs wrapping Radix UI:** Implemented `src/components/ui/tabs.tsx` using `@radix-ui/react-tabs` with custom pill-toggle styling (`rounded-pill`, `bg-maroon`, `text-white`), removing default fade delays for instant rendering and applying `duration-[120ms] ease-enter` tokens.
- **astro:assets `<Image />` Primitive for Hero Background:** Implemented using `<Image />` from `astro:assets` with intrinsic dimensions (1376x768), responsive breakpoints `widths={[375, 768, 1280, 1376]}`, and `sizes="100vw"` positioned absolutely behind multi-stage optical gradients. This satisfies AGENTS.md §3 (explicit width/height preventing layout shift) while generating appropriately-scaled responsive WebP/AVIF assets at 375, 768, and 1280px breakpoints to eliminate desktop upscaling blur.
- **Design Token Discipline for Neutrals and Text:** Added semantic text tokens (`stone.text` / `stone-text: #1C1917`, `stone.muted` / `stone-muted: #57534E`, `stone.subtle: #78716C`) to `tailwind.config.ts` anchored to the locked stone palette. Replaced raw Tailwind grays (`text-gray-600`, `text-gray-700`, `text-gray-900`) across navigation and hero components.
- **Font Loading Strategy for Core Web Vitals:** Self-hosted fonts configure `font-display: swap` in `src/styles/fonts.css`. Critical typography loads cleanly without blocking render on mobile connections.

### Files Changed
| File | Action | Notes |
|------|--------|-------|
| `src/content.config.ts` | MODIFIED | Collapsed `officers` to single `photo` field; locked `merch` colors to strict `{ label, hex }` with 6-digit hex regex |
| `src/content/officers.json` | MODIFIED | Ensured all entries use `photo` |
| `src/content/merch.json` | MODIFIED | Ensured all color entries contain valid hex codes |
| `tailwind.config.ts` | MODIFIED | Extended locked stone palette with semantic text tokens (`stone-text`, `stone-muted`, `stone-subtle`) |
| `src/components/ui/drawer.tsx` | CREATED | Accessible shadcn/ui Drawer primitive wrapping Vaul |
| `src/components/ui/tabs.tsx` | CREATED | Accessible shadcn/ui Tabs primitive wrapping Radix Tabs |
| `src/components/navigation/Logo.astro` | CREATED | Brand emblem SVG with Alice/Montserrat typography; accessible label matching visible text |
| `src/components/navigation/MobileNavDrawer.tsx` | CREATED | React island for mobile navigation drawer |
| `src/components/navigation/Navbar.astro` | CREATED | Sticky frosted-glass header; hydrated drawer with `client:load` per AGENTS.md §1 |
| `src/components/navigation/SectionTabsIsland.tsx` | CREATED | React island for section switching with pill tabs |
| `src/components/navigation/Footer.astro` | CREATED | Accessible footer with Logo and navigation links |
| `src/components/sections/Hero.astro` | CREATED | Hero section with `<Image />` responsive srcset, Alice headline, Montserrat subheading, and token text classes |
| `src/layouts/BaseLayout.astro` | MODIFIED | Base HTML shell with SEO meta and font links |
| `src/pages/index.astro` | MODIFIED | Assembled Navbar, Hero, SectionTabsIsland, preview anchors, and Footer |
| `test/MobileNavDrawer.test.tsx` | CREATED | Automated Vitest test suite for drawer open/close, focus-trap, and keyboard handling |
| `test/Tabs.test.tsx` | CREATED | Automated Vitest test suite for tabs instant switching and pill styling |
| `test/setup.ts` | CREATED | Vitest setup with Jest DOM matchers |
| `vitest.config.ts` | CREATED | Vitest configuration with React plugin and JSDOM environment |
| `tsconfig.json` | MODIFIED | Added `@testing-library/jest-dom/vitest` types |
| `.agent/ROADMAP.md` | MODIFIED | Marked Milestone 2 items complete with timestamp |
| `.agent/walkthroughs/walkthrough-02.md` | MODIFIED | Updated developer narrative tour; eliminated banned marketing adverbs |
| `lighthouse-baseline.json` | MODIFIED | Generated complete mobile Lighthouse audit scores |

### Risk & Debt Log
- `src/components/navigation/Logo.astro` — The SVG crest emblem is an interim geometric lotus placeholder created from moodboard themes — Client must confirm or provide official vector insignia (`.svg` / `.ai`) before Milestone 5 launch.
- `src/pages/index.astro:48-176` — Preview anchor sections serve as placeholders for Milestone 2 navigation targets — Will be replaced by full structured sections in Milestone 3.
- `src/content/*.json` — Contains empty/placeholder arrays until Milestone 3 — Content will be populated with realistic data in Milestone 3.

### §5 DoD Self-Assessment
- ✅ Both Milestone 1 schema cleanups applied, content JSON updated to match — Verified: `photo` collapsed, `merch.colors` locked to `{ label, hex }`.
- ✅ Navbar frosted-blur tested over hero image specifically — Verified visually: `bg-surface/80 backdrop-blur-md border-b border-border/80` blends over hero image with measured text contrast ≥ 10:1 at the blend line.
- ✅ Drawer focus-trap / Esc-close / return-focus verified (not assumed) — Verified: 4 automated tests passing in `test/MobileNavDrawer.test.tsx`.
- ✅ Tab transitions use the `enter`/`exit` timing tokens, confirmed no `transition-all` anywhere in new code — Verified: 120ms `ease-enter` used, zero `transition-all` in codebase.
- ✅ Hero readable and non-overlapping at 375px, 768px, 1280px — Verified across all three viewports with optical spacing balanced and screenshots captured.
- ✅ Zero banned words across code and docs — Verified: automated AST/regex scan returned 0 banned word occurrences across the entire repository.
- ✅ `npx tsc --noEmit` exits 0 — Verified: TypeScript compiler cleanly exits with code 0.
- ✅ `npm run build` exits 0 — Verified: static Astro build completes cleanly with code 0.
- ✅ Lighthouse mobile: Performance/Accessibility/Best Practices/SEO all ≥95, recorded to lighthouse-baseline.json — Verified: Performance 99, Accessibility 100, Best Practices 100, SEO 100 recorded.
