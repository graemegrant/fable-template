# MAINTENANCE.md

What's automated, what still needs you, and how often — across every
client repo cloned from `fable-template`.

## Automated (no action needed unless something fails)

| What | Runs | Where to see it |
|---|---|---|
| Build/lint/typecheck on every push | every push + PR | `.github/workflows/guardrails.yml` — check tab on the repo |
| Dependency update PRs (minor/patch grouped, majors individual) | weekly, Monday | Dependabot PRs on the repo |
| Vulnerability scan | weekly, Monday | `.github/workflows/security-audit.yml` — red run if `npm audit` finds high/critical issues |
| Sanity content backup | 1st of the month | `.github/workflows/sanity-backup.yml` — artifact on the Actions run, 90-day retention |

**Turn on GitHub notifications for failed workflow runs** on each client
repo (Watch → Custom → Actions) — that's what actually gets a Dependabot
audit failure or a broken build in front of you without you having to
go looking.

## Uptime monitoring — not automated by anything in this repo

None of the workflows above tell you if a *live* client site goes down
between your monthly checks — CI only runs on pushes to the repo, not
against the deployed site. Set up free uptime monitoring per client at
launch, not as an afterthought:

- **UptimeRobot** or **Better Uptime** (both have free tiers) — a
  5-minute HTTP check against the client's live domain, alerting you by
  email/SMS on downtime. Point it at the homepage and, if the booking
  engine deep-link is critical, a second check against `/rooms` or
  wherever the booking CTA lives.
- Add this as its own line in `NEW-CLIENT-CHECKLIST.md` §7 (Deploy) —
  set it up before you consider a launch finished, not after something
  breaks.

This is the single biggest gap in the automated side of this package:
everything else here catches problems *before* they reach production;
this is the only thing that catches a problem *after* a site is live
and something outside your control breaks it (DNS, Sanity outage, the
booking engine changing its URL).

## Preview deployments (already free via Vercel's GitHub integration)

Confirm this is switched on per client project: Vercel automatically
builds a preview deployment for every PR when the GitHub integration is
connected. Use the preview link to eyeball a Dependabot PR or any change
visually before merging to `main` — CI tells you it builds, the preview
tells you it looks right.

## Monthly, per active client site (human check — ~10 min each)

- [ ] Any open Dependabot PRs — review and merge the ones that are just
      routine bumps; CI (`guardrails.yml`) gates them, so a green PR is
      safe to merge without a manual build
- [ ] Booking engine deep-link still resolves correctly (click it live)
- [ ] Contact form still delivers email (send a real test enquiry)
- [ ] Site loads over HTTPS with no browser warnings (Vercel manages
      the certificate itself, but worth eyeballing after any DNS change)

## Quarterly, per active client site

- [ ] Confirm the Sanity backup artifact from the last export actually
      contains real data (open it, don't just trust the green check)
- [ ] Review any major-version Dependabot PRs that piled up unmerged —
      decide explicitly to take or defer each one, don't let them rot
      silently
- [ ] Re-run through `NEW-CLIENT-CHECKLIST.md` §5 (guardrails
      verification) — confirms nothing's drifted since launch

## Annually

- [ ] Review `.nvmrc` against current Node LTS and Vercel's supported
      versions — bump deliberately, not via Dependabot (Node major
      bumps aren't covered by the `github-actions`/`npm` Dependabot
      config here)
- [ ] Rotate the Sanity API token used for backups (`SECURITY.md` §3)

## When something breaks

`GIT-WORKFLOW.md` §5 tags every launch — `v1.0.0`, etc. Vercel also
keeps every deployment and supports instant rollback to a previous one
from the dashboard without a git revert. Rollback first, diagnose after,
for anything client-facing and live.
