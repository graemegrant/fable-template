import type { Config } from 'tailwindcss';

/**
 * Colour tokens — the single place to re-skin for a new client.
 * Names are semantic so component classes never change between clients.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1C3A2B',
        gold: '#C4924A',
        parchment: '#F2EDE4',
        warmgrey: '#E8E2D9',
        ink: '#2C2C2C',
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
