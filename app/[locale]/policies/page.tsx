import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PoliciesView from '@look/views/PoliciesView';

/*
 * "Good to know" — hotel information and policies in plain language: the
 * page guests (and AI assistants) look for before booking. Content comes
 * from lib/data.ts `policies`; write each client's from their real
 * policies, never assumed ones (AGENTS.md §4).
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Good to Know: Hotel Information & Policies',
    description: `Hotel information for ${hotelConfig.name}, ${hotelConfig.location.locality}: check-in from ${pickLocale(hotelConfig.checkIn, locale)}, check-out by ${pickLocale(hotelConfig.checkOut, locale)}, parking, cancellations, children, dogs and accessibility.`,
    path: '/policies',
  });
}

export default async function PoliciesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return <PoliciesView locale={locale} />;
}
