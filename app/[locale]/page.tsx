import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import HomeView from '@look/views/HomeView';
import { loadHome } from '@/lib/pages/home';

// Re-render hourly so expired offers drop off (lib/offers.ts).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: {
      absolute: `${hotelConfig.name} — ${pickLocale(hotelConfig.seo.descriptor, locale)} in ${pickLocale(hotelConfig.seo.locationLabel, locale)}`,
    },
    description: pickLocale(hotelConfig.description, locale) ?? '',
    path: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadHome(locale);
  return <HomeView locale={locale} {...data} />;
}
