import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import LocationView from '@look/views/LocationView';
import { loadLocation } from '@/lib/pages/location';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Location & Directions — ${hotelConfig.location.locality}`,
    description: `Finding ${hotelConfig.name}: directions by road, rail and air, and what to see in Highland Perthshire once you arrive.`,
    path: '/location',
  });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadLocation();
  return <LocationView locale={locale} {...data} />;
}
