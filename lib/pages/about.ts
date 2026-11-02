import { sanityFetch } from '@/lib/sanity';
import { TEAM_QUERY } from '@/lib/queries';
import { team as fallbackTeam } from '@/lib/data';
import type { TeamMemberI18n } from '@/lib/types';
import { resolveTeamMember } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


/** Data for the About page, shared by every look. */
export async function loadAbout(locale: Locale) {
  const rawTeam = await sanityFetch<TeamMemberI18n[]>(TEAM_QUERY, {}, fallbackTeam);
  const team = rawTeam.map((m) => resolveTeamMember(m, locale));
  return { team };
}

export type AboutData = Awaited<ReturnType<typeof loadAbout>>;
