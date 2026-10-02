# Client Brief — [Hotel Name]

Complete this per client before starting a build. Fields map directly to the real `hotel.config.ts` / `lib/tokens.ts` structure — filling this in accurately means Claude Code can populate both files without guesswork or back-and-forth. Store completed briefs as `CLIENT-BRIEF.md` in each client's repo root for future reference.

---

## 1. Identity

- **Hotel name:**
- **Tagline** (one line, sets tone):
- **Description** (1-2 sentences, used in meta/hero):
- **Number of rooms:**
- **Star rating:**
- **Price range** (£ / ££ / £££):

## 2. Location

- **Street address:**
- **Town/locality:**
- **Region:**
- **Postcode:**
- **Country:**
- **Rooftop coordinates (lat/lng)** — real building location, not a placeholder — needed for schema.org geo:

## 3. Contact

- **Phone (display format):**
- **Phone (E.164 dialable form):**
- **Email:**
- **Instagram URL:**
- **Facebook URL:**

## 4. Reception & timings

- **Reception hours (display string):**
- **Opens (24h):**
- **Closes (24h):**
- **Check-in time:**
- **Check-out time:**

## 5. Amenities

List everything genuinely true — feeds schema.org amenityFeature and on-page display:
-
-
-

## 6. Trust items

4 short trust-building phrases (e.g. "Best Rate Guaranteed," "No Booking Fees") — these need to appear consistently per AGENTS.md's CTA/trust-copy rules:
1.
2.
3.
4.

## 7. Brand palette

**Option A — client supplies real brand colours:**
- Hex code(s):
- Source (existing logo/brand guidelines, if any):

**Option B — no existing brand colours; Codero chooses.** Answer instead:
- **Style direction** (pick closest, or describe): Heritage (formal, established) / Coastal (warm, informal, welcoming) / Urban (modern, design-led) / other — describe:
- **Tone spectrum:** formal ↔ casual — where does this property sit?
- **2-3 reference sites** they like the feel of, and why:
- **Anything to explicitly avoid** (styles, colours, competitor look-alikes):

*Note: only the 7 colour tokens vary per client — typography (`Cormorant Garamond` + `Jost`) is fixed template-wide and does not change per style direction.*

## 8. Page requirements

Confirm/adjust against the default set:
- [ ] Rooms
- [ ] Experiences
- [ ] Offers
- [ ] Journal / Local area
- [ ] Team
- [ ] Additional pages needed (weddings, dining, spa, events, gallery, other):

## 9. Booking & PMS

- **PMS/booking/channel manager system name:**
- **Booking engine embed code/widget script:** (attach separately — not a login)
- **Existing live website?** Y/N — if yes, current domain and who controls the registrar:

## 10. Access checklist status

- [ ] Logo (SVG or EPS — not PNG)
- [ ] Professional photography, min. 10 full-res images
- [ ] GA4 access (or confirm new property needed)
- [ ] Google Search Console access (or confirm new property needed)
- [ ] Domain email addresses in use? If yes, provider:

## 11. i18n scope

- **Locales needed beyond English** (FR/DE/ES/other), or English-only:

## 12. Layout/structure notes (future — not yet buildable)

Per the current architecture decision, all clients use the same structural layout regardless of property type — only colour tokens vary. If this property's needs genuinely don't fit that (e.g. very amenity-heavy, gallery-forward, or a materially different priority order than rooms-first), note it here as a flag for a future structural-variation discussion, not an assumption it'll be built for this client:

-

---

## For Claude Code

Once this brief is complete, hand it directly alongside the standard prompt:

> Here's the completed client brief for [Hotel Name]. Populate `hotel.config.ts` and `lib/tokens.ts` from sections 1-7, verify with `tsc --noEmit` and `eslint .` before proceeding, then move to Sanity content population for rooms/offers/team per section 8.
