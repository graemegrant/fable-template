# CHANGELOG.md

One line per merge to `fable-template`'s `main`. Check this before
pulling a template update into a live client repo (see GIT-WORKFLOW.md
§4) — it tells you what's actually in the update before you merge it
into a revenue-generating site.

## Unreleased

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
