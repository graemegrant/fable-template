import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import OffersView from '@look/views/OffersView';
import { loadOffers } from '@/lib/pages/offers';

// Re-render hourly so expired offers drop off (lib/offers.ts).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Special Offers',
    description: `Current offers at ${hotelConfig.name} — seasonal stays, midweek escapes and celebrations, always best booked direct.`,
    path: '/offers',
  });
}

export default async function OffersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadOffers(locale);
  return <OffersView locale={locale} {...data} />;
}
