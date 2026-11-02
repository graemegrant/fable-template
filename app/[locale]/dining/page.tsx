import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import DiningView from '@look/views/DiningView';
import { loadDining } from '@/lib/pages/dining';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Dining & Restaurant in ${hotelConfig.location.locality}`,
    description: `The dining room at ${hotelConfig.name}, ${hotelConfig.location.locality}: estate cooking by head chef Calum Ross — the river, the hill and the walled garden, in season and in order.`,
    path: '/dining',
  });
}

export default async function DiningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadDining(locale);
  return <DiningView locale={locale} {...data} />;
}
