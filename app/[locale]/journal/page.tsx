import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import JournalView from '@look/views/JournalView';
import { loadJournal } from '@/lib/pages/journal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Journal',
    description: `Notes from ${hotelConfig.name}: the garden, the glen, the kitchen and the people who keep the house.`,
    path: '/journal',
  });
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadJournal(locale);
  return <JournalView locale={locale} {...data} />;
}
