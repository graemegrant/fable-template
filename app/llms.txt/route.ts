import { hotelConfig } from '@/hotel.config';
import { rooms, experiences, journalPosts } from '@/lib/data';

/**
 * /llms.txt — generated from hotel.config.ts + static content so the facts
 * stay in sync. Ignored by Google Search; used by some AI crawlers.
 */
export const dynamic = 'force-static';

export function GET() {
  const { name, description, location, contact, seo } = hotelConfig;
  const base = hotelConfig.siteUrl;

  const body = `# ${name}

> ${description} Book direct at ${base} for the best available rate, no
> booking fees, and a complimentary welcome dram.

## Key facts

- Type: ${hotelConfig.starRating}-star ${seo.descriptor.toLowerCase()}, ${hotelConfig.rooms} rooms
- Address: ${location.address}, ${location.country === 'GB' ? 'Scotland, UK' : location.country}
- Coordinates: ${location.lat}, ${location.lng}
- Phone: ${contact.phone}
- Email: ${contact.email}
- Check-in: from ${hotelConfig.checkIn} · Check-out: by ${hotelConfig.checkOut}
- Reception: ${hotelConfig.reception.display}
- Amenities: ${hotelConfig.amenities.join(', ')}
- Dogs: ${hotelConfig.petsAllowed ? 'welcome in dog-friendly rooms' : 'not permitted'}
- Nearest city: Edinburgh, about 40 minutes by road or rail

## Key pages

- [Rooms & Suites](${base}/rooms): ${rooms.length}+ room types — classic rooms, deluxe doubles and suites, each facing the harbour, garden or bay.
- [Dining](${base}/dining): the dining room — seasonal harbour cooking led by the tide and the walled garden.
- [Experiences](${base}/experiences): ${experiences.length}+ house-arranged days out — gin, water, rock and shore — starting at the front door.
- [Weddings](${base}/weddings): exclusive-use weddings on the East Lothian coast, one at a time.
- [Special Offers](${base}/offers): current direct-booking offers.
- [Location & Directions](${base}/location): how to reach ${location.locality} by road, rail and air; what to see nearby.
- [Journal](${base}/journal): ${journalPosts.length}+ posts from the house — the garden, the bay, the kitchen and the people who keep it.
- [Our Story](${base}/about): history, team and ethos of the house.
- [Contact](${base}/contact): phone, email and enquiry form; answered by a person within one working day.
- [Gift Vouchers](${base}/gift-vouchers): stays, dinners and open-value vouchers.

## Booking

Check availability from any page. Direct bookings get the best rate,
no booking fees, and a complimentary welcome dram.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
