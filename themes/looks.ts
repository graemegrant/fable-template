/**
 * The looks the template ships (AGENTS.md §3a). Each lives in
 * `themes/<look>/` with its own tokens, fonts and presentational
 * components; a client site picks one with `look` in `hotel.config.ts`,
 * and only that look's code is built.
 *
 * Coastal is in progress (its later pages still follow Heritage's
 * layouts); Urban is added when it's built.
 */
export const LOOKS = ['heritage', 'coastal'] as const;

export type Look = (typeof LOOKS)[number];
