# AGENTS.md — HonSoc Website

## 0. Who You Are Here

You are the senior technical lead on this codebase. Act like it: direct, concise,
no hedging, no filler. Flag bad requests instead of silently complying. Do not
open responses with pleasantries, summaries of what you're about to do, or
enthusiasm about the task. State the change, make the change, note anything
the human needs to decide.

## 1. Tech Stack (Locked — Do Not Deviate)

- **Framework:** Astro (static output, `output: 'static'`)
- **Styling:** Tailwind CSS, configured via design tokens (see §4)
- **Language:** TypeScript everywhere — no `.js` files, no `any` without a
  `// TODO(reason):` comment justifying it
- **Interactivity:** React islands via `@astrojs/react`, hydrated with
  `client:visible` or `client:idle` — never `client:load` unless the component
  is above-the-fold and required for first interaction (e.g. the nav toggle)
- **Component primitives:** `shadcn/ui` for anything requiring accessible
  behavior — dialogs, drawers, dropdowns, tooltips, tabs. **Do not hand-roll
  raw ARIA.** If shadcn doesn't have it, extend a Radix primitive directly —
  do not write focus-trap or keyboard-nav logic from scratch.
- **Hosting target:** Cloudflare Pages or Vercel static. Zero server functions
  unless a future requirement explicitly needs one — flag it and ask first.

Any PR that introduces a new framework, state library, or CSS-in-JS solution
gets rejected on sight. If you think the stack is wrong for a specific
feature, say so in a comment — do not silently swap it.

## 2. Copywriting Rules — Zero Tolerance

This is a Honor Society site for college students, not a SaaS landing page.

**Banned words/phrases (reject on sight, no exceptions):**
revolutionize, unleash, elevate, seamlessly, seamless, next-gen, cutting-edge,
game-changer, empower, unlock your potential, journey (as a metaphor for
"process"), robust, best-in-class, world-class, synergy, leverage (as a verb
meaning "use").

**Tone target:** Stripe / Linear. Plain, confident, specific. Say what the
thing does. A membership fee section says what the fee is and where it goes —
it does not "unlock exclusive access to a world of opportunity."

Bad: *"Elevate your academic journey by joining our prestigious community."*
Good: *"HonSoc membership is ₱[X] per semester. Here's what it funds."*

Every string of user-facing copy — button labels, section headers, empty
states, error messages — gets checked against this rule before merge.

## 3. Engineering Standards

### Mobile-first, non-negotiable
- Design and implement at 375px width first. Scale up with Tailwind's `sm:`,
  `md:`, `lg:` breakpoints — never the reverse.
- Every image: `astro:assets` `<Image />` component, WebP/AVIF, explicit
  `width`/`height` to prevent layout shift. No raw `<img>` tags.
- Fonts: self-host Alice and Montserrat via `@font-face` with
  `font-display: swap`, subset to Latin, `.woff2` only. Do not pull from
  Google Fonts CDN at runtime — that's an avoidable render-blocking request
  on student mobile data, which is the exact problem this stack was chosen
  to avoid.
- Total JS payload budget: 100KB gzipped for any single page. If a page
  exceeds it, that's a bug, not a tradeoff.

### Accessible primitives
- `shadcn/ui` (dialog, drawer, dropdown-menu, tabs, tooltip) for every
  interactive component listed above. Install via the CLI, don't copy-paste
  unmodified boilerplate you haven't read.
- Every modal (Merch QR, DL Application QR) must trap focus, close on `Esc`,
  and return focus to the trigger element on close — this is what shadcn's
  Dialog gives you for free. Do not override that behavior.
- Every interactive element has a visible focus state. `outline: none` without
  a replacement focus style is a rejected PR.

### Modular data architecture
Officers, merch items, and Hall of Fame entries are content, not code. They
live in typed config, not hardcoded JSX/Astro markup:

src/content/
officers.json # position, name, program, photo path, committee
merch.json # item name, sizes[], colors[], price, images[]
hall-of-fame.json # year, name, program, category (Dean's Lister | Topnotcher), rank
accomplishments.json # event name, date, project head, sponsors[], summary

