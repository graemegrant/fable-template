/**
 * The chosen look's design tokens (AGENTS.md §3 and §3a).
 *
 * Each look defines its palette and radii in `themes/<look>/tokens.ts`;
 * this file picks the active one (`look` in `hotel.config.ts`, or LOOK). Tailwind
 * (tailwind.config.ts) and the opengraph-image routes read from here.
 * Relative imports only: tailwind.config.ts loads this file outside Next's
 * path aliases.
 */
import { activeLook } from '../themes/active';
import * as heritage from '../themes/heritage/tokens';

const looks = { heritage } as const;

export const { palette, radii } = looks[activeLook];

export type PaletteToken = keyof typeof palette;
