/**
 * The look being built (AGENTS.md §3a): `look` in hotel.config.ts, unless
 * the LOOK environment variable overrides it (CI builds every look; demo
 * deployments set it). next.config.ts and lib/tokens.ts read this.
 * Relative imports only: tailwind.config.ts loads it outside Next's aliases.
 */
import { hotelConfig } from '../hotel.config';
import { LOOKS, type Look } from './looks';

const fromEnv = process.env.LOOK as Look | undefined;

if (fromEnv && !(LOOKS as readonly string[]).includes(fromEnv)) {
  throw new Error(`Unknown LOOK "${fromEnv}". Choose one of: ${LOOKS.join(', ')}.`);
}

export const activeLook: Look = fromEnv || hotelConfig.look;
