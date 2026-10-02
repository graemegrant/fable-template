/**
 * Booking-engine hand-off. The hotel keeps its own engine and account
 * (SECURITY.md — Codero only ever holds the deep-link URL); this builds
 * the URL a "Check availability" submission sends the guest on to.
 *
 * `hotelConfig.bookingEngineUrl` is the hotel's existing link, pasted
 * as-is. Stay parameters already on it — dates, guest counts, language,
 * currency — are always replaced, so a link copied with a hard-coded
 * arrival date can't send guests to a date that has already passed.
 * Everything else on it (SynXis `chain`/`hotel`, a promo code) is kept.
 */

export type BookingEngineProvider = 'synxis' | 'generic';

export type StayRequest = {
  arrival: string; // YYYY-MM-DD
  departure: string; // YYYY-MM-DD
  adults: number;
  rooms: number;
  language: string; // BCP 47, e.g. en-GB
  currency: string; // ISO 4217, e.g. GBP
};

/** Query parameters each provider uses for the stay itself. Any already
 *  on the configured URL are dropped before ours are set. */
const STAY_PARAMS: Record<BookingEngineProvider, string[]> = {
  // SynXis Booking Engine (be.synxis.com) deep-link parameters.
  synxis: ['arrive', 'depart', 'adult', 'child', 'rooms', 'locale', 'currency'],
  // The template's original parameter names, for engines without an
  // adapter of their own. Language and currency aren't sent: there's no
  // common name for them across engines.
  generic: ['checkin', 'checkout', 'guests', 'rooms'],
};

export function resolveProvider(
  url: string,
  configured: BookingEngineProvider | 'auto',
): BookingEngineProvider {
  if (configured !== 'auto') return configured;
  try {
    return new URL(url).hostname.endsWith('synxis.com') ? 'synxis' : 'generic';
  } catch {
    return 'generic';
  }
}

export function buildBookingUrl(
  baseUrl: string,
  provider: BookingEngineProvider,
  stay: StayRequest,
): string {
  const url = new URL(baseUrl);
  for (const param of STAY_PARAMS[provider]) url.searchParams.delete(param);
  const set = (key: string, value: string | number) => url.searchParams.set(key, String(value));

  if (provider === 'synxis') {
    set('arrive', stay.arrival);
    set('depart', stay.departure);
    set('adult', stay.adults);
    set('child', 0);
    set('rooms', stay.rooms);
    set('locale', stay.language);
    set('currency', stay.currency);
  } else {
    set('checkin', stay.arrival);
    set('checkout', stay.departure);
    set('guests', stay.adults);
    set('rooms', stay.rooms);
  }
  return url.toString();
}
