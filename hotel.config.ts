/**
 * hotel.config.ts — single source of truth for client identity.
 * Cloning for a new hotel: edit this file, swap the Tailwind colour
 * tokens (lib/tokens.ts), point env vars at the new Sanity project +
 * booking engine. Every field below must carry the client's real value
 * before launch — see NEW-CLIENT-CHECKLIST.md §2.
 *
 * Translatable fields use the LocaleField shape ({ en: '...' }) — see
 * lib/locales.ts. Only fill in the locales you have real copy for; a
 * missing locale falls back to the default (AGENTS.md §9). Everything
 * else here (address parts, contact info, coordinates, ISO times) stays
 * a flat, unlocalized value.
 */
import type { LocaleField } from './lib/locales';

export const hotelConfig = {
  name: 'Craigmore House',
  tagline: {
    en: 'Highland solitude, done properly.',
    fr: 'La solitude des Highlands, comme il se doit.',
    de: 'Hochland-Stille, wie sie sein sollte.',
    es: 'La soledad de las Highlands, como debe ser.',
  } as LocaleField,
  description: {
    en: 'A twelve-room country house hotel in Highland Perthshire. Open fires, serious cooking, and four hundred acres of silence.',
    fr: 'Un hôtel de charme de douze chambres au cœur des Highlands du Perthshire. Feux de cheminée, cuisine exigeante et quatre cents acres de silence.',
    de: 'Ein Landhotel mit zwölf Zimmern im schottischen Hochland von Perthshire. Offene Kamine, anspruchsvolle Küche und vierhundert Morgen Stille.',
    es: 'Un hotel rural de doce habitaciones en las Highlands de Perthshire. Chimeneas encendidas, cocina seria y cuatrocientos acres de silencio.',
  } as LocaleField,
  location: {
    // Structured parts — used for schema.org PostalAddress and local SEO.
    // A vague address breaks hotel rich results.
    street: 'Craigmore Road',
    locality: 'Aberfeldy',
    region: 'Perthshire',
    postalCode: 'PH15 2NR',
    country: 'GB',
    // Human-readable single line for footers / contact page.
    address: 'Craigmore Road, Aberfeldy, Perthshire, PH15 2NR',
    // Longer display label used in hero eyebrows / footer legal line.
    regionLabel: {
      en: 'Perthshire, Scotland',
      fr: 'Perthshire, Écosse',
      de: 'Perthshire, Schottland',
      es: 'Perthshire, Escocia',
    } as LocaleField,
    // Rooftop coordinates to 5 d.p. — feeds JSON-LD geo and the /location
    // map pin. Set to the real building before launch.
    lat: 56.62194,
    lng: -3.86694,
  },
  contact: {
    // Display form (spacing, national prefix in brackets).
    phone: '+44 (0)1887 000 000',
    // Dialable E.164 form — used for tel: links and schema.org telephone.
    // Never derive this from `phone` at runtime; keep it explicit.
    phoneHref: '+441887000000',
    email: 'enquiries@craigmorehouse.com',
    instagram: 'https://instagram.com/craigmorehouse',
    facebook: 'https://facebook.com/craigmorehouse',
  },
  /** Reception desk hours — display string plus 24h forms for schema. */
  reception: {
    display: {
      en: '7am – 11pm daily. Night porter on duty after hours.',
      fr: 'De 7h à 23h tous les jours. Un veilleur de nuit assure une présence en dehors de ces horaires.',
      de: 'Täglich von 7 bis 23 Uhr besetzt. Außerhalb dieser Zeiten ist ein Nachtportier im Dienst.',
      es: 'De 7:00 a 23:00 todos los días. Portero nocturno de guardia fuera de ese horario.',
    } as LocaleField,
    opens: '07:00',
    closes: '23:00',
  },
  /** Guest-facing amenities — drives schema amenityFeature and can be
   *  surfaced on-page. Keep to things that are actually true. */
  amenities: [
    { en: 'Free on-site parking', fr: 'Parking gratuit sur place', de: 'Kostenlose Parkplätze vor Ort', es: 'Aparcamiento gratuito en el hotel' },
    { en: 'EV charging', fr: 'Bornes de recharge électrique', de: 'Ladestationen für Elektrofahrzeuge', es: 'Puntos de recarga eléctrica' },
    { en: 'Dog-friendly rooms', fr: 'Chambres acceptant les chiens', de: 'Hundefreundliche Zimmer', es: 'Habitaciones que admiten perros' },
    { en: 'Restaurant', fr: 'Restaurant', de: 'Restaurant', es: 'Restaurante' },
    { en: 'Free breakfast', fr: 'Petit-déjeuner offert', de: 'Kostenloses Frühstück', es: 'Desayuno incluido' },
    { en: 'Step-free access', fr: 'Accès de plain-pied', de: 'Stufenfreier Zugang', es: 'Acceso sin escalones' },
    { en: 'Family rooms', fr: 'Chambres familiales', de: 'Familienzimmer', es: 'Habitaciones familiares' },
    { en: 'Free Wi-Fi', fr: 'Wi-Fi gratuit', de: 'Kostenloses WLAN', es: 'Wi-Fi gratuito' },
  ] as LocaleField[],
  petsAllowed: true,
  /** SEO copy that varies per client. */
  seo: {
    /** Short human descriptor used in the homepage <title> and hero eyebrows. */
    descriptor: {
      en: 'Country House Hotel',
      fr: 'Hôtel de charme',
      de: 'Landhotel',
      es: 'Hotel rural de lujo',
    } as LocaleField,
    /** Location phrase appended to titles and used in fallback meta. */
    locationLabel: {
      en: 'Aberfeldy, Perthshire',
      fr: 'Aberfeldy, Perthshire',
      de: 'Aberfeldy, Perthshire',
      es: 'Aberfeldy, Perthshire',
    } as LocaleField,
    /**
     * Emit an aggregateRating in the Hotel JSON-LD, derived from the
     * featured testimonials. Only set true once those testimonials are
     * genuine, verifiable guest reviews — a fabricated rating risks a
     * Google manual action.
     */
    publishAggregateRating: false,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.craigmorehouse.com',
  rooms: 12,
  starRating: 4,
  priceRange: '£££',
  // Display strings for the page; checkInISO / checkOutISO are the
  // schema.org Time values (ISO 8601, "HH:MM:SS") — keep both in sync,
  // schema.org needs the unlocalized ISO form regardless of locale.
  checkIn: { en: '3.00pm', fr: '15h00', de: '15:00 Uhr', es: '15:00 h' } as LocaleField,
  checkOut: { en: '11.00am', fr: '11h00', de: '11:00 Uhr', es: '11:00 h' } as LocaleField,
  checkInISO: '15:00:00',
  checkOutISO: '11:00:00',
  trustItems: [
    { en: 'Best Rate Guaranteed', fr: 'Meilleur tarif garanti', de: 'Bestpreisgarantie', es: 'Mejor tarifa garantizada' },
    { en: 'No Booking Fees', fr: 'Aucun frais de réservation', de: 'Keine Buchungsgebühren', es: 'Sin comisiones de reserva' },
    { en: 'Complimentary Welcome Dram', fr: 'Dram de bienvenue offert', de: 'Kostenloser Willkommens-Dram', es: 'Dram de bienvenida de cortesía' },
    { en: 'Loved by Our Guests', fr: 'Plébiscité par nos hôtes', de: 'Von unseren Gästen geliebt', es: 'Adorado por nuestros huéspedes' },
  ] as LocaleField[],
};

export type HotelConfig = typeof hotelConfig;
