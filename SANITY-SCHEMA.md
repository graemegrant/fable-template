# SANITY-SCHEMA.md

Documents the Sanity v3 content model in `fable-template` as it actually
exists in the repo (`sanity/schemas/index.ts`), and the build-order rule
for new client repos.

## Correction vs. earlier planning

Earlier planning assumed a `HotelSettings` singleton document as the
first thing to configure per client. **That schema does not exist in the
repo.** Per-client identity is handled entirely in code, not in Sanity —
see `hotel.config.ts` at the repo root (name, tagline, location, contact,
rooms, star rating, price range, check-in/out, trust strip items).
Sanity is used only for the six *recurring content* collections below.

If a future client genuinely needs to edit their own site identity
without a code deploy (e.g. updating a phone number themselves), a
`hotelSettings` singleton could be added later — that's a real feature
to design, not something to assume is already built.

## Build order for a new client repo

1. Fully rewrite `hotel.config.ts` (client identity — see §4 of AGENTS.md)
2. Re-skin `tailwind.config.ts` (seven brand tokens)
3. Set up the client's Sanity project, point env vars at it
4. Populate the six collections below with real content
5. Only then move to page-level copy/layout changes

## The six collections (`sanity/schemas/`)

| Schema file | Purpose | Key fields |
|---|---|---|
| `room.ts` | Room/suite listings | name, slug, type, price, images, description, amenities, maxOccupancy |
| `experience.ts` | Local Experiences (see AGENTS.md §6 — regional exclusivity framing) | name, slug, category, images, description, duration, price |
| `offer.ts` | Packages/offers | title, slug, images, description, validUntil, priceFrom |
| `journalPost.ts` | Blog/journal | title, slug, publishedAt, author, coverImage, body (Portable Text) |
| `testimonial.ts` | Guest reviews | quote, author, location, rating, roomStayed |
| `teamMember.ts` | About/team page | name, role, photo, bio |

All six are registered in `sanity/schemas/index.ts` — if you add a new
schema file, it must be imported and added to the `schemaTypes` array
there or it won't appear in Studio.

## Static-fallback mode

The app must keep working with all Sanity env vars blank — content
falls back to `lib/data.ts` placeholder data. Don't add a data dependency
that breaks this (i.e. don't assume `NEXT_PUBLIC_SANITY_PROJECT_ID` is
always set).

## Open item

Not yet validated against a real second client build — this document is
a template describing the current repo state, not a battle-tested
process yet.
