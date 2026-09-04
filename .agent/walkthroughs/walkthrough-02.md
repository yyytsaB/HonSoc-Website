## Milestone 2 — Walkthrough

### What Was Built
Milestone 2 delivers the primary navigation header, mobile navigation drawer, interactive section switcher, and hero section for the HonSoc website. The navbar features a sticky frosted-glass surface that blends over an atmospheric hero image, paired with a focus-trapped accessible drawer for mobile viewports. A pill-toggle tab switcher allows instant access to society sections, while the hero section establishes academic brand presence with balanced optical typography and CTA buttons.

### Component / Feature Tour

#### `<Navbar />` (`src/components/navigation/Navbar.astro`)
- **Purpose:** Sticky header navigation bar positioned at the top of all viewports.
- **Key Props/API:** `class?: string` (supports style extensions).
- **Usage Example:**
  ```astro
  ---
  import Navbar from '../components/navigation/Navbar.astro';
  ---
  <Navbar />
  ```
- **Features:**
  - Frosted glass effect (`bg-surface/80 backdrop-blur-md border-b border-border/80`).
  - Integrated `<Logo size="md" />` on the left.
  - Desktop nav links with pill hover states (`hover:text-maroon hover:bg-maroon-light/60`).
  - Direct CTA button (`<Button href="#dl-application" variant="primary" size="sm">`).
  - Mobile hamburger trigger that activates `<MobileNavDrawer client:idle />`.

#### `<MobileNavDrawer />` (`src/components/navigation/MobileNavDrawer.tsx`)
- **Purpose:** Accessible mobile navigation drawer built on shadcn/ui and Vaul primitives.
- **Key Props/API:** `items: { label: string; href: string }[]`.
- **Usage Example:**
  ```tsx
  <MobileNavDrawer items={[{ label: 'Overview', href: '#hero' }]} />
  ```
- **Features:**
  - Traps keyboard focus within drawer when opened.
  - Closes on `Escape` key press or overlay click.
  - Returns focus to the hamburger trigger button upon closing.
  - Links automatically close drawer on selection.

#### `<Logo />` (`src/components/navigation/Logo.astro`)
- **Purpose:** Brand crest and typographic emblem shared between header and footer.
- **Key Props/API:** `size?: 'sm' | 'md' | 'lg'`, `showSubtitle?: boolean`, `href?: string`.
- **Usage Example:**
  ```astro
  ---
  import Logo from '../components/navigation/Logo.astro';
  ---
  <Logo size="md" />
  ```
- **Features:**
  - Vector SVG crest reflecting the academic lotus/leaf moodboard motif with brand gold shimmer and maroon petals.
  - Alice serif brand name ("HonSoc") and Montserrat uppercase subtitle ("Honor Society").
  - Accessible label structure aligned with visible text to eliminate WCAG 2.5.3 name mismatches.

#### `<SectionTabsIsland />` (`src/components/navigation/SectionTabsIsland.tsx`)
- **Purpose:** Section switcher allowing students to preview society departments and jump directly to content anchors.
- **Key Props/API:** `defaultTab?: string`.
- **Usage Example:**
  ```astro
  <SectionTabsIsland client:visible defaultTab="overview" />
  ```
- **Features:**
  - Built with `@radix-ui/react-tabs` and styled as rounded pill toggles.
  - Instantaneous switching without fade latency.
  - Smooth 120ms `ease-enter` transitions (`transition-[color,background-color,box-shadow] duration-[120ms] ease-enter`).
  - Active tab rendered with `bg-maroon text-white shadow-sm`.

#### `<Hero />` (`src/components/sections/Hero.astro`)
- **Purpose:** Landing hero section communicating the society's academic distinction and transparent service mission.
- **Key Props/API:** `class?: string`.
- **Usage Example:**
  ```astro
  ---
  import Hero from '../components/sections/Hero.astro';
  ---
  <Hero />
  ```
- **Features:**
  - Alice heading at `text-display` token, tracking tight.
  - Montserrat 600 subheading at `text-body-lg` token.
  - Primary ("Apply for Dean's List") and Outline ("View Membership Details") action buttons using existing `Button.astro` primitives.
  - Four key metric indicators in pill-style badges with high-contrast text (`text-gray-600`).
  - Atmospheric 10kB AVIF background image with multi-stage gradient overlay guaranteeing WCAG AAA contrast and rapid sub-2s mobile LCP.

### Integration Notes
- **Milestone 3 (Transparency & Information Sections):** The navigation links in `Navbar.astro`, `MobileNavDrawer.tsx`, `Footer.astro`, and the `SectionTabsIsland.tsx` tabs target anchor IDs (`#hero`, `#membership`, `#officers`, `#accomplishments`, `#merch`, `#dl-application`, `#hall-of-fame`). As Milestone 3 components are developed, they will slot directly into these anchor locations.
- **Milestone 4 (Interactive Features):** The CTA buttons in `Hero.astro` and `Navbar.astro` point to `#dl-application` and `#membership`. When the GWA calculator and application modals are built in Milestone 4, they can trigger modal dialogs or route to calculator workflows seamlessly.

### Known Gaps
- **Section Bodies:** Content beneath the quick switcher is currently represented as preview cards with anchors; full grids and JSON-backed data lists will be built in Milestone 3.
- **Form Action Handlers:** The "Apply for Dean's List" and "View Catalog" buttons currently link to page anchors until external Google Forms or dialog modals are integrated in Milestone 4.
