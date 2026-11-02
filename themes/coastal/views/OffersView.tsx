import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import OfferCard from '../components/OfferCard';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp } from '../components/Motion';
import type { OffersData } from '@/lib/pages/offers';

/** Offers page, Coastal look. Data comes from lib/pages/offers.ts. */
export default async function OffersView({ offers }: { locale: Locale } & OffersData) {
  const t = await getTranslations('offersPage');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.fire} />
      <section className="mx-auto max-w-7xl space-y-8 px-6 py-16 lg:space-y-10 lg:px-10 lg:py-24">
        {offers.length === 0 && (
          <p className="mx-auto max-w-xl rounded-card bg-canvasalt p-10 text-center font-body text-lg leading-body text-ink/85">{t('none')}</p>
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
