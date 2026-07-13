import type { Config } from 'tailwindcss';

/**
 * Colour tokens — the single place to re-skin for a new client.
 * Names are semantic so component classes never change between clients.
 *
 * Craigmore heritage palette (2026 refresh): peat, stone, aged brass.
 * Depth comes from gradient merges (see globals.css) rather than flat fills.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#2B2119',      // peat — primary dark
        forestdeep: '#1B1510',  // deepest peat — footers, gradients
        gold: '#A67C3D',        // aged brass — accents on light
        goldbright: '#E8C083',  // bright brass — accents on dark (contrast-safe)
        parchment: '#EFEAE1',   // stone — primary light
        warmgrey: '#E3DCCF',    // deep stone — alt bands, cards
        ink: '#241D16',         // text
      },
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
    },
  },
  plugins: [],
};

export default config;
