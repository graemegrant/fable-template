import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, LOCALE_IDS, type Locale } from '@/lib/locales';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${hotelConfig.name} — ${pickLocale(hotelConfig.seo.descriptor, DEFAULT_LOCALE)} in ${pickLocale(hotelConfig.seo.locationLabel, DEFAULT_LOCALE)}`;

export function generateStaticParams() {
  return LOCALE_IDS.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return renderOgImage({
    eyebrow: `${pickLocale(hotelConfig.seo.descriptor, locale)} · ${pickLocale(hotelConfig.seo.locationLabel, locale)}`,
    title: hotelConfig.name,
    footer: pickLocale(hotelConfig.tagline, locale),
  });
}
