/**
 * Brand palette — single source of truth for colour.
 *
 * Both `tailwind.config.ts` (className tokens) and server-side image
 * generation (the `opengraph-image` route files, which can't use Tailwind
 * classes) read from here. Re-skinning for a new client means editing
 * the seven values below and nowhere else. See AGENTS.md section 3.
 */
export const palette = {
  forest: '#2B2119', // peat — primary dark
  forestdeep: '#1B1510', // deepest peat — footers, gradients
  gold: '#A67C3D', // aged brass — accents on light
  goldbright: '#E8C083', // bright brass — accents on dark (contrast-safe)
  parchment: '#EFEAE1', // stone — primary light
  warmgrey: '#E3DCCF', // deep stone — alt bands, cards
  ink: '#241D16', // text
} as const;

export type PaletteToken = keyof typeof palette;
