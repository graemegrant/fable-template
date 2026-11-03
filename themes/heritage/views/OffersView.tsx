import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import OfferCard from '../components/OfferCard';
import DirectBookingBanner from '../components/DirectBookingBanner';
import { FadeUp } from '../components/Motion';
import type { OffersData } from '@/lib/pages/offers';

/** Offers page, Heritage look. Data comes from lib/pages/offers.ts. */
export default async function OffersView({ offers }: { locale: Locale } & OffersData) {
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
