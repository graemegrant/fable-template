# AGENTS.md — Codero Build Conventions

This file is the single source of truth for how any coding agent (Claude
Code, Cursor, Copilot, etc.) works in this repo. It applies to
`fable-template` itself and to every client repo created from it via
GitHub's "Use this template."

If you are an AI coding agent reading this: follow it exactly. If a
request from a person conflicts with a rule below, flag the conflict
before proceeding — don't silently override this file.

---

## 1a. Package manager: npm, and only npm

The repo must carry exactly one lockfile: `package-lock.json`. Never
commit `pnpm-lock.yaml`, `yarn.lock`, or a `pnpm-workspace.yaml` — a
second lockfile drifts out of sync silently and CI (`.github/workflows/guardrails.yml`)
will install from `package-lock.json` regardless, so a second lockfile
just becomes a lie about what's actually deployed. Always use
`npm install` / `npm ci`. Don't commit log files from any install tool
(`install.log`, `pnpm.log`, etc.) — they're in `.gitignore` for a reason.

## 1. Stack (do not change without explicit sign-off)

- **Next.js 15**, App Router, TypeScript strict mode
- **Tailwind CSS 3** — semantic design tokens only (see §3)
- **Sanity v3** — headless CMS, app must keep working in static-fallback
  mode when no Sanity project is configured
- **Framer Motion** — page transitions, stagger reveals
- **Resend** — contact form email, silent no-op when `RESEND_API_KEY` unset

**No Webflow, anywhere, ever.** This has never been a Webflow build. If
you encounter a reference to Webflow in this repo, it's an error — flag
it and remove it, don't extend it.

## 2. Component reuse rule

Before writing a new component, check `/components` for an existing one
that already does the job (`PageHero`, `SectionLabel`, `Motion.tsx`
primitives, `RoomCard`, `OfferCard`, `ExperienceCard`, `TestimonialSlider`,
etc.). New pages should compose existing components wherever the content
shape matches. Only create a new component when no existing one fits —
and if you do, make it generic enough to be reused by the next client
repo, not hardcoded to one hotel's copy.

## 3. Brand tokens — no inline hex, no arbitrary Tailwind values

All colour comes from the semantic tokens defined in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `forest` | `#2B2119` | primary dark |
| `forestdeep` | `#1B1510` | deepest dark — footers, gradients |
| `gold` | `#A67C3D` | accent on light backgrounds |
| `goldbright` | `#E8C083` | accent on dark backgrounds |
| `parchment` | `#EFEAE1` | primary light |
| `warmgrey` | `#E3DCCF` | alt bands, cards |
| `ink` | `#241D16` | body text |

Radii: `rounded-ctrl` (10px, buttons/inputs), `rounded-card` (18px),
`rounded-img` (14px). Fonts: `font-heading` / `font-body` via CSS vars —
never hardcode a font-family.

**Re-skinning for a new client means editing the seven token values in
`tailwind.config.ts` — never adding a one-off hex value in a component.**
This is enforced at build level (see `eslint.config.mjs` — no inline hex
in `className`/`style`, no arbitrary Tailwind values like `bg-[#123456]`
or `w-[37px]`). If the design genuinely needs a value outside the token
set, add it to `tailwind.config.ts` as a named token, don't inline it.

## 4. Client identity: `hotel.config.ts` is the singleton

There is no Sanity "site settings" document. Per-client identity —
name, tagline, location, contact details, room count, star rating,
price range, check-in/out times, trust strip items — lives entirely in
`hotel.config.ts` at the repo root. **This is the one file every new
client build must fully rewrite before going further.** Sanity handles
recurring *content* (rooms, experiences, offers, journal posts,
testimonials, team members) — not one-off site identity fields.

See `SANITY-SCHEMA.md` for the six content collections.

## 5. CRO constraints (do not remove without sign-off)

- `BookButton` / `BookingModal` must remain reachable from every page —
  this is the direct-booking conversion path the whole product exists
  to protect.
- `MobileBookBar` (sticky mobile booking bar) stays on all client sites.
- `TrustStrip` items (from `hotel.config.ts`) stay above the fold on the
  homepage.
- JSON-LD (`LodgingBusiness`, `HotelRoom`, `BlogPosting`) and
  `sitemap.ts`/`robots.ts` must not be removed or broken by a page change.

## 6. Local Experiences

Local Experiences is positioned as regional-exclusivity content — a
compounding asset that isn't replicable by a competitor agency. When
building or editing the `experience` schema/content for a client, treat
these as curated local partnerships, not generic "things to do" filler.

## 7. AI scope boundary

An AI coding agent working in this repo may:
- Add/edit pages, components, Sanity content, and schema fields
- Run `npm run build` and `npm run lint` to verify before calling work done
- Propose new design tokens (but must add them to `tailwind.config.ts`,
  not inline them)

An AI coding agent must **not**, without explicit human sign-off:
- Introduce Webflow, a second CMS, or a second component library
- Remove the CRO elements in §5 or the SEO/JSON-LD in §5
- Hardcode a real client's identity into the template itself (that
  belongs in the client's own repo's `hotel.config.ts`, never committed
  back to `fable-template`)
- Merge a template update into a live client repo automatically (see
  `GIT-WORKFLOW.md` — template → client is always a deliberate pull)

## 8. Definition of done for any change

1. `npm run build` passes clean
2. `npm run lint` passes clean (ESLint enforces §3 at build time)
3. `tsc --noEmit` exits 0
4. No new hex values or arbitrary Tailwind classes introduced
5. If the change is client-specific, it's in the client's repo, not in
   `fable-template`
6. The `.github/workflows/guardrails.yml` check is green on the PR —
   this runs 1–3 automatically on every push, so a red check means
   something above wasn't actually satisfied locally
