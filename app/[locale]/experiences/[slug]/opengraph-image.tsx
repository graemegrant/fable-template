import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { sanityFetch } from '@/lib/sanity';
import { EXPERIENCE_BY_SLUG_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences } from '@/lib/data';
import type { ExperienceI18n } from '@/lib/types';
import { resolveExperience } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `An experience at ${hotelConfig.name}`;

export function generateStaticParams() {
  return LOCALE_IDS.flatMap((locale) => fallbackExperiences.map((e) => ({ locale, slug: e.slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawExp = await sanityFetch<ExperienceI18n | null>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug },
    fallbackExperiences.find((e) => e.slug === slug) ?? null,
  );
  const exp = rawExp ? resolveExperience(rawExp, locale) : null;
  return renderOgImage({
    eyebrow: exp ? `Experience · ${exp.category}` : 'Experiences',
    title: exp ? exp.name : 'Days, properly spent',
    footer: exp ? exp.price : undefined,
  });
}
