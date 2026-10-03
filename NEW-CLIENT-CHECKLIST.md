# NEW-CLIENT-CHECKLIST.md

Start-to-launch checklist for a new client build. Works alongside
`CLIENT-ONBOARDING-TEMPLATE.md` (fill that in as you go),
`SANITY-SCHEMA.md`, `GIT-WORKFLOW.md`, `SEO-PROCESS.md` and `AGENTS.md`.

## 0. SEO baseline: hard gate, before any design (SEO-PROCESS.md §1)
- [ ] Client repo exists (§1 below) and `docs/clients/[hotel-slug].md` is started
- [ ] `/codero-seo baseline <current-site-url>` run (with no existing
      site, run it against the 2–3 nearest competitors)
- [ ] `docs/clients/[hotel-slug]/seo/<date>-baseline/SUMMARY.md`
      committed: scores, must-keep URLs, keyword → page map, local
      fixes, design/content requirements
- [ ] Keyword → page map copied into `CLIENT-BRIEF.md` §8
- [ ] `redirect-map.csv` reviewed and the agreed entries added to `redirects.json`
- [ ] Local fixes that are on the client (GBP, citations, reviews) sent
      to them now; they take weeks, so they shouldn't wait for launch

## 1. Repo setup
- [ ] Create repo from `fable-template` via "Use this template"
- [ ] Add `template-upstream` remote (GIT-WORKFLOW.md §1)
- [ ] Confirm Node version matches `.nvmrc` locally and in Vercel project settings
- [ ] `npm install`, `npm run build` passes clean on the untouched template

## 2. Client identity
- [ ] Rewrite `hotel.config.ts` fully — no leftover demo values
- [ ] **NAP is real**: `location.street` / `locality` / `region` / `postalCode`
      and `contact.phone` / `contact.phoneHref` (E.164) must be the client's
      actual details, identical to what goes on Google Business Profile and
      every citation. Placeholder NAP that ships breaks local SEO and hotel
      rich results.
- [ ] `seo.descriptor` / `seo.locationLabel` set for this client (drive the
      homepage `<title>` and hero eyebrow)
- [ ] Re-skin the nine tokens in `lib/tokens.ts` (not `tailwind.config.ts` —
      it now reads from there, and so does OG-image generation)
- [ ] `stats` (stats band), `stayIncludes` (room pages) and
      `reviewSummary` (real platform figures, or null) set from real,
      checkable facts — the demo hotel's must not ship
- [ ] `directBookingPerk` set only if the hotel has agreed one (else null)
- [ ] `lib/data.ts` `facilities` and `policies` rewritten from what the
      hotel offers and its real policies (cancellation, children, dogs,
      accessibility); `testimonials` / `team` / press only if genuine
- [ ] Copy `CLIENT-ONBOARDING-TEMPLATE.md` to `/docs/clients/[hotel-slug].md`, fill it in
- [ ] Set `lib/locales.ts` to this client's locale set; rewrite
      `hotel.config.ts`'s translatable (`LocaleField`) fields for each
      configured locale (AGENTS.md §9)

## 3. CMS
- [ ] Create client's Sanity project, set env vars
- [ ] Confirm app still runs in static-fallback mode if Sanity vars are ever blank
- [ ] Populate all six collections (SANITY-SCHEMA.md) with real content
- [ ] Local Experiences content reflects real regional partnerships, not placeholder filler
- [ ] Confirm editors have filled in at least the default-locale
      sub-field on every translatable Sanity field — Studio validation
      warns but doesn't block publish

## 4. Booking + email
- [ ] Set `NEXT_PUBLIC_BOOKING_ENGINE_URL` to the client's real booking engine
      — paste their existing link as-is; set `bookingEngine.provider` if
      not auto-detected, then click through once to confirm dates, guests,
      language and currency arrive correctly
