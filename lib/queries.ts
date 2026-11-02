/* GROQ queries. Every slug is projected to a plain string. */

const roomFields = `{
  _id, roomType, name, "slug": slug.current, hook, description, heroImage, imageAlt, gallery,
  rate, sqm, occupancy, floor, view, amenities, roomCount, featured, active
}`;

const experienceFields = `{
  _id, name, "slug": slug.current, category, description, heroImage, imageAlt,
  duration, price, seasons, includes
}`;

const offerFields = `{
  _id, title, "slug": slug.current, subtitle, description, tag, image,
  inclusions, validFrom, validUntil, type
}`;

const journalFields = `{
  _id, title, "slug": slug.current, category, section, author, publishedAt,
  readingTime, excerpt, heroImage, imageAlt, featured, expiresAt
}`;

export const ROOMS_QUERY = `*[_type == "room" && active != false] | order(rate desc) ${roomFields}`;
export const FEATURED_ROOMS_QUERY = `*[_type == "room" && active != false && featured == true] | order(rate desc) [0...3] ${roomFields}`;
export const ROOM_BY_SLUG_QUERY = `*[_type == "room" && slug.current == $slug][0] ${roomFields}`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(name asc) ${experienceFields}`;
export const EXPERIENCE_BY_SLUG_QUERY = `*[_type == "experience" && slug.current == $slug][0] ${experienceFields}`;

export const OFFERS_QUERY = `*[_type == "offer"] | order(_createdAt desc) ${offerFields}`;

/** Time-bound posts (expiresAt) drop off the index the day after; their
 * pages stay live via JOURNAL_BY_SLUG_QUERY. */
export const JOURNAL_QUERY = `*[_type == "journalPost" && (!defined(expiresAt) || dateTime(expiresAt + "T23:59:59Z") > now())] | order(publishedAt desc) ${journalFields}`;
export const JOURNAL_BY_SLUG_QUERY = `*[_type == "journalPost" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, category, section, author, publishedAt,
  readingTime, excerpt, body, heroImage, imageAlt, featured,
  events[]{name, startDate, endDate, venue, url}, expiresAt, cta, seoTitle, seoDescription
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(date desc) {
  _id, guestName, quote, rating, roomStayed, date, source, featured
}`;

export const TEAM_QUERY = `*[_type == "teamMember"] | order(displayOrder asc) {
  _id, name, role, bio, headshot, department, displayOrder
}`;
