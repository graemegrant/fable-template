import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import GiftVouchersView from '@look/views/GiftVouchersView';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Gift Vouchers',
    description: `Gift vouchers for ${hotelConfig.name} — stays, dinners and open amounts, posted properly or delivered by email.`,
    path: '/gift-vouchers',
  });
}

export default async function GiftVouchersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return <GiftVouchersView locale={locale} />;
}
