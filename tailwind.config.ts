import type { Config } from 'tailwindcss';
import { palette } from './lib/tokens';

/**
 * Colour tokens — the single place to re-skin for a new client.
 * Names are semantic so component classes never change between clients.
 * The seven hex values live in `lib/tokens.ts` so server-side image
 * generation can share them; edit them there, not here.
 *
 * Craigmore heritage palette (2026 refresh): peat, stone, aged brass.
 * Depth comes from gradient merges (see globals.css) rather than flat fills.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ...palette },
      borderRadius: {
        ctrl: '10px',   // buttons, inputs — contour-bias: approachable controls
        card: '18px',   // cards, tiles
        img: '14px',    // image frames
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      // Below-'xs' sizes for uppercase tracked micro-labels (eyebrows, nav,
      // footer legal text). More x's = smaller, same convention as the
      // built-in scale.
      fontSize: {
        '2xs': '11px',
        '3xs': '10px',
      },
      // Letter-spacing for uppercase tracked labels — named by their em
      // value since there's no semantic distinction between them beyond
      // "how wide," same convention as the built-in wide/wider/widest scale.
      letterSpacing: {
        '18': '0.18em',
        '20': '0.2em',
        '25': '0.25em',
        '30': '0.3em',
        '40': '0.4em',
      },
      // Named by role rather than value — these carry real semantic
      // meaning (display heading vs. body copy) reused across pages.
      lineHeight: {
        display: '1.05',
        heading: '1.32',
        copy: '1.8',
        body: '1.9',
      },
      // Photo-card ratios. 16/9 already covered by the built-in aspect-video.
      aspectRatio: {
        landscape: '4 / 3',
        portrait: '4 / 5',
        tall: '3 / 4',
        wide: '3 / 2',
      },
      // Content + fixed-width sidebar layouts for detail pages.
      gridTemplateColumns: {
        '1fr-380': '1fr 380px',
        '1fr-360': '1fr 360px',
        '1fr-340': '1fr 340px',
        '360-1fr': '360px 1fr',
      },
      spacing: {
        '7px': '7px',
        '9px': '9px',
        // Height reserved for the slim mobile cookie bar, so MobileBookBar
        // can sit directly above it while consent is pending.
        cookiebar: '4.25rem',
      },
      maxWidth: {
        '20ch': '20ch',
      },
      opacity: {
        '18': '0.18',
      },
      height: {
        '80vh': '80vh',
        '240vh': '240vh',
        '260vh': '260vh',
      },
      minHeight: {
        '85vh': '85vh',
        '78vh': '78vh',
        '58vh': '58vh',
        '480px': '480px',
        '260px': '260px',
        '220px': '220px',
      },
      maxHeight: {
        'nav-open': 'calc(100vh - 4rem)',
      },
      transitionProperty: {
        'max-height': 'max-height',
      },
      // Slow image-zoom transitions (RoomCard, OfferCard, JournalCard, etc.)
      transitionDuration: {
        '1200': '1200ms',
      },
      scale: {
        '103': '1.03',
        '104': '1.04',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
      },
    },
  },
  plugins: [],
};

export default config;
