/**
 * Coastal look: light, airy, sun-bleached. Brand palette and shape tokens.
 *
 * `lib/tokens.ts` re-exports the active look's values for Tailwind and the
 * image routes. Re-skinning a Coastal client means editing the values below
 * and nowhere else (AGENTS.md sections 3 and 3a). Same role names as every
 * look, each tuned to clear WCAG AA (4.5:1) for its own pairing:
 *   accent       → text, rules and borders on canvas/canvasalt
 *   accentfill   → solid surfaces (buttons, badges, banners)
 *   onaccent     → text and icons placed on an accentfill surface
 *   accentondark → text, rules and borders on primary/primarydeep
 */
export const palette = {
  primary: '#123A4F', // deep sea: dark sections, headings (10.98:1 with canvas)
  primarydeep: '#0B2735', // night tide: footer, overlays
  accent: '#2B6B66', // sea-glass, darkened: accent on light (5.63:1 canvas, 4.98:1 canvasalt)
  accentfill: '#E9B872', // warm sun gold: buttons, badges (onaccent on it 6.63:1)
  onaccent: '#123A4F', // deep sea: text on accentfill
  accentondark: '#9FD4C7', // light sea-glass: accent on dark (7.29:1 primary)
  canvas: '#F8F4EC', // sun-bleached sand: page background
  canvasalt: '#EEE6D7', // wet sand: alternate bands, cards
  ink: '#1E2D35', // text (12.92:1 canvas)
} as const;

/** Corner radii, by role: soft and generous, pill controls. */
export const radii = {
  ctrl: '999px', // buttons, inputs: pills
  card: '28px', // cards, tiles
  // Things nested inside a card (photos, tiles, fields). Concentric with the
  // card: its 28px less the 12px inner padding (p-3) the cards use.
  img: '16px',
} as const;
