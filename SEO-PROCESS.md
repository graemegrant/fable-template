# SEO-PROCESS.md

How SEO is handled for a client built from this template. Pairs with
`NEW-CLIENT-CHECKLIST.md` §0 and §8, `GIT-WORKFLOW.md`, and the
`/codero-seo` project skill (`.claude/skills/codero-seo/SKILL.md`), which
runs each stage below.

The template ships SEO-complete: per-route canonicals, Open Graph +
generated `opengraph-image`, `Hotel` / `HotelRoom` / `BlogPosting` /
`BreadcrumbList` JSON-LD, ISR, `sitemap.ts` / `robots.ts` (with explicit
AI-crawler rules), a generated `/llms.txt`, `next/font`, security headers,
and a `middleware.ts` canonical-host guard. A new build's SEO work is
therefore mostly **content, real data, and off-site** — not code.

---

## 1. The SEO lifecycle: every client, every stage

Every stage is run with `/codero-seo <stage> <url>` from Claude Code in
the client repo. Its reports land in
`docs/clients/<slug>/seo/<date>-<stage>/`, and one line is added to the
SEO log in `docs/clients/<slug>.md`. The automated checks (§7) run
without anyone asking.

| # | Stage | When | Run | Gate |
|---|---|---|---|---|
| 0 | **Baseline** | **Before any design or build work.** No exceptions. | `/codero-seo baseline <current-site>` | `SUMMARY.md` written, keyword → page map in the client brief, `redirects.json` agreed |
| 1 | Build | Every PR | Automatic: `SEO` workflow (§7) | Green check: zero Critical/High technical findings, Lighthouse assertions pass |
| 2 | Prelaunch | Real content and photography in, on staging | `/codero-seo prelaunch <staging-url>` | Zero Critical/High from `/seo audit` |
| 3 | Launch | Real domain live, `NEXT_PUBLIC_SITE_URL` set | `/codero-seo launch <live-url>` | Live check clean, every legacy redirect passes, `SEO_LIVE_URL` set |
| 4 | Review | About 4 weeks after launch | `/codero-seo review <live-url>` | Before/after against the stage-0 baseline delivered to the client |
| 5 | Monitor | Weekly (automatic), monthly (human) | `SEO` workflow + `/codero-seo monthly <live-url>` | No open `seo-monitor` issue older than a week |

**Why stage 0 is a hard gate.** Replacing a hotel's site is the moment it
is most likely to lose search traffic. That happens when old URLs vanish,
pages that ranked are dropped, and the address and phone details drift.
The baseline captures, before any design decision is made:

- what the current site ranks for and which URLs carry links (these
  become `redirects.json`, verified on every check);
- the local search position: Google Business Profile, citations, reviews;
- the "before" numbers the review stage is measured against.

A hotel with no existing site still gets a baseline, run against its 2–3
nearest competitors.

Auditing placeholder content wastes the run, because it just reports
the placeholders. So stage 2 waits for real rooms, journal posts and
photography; stage 0 audits the *old* site, so it doesn't.

`/seo audit` fans out to specialist sub-agents (technical, content,
schema, performance, visual, GEO, SXO, local) and returns a 0–100 health
score plus Critical / High / Medium / Low findings. Fix **every Critical
and High** before launch; Medium and Low go on the backlog.

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
Strip the toolkit's community/promo footer from anything a client sees.

The stage-4 review is the main client deliverable. It shows the stage-0
baseline next to the live site: health score, Lighthouse, local
position, and the redirects that preserved old rankings.

---

## 7. What's automated

Two layers run with no one asking:

| Check | When | What it catches | Where it lives |
|---|---|---|---|
| `scripts/seo-check.mjs` on a fresh build | Every PR (`SEO` workflow, job `build-seo`) | Every sitemap URL: status, `lang`, title/description, canonical, hreflang, OG, one `<h1>`, image `alt`, JSON-LD validity + required fields, FAQPage, duplicates within a locale, broken internal links, robots/sitemap/llms.txt, legacy redirects | `.github/workflows/seo.yml` |
| Lighthouse CI | Every PR | Accessibility ≥ 95, best practices ≥ 90, SEO ≥ 90, CLS ≤ 0.1, zero contrast/alt/title/description failures. Performance and LCP warn only, since CI hardware is noisy | `lighthouserc.json` |
| Both, against the real domain | Mondays 06:00 UTC + on demand, once repo variable `SEO_LIVE_URL` is set | Live-only problems: `noindex` on the real host, wrong canonical host, redirects broken by a DNS/host change. A failure opens or updates one `seo-monitor` issue | `seo.yml` job `live-seo`, `lighthouserc.live.json` |

Run the check by hand any time:
`node scripts/seo-check.mjs --base http://localhost:3000` against a
local `npm run build && npm start`, or `--base https://<domain>` against
live. It exits non-zero on any Critical/High finding.

**Automated vs judgement.** The machine checks catch regressions. They
cannot judge whether content is good, whether the hotel is winning
locally, or what to build next. That's what the `/codero-seo` stages are
for, and why stages 0, 2, 3 and 4 are run by a person (with Claude Code),
not a cron.

---

## 8. The skill toolkit: what to use when

The `/seo*` skills are the open-source claude-seo toolkit, installed per
machine in `~/.claude/skills/` (not in this repo). Check them with
`/seo doctor`. `/codero-seo` calls them in the right order. This table is
for running one on its own.

| Skill | Use at | Needs |
|---|---|---|
| `/seo audit` | Stages 0, 2, 4; quarterly | Free |
| `/seo local` | Stages 0 and 4; quarterly. **The most important one for a hotel** | Free |
| `/seo technical`, `/seo schema`, `/seo sitemap`, `/seo hreflang` | Stages 2 and 3, or after a structural change | Free |
| `/seo content`, `/seo geo`, `/seo sxo` | Stages 0 and 2, and before writing new journal/landing pages | Free |
| `/seo images` | Stage 2, after a photography upload | Free |
| `/seo cluster`, `/seo content-brief`, `/seo plan` | Stage 0 (keyword → page map); journal planning | Free (web search) |
| `/seo unlighthouse` | Stages 0 and 2: Lighthouse on every page, not just three | Free (local Chrome) |
| `/seo drift baseline` / `compare` | Baseline at 0 and 3; compare at 4 and monthly | Free. Snapshots live on the machine that took them; the stage reports in the repo are the durable record |
| `/seo backlinks` | Stage 0, to prioritise redirects | Free sources; a Moz key adds DA/PA |
| `/seo google` (PSI, CrUX, GSC, GA4) | Stages 4 and 5 | **Google API key (free)** for PSI/CrUX; a service account added to each client's Search Console for GSC |
| `/seo maps`, `/seo dataforseo` | Optional: geo-grid rank tracking for competitive towns | DataForSEO (paid) |
| `/seo bing` | Stage 3: IndexNow + Bing Webmaster | Bing Webmaster API key (free) |
| `/seo ahrefs`, `/seo seranking`, `/seo profound`, `/seo firecrawl` | Not part of the standard process | Paid; only if a client pays for the data |
| `/seo competitor-pages`, `/seo programmatic`, `/seo ecommerce` | Rarely relevant to a single hotel | — |
| `/seo image-gen` | Not used: hotel sites use real photography | — |

**Worth setting up once on the Codero machine** (free, and it raises every
audit from lab data to real-user data): a Google API key for
PageSpeed/CrUX (`~/.config/claude-seo/google-api.json`), and at each
launch a Search Console property for the client with the service account
added. Paid sources stay optional. A stage summary always records which
sources were and weren't available.
