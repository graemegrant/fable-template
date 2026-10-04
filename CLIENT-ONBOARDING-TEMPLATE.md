# Client Onboarding — [Hotel Name]

Copy this file to `/docs/clients/[hotel-slug].md` in the client's repo
and fill it in. The template file at repo root stays blank.

## Guardrailed (matches AGENTS.md — never varies per client)

- Stack: Next.js 15, Tailwind 3, Sanity v3, Framer Motion, Resend
- Component set: reused from `fable-template`, no one-off components
  duplicating existing functionality
- CRO elements present: `BookButton`, `BookingModal`, `MobileBookBar`,
  `TrustStrip`, JSON-LD, sitemap/robots
- ESLint token rules active (no inline hex, no arbitrary Tailwind values)
- No Webflow

## Varies per client — fill in below

**Identity** (→ `hotel.config.ts`)
- Name:
- Tagline:
- Description:
- Address / region / lat,lng:
- Phone / email / social:
- Room count (total physical rooms, for identity copy — separate from
  Sanity room categories below):
- Star rating:
- Price range (£/££/£££):
- Check-in / check-out times:
- Trust strip items:
- Stats band figures (real, checkable):
- What every stay includes:
- Public review summary (platform, rating, count, link) — or none:
- Agreed book-direct perk — or none:

**Brand tokens** (→ `lib/tokens.ts`; each pairing must clear 4.5:1)
- `primary` (primary dark):
- `primarydeep` (deepest dark):
- `accent` (accent text/rules on light bg):
- `accentfill` (button/badge/banner fill):
- `onaccent` (text on accentfill):
- `accentondark` (accent text/rules on dark bg):
- `canvas` (primary light):
- `canvasalt` (alt bands/cards):
- `ink` (text):
- Heading font / body font:

**Brand Inspiration & Page Requirements** (fill in with the client before
any design work; the layout is fixed, so this steers tokens, photography,
copy voice and which sections lead)
- Inspiration references: 2–4 hotel sites the client likes, each with
  *what specifically* they like (photography, tone, a section, the
  booking flow). "I like it" isn't a reference:
  1.
  2.
  3.
- Sites or styles they dislike, and why:
- Tone spectrum: mark one point on each scale, 1 to 5:
  - Formal 1 · 2 · 3 · 4 · 5 Relaxed
  - Classic 1 · 2 · 3 · 4 · 5 Contemporary
  - Understated 1 · 2 · 3 · 4 · 5 Expressive
  - Exclusive 1 · 2 · 3 · 4 · 5 Welcoming to all
  - Destination-led 1 · 2 · 3 · 4 · 5 Hotel-led
- Three words guests should leave with:
- Things to avoid: claims, words, imagery, competitors not to mention,
  anything not true of the property (e.g. outdoor space it doesn't have):
- Pages and sections that must exist (beyond the default set):
- Pages and sections to drop or play down:
- Priority order on the homepage, if not rooms-first:
- Photography: what exists, what's missing, any shoot planned:
- Must-keep from the current site (cross-check with the stage-0 SEO
  baseline's must-keep URLs, SEO-PROCESS.md §1):

**Booking engine**
- Provider (SynXis / FreeToBook / Guestline / SiteMinder / Little Hotelier / other):
- Deep-link URL:

**Policies** (→ `lib/data.ts` `policies`, the "Good to know" page)
- Cancellation & deposit terms:
- Children / cots / extra beds:
- Dogs:
- Accessibility:
- Parking:
- Data controller (legal entity) for the privacy page:

**Sanity**
- Project ID:
- Dataset:

**Languages** (→ `lib/locales.ts`)
- Locale set (default first):
- Locales with real, human-translated content vs. English fallback:
- Translation process/vendor, if any:

**Local Experiences partners** (regional exclusivity — see AGENTS.md §6)
- Partner 1:
- Partner 2:
- Partner 3:

**Service tier**
- Direct Booking Sprint / Direct Booking Engine / Performance Grow /
  Hospitality Growth Partner:

**Infrastructure**
- Domain:
- Vercel project name:
- Repo URL:
- Launch date / `v1.0.0` tag date:

**Access & ownership** (see SECURITY.md §4 — decide these explicitly, don't leave them implicit)
- Domain registrar account: [client-owned / Codero-owned]
- Vercel project: [Codero team, client added as collaborator / client-owned, Codero added]
- Sanity project: [Codero org, client invited / client-owned]
- GitHub repo: [stays with Codero / transferred to client at handoff]
- Booking engine account: client-owned — Codero holds deep-link URL only

**Content status**
- [ ] Rooms populated in Sanity (as categories with `roomCount`, or as
      individually-named rooms — see SANITY-SCHEMA.md)
- [ ] Experiences populated
- [ ] Offers populated
- [ ] Journal seeded (min. 3 posts)
- [ ] Testimonials populated
- [ ] Team page populated
- [ ] Real photography swapped in for all placeholder images
