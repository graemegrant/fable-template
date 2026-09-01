import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { OFFERS_QUERY } from '@/lib/queries';
import { offers as fallbackOffers, IMG } from '@/lib/data';
import type { Offer } from '@/lib/types';
import PageHero from '@/components/PageHero';
import OfferCard from '@/components/OfferCard';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp } from '@/components/Motion';

export const metadata = pageMetadata({
  title: 'Special Offers',
  description: `Current offers at ${hotelConfig.name} — seasonal stays, midweek escapes and celebrations, always best booked direct.`,
  path: '/offers',
});

export default async function OffersPage() {
  const offers = await sanityFetch<Offer[]>(OFFERS_QUERY, {}, fallbackOffers);

  return (
    <>
      <PageHero
        eyebrow="Special offers"
        title="Reasons, if you need one"
        subtitle="Every offer below is exclusive to direct bookings — the agencies get our rack rates and our regards."
        image={IMG.fire}
      />
      <section className="mx-auto max-w-7xl space-y-24 px-6 py-20 lg:space-y-32 lg:px-10 lg:py-28">
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
