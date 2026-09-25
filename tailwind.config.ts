import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────────────────────────────
      // ─── Brand & Academic Heritage Colors ─────────────────────────────────
      colors: {
        // MD3 / Academic Heritage semantic palette
        primary: {
          DEFAULT: '#6a020a',
          container: '#8b1e1e',
          fixed: '#ffdad6',
          'fixed-dim': '#ffb3ad',
        },
        'on-primary': '#ffffff',
        'primary-container': '#8b1e1e',
        'on-primary-container': '#ff9d95',
        'primary-fixed': '#ffdad6',
        'primary-fixed-dim': '#ffb3ad',
        'on-primary-fixed': '#410003',
        'on-primary-fixed-variant': '#891c1d',
        'inverse-primary': '#ffb3ad',

        secondary: {
          DEFAULT: '#805600',
          container: '#ffba49',
          fixed: '#ffddb0',
          'fixed-dim': '#ffba49',
        },
        'on-secondary': '#ffffff',
        'secondary-container': '#ffba49',
        'on-secondary-container': '#714b00',
        'secondary-fixed': '#ffddb0',
        'secondary-fixed-dim': '#ffba49',
        'on-secondary-fixed': '#281800',
        'on-secondary-fixed-variant': '#614000',

        tertiary: {
          DEFAULT: '#452d00',
          container: '#624200',
          fixed: '#ffddae',
        },
        'on-tertiary': '#ffffff',
        'tertiary-container': '#624200',
        'on-tertiary-container': '#e5ad52',
        'tertiary-fixed': '#ffddae',
        'tertiary-fixed-dim': '#f6bd5f',
        'on-tertiary-fixed': '#281800',
        'on-tertiary-fixed-variant': '#604100',

        surface: {
          DEFAULT: '#fff8f5',
          dim: '#e0d8d5',
          bright: '#fff8f5',
          variant: '#e9e1dd',
          'container-lowest': '#ffffff',
          'container-low': '#faf2ee',
          container: '#f4ece8',
          'container-high': '#eee7e3',
          'container-highest': '#e9e1dd',
        },
        'surface-dim': '#e0d8d5',
        'surface-bright': '#fff8f5',
        'surface-variant': '#e9e1dd',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#faf2ee',
        'surface-container': '#f4ece8',
        'surface-container-high': '#eee7e3',
        'surface-container-highest': '#e9e1dd',
        'surface-tint': '#aa3531',

        'on-surface': '#1e1b19',
        'on-surface-variant': '#58413f',
        'inverse-surface': '#33302d',
        'inverse-on-surface': '#f7efeb',

        outline: '#8b716e',
        'outline-variant': '#dfbfbc',

        background: '#fff8f5',
        'on-background': '#1e1b19',
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        // Legacy / Compatibility tokens
        maroon: {
          DEFAULT: '#8B1E1E', // primary
          hover:   '#7A1919', // computed: darken 8%
          light:   '#F5ECEC', // tint at 5% for subtle backgrounds
          dark:    '#2A0406', // deep dark crimson for headers and banners
          wine:    '#3B0709', // rich wine tone for navbar and cards
          crimson: '#4D090B', // mid-tone dark maroon
        },
        gold: {
          DEFAULT:   '#EAA838', // secondary / brand accent
          hover:     '#D4962F', // computed: darken 8%
          light:     '#FDF6E7', // tint at 5%
          lightGold: '#F5E4A8', // light champagne gold for accents
          deep:      '#B8860B', // deep bronze gold
          amber:     '#E0A838', // vibrant amber gold
        },
        'gold-accessible': '#8A5E00',
        'gold-text':       '#8A5E00',
        stone: {
          DEFAULT: '#FAFAF9', // page background
          text:    '#1C1917', // high-contrast text (stone-900 equivalent)
          muted:   '#57534E', // secondary / metric badge text (stone-600 equivalent)
          subtle:  '#78716C', // tertiary text (stone-500 equivalent)
        },
        'stone-muted':     '#57534E',
        'stone-text':      '#1C1917',
        border:  '#E7E5E4',   // card borders — 1px solid only
      },

      // ─── Gradient ──────────────────────────────────────────────────────────
      backgroundImage: {
        shimmer: 'linear-gradient(135deg, #F3CF7A 0%, #D8982D 50%, #C47F18 100%)',
      },

      // ─── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        heading: ['Newsreader', 'Alice', 'serif'],
        serif:   ['Newsreader', 'Alice', 'serif'],
        ui:      ['Montserrat', ...fontFamily.sans],
        body:    ['Montserrat', ...fontFamily.sans],
        'headline-xl': ['Newsreader', 'serif'],
        'headline-xl-mobile': ['Newsreader', 'serif'],
        'headline-lg': ['Newsreader', 'serif'],
        'headline-lg-mobile': ['Newsreader', 'serif'],
        'headline-md': ['Newsreader', 'serif'],
        'headline-sm': ['Newsreader', 'serif'],
        'title-md': ['Montserrat', ...fontFamily.sans],
        'body-lg': ['Montserrat', ...fontFamily.sans],
        'body-md': ['Montserrat', ...fontFamily.sans],
        'body-sm': ['Montserrat', ...fontFamily.sans],
        'label-lg': ['Montserrat', ...fontFamily.sans],
        'label-md': ['Montserrat', ...fontFamily.sans],
        'label-xs': ['Montserrat', ...fontFamily.sans],
      },

      // ─── Fluid Type Scale & MD3 Scale ─────────────────────────────────────
      fontSize: {
        // MD3 Academic Heritage scales
        'headline-xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.015em', fontWeight: '400' }],
        'headline-xl-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-lg': ['36px', { lineHeight: '44px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-lg-mobile': ['26px', { lineHeight: '34px', fontWeight: '400' }],
        'headline-md': ['28px', { lineHeight: '36px', fontWeight: '400' }],
        'headline-sm': ['22px', { lineHeight: '30px', fontWeight: '500' }],
        'title-md': ['18px', { lineHeight: '26px', letterSpacing: '0.005em', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: '600' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '600' }],
        'label-xs': ['10px', { lineHeight: '14px', letterSpacing: '0.08em', fontWeight: '700' }],

        // Fluid clamps
        'display':  ['clamp(2rem, 4.5vw + 0.5rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1':       ['clamp(1.75rem, 3.5vw + 0.4rem, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h2':       ['clamp(1.375rem, 2.5vw + 0.3rem, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3':       ['clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)', { lineHeight: '1.3' }],
        'body':     ['clamp(0.875rem, 0.5vw + 0.75rem, 1rem)', { lineHeight: '1.65' }],
        'label':    ['clamp(0.6875rem, 0.3vw + 0.6rem, 0.75rem)', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
        card: '1rem',
        pill: '9999px',
      },

      // ─── Spacing & Gutters ─────────────────────────────────────────────────
      spacing: {
        section: 'clamp(3rem, 8vw, 6rem)',
        container: 'clamp(1rem, 4vw, 2rem)',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'gutter-sm': '1rem',
        gutter: '1.5rem',
        'gutter-lg': '2rem',
        'margin-sm': '1rem',
        margin: '1.5rem',
        'margin-lg': '3rem',
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
