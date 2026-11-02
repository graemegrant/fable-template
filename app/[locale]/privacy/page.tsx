import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PrivacyView from '@look/views/PrivacyView';
import { loadPrivacy } from '@/lib/pages/privacy';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Privacy & Cookies',
    description: `How ${hotelConfig.name} uses the information you share through this website, and the cookies it sets.`,
    path: '/privacy',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadPrivacy();
  return <PrivacyView locale={locale} {...data} />;
}
