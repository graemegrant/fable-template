import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import WeddingsView from '@look/views/WeddingsView';
import { loadWeddings } from '@/lib/pages/weddings';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Weddings — ${pickLocale(hotelConfig.location.regionLabel, locale)}`,
    description: `Weddings at ${hotelConfig.name}: the whole house, the south lawn and four hundred acres, for one wedding at a time.`,
    path: '/weddings',
  });
}

export default async function WeddingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadWeddings();
  return <WeddingsView locale={locale} {...data} />;
}
