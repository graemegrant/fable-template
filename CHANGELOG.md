# CHANGELOG.md

One line per merge to `fable-template`'s `main`. Check this before
pulling a template update into a live client repo (see GIT-WORKFLOW.md
§4) — it tells you what's actually in the update before you merge it
into a revenue-generating site.

## Unreleased

- **Expired offers are hidden.** `validUntil` was stored but never used,
  so expired offers stayed live. `lib/offers.ts` `isOfferCurrent()` now filters
  CMS and fallback offers on the home and offers pages (shown through the
  last day; `validFrom` does not hide, so offers can be promoted early).
  Both pages revalidate hourly so expiry applies without a rebuild; the
  homepage section hides and /offers shows a message when none are current.
  Studio field descriptions explain this to the hotel.
- **Onboarding: Brand Inspiration & Page Requirements** section
  (references, tone spectrum, things to avoid, must-have pages).

- **Audit gate: allowlist braces GHSA-vfj7-8cjw-p6xm** (high, no patched
  version yet). Build/dev-tooling glob matching only — patterns come from
  our own config, not requests. CI was failing on every repo since the
  advisory landed. Remove the entry once braces ships a fix.

- **SEO lifecycle, automated checks, `/codero-seo` skill.**
  - **Lifecycle:** `SEO-PROCESS.md` §1 now runs from stage 0 to stage 5.
    Stage 0 is a baseline audit of the client's existing site, and it's a
    hard gate before any design (kickoff Step 0b, checklist §0, AGENTS.md §5).
    §7 documents the automated checks; §8 maps every claude-seo skill to a
    stage and lists which need keys.
  - **Automated checks:** new `SEO` workflow (`.github/workflows/seo.yml`):
    - every PR runs `scripts/seo-check.mjs` (dependency-free; checks every
      sitemap URL) plus Lighthouse CI (`lighthouserc.json`);
    - weekly, once `SEO_LIVE_URL` is set, it checks the live domain and
      opens a `seo-monitor` issue on failure.
  - **Redirects:** new `redirects.json` maps the previous site's URLs to
    new pages. `next.config.ts` serves them as permanent redirects, and the
    check script verifies each one.
  - **Project skill:** `.claude/skills/codero-seo` runs each stage and
    files reports under `docs/clients/<slug>/seo/`. `.claude/skills/` is
    now tracked; the rest of `.claude/` stays ignored.
  - **Pulling this into a client repo:** `seo.yml` adds a required-looking
    PR check. Fix any High findings it raises before merging.
- **Contrast and hero CLS (SEO/Lighthouse pass).** Faded text `text-ink/50|60|65`
  raised to `text-ink/70` (≥5.2:1 on canvas/canvasalt) across 18 files; footer
  and 404 `text-canvas/50` → `/70` (was 4.38:1 on primary). `accentfill`
  brightened `#A67C3D` → `#B08646` so `onaccent` text on it passes AA
  (4.18:1 → 4.75:1). The hero no longer adds cookie-banner bottom padding
  after hydration, which caused layout shift on first visit.
