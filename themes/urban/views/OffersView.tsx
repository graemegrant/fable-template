import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import OfferCard from '../components/OfferCard';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp } from '../components/Motion';
import type { OffersData } from '@/lib/pages/offers';

/** Offers page, Urban look. Data comes from lib/pages/offers.ts. */
export default async function OffersView({ offers }: { locale: Locale } & OffersData) {
  const t = await getTranslations('offersPage');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.fire} />
      <section className="mx-auto max-w-screen-2xl space-y-20 px-5 py-16 lg:space-y-28 lg:px-8 lg:py-24">
        {offers.length === 0 && (
          <p className="max-w-2xl border-l-2 border-accentondark pl-6 font-body text-xl leading-snug text-canvas">{t('none')}</p>
        )}
        {offers.map((offer, i) => (
          <div key={offer.slug} id={offer.slug} className="scroll-mt-24">
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
