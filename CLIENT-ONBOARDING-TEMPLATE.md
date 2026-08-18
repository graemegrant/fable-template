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
- Room count:
- Star rating:
- Price range (£/££/£££):
- Check-in / check-out times:
- Trust strip items:

**Brand tokens** (→ `tailwind.config.ts`)
- `forest` (primary dark):
- `forestdeep` (deepest dark):
- `gold` (accent, light bg):
- `goldbright` (accent, dark bg):
- `parchment` (primary light):
- `warmgrey` (alt bands/cards):
- `ink` (text):
- Heading font / body font:

**Booking engine**
- Provider (FreeToBook / Guestline / SiteMinder / Little Hotelier / other):
- Deep-link URL:

**Sanity**
- Project ID:
- Dataset:

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
- [ ] Rooms populated in Sanity
- [ ] Experiences populated
- [ ] Offers populated
- [ ] Journal seeded (min. 3 posts)
- [ ] Testimonials populated
- [ ] Team page populated
- [ ] Real photography swapped in for all placeholder images