- **Cookie banner in front of the booking bar.** On phones the banner wraps
  to 116–146px but the bar was offset by a fixed 4.25rem, so the bar
  covered it (at 360px "Accept all" couldn't be tapped). The banner is
  now z-90 and publishes its real height (`--cookiebar-h`, read by the
  `cookiebar` spacing token); buttons stack under the message on phones.
  The hero gets top padding so it never slides under the header, and the
  final CTA band gets a photo backdrop so it no longer merges with the
  dark testimonials/reviews band above it.
- **Node 24 in `.nvmrc`** (was 20.11.0, end-of-life since April 2026).
  New repos created via "Use this template" failed their first CI run:
  a cold `npm ci` on Node 20.11 / npm 10.2.4 reports "Missing:
  @swc/helpers@0.5.23 from lock file" on Linux even though the lockfile
  is consistent; this repo only passed because of a warm npm cache. Node
  24 matches Vercel and local builds. **Client repos:** pull this, and
  set the Vercel project to Node 24 if it isn't already.
- **Hotel-site standard (mobile-first, conversion, depth)** — see AGENTS.md
  §4a. Mobile: 44px tap targets, 16px form fields on phones (no iOS
  zoom), 11px minimum text, rounded corners everywhere, skip link, and a
  site-wide `MobileBookBar` with tap-to-call. Conversion: booking-engine
  adapter (`lib/bookingEngine.ts`, SynXis + generic), book-direct perk,
  venue enquiry buttons with contact-subject preselect, room comparison
  table, optional room `sqm`. Depth: facilities, review summary band,
  config-driven stats, "Good to know" (`/policies`) and privacy pages,
  "every stay includes" on room pages; team/press/testimonials hide when
  empty. Compliance: GA4 loads only after cookie consent. **Client repos:**
  new `hotel.config` fields (`bookingEngine`, `directBookingPerk`, `stats`,
  `stayIncludes`, `reviewSummary`) and `lib/data` lists (`facilities`,
  `policies`) must be filled from the client's real facts when pulling.
- **Fixes found on a client build** (all would ship on any
  client): `llms.txt` built only from `hotel.config.ts` (it hard-coded
  another hotel's description, nearest city and perks); Hotel JSON-LD
  drops empty `sameAs`/email and an unconfirmed `petsAllowed`; listing
  pages no longer skip h1 → h3 (cards take `headingLevel`); nav logo,
  labels and CTA no longer wrap or collide at 1024–1279px; language
  switcher hidden on single-locale sites; footer social links only when
  set; booking modal dates use local time and departure must follow
  arrival; `MobileBookBar` no longer sits on top of the open modal.
- **Base tokens renamed off colour names:** `forest` → `primary`,
  `forestdeep` → `primarydeep`, `parchment` → `canvas`, `warmgrey` →
  `canvasalt`; `SectionLabel` variant `parchment` → `ondark`. Values
  unchanged. **Client repos:** rename these keys in `lib/tokens.ts` and
  any client-only components when pulling this.
- **Accent tokens renamed by role.** `gold` / `goldbright` are replaced by
  `accent` (on light), `accentfill` + `onaccent` (solid fills and the
  text on them) and `accentondark` (on dark), so each pairing can be
  tuned to WCAG AA independently instead of one hue being traded off
  between buttons and text. Values unchanged; Navbar, Footer, testimonial
  controls, cookie banner and dining chef role now use `accentondark`
  (was `gold` at 4.18:1 on forest — an AA failure). **Client repos:**
  rename `gold`/`goldbright` keys in `lib/tokens.ts` when pulling this.
- **Default `accent` darkened** from `#A67C3D` to `#785828` so the demo
  palette clears AA as text: 5.43:1 on parchment, 4.78:1 on warmgrey (was
  3.15:1 / 2.76:1). `accentfill` keeps `#A67C3D`.
- **Multilingual (i18n) support**, template-wide, configurable per client
  via `lib/locales.ts` (default demo set: `en`/`fr`/`de`). Adds:
  `next-intl` locale routing (`localePrefix: 'always'` — every URL is
  locale-prefixed, e.g. `/en/rooms`); `app/` restructured to
  `app/[locale]/...` (`/studio` and `/api` deliberately excluded);
  `middleware.ts` composes locale routing with the existing
  canonical-host noindex guard; field-level Sanity i18n via generated
  `localeString`/`localeText`/`localeBlockContent` object types
  (`sanity/schemas/objects/locale-fields.ts`) across all 6 content
  schemas; `lib/resolveLocale.ts` `pickLocale()` — the shared fallback
  mechanism so any untranslated field/document/UI message falls back to
  the default locale rather than rendering blank; `lib/data.ts` and
  `hotel.config.ts` translatable fields restructured to the
  `LocaleField` shape; `messages/{locale}.json` for UI chrome (nav,
  footer, booking modal, cookie banner) with real EN/FR/DE translations;
  `lib/seo.ts` `pageMetadata()` and `app/sitemap.ts` emit full
  `hreflang`/`alternates.languages` + `x-default` per page; JSON-LD
  gains `inLanguage`. New `AGENTS.md` §9 documents the hard rule: never
  fabricate translated marketing/editorial prose, only UI-chrome strings
  are translated directly in the template.
- **SEO audit follow-up** (`/seo audit` against the live demo). `KenBurnsHero`
  reserves space for the cookie banner on mobile so the hero CTAs aren't
  covered before consent is decided; `KenBurnsHero`/`PageHero` hero images
  get `fetchPriority="high"` (Next 15 doesn't derive it from `priority`
  automatically); `next.config.ts` adds a `Content-Security-Policy`, scoped
  off `/studio` so Sanity Studio's eval/worker/blob usage keeps working.
- **SEO hardening** (ported from the Selkie Bay dry run — `/seo audit`
  codebase + live passes). Adds: `lib/seo.ts` `pageMetadata()` for
  per-route canonical + OG + Twitter; CMS-aware `generateMetadata` and
  `sitemap.ts`; ISR on detail routes (`generateStaticParams` +
  `revalidate`, no more `force-dynamic`); `lib/schema.ts` with
  `@type: "Hotel"` (+ `@id`, `openingHoursSpecification`, `hasMap`,
  `amenityFeature`, `petsAllowed`), `HotelRoom`, `BlogPosting`,
  `BreadcrumbList`; file-convention `opengraph-image` routes; `next/font`
  self-hosting; `lib/tokens.ts` palette shared with OG image generation;
  `middleware.ts` canonical-host `noindex` guard; generated `/llms.txt`,
  `manifest`, `icon`, `apple-icon`; security headers in `next.config.ts`;
  AI-crawler rules in `robots.ts`; `LazyMotion` + mobile-gated reveals in
  `Motion.tsx`; slim cookie banner coordinated with `MobileBookBar`;
  `PageHero` scrim; `imageAlt` field on room/experience/journalPost.
  New config fields: `location.{street,locality,region,postalCode,country,
  regionLabel}`, `contact.phoneHref`, `reception`, `amenities`,
  `petsAllowed`, `seo.{descriptor,locationLabel,publishAggregateRating}`,
  `checkInISO`/`checkOutISO`.
- Added `SEO-PROCESS.md`; `NEW-CLIENT-CHECKLIST.md` §8 "SEO pass";
  `AGENTS.md` §5 SEO rules + consolidated the duplicated CRO section.
- Added guardrail system: `AGENTS.md`, `CLAUDE.md`, `eslint.config.mjs`,
  `SANITY-SCHEMA.md`, `CLIENT-ONBOARDING-TEMPLATE.md`, `GIT-WORKFLOW.md`,
  `NEW-CLIENT-CHECKLIST.md`, `.nvmrc`
- Re-enabled ESLint at build time in `next.config.ts` (was previously
  `ignoreDuringBuilds: true` — token drift wasn't failing the build)
- Baseline at time of writing: Next 15.3.3, Tailwind 3.4.17, six Sanity
  schemas (room, experience, offer, journalPost, testimonial, teamMember),
  seven-token colour system (forest/forestdeep/gold/goldbright/parchment/
  warmgrey/ink), Craigmore House as the reference build
