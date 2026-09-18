# DEVELOPMENT-WORKFLOW.md

How to add pages, sections, content, and images to a live client site
without downtime — for whoever's making the change, Codero or the client.

The short version: there are two completely separate paths, and neither
one takes the site offline. Knowing which path a given change belongs to
is the only real decision.

## 1. Which path is this change?

| If it's... | It's... | Goes through |
|---|---|---|
| A new room, experience, offer, journal post, testimonial, team bio | **Content** | Sanity Studio — §2 below |
| Swapping/adding photography for any of the above | **Content** | Sanity Studio — §2 below |
| A new page, new section, new component, layout/design change | **Code** | git → PR → Vercel — §3 below |
| A one-off image that only makes sense as part of a new page/section | **Code** | Same as above — see §4 |

Rule of thumb: if it's something the *client* should be able to change
themselves without calling you, it belongs in Sanity. If it changes the
site's structure or how something is built, it's a code change.

## 2. Content changes — no deploy, no code, no downtime

Edit directly in Sanity Studio at `/studio` on the live site. There is no
build, no deploy, no git involved at all.

**Published changes appear live within 10 minutes** — the site caches
CMS content for `CONTENT_REVALIDATE = 600` seconds (`lib/sanity.ts`) so
every page isn't hitting Sanity's API on every request. This is not a
downtime window; the old content keeps serving correctly right up until
the cache refreshes with the new content.

If 10 minutes is ever too slow for a specific client (e.g. they want an
offer to go live the instant they hit publish), an on-demand revalidation
webhook can be added — Sanity calls an API route on publish, which
invalidates just that content's cache immediately instead of waiting for
the window to expire. Not built by default (10 minutes is usually fine
for editorial content); ask if a client build needs it.

## 3. Code changes — new pages, sections, components, design work

This goes through git, but "goes through git" does not mean a downtime
window. Vercel deploys are **atomic**: the new version is built in a
completely separate, isolated environment, and traffic only switches
over once that build has fully succeeded. The live site keeps serving
every request from the *current* deployment right up until the exact
moment the new one is ready — there's no stop-the-server gap. The worst
case from a bad deploy is that the bad version goes live, never that
visitors see a gap while it deploys.

The flow (branch names from `GIT-WORKFLOW.md` §2):

1. **Branch off `main`** — `feature/*` for new functionality (e.g.
   `feature/gift-vouchers-v2`), `design/*` for visual/layout work
2. **Push it.** Vercel automatically builds a **preview deployment** at
   its own separate URL — this never touches production. This is the
   link to send a client for sign-off before anything goes live.
3. **Open a PR.** `guardrails.yml` runs automatically: lint, typecheck,
   build, a secret scan, and a dependency-vulnerability audit — all have
   to pass green before merging (`MAINTENANCE.md`, `SECURITY.md`)
4. **Merge to `main`** once approved. Vercel builds again and atomically
   cuts production over — a couple of minutes, zero visitor-facing
   interruption.
5. **If something's wrong post-deploy**, use Vercel's dashboard **instant
   rollback** to the previous deployment first, diagnose after
   (`MAINTENANCE.md`, "When something breaks") — faster than trying to
   fix forward under pressure.

## 4. Images that aren't Sanity content

A photo tied to a room/experience/journal post/team member is content —
§2 applies, upload it in Studio, no deploy needed. A genuinely new,
one-off image that only exists because of a brand-new page or section is
part of that page's code change — it ships with the PR in §3.

Where there's a choice, prefer wiring even a one-off image through a
Sanity field rather than hardcoding it into a component. It costs
slightly more up front but means the *next* time that image needs to
change, it's a §2 content edit instead of another §3 code deploy.

## 5. The client-facing practice

Always send the Vercel **preview URL**, not a promise that something is
"nearly ready" — the client can see and click through the actual change
live, on a URL that's obviously not the real domain, with zero risk of
them ever seeing a broken or half-built page on the site they searched
for. Only merge once they've signed off on the preview.
