import { sanityFetch } from '@/lib/sanity';
import { EXPERIENCES_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences } from '@/lib/data';
import type { ExperienceI18n } from '@/lib/types';
import { resolveExperience } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


/** Data for the Experiences page, shared by every look. */
export async function loadExperiences(locale: Locale) {
  const rawExperiences = await sanityFetch<ExperienceI18n[]>(EXPERIENCES_QUERY, {}, fallbackExperiences);
  const experiences = rawExperiences.map((e) => resolveExperience(e, locale));
  return { experiences };
}

export type ExperiencesData = Awaited<ReturnType<typeof loadExperiences>>;
