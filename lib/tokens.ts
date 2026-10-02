/**
 * Brand palette — single source of truth for colour.
 *
 * Both `tailwind.config.ts` (className tokens) and server-side image
 * generation (the `opengraph-image` route files, which can't use Tailwind
 * classes) read from here. Re-skinning for a new client means editing
 * the nine values below and nowhere else. See AGENTS.md section 3.
 *
 * Accent tokens are named by role, not by colour, so each role can be
 * tuned independently to clear WCAG AA (4.5:1) for its own pairing. A
 * single accent hue can rarely pass as both text on a light background
 * and a solid fill under dark text — that trade-off is why they're split.
 *   accent       → text, rules and borders on canvas/canvasalt
 *   accentfill   → solid surfaces (buttons, badges, banners)
 *   onaccent     → text and icons placed on an accentfill surface
 *   accentondark → text, rules and borders on primary/primarydeep
 */
export const palette = {
  primary: '#2B2119', // peat — primary dark
  primarydeep: '#1B1510', // deepest peat — footers, gradients
  accent: '#785828', // aged brass, darkened — accent on light (5.43:1 canvas, 4.78:1 canvasalt)
  accentfill: '#B08646', // aged brass — solid fill surfaces (onaccent on it 4.75:1)
  onaccent: '#2B2119', // peat — text on accentfill
  accentondark: '#E8C083', // bright brass — accent on dark backgrounds
  canvas: '#EFEAE1', // stone — primary light
  canvasalt: '#E3DCCF', // deep stone — alt bands, cards
  ink: '#241D16', // text
} as const;

export type PaletteToken = keyof typeof palette;
