import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { OFFERS_QUERY } from '@/lib/queries';
import { offers as fallbackOffers, IMG } from '@/lib/data';
import type { OfferI18n } from '@/lib/types';
import { resolveOffer } from '@/lib/resolveLocale';
import { isOfferCurrent } from '@/lib/offers';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import OfferCard from '@/components/OfferCard';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp } from '@/components/Motion';

// Re-render hourly so expired offers drop off (lib/offers.ts).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Special Offers',
    description: `Current offers at ${hotelConfig.name} — seasonal stays, midweek escapes and celebrations, always best booked direct.`,
    path: '/offers',
  });
}

export default async function OffersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const rawOffers = await sanityFetch<OfferI18n[]>(OFFERS_QUERY, {}, fallbackOffers);
  const offers = rawOffers.filter((o) => isOfferCurrent(o)).map((o) => resolveOffer(o, locale));
  const t = await getTranslations('offersPage');

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.fire}
      />
      <section className="mx-auto max-w-7xl space-y-24 px-6 py-20 lg:space-y-32 lg:px-10 lg:py-28">
        {offers.length === 0 && (
          <p className="mx-auto max-w-xl text-center font-body text-base font-light leading-body text-ink/80">{t('none')}</p>
        )}
        {offers.map((offer, i) => (
          <div key={offer.slug} id={offer.slug} className="scroll-mt-28">
            <FadeUp>
              <OfferCard offer={offer} variant="feature" flip={i % 2 === 1} />
            </FadeUp>
          </div>
        ))}
      </section>
      <DirectBookingBanner />
    </>
  );
}
