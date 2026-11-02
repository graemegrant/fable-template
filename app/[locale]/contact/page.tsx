import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import ContactView from '@look/views/ContactView';
import { loadContact } from '@/lib/pages/contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Contact & Directions',
    description: `Contact ${hotelConfig.name} in ${hotelConfig.location.locality} — enquiries answered by a person within one working day. Phone, email, or the form, whichever suits.`,
    path: '/contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const data = await loadContact(locale);
  return <ContactView locale={locale} {...data} />;
}
