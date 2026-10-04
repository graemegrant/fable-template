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

## 6a. Stays, policies & social proof

Only real, checkable facts — each section on the site hides itself if left empty, which is always better than filling it with something untrue:
- **What every stay includes** (e.g. breakfast, Wi-Fi, parking) → `stayIncludes`:
- **Stats band figures** (e.g. year founded, rooms) → `stats`:
- **Facilities** (title + one line each) → `lib/data.ts` `facilities`:
- **Policies** — cancellation & deposit, children/cots, dogs, accessibility, parking → `lib/data.ts` `policies` ("Good to know" page):
- **Agreed book-direct perk**, or none → `directBookingPerk`:
- **Public review summary** — platform, rating, review count, link — or none → `reviewSummary`:
- **Data controller** (legal entity) for the privacy page:

## 7. Brand palette

**Option A — client supplies real brand colours:**
- Hex code(s):
- Source (existing logo/brand guidelines, if any):

**Option B — no existing brand colours; Codero chooses.** Answer instead:
- **Style direction** (pick closest, or describe): Heritage (formal, established) / Coastal (warm, informal, welcoming) / Urban (modern, design-led) / other — describe:
- **Tone spectrum:** formal ↔ casual — where does this property sit?
- **2-3 reference sites** they like the feel of, and why:
- **Anything to explicitly avoid** (styles, colours, competitor look-alikes):

*Note: only the 9 colour tokens vary per client (role-based: `primary`, `primarydeep`, `accent`, `accentfill`, `onaccent`, `accentondark`, `canvas`, `canvasalt`, `ink` — each tuned to clear WCAG AA for its own pairing) — typography (`Cormorant Garamond` + `Jost`) is fixed template-wide and does not change per style direction.*

## 8. Page requirements

Confirm/adjust against the default set:
- [ ] Rooms
- [ ] Experiences
- [ ] Offers
- [ ] Journal / Local area
- [ ] Team
- [ ] Additional pages needed (weddings, dining, spa, events, gallery, other):

**SEO baseline (required before this brief is handed to the build; SEO-PROCESS.md §1, stage 0):**
- **Baseline report:** `docs/clients/[slug]/seo/[date]-baseline/SUMMARY.md`
- **Keyword → page map** (copy from the baseline: target query, the page that owns it):
  | Query | Page |
  |---|---|
  | | |
- **Legacy URLs to preserve** (agreed entries go in `redirects.json`): count, plus link to `redirect-map.csv`

## 9. Booking & PMS

- **PMS/booking/channel manager system name:**
- **Booking engine link** (the client's existing booking URL, pasted as-is) **or embed code:** (not a login)
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

> Here's the completed client brief for [Hotel Name], with its stage-0 SEO baseline. Populate `hotel.config.ts`, `lib/tokens.ts` and the `lib/data.ts` lists from sections 1-7 (including 6a), verify with `tsc --noEmit` and `eslint .` before proceeding, then move to Sanity content population for rooms/offers/team per section 8.
