---
name: codero-seo
description: Run the Codero SEO lifecycle stage for a fable-template client — baseline (before any design), prelaunch, launch, review or monthly. Chains the claude-seo skills in the right order, files every report under docs/clients/<slug>/seo/, and updates the client register. Use whenever a client build reaches an SEO gate in SEO-PROCESS.md, or someone asks to "run the SEO baseline/audit" for a client.
user-invocable: true
argument-hint: "baseline|prelaunch|launch|review|monthly <url>"
---

# Codero SEO lifecycle

`SEO-PROCESS.md` is the policy; this skill is how a stage is actually run.
Invocation: `/codero-seo <stage> <url>`.

## Before any stage

1. **Confirm the repo.** `git remote -v` must show the client's own repo, not
   `fable-template` (NEW-PROJECT-KICKOFF-PROTOCOL.md Step 0). Stage
   reports are client data and never go into the template.
2. **Confirm the toolkit.** Run `/seo doctor`. The stages below call the
   user-level claude-seo skills (`~/.claude/skills/seo*`, v2.2.5+). If
   they're missing, stop and say so. Don't improvise substitutes.
3. **Work out the slug.** It's the `docs/clients/<slug>.md` filename. Create
   `docs/clients/<slug>/seo/<YYYY-MM-DD>-<stage>/` and write every output
   there. The skills' default `{domain}-audit/` folders get moved in, not
   left at the repo root.
4. **Note which optional data sources are live.** Check with
   `claude-seo run google_auth.py --check` and
   `claude-seo run backlinks_auth.py --check`, and record which ones were
   available in the stage summary. A missing paid source is noted, never
   faked.

## Stages

### `baseline <current-site-url>` — HARD GATE before design starts

This audits the client's existing site. It runs before any design or
build work and is not optional. With no existing site, run it against the
2–3 nearest competitors instead, and skip the parts that need an old site
(the redirect map, drift).

Run all of these:

| # | Run | Why |
|---|---|---|
| 1 | `/seo audit <url>` | Full health score + Critical/High/Medium/Low on the site being replaced |
| 2 | `/seo local <url>` | NAP consistency, GBP, citations, reviews: the biggest lever for a hotel |
| 3 | `/seo unlighthouse <url> --max-routes 50 --output-dir <stage-dir>/lighthouse` | Every page's performance/a11y as the "before" number |
| 4 | `/seo drift baseline <url>` | Snapshot to compare against at launch and review |
| 5 | `/seo backlinks <url>` | Which old URLs carry links, so their redirects are prioritised (free sources are enough) |
| 6 | `/seo cluster "hotel <town>"` plus one per key intent (weddings / dining / breaks in <town>) | Keyword → page map the new sitemap must cover |
| 7 | `/seo sxo <url>` | Does each page type match what ranks for its query? |
| 8 | URL inventory | Fetch every sitemap/crawled URL of the old site and write `redirect-map.csv` (`old_url,new_path,priority,notes`) |

If `/seo maps` (DataForSEO) or Google API credentials are available, add
`/seo maps audit` and `/seo google crux <url>`.

Write `<stage-dir>/SUMMARY.md` with these sections:
- **Scores:** health score, Lighthouse medians, review rating and count.
- **Must-keep:** URLs with traffic or backlinks, each mapped to its new path.
- **Keyword → page map:** what the new sitemap must cover.
- **Local fixes:** NAP mismatches and GBP gaps. Most of these are client tasks.
- **Design/content requirements:** what the new site must do better.
- **Data sources used / unavailable.**

Copy the agreed redirects into `redirects.json` (`source` = old path,
`destination` = new locale-prefixed path).

The gate passes only when SUMMARY.md exists, the keyword map has gone
into the client brief, and the redirect map is agreed.

### `prelaunch <staging-url>`

Run this only once real content and photography are in; on placeholder
content it only reports the placeholders.
1. `node scripts/seo-check.mjs --base <staging-url> --site <future live origin>`
2. `/seo audit <staging-url>`
3. `/seo content`, `/seo schema` and `/seo geo` on the home, one room and one journal URL
4. `/seo images <staging-url>`
5. `/seo hreflang <staging-url>`, only if more than one locale
6. `/seo unlighthouse <staging-url> --max-routes 50`

The gate passes on zero Critical/High. List fixes as template-level or
client-specific (SEO-PROCESS.md §2).

### `launch <live-url>`

Run this the day the real domain is live, with `NEXT_PUBLIC_SITE_URL` set
to it.
1. `node scripts/seo-check.mjs --base <live-url>`: zero Critical/High,
   and every `redirects.json` entry passes.
2. `/seo technical <live-url>`
3. `/seo drift baseline <live-url>`: the new site's baseline.
4. Set the repo variable `SEO_LIVE_URL` so the weekly `SEO` workflow
   monitors the site, then trigger it once with `gh workflow run SEO`.
5. Check that the sitemap is submitted to Google Search Console and Bing
   Webmaster Tools, and that the GBP website link is the canonical host.
   These are human tasks: list them, don't claim them.

### `review <live-url>`, about 4 weeks after launch

1. `/seo audit <live-url>`
2. `/seo drift compare <live-url>`
3. `/seo google` (GSC + CrUX), if credentials exist.
4. `/seo local <live-url>`

Compare the results against the stage-0 SUMMARY: health score, Lighthouse
and local findings, before vs after. That comparison is the client-facing
result.

### `monthly <live-url>`

1. `/seo drift compare <live-url>`
2. Read the latest `SEO` workflow run and any open `seo-monitor` issue.
3. `/seo local <live-url>` every third month.

Append the results to the SEO log.

## After every stage

- Append one row to the **SEO log** table in `docs/clients/<slug>.md`:
  date | stage | health score | Critical/High open | report path. Create
  the table if it isn't there.
- Tick the matching line in `STATUS.md`, if the repo has one.
- Offer the PDF (`/seo google report full`) when a client-facing report
  is wanted. Strip the toolkit's community/promo footer from anything
  sent to a client.
- Commit the stage folder on a `docs/seo-<stage>` branch. Reports are
  part of the client record.
