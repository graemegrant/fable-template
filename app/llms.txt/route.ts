import { hotelConfig } from '@/hotel.config';
import { rooms, experiences, journalPosts } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import { DEFAULT_LOCALE } from '@/lib/locales';

/**
 * /llms.txt — generated from hotel.config.ts + static content so the facts
 * stay in sync. Ignored by Google Search; used by some AI crawlers.
 *
 * This is a single global document, not locale-routed, so every
 * translatable field below always resolves against DEFAULT_LOCALE.
 */
export const dynamic = 'force-static';

export function GET() {
  const { name, location, contact, seo } = hotelConfig;
  const base = hotelConfig.siteUrl;
  const description = pickLocale(hotelConfig.description, DEFAULT_LOCALE);
  const descriptor = pickLocale(seo.descriptor, DEFAULT_LOCALE) ?? '';
  const checkIn = pickLocale(hotelConfig.checkIn, DEFAULT_LOCALE);
  const checkOut = pickLocale(hotelConfig.checkOut, DEFAULT_LOCALE);
  const receptionDisplay = pickLocale(hotelConfig.reception.display, DEFAULT_LOCALE);
  const amenities = hotelConfig.amenities.map((a) => pickLocale(a, DEFAULT_LOCALE)).join(', ');

  const body = `# ${name}

> ${description} Book direct at ${base} for the best available rate, no
> booking fees, and a complimentary welcome dram.

## Key facts

- Type: ${hotelConfig.starRating}-star ${descriptor.toLowerCase()}, ${hotelConfig.rooms} rooms
- Address: ${location.address}, ${location.country === 'GB' ? 'Scotland, UK' : location.country}
- Coordinates: ${location.lat}, ${location.lng}
- Phone: ${contact.phone}
- Email: ${contact.email}
- Check-in: from ${checkIn} · Check-out: by ${checkOut}
- Reception: ${receptionDisplay}
- Amenities: ${amenities}
- Dogs: ${hotelConfig.petsAllowed ? 'welcome in dog-friendly rooms' : 'not permitted'}
- Nearest city: Edinburgh, about 40 minutes by road or rail

## Key pages

- [Rooms & Suites](${base}/${DEFAULT_LOCALE}/rooms): ${rooms.length}+ room types — classic rooms, deluxe doubles and suites, each facing the harbour, garden or bay.
- [Dining](${base}/${DEFAULT_LOCALE}/dining): the dining room — seasonal harbour cooking led by the tide and the walled garden.
- [Experiences](${base}/${DEFAULT_LOCALE}/experiences): ${experiences.length}+ house-arranged days out — gin, water, rock and shore — starting at the front door.
- [Weddings](${base}/${DEFAULT_LOCALE}/weddings): exclusive-use weddings on the East Lothian coast, one at a time.
- [Special Offers](${base}/${DEFAULT_LOCALE}/offers): current direct-booking offers.
- [Location & Directions](${base}/${DEFAULT_LOCALE}/location): how to reach ${location.locality} by road, rail and air; what to see nearby.
- [Journal](${base}/${DEFAULT_LOCALE}/journal): ${journalPosts.length}+ posts from the house — the garden, the bay, the kitchen and the people who keep it.
- [Our Story](${base}/${DEFAULT_LOCALE}/about): history, team and ethos of the house.
- [Contact](${base}/${DEFAULT_LOCALE}/contact): phone, email and enquiry form; answered by a person within one working day.
- [Gift Vouchers](${base}/${DEFAULT_LOCALE}/gift-vouchers): stays, dinners and open-value vouchers.

## Booking

Check availability from any page. Direct bookings get the best rate,
no booking fees, and a complimentary welcome dram.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
