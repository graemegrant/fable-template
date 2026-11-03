/**
 * Urban look: brand palette and shape tokens (AGENTS.md §3 and §3a).
 *
 * Ink-black pages, paper type, one signal-orange accent, square corners.
 * The shared contract still holds (icons, social images and the browser
 * theme colour read `primary` as the dark brand colour with `canvas` and
 * `accentondark` on it); Urban simply uses primary as its page colour and
 * canvas for its type and its occasional paper bands.
 *
 *   accent       → text and rules on canvas/canvasalt (paper bands)
 *   accentfill   → solid surfaces (buttons, tags, the book-direct bar)
 *   onaccent     → text on accentfill
 *   accentondark → text and rules on primary/primarydeep (most of the page)
 */
export const palette = {
  primary: '#141414', // ink black: page background
  primarydeep: '#0B0B0B', // deepest black: footer, hero shade
  accent: '#A3300B', // burnt orange: accent on paper (5.6:1 canvas, 4.9:1 canvasalt)
  accentfill: '#FF5B1F', // signal orange: fills (onaccent on it 5.9:1)
  onaccent: '#141414', // ink on signal orange
  accentondark: '#FF7A45', // signal orange, lifted: accent on black (7.1:1)
  canvas: '#F2EFEA', // paper: type on black, and paper bands
  canvasalt: '#E4E0D8', // deeper paper
  ink: '#141414', // type on paper
} as const;

/** Square corners throughout: the look is cut, not rounded. */
export const radii = {
  ctrl: '0px',
  card: '0px',
  img: '0px',
} as const;
