/**
 * Cinematic look: brand palette and shape tokens (AGENTS.md §3 and §3a).
 *
 * A fell lake at dusk: deep lake green for the page, mist white for type and
 * the pale chapters, and reed gold as the one accent. Glass, water and light
 * do the talking. Same shared contract as every look (icons, social images
 * and the browser theme colour read `primary` as the dark brand colour, with
 * `canvas` and `accentondark` on it). Cinematic uses primary as its page
 * colour and canvas for type and the pale morning chapters.
 *
 *   accent       → text and rules on canvas/canvasalt (the pale chapters)
 *   accentfill   → solid surfaces (buttons, tags, the book-direct bar)
 *   onaccent     → text on accentfill
 *   accentondark → text and rules on primary/primarydeep (most of the page)
 *
 * Contrast (WCAG 2.2): canvas on primary 15.1:1, accent on canvas 6.4:1 and
 * on canvasalt 5.7:1, onaccent on accentfill 7.2:1, accentondark on primary
 * 9.3:1, ink on canvas 14.4:1.
 */
export const palette = {
  primary: '#0F1F1C', // deep lake green: page background
  primarydeep: '#08120F', // the lake at night: footer, overlays
  accent: '#6A5518', // dark reed: accent on the pale chapters
  accentfill: '#C9A44C', // reed gold: fills (onaccent on it 7.2:1)
  onaccent: '#0F1F1C', // lake green on gold
  accentondark: '#D8BD6E', // reed gold, lifted: accent on the lake
  canvas: '#F1F2EE', // mist: type on the lake, and the pale chapters
  canvasalt: '#E1E6DF', // deeper mist
  ink: '#122420', // type on mist
} as const;

/** Soft, modern corners: pill controls (buttons, chips, the floating bars),
 *  generously rounded cards and glass panels, rounded photographs. Glass
 *  surfaces and the ambient light behind them live in styles.css. */
export const radii = {
  ctrl: '9999px',
  card: '28px',
  img: '20px',
} as const;
