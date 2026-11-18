/**
 * Cinematic look: brand palette and shape tokens (AGENTS.md §3 and §3a).
 *
 * A projection-room black, bone-white type and one champagne accent. The
 * photography does the talking; the palette stays out of its way. Same
 * shared contract as every look (icons, social images and the browser
 * theme colour read `primary` as the dark brand colour, with `canvas` and
 * `accentondark` on it). Like Urban, Cinematic uses primary as its page
 * colour and canvas for type and the occasional bone-white band.
 *
 *   accent       → text and rules on canvas/canvasalt (bone bands)
 *   accentfill   → solid surfaces (buttons, tags, the book-direct bar)
 *   onaccent     → text on accentfill
 *   accentondark → text and rules on primary/primarydeep (most of the page)
 *
 * Contrast (WCAG 2.2): canvas on primary 15.7:1, accent on canvas 5.5:1 and
 * on canvasalt 4.7:1, onaccent on accentfill 8.1:1, accentondark on primary
 * 10.0:1, ink on canvas 15.1:1.
 */
export const palette = {
  primary: '#100E0C', // projection-room black: page background
  primarydeep: '#090807', // deepest black: footer, hero shade, overlays
  accent: '#7A5426', // bronze: accent on bone bands
  accentfill: '#C8A26A', // champagne: fills (onaccent on it 8.1:1)
  onaccent: '#100E0C', // black on champagne
  accentondark: '#D8B67E', // champagne, lifted: accent on black
  canvas: '#EEE7DA', // bone: type on black, and bone bands
  canvasalt: '#DFD6C5', // deeper bone
  ink: '#16130F', // type on bone
} as const;

/** Hairline corners: boxed elements stay softened (AGENTS.md §4a) without
 *  rounding the full-bleed photography that carries the look. */
export const radii = {
  ctrl: '2px',
  card: '4px',
  img: '2px',
} as const;
