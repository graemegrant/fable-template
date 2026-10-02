import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import { DEFAULT_LOCALE, type LocaleField } from '@/lib/locales';

/**
 * /llms.txt — generated from hotel.config.ts so the facts stay in sync.
 * Ignored by Google Search; read by some AI assistants and crawlers.
 *
 * Every fact comes from hotel.config.ts — no hotel-specific prose is
 * written here, so a client build can't ship with the template hotel's
 * copy (it previously hard-coded another property's description, nearest
 * city and booking perks). Page descriptions are deliberately neutral. A
 * fact the config doesn't confirm (e.g. petsAllowed not a boolean) is left
 * out rather than guessed.
 *
 * This is a single global document, not locale-routed, so every
 * translatable field below always resolves against DEFAULT_LOCALE.
 */
export const dynamic = 'force-static';

export function GET() {
  const { name, location, contact, seo } = hotelConfig;
  const pick = (field: LocaleField | null | undefined) => pickLocale(field ?? undefined, DEFAULT_LOCALE) ?? '';
  const page = (path: string) => `${hotelConfig.siteUrl}/${DEFAULT_LOCALE}${path}`;
  const petsAllowed: unknown = hotelConfig.petsAllowed;

  const facts = [
    `Type: ${hotelConfig.starRating}-star ${pick(seo.descriptor).toLowerCase()}, ${hotelConfig.rooms} rooms`,
    `Address: ${location.address}, ${location.country === 'GB' ? 'United Kingdom' : location.country}`,
    `Phone: ${contact.phone}`,
    contact.email && `Email: ${contact.email}`,
    `Check-in: from ${pick(hotelConfig.checkIn)} · Check-out: by ${pick(hotelConfig.checkOut)}`,
    `Reception: ${pick(hotelConfig.reception.display)}`,
    `Amenities: ${hotelConfig.amenities.map(pick).join(', ')}`,
    typeof petsAllowed === 'boolean' && `Dogs: ${petsAllowed ? 'welcome' : 'not permitted'}`,
  ].filter(Boolean);

  const pages: Array<[label: string, path: string, about: string]> = [
    ['Rooms', '/rooms', 'room types, photos and prices'],
    ['Dining', '/dining', 'the restaurant and its menus'],
    ['Weddings & events', '/weddings', 'weddings and events'],
    ['Special offers', '/offers', 'current direct-booking offers'],
    ['Experiences', '/experiences', 'things to do'],
    ['Location & directions', '/location', `how to reach ${location.locality} and what is nearby`],
    ['Good to know', '/policies', 'check-in and check-out, cancellations, children, dogs, accessibility and parking'],
    ['Contact', '/contact', 'phone, email, enquiry form and frequently asked questions'],
    ['Our story', '/about', 'the history of the hotel'],
    ['Gift vouchers', '/gift-vouchers', 'gift vouchers'],
    ['Journal', '/journal', 'news and stories from the hotel'],
  ];

  const body = `# ${name}

> ${pick(hotelConfig.description)}

## Key facts

${facts.map((f) => `- ${f}`).join('\n')}

## Key pages

${pages.map(([label, path, about]) => `- [${label}](${page(path)}): ${about}.`).join('\n')}

## Booking

Book direct with the hotel: use "Check availability" on any page of
${hotelConfig.siteUrl}, or call ${contact.phone}.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
