import {
  resolveRoom, resolveExperience, resolveOffer, resolveTestimonial, resolveJournalPost,
} from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import { sanityFetch } from '@/lib/sanity';
import { isOfferCurrent } from '@/lib/offers';
import {
  FEATURED_ROOMS_QUERY, EXPERIENCES_QUERY, OFFERS_QUERY, TESTIMONIALS_QUERY, JOURNAL_QUERY,
} from '@/lib/queries';
import * as fallback from '@/lib/data';
import type { RoomI18n, ExperienceI18n, OfferI18n, TestimonialI18n, JournalPostI18n } from '@/lib/types';


/** Data for the Home page, shared by every look. */
export async function loadHome(locale: Locale) {
  const [rawRooms, rawExperiences, rawOffers, rawTestimonials, rawJournalPosts] = await Promise.all([
    sanityFetch<RoomI18n[]>(FEATURED_ROOMS_QUERY, {}, fallback.rooms.filter((r) => r.featured).slice(0, 3)),
    sanityFetch<ExperienceI18n[]>(EXPERIENCES_QUERY, {}, fallback.experiences),
    sanityFetch<OfferI18n[]>(OFFERS_QUERY, {}, fallback.offers),
    sanityFetch<TestimonialI18n[]>(TESTIMONIALS_QUERY, {}, fallback.testimonials),
    sanityFetch<JournalPostI18n[]>(JOURNAL_QUERY, {}, fallback.journalPosts),
  ]);
  const rooms = rawRooms.map((r) => resolveRoom(r, locale));
  const experiences = rawExperiences.map((e) => resolveExperience(e, locale));
  const offers = rawOffers.filter((o) => isOfferCurrent(o)).map((o) => resolveOffer(o, locale));
  const testimonials = rawTestimonials.map((t) => resolveTestimonial(t, locale));
  const journalPosts = rawJournalPosts.map((p) => resolveJournalPost(p, locale));
  return { rooms, experiences, offers, testimonials, journalPosts };
}

export type HomeData = Awaited<ReturnType<typeof loadHome>>;
