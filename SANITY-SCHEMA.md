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

1. Confirm `lib/locales.ts` — the client's locale set drives the fields
   generated below, so set this before the Sanity project is populated
2. Fully rewrite `hotel.config.ts` (client identity — see §4 of AGENTS.md)
3. Re-skin `tailwind.config.ts` (seven brand tokens)
4. Set up the client's Sanity project, point env vars at it
5. Populate the six collections below with real content
6. Only then move to page-level copy/layout changes

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

**Translatable fields above (name/title/description/quote/role/bio etc.,
per AGENTS.md §9) are not plain strings** — they use one of three
generated object types from `sanity/schemas/objects/locale-fields.ts`:
`localeString`, `localeText`, or `localeBlockContent` (rich text —
`journalPost.body` is the only field using this one). Each type
generates one Studio sub-field per locale in `lib/locales.ts`. Slugs,
`journalPost.author`, `teamMember.name`, and `testimonial.guestName`
stay plain strings (proper nouns / non-translatable), as do enums
(`room.type`, `experience.category`, etc.) and all non-text fields.

**Scaling caveat:** this field-level pattern (one Studio field per
locale, collapsed into one object) is fine editorially through roughly
5–6 locales. Past that, the per-field UI gets cramped and
`@sanity/document-internationalization`'s per-document model (separate
documents per language, linked via a translation reference) becomes the
better trade-off — that's a real migration to design, not a drop-in
swap, so don't reach for it without discussing it first.

## Static-fallback mode

The app must keep working with all Sanity env vars blank — content
falls back to `lib/data.ts` placeholder data. Don't add a data dependency
that breaks this (i.e. don't assume `NEXT_PUBLIC_SANITY_PROJECT_ID` is
always set).

## Open item

Not yet validated against a real second client build — this document is
a template describing the current repo state, not a battle-tested
process yet.
