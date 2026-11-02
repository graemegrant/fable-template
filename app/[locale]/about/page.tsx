import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import AboutView from '@look/views/AboutView';
import { loadAbout } from '@/lib/pages/about';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Our Story',
    description: `The history, people and quiet convictions of ${hotelConfig.name} — a Victorian shooting lodge remade as Highland Perthshire’s most particular small hotel.`,
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadAbout(locale);
  return <AboutView locale={locale} {...data} />;
}
