import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────────────────────────────
      colors: {
        maroon: {
          DEFAULT: '#8B1E1E', // primary
          hover:   '#7A1919', // computed: darken 8%
          light:   '#F5ECEC', // tint at 5% for subtle backgrounds
        },
        gold: {
          DEFAULT: '#EAA838', // secondary / brand accent
          hover:   '#D4962F', // computed: darken 8%
          light:   '#FDF6E7', // tint at 5%
        },
        // Semantic accessible gold tokens for small text & eyebrows on light backgrounds (WCAG AA ≥ 4.5:1)
        'gold-accessible': '#8A5E00',
        'gold-text':       '#8A5E00',
        stone:   '#FAFAF9',   // page background
        surface: '#FFFFFF',   // card surface
        border:  '#E7E5E4',   // card borders — 1px solid only
      },

      // ─── Gradient ──────────────────────────────────────────────────────────
      backgroundImage: {
        shimmer: 'linear-gradient(135deg, #F3CF7A 0%, #D8982D 50%, #C47F18 100%)',
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        heading: ['Alice', 'serif'],
        ui:      ['Montserrat', ...fontFamily.sans],
        body:    ['Montserrat', ...fontFamily.sans],
      },

      // ─── Fluid Type Scale (clamp-based) ────────────────────────────────────
      // All values use clamp(min, preferred, max).
      // min = 375px viewport, max = 1280px viewport.
      // Formula: preferred = min + (max - min) * ((100vw - 375px) / (1280px - 375px))
      fontSize: {
        'display':  ['clamp(2rem, 4.5vw + 0.5rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1':       ['clamp(1.75rem, 3.5vw + 0.4rem, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h2':       ['clamp(1.375rem, 2.5vw + 0.3rem, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3':       ['clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)', { lineHeight: '1.3' }],
        'body-lg':  ['clamp(1rem, 0.8vw + 0.8rem, 1.125rem)', { lineHeight: '1.6' }],
        'body':     ['clamp(0.875rem, 0.5vw + 0.75rem, 1rem)', { lineHeight: '1.65' }],
        'body-sm':  ['clamp(0.75rem, 0.4vw + 0.65rem, 0.875rem)', { lineHeight: '1.6' }],
        'label':    ['clamp(0.6875rem, 0.3vw + 0.6rem, 0.75rem)', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        // These extend Tailwind's defaults — keep DEFAULT/sm/md/lg/xl/2xl intact
        card: '1rem',       // use: rounded-card — for all card components
        pill: '9999px',     // use: rounded-pill — for tags, toggles, badges
      },

      // ─── Spacing (additional optical tokens) ───────────────────────────────
      // Only add tokens with a semantic meaning. Raw Tailwind spacing is fine
      // for incidental layout values.
      spacing: {
        section: 'clamp(3rem, 8vw, 6rem)', // vertical section padding
        container: 'clamp(1rem, 4vw, 2rem)', // horizontal page gutter
      },

      // ─── Box Shadow ────────────────────────────────────────────────────────
      // Borders do the job of borders. Shadow = elevation on hover/modal only.
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 10px 30px -5px rgb(139 30 30 / 0.12), 0 4px 10px -2px rgb(139 30 30 / 0.08)',
        modal: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },

      // ─── Animation ─────────────────────────────────────────────────────────
      transitionDuration: {
        DEFAULT: '120ms', // 100–150ms per AGENTS.md §4 — override Tailwind's 150ms
      },
      transitionTimingFunction: {
        'enter': 'cubic-bezier(0, 0, 0.2, 1)',  // ease-out for entrances
        'exit':  'cubic-bezier(0.4, 0, 1, 1)',  // ease-in for exits
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