- [ ] Have the hotel review `/privacy` (it needs their legal entity as
      data controller) before launch; if `NEXT_PUBLIC_GA4_ID` is set,
      confirm analytics only loads after "Accept all"
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain (canonicals, OG URLs,
      sitemap and JSON-LD all resolve against it — a wrong/blank value ships
      canonicals pointing at the template's fallback domain)
- [ ] Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from Search Console (no longer
      hardcoded in `app/layout.tsx`)
- [ ] Set `RESEND_API_KEY`, `CONTACT_FORM_TO`, `CONTACT_FORM_FROM`
- [ ] Test the contact form end-to-end (real email arrives)
- [ ] Add `SANITY_PROJECT_ID` and a dedicated read-only `SANITY_API_TOKEN`
      as GitHub repo secrets (Settings → Secrets and variables → Actions)
      so `.github/workflows/sanity-backup.yml` can run
- [ ] Fill in "Access & ownership" in `docs/clients/[hotel-slug].md`
      (SECURITY.md §4) — don't leave this implicit

## 5. Guardrails verification
- [ ] `npm run lint` passes — no inline hex, no arbitrary Tailwind values
- [ ] `npm run build` passes with ESLint enabled (not `ignoreDuringBuilds`)
- [ ] `tsc --noEmit` exits 0
- [ ] `.github/workflows/guardrails.yml` CI check is green on the repo's `main` branch —
      this now includes a blocking secret scan (gitleaks) and dependency
      audit (`npm audit --audit-level=high`), not just build/lint/typecheck
      (see `SECURITY.md`, `MAINTENANCE.md`)
- [ ] Only `package-lock.json` is present — no `pnpm-lock.yaml`, no stray install log files
- [ ] CRO elements untouched: `BookButton`, `BookingModal`, `MobileBookBar`, `TrustStrip`
- [ ] JSON-LD, `sitemap.ts`, `robots.ts` still correct for the new domain
- [ ] Security headers verified on the **live** domain post-deploy (not
      just present in `next.config.ts`) — `curl -I https://<live-domain>`
      or https://securityheaders.com/, confirm CSP/HSTS/X-Frame-Options
      are actually being served (`MAINTENANCE.md`, repeat quarterly)

## 6. Real photography
- [ ] All Unsplash/placeholder images swapped for the client's own photography
- [ ] `next.config.ts` `remotePatterns` updated if new image hosts are used
- [ ] `imageAlt` set on rooms / experiences / journal posts in Sanity where the
      auto-generated fallback isn't descriptive enough

## 7. Deploy
- [ ] Vercel project created, env vars set, domain connected
- [ ] Confirm Vercel's GitHub integration is connected (gives free PR preview deployments — see MAINTENANCE.md)
- [ ] Set up free uptime monitoring (UptimeRobot / Better Uptime) against the live domain — MAINTENANCE.md, "Uptime monitoring"
- [ ] Tag `v1.0.0` at launch (GIT-WORKFLOW.md §5)
- [ ] Add a line to `fable-template`'s `CHANGELOG.md` only if this build
      surfaced a template-level fix worth cherry-picking back

## 8. SEO pass (see SEO-PROCESS.md for the full workflow)
- [ ] `SEO` workflow green on every PR throughout the build (automatic;
      a red check means a real regression, so don't merge past it)
- [ ] Content is in and photography is real before auditing (an audit on
      Lorem/Unsplash placeholder content just reports the placeholders)
- [ ] `/codero-seo prelaunch <staging-url>`: fix every **Critical** and **High**
- [ ] `/codero-seo launch <live-url>` once the real domain is connected and
      `NEXT_PUBLIC_SITE_URL` points at it (canonical / OG / sitemap /
      JSON-LD host issues only surface on the real domain). It checks
      every `redirects.json` entry and sets up weekly monitoring
- [ ] Repo variable `SEO_LIVE_URL` set (Settings → Secrets and variables
      → Actions → Variables) and the first `SEO` run on it is green
- [ ] Verify in view-source on 3 page types: `<link rel="canonical">` is
      the live host, `og:image` resolves, JSON-LD has no placeholder NAP
      and `checkinTime` is ISO (`"15:00:00"`, not `"3pm"`)
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image` all
      return 200 on the live host
- [ ] Verify `hreflang` alternates + `x-default` in view-source on all
      configured locales, not just the default (AGENTS.md §9)
- [ ] Non-production hosts serve `X-Robots-Tag: noindex` (the
      `middleware.ts` canonical-host guard — automatic once
      `NEXT_PUBLIC_SITE_URL` is set)
- [ ] Local: create + verify the Google Business Profile (primary category
      `Hotel`), then work the citation list — see SEO-PROCESS.md
- [ ] Submit the sitemap in Google Search Console + Bing Webmaster Tools

## 9. Handoff
- [ ] `docs/clients/[hotel-slug].md` fully filled in (this is the record
      of everything that varies for this client, for whoever touches the
      repo next)
- [ ] Walk the client through `DEVELOPMENT-WORKFLOW.md` — specifically,
      which of their day-to-day content changes (rooms, experiences,
      offers, journal, testimonials, team, photography) they can make
      themselves in Sanity Studio with zero involvement from you, vs.
      what genuinely needs a code change
- [ ] Set a reminder to run `/codero-seo review <live-url>` ~4 weeks
      post-launch, once there is Search Console / CrUX field data. Its
      before/after against the stage-0 baseline is the client's results report
- [ ] SEO log in `docs/clients/[hotel-slug].md` has a row for every stage run

---

**Validated once** against the Selkie Bay demo build (a full dry run of
this process, Aug 2026). Correct this file whenever a real build surfaces
something it missed.
