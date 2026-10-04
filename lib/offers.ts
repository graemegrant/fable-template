/**
 * Offer visibility. An offer is shown until the end of its `validUntil`
 * date (inclusive, UTC) and hidden after it — an expired offer on a hotel
 * site is worse than none. `validFrom` deliberately does NOT hide an offer:
 * a seasonal package is promoted before it starts (the winter offer goes up
 * in October). No dates = always shown.
 *
 * Applied to CMS and fallback offers alike, on every page that lists them.
 * Those pages set `revalidate` so an offer drops off within the hour even
 * when nothing is fetched from Sanity (fallback mode would otherwise stay
 * frozen at build time).
 */
export function isOfferCurrent(offer: { validUntil?: string }, now: Date = new Date()): boolean {
  if (!offer.validUntil) return true;
  return offer.validUntil.slice(0, 10) >= now.toISOString().slice(0, 10);
}
