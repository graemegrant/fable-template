# SEO-PROCESS.md

How SEO is handled for a client built from this template. Pairs with
`NEW-CLIENT-CHECKLIST.md` §8 and `GIT-WORKFLOW.md`.

The template ships SEO-complete: per-route canonicals, Open Graph +
generated `opengraph-image`, `Hotel` / `HotelRoom` / `BlogPosting` /
`BreadcrumbList` JSON-LD, ISR, `sitemap.ts` / `robots.ts` (with explicit
AI-crawler rules), a generated `/llms.txt`, `next/font`, security headers,
and a `middleware.ts` canonical-host guard. A new build's SEO work is
therefore mostly **content, real data, and off-site** — not code.

---

## 1. When to audit

| Point | Command | Purpose |
|---|---|---|
| Content in, photography real, pre-launch | `/seo audit <staging-url>` | Catch thin content, weak titles/H1s, schema gaps, perf |
| Real domain connected, `NEXT_PUBLIC_SITE_URL` set | `/seo audit <live-url>` | Canonical / OG / sitemap / JSON-LD host issues only appear here |
| ~4 weeks after launch | `/seo audit <live-url>` | Now there is Search Console + CrUX field data to act on |

Auditing placeholder content wastes the run — it just reports the
placeholders. Get real rooms, journal posts and photography in first.

`/seo audit` fans out to specialist sub-agents (technical, content,
schema, performance, visual, GEO, local) and returns a 0–100 health score
plus Critical / High / Medium / Low findings. Fix **every Critical and
High** before launch; Medium/Low go on the backlog.

---

## 2. Turning findings into commits

Same two-bucket discipline as every change here (AGENTS.md §7,
GIT-WORKFLOW.md §3):

- **Template-level** (a mechanism, a schema shape, a component fix, a
  config header) → build and test in the client repo, then cherry-pick
  back into `fable-template` on a `fix/*` branch with a `CHANGELOG.md`
  line. Every future client inherits it.
- **Client-specific** (real NAP, coordinates, copy, brand tokens) → stays
  in the client repo's `hotel.config.ts` / `lib/tokens.ts` / page copy.
  Never cherry-picked.

Keep the two in separate commits so the cherry-pick is clean.

---

## 3. Recurring gotchas (checked on the Selkie Bay dry run)

The template already handles these, but verify them on the live domain:

1. **Canonical host.** Every `<link rel="canonical">`, `og:*`, sitemap
   `<loc>` and JSON-LD `url` resolves against `NEXT_PUBLIC_SITE_URL`. If
   it's unset or wrong, the whole site canonicalises to a dead domain and
   nothing indexes. Set it to the exact production origin (pick `www` vs
   apex and never change it) before launch.
2. **Preview hosts.** `middleware.ts` serves `X-Robots-Tag: noindex` on
   any host that isn't `NEXT_PUBLIC_SITE_URL` (Vercel previews, the raw
   `*.vercel.app` alias). Confirm the real domain is *not* caught by it.
   Override with `ALLOW_ALL_HOSTS_INDEXABLE=true` only for a staging
   domain that genuinely should be crawlable.
3. **`checkinTime` / `checkoutTime`** in JSON-LD must be ISO 8601
   (`"15:00:00"`). `hotel.config.ts` keeps `checkIn` (display) and
   `checkInISO` (schema) separate — keep them in sync.
4. **Placeholder NAP in schema.** `hotel.config.ts` `location.*` and
   `contact.*` feed the JSON-LD, footer and `tel:` links. Ship real
   values or the hotel rich result breaks and local citations start
   inconsistent.
5. **Cookie banner vs booking CTA.** On mobile the slim cookie bar and
   `MobileBookBar` are coordinated (`useCookieConsent`) so the booking
   CTA is never covered. Don't reintroduce a tall banner.
6. **Location keywords.** Interior hero eyebrows and `<title>`s pull the
   locality from `hotel.config.ts`. Set `seo.descriptor` and
   `seo.locationLabel` per client.

---

## 4. Do NOT

- **Add `FAQPage` schema.** Google retired FAQ rich results for all sites
  (May 2026) and there is no confirmed AI-citation benefit. Keep FAQ
  content as `<h3>` + answer text (good for extraction); skip the markup.
- **Add a fabricated `aggregateRating`.** `seo.publishAggregateRating`
  stays `false` until there are genuine, verifiable reviews. A fake
  rating risks a manual action.
- **Remove the CRO or JSON-LD elements** listed in AGENTS.md §5 to satisfy
  a finding — reposition, don't delete.

---

## 5. Local SEO launch sequence

On-site local SEO (address markup, `/location`, local `Hotel` schema) is
in the template. Off-site is per client, roughly in order:

1. **Lock the canonical NAP string** — exact trading name, rooftop
   address, dedicated local phone line. Everything downstream copies it
   verbatim.
2. **Google Business Profile** — primary category `Hotel` (not "boutique
   hotel", which isn't selectable). Complete every field; website = the
   canonical host; booking link = the direct booking engine. Verify.
3. **Citations, exact-match NAP:** aggregators first (Bing Places, Apple
   Business Connect, Yell, Yelp UK, Foursquare), then hospitality
   (TripAdvisor, Booking.com, Google Hotels, Trivago), then editorial
   that fits the brand (Sawday's, Mr & Mrs Smith, i-escape), then UK
   grading bodies (VisitScotland, AA), then regional / tourism-board and
   local-partner links. Track every listing's NAP in a sheet.
4. **Reviews from day one** — automated post-checkout ask (email + SMS),
   QR codes at reception and in-room. Never let ~3 weeks pass with zero
   new Google reviews. Respond to all within 24–48h.
5. Only then flip `seo.publishAggregateRating` to `true`, with the schema
   rating/count matching reality.

---

## 6. Reporting

`/seo audit` can emit a shareable artifact and a PDF (`/seo google report
full`). For a client engagement, deliver the artifact link plus the
prioritised action plan; keep the "Track 2 / your tasks" split so the
client knows what's on them (domain, photography, GBP) vs on the build.