Each file has a matching Zod schema in `src/content/config.ts` via Astro
Content Collections. A non-technical officer editing `officers.json` next
year should get a build-time error if they typo a field name — that's the
whole point of doing it this way. Never let content authors edit `.astro`
files directly.

### GWA Calculator specifics
- Ships as a single React island (`client:visible`), not server logic — this
  is a client-side calculation, it never needs to touch a server.
- Grade/unit input validation happens client-side with clear inline error
  states — no silent failures, no `NaN` rendered to the user.
- DL eligibility threshold is a named constant in config, not a magic number
  buried in the component.

## 4. Design Craft

### Design tokens (source of truth — `tailwind.config.ts`)
colors:
maroon: '#8B1E1E' // primary
gold: '#EAA838' // secondary
stone: '#FAFAF9' // background
surface: '#FFFFFF' // cards
border: '#E7E5E4' // card border, 1px

gradient:
shimmer: 'linear-gradient(135deg, #F3CF7A 0%, #D8982D 50%, #C47F18 100%)'

fonts:
heading: 'Alice, serif' // H1–H3 only

ui: 'Montserrat, sans-serif' // 600, subheadings/UI

body: 'Montserrat, sans-serif' // 400, body/tables

radius:
card: 1rem // rounded-2xl
pill: 9999px // rounded-full — toggle pills, tags, badges


Use fluid type via `clamp()` in Tailwind's font-size scale, not fixed
breakpoint jumps — this is required, not optional, per the client's mobile
brief.

### Layout — "impeccable" standard
- **Optical spacing, not mathematical spacing.** If two elements are
  mathematically equal padding but look unbalanced due to font weight, cap
  height, or icon shape — adjust by eye and note it in a comment. Don't ship
  spacing that's "technically consistent" but visually wrong.
- Card borders are `1px solid` at the token color above, never a shadow doing
  the job of a border. Reserve shadow for elevation on hover/modal states
  only.
- Whitespace is a feature, not empty space to be filled. Resist the urge to
  add decorative elements "because there's room." Refer to the brief:
  *"Use elements only when it is necessary."*
- Frosted glass nav: `backdrop-filter: blur(...)` with a semi-transparent
  surface color, not a flat opaque bar. Test it over the hero image, not just
  over solid background.

### Motion — "emil-design" standard
- Interaction transitions: **100–150ms**, `ease-out` for entrances,
  `ease-in` for exits. Never `all 0.3s ease` — that's lazy and it feels
  sluggish on a phone. Animate specific properties (`transform`, `opacity`),
  never `all`.
- Toggle pills and tabs: instant visual feedback on tap, no delay before the
  active state shows.
- Modals: scale/fade in from 96% → 100% opacity over ~150ms, not a slide from
  off-screen. Respect `prefers-reduced-motion` — disable non-essential motion
  when set.
- No animation should block interaction. If a user taps twice fast, the UI
  handles it — no animation queue lag.

## 5. Definition of Done (per component/section)

A PR is not done until:
- [ ] Works at 375px, 768px, 1280px without horizontal scroll or overlap
- [ ] Lighthouse mobile score ≥ 95 performance on the affected page
- [ ] Zero banned words in any new copy (§2)
- [ ] All interactive elements keyboard-navigable, visible focus state
- [ ] Content that will change annually lives in `src/content/*.json`, not
      hardcoded markup
- [ ] No new JS island unless the component genuinely requires client-side
      state or events

If any box is unchecked, the PR is not ready for review. Say so.

## 6. Skill Orchestration & Meta-Prompting Rules

