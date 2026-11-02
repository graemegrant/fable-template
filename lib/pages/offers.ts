import { sanityFetch } from '@/lib/sanity';
import { OFFERS_QUERY } from '@/lib/queries';
import { offers as fallbackOffers } from '@/lib/data';
import type { OfferI18n } from '@/lib/types';
import { resolveOffer } from '@/lib/resolveLocale';
import { isOfferCurrent } from '@/lib/offers';
import type { Locale } from '@/lib/locales';


/** Data for the Offers page, shared by every look. */
export async function loadOffers(locale: Locale) {
  const rawOffers = await sanityFetch<OfferI18n[]>(OFFERS_QUERY, {}, fallbackOffers);
  const offers = rawOffers.filter((o) => isOfferCurrent(o)).map((o) => resolveOffer(o, locale));
  return { offers };
}

export type OffersData = Awaited<ReturnType<typeof loadOffers>>;
