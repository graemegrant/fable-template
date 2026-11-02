/**
 * Heritage look: brand palette and shape tokens.
 *
 * `lib/tokens.ts` re-exports the chosen look's values, and both
 * `tailwind.config.ts` (className tokens) and server-side image generation
 * (the `opengraph-image` route files, which can't use Tailwind classes) read
 * them from there. Re-skinning a Heritage client means editing the values
 * below and nowhere else. See AGENTS.md sections 3 and 3a.
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


/** Corner radii, by role. */
export const radii = {
  ctrl: '10px', // buttons, inputs: contour-bias, approachable controls
  card: '18px', // cards, tiles
  img: '14px', // image frames
} as const;
