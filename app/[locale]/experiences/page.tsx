import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import ExperiencesView from '@look/views/ExperiencesView';
import { loadExperiences } from '@/lib/pages/experiences';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Things to Do in ${pickLocale(hotelConfig.seo.locationLabel, locale)}`,
    description: `Whisky, water, hill and hawk — guest experiences at ${hotelConfig.name} in ${hotelConfig.location.locality}, all arranged by the house, all starting at the front door.`,
    path: '/experiences',
  });
}

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadExperiences(locale);
  return <ExperiencesView locale={locale} {...data} />;
}
