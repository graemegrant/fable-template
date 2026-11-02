import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity';
import { breadcrumbList } from '@/lib/schema';
import { EXPERIENCE_BY_SLUG_QUERY, EXPERIENCES_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences } from '@/lib/data';
import type { ExperienceI18n } from '@/lib/types';
import { resolveExperience } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


/** Data for the ExperienceDetail page, shared by every look. */
export async function loadExperienceDetail(locale: Locale, slug: string) {
  const rawExp = await sanityFetch<ExperienceI18n | null>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug },
    fallbackExperiences.find((e) => e.slug === slug) ?? null,
  );
  if (!rawExp) notFound();
  const exp = resolveExperience(rawExp, locale);
  const rawAll = await sanityFetch<ExperienceI18n[]>(EXPERIENCES_QUERY, {}, fallbackExperiences);
  const related = rawAll
    .filter((e) => e.slug !== exp.slug)
    .slice(0, 3)
    .map((e) => resolveExperience(e, locale));
  const breadcrumbs = breadcrumbList([
    ['Home', '/'],
    ['Experiences', '/experiences'],
    [exp.name, `/experiences/${exp.slug}`],
  ], locale);
  return { exp, related, breadcrumbs };
}

export type ExperienceDetailData = Awaited<ReturnType<typeof loadExperienceDetail>>;
