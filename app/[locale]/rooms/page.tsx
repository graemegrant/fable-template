import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import RoomsView from '@look/views/RoomsView';
import { loadRooms } from '@/lib/pages/rooms';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Rooms & Suites in ${hotelConfig.location.locality}`,
    description: `The rooms of ${hotelConfig.name}: classic rooms, deluxe doubles and suites, each facing the glen, the garden or the river.`,
    path: '/rooms',
  });
}

export default async function RoomsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadRooms(locale);
  return <RoomsView locale={locale} {...data} />;
}
