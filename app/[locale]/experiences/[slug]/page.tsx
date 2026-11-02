import type { Metadata } from 'next';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { EXPERIENCE_BY_SLUG_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences } from '@/lib/data';
import type { ExperienceI18n } from '@/lib/types';
import { resolveExperience } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';
import ExperienceDetailView from '@look/views/ExperienceDetailView';
import { loadExperienceDetail } from '@/lib/pages/experienceDetail';

export const revalidate = 600;

export function generateStaticParams() {
  return LOCALE_IDS.flatMap((locale) => fallbackExperiences.map((e) => ({ locale, slug: e.slug })));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawExp = await sanityFetch<ExperienceI18n | null>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug },
    fallbackExperiences.find((e) => e.slug === slug) ?? null,
  );
  if (!rawExp) return { title: 'Experiences' };
  const exp = resolveExperience(rawExp, locale);
  return pageMetadata({
    locale,
    title: exp.name,
    description: `${exp.name} at ${hotelConfig.name} — ${exp.duration}, ${exp.price}.`,
    path: `/experiences/${exp.slug}`,
    image: `/experiences/${exp.slug}/opengraph-image`,
  });
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadExperienceDetail(locale, slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data.breadcrumbs) }} />
      <ExperienceDetailView locale={locale} {...data} />
    </>
  );
}