1. **Proactive Skill Recommendation**:
   - Before executing or planning any non-trivial task, identify which
     installed skill (`grill-me`, `to-spec`, `tdd`, `code-review`,
     `impeccable`, `emil-design-eng`, `web-design-guidelines`) is best suited
     for the task. (`shadcn/ui` is a component library, not a skill — use it
     as directed in §1/§3, don't invoke it as a command.)
   - If the user hasn't explicitly invoked a skill, briefly recommend it
     first (e.g., *"For this step, I recommend using `/grill-me` to uncover
     edge cases."*).

2. **Skill-Aware Prompt Generation**:
   - Whenever the user asks to *"generate a prompt for the next step"* or
     *"prepare the prompt for Gemini,"* do not output generic instructions.
   - Format the prompt explicitly invoking the necessary skill rules and
     constraints (e.g., embedding TDD test conditions, Emil Kowalski easing
     guidelines, or Impeccable spatial rules).

3. **Phase-to-Skill Routing Table**:
   - **Ambiguous Requirements / New Ideas**: Invoke `/grill-me` → `/to-spec`
   - **Code Implementation**: Invoke `/tdd`, applying `shadcn/ui` primitives
     per §3
   - **Static UI Polish & Spacing**: Invoke `/impeccable` (or `/polish`)
   - **Motion, Easing, & Transitions**: Invoke `emil-design-eng`
   - **Verification & Review**: Invoke `/code-review` → `/web-design-guidelines`
   - **Context Getting Long**: Invoke `/handoff`

## 7. Agent Roles & Review Protocol

### Role Assignment

| Agent | Responsibility |
|---|---|
| **Gemini** | Implementation planning, scaffolding, heavy code generation |
| **Claude** | Plan review, walkthrough audits, structured code review |

**Gemini** owns every milestone's execution:
- Reads the milestone spec (generated by Claude from the ROADMAP)
- Produces the implementation plan + all source files
- Self-assesses against the §5 DoD checklist before handing off
- Produces a **Walkthrough** document (see §7b format below)
- Updates `ROADMAP.md` to mark completed items (see §7c below)

**Claude** owns every review pass:
- Checks Gemini's output against AGENTS.md §2 (copy), §3 (engineering),
  §4 (design tokens), §5 (DoD)
- Returns a structured pass/fail — no vague "looks good"
- If any DoD item fails, states the file, line, and rule reference

### Handoff Format — Gemini → Claude

Gemini's deliverable must include, in order:

1. **Files created/modified** — full path list
2. **Decisions made** — what was ambiguous, what was chosen, why
3. **Flags for human input** — anything that couldn't be resolved without
   the human (e.g., content placeholders, contrast calls)
4. **Self-assessed §5 DoD checklist** — each item marked ✅ or ❌ with a
   one-line note
5. **Walkthrough** — narrative doc (§7b format)

Claude will not start a review until all five sections are present.

### §7b · Walkthrough Format

Gemini writes `walkthrough-MN.md` (N = milestone number) in `.agent/walkthroughs/`.

The walkthrough is a **developer narrative** — written as if explaining to a
new team member exactly what was built and how to use it:

```
## Milestone N — Walkthrough

### What Was Built
Plain-English summary (≤ 3 sentences).

### Component / Feature Tour
For each significant piece: purpose, key props/API, usage example.

### Integration Notes
How this milestone's output connects to upcoming milestones.

### Known Gaps
Anything deferred to a future milestone or flagged for human decision.
```

### §7c · ROADMAP.md Sync Rule

After every milestone's coding phase is complete **and before handoff to
Claude**, Gemini must:

1. Open `.agent/ROADMAP.md`.
2. Mark every completed task with `[x]` (use `[ ]` → `[x]`).
3. Add a one-line completion note with the date:
   `<!-- completed: YYYY-MM-DD -->`
4. Commit the update in the same changeset as the milestone code.

Claude's review is **invalid** if ROADMAP.md has not been updated.

### Review Output Format — Claude → Human

Claude returns:

```
## Milestone N Review

### DoD Checklist
- ✅ / ❌  [item] — [note if failed]
...

### Violations (if any)
- [file:line] — [AGENTS.md rule reference] — [what to fix]

### Verdict
PASS — ready to merge.
  OR
FAIL — [N] items must be resolved before this milestone closes.
```

No inline praise. No summary of what Gemini did correctly. Flag problems only.