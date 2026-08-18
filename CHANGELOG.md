# CHANGELOG.md

One line per merge to `fable-template`'s `main`. Check this before
pulling a template update into a live client repo (see GIT-WORKFLOW.md
§4) — it tells you what's actually in the update before you merge it
into a revenue-generating site.

## Unreleased

- Added guardrail system: `AGENTS.md`, `CLAUDE.md`, `eslint.config.mjs`,
  `SANITY-SCHEMA.md`, `CLIENT-ONBOARDING-TEMPLATE.md`, `GIT-WORKFLOW.md`,
  `NEW-CLIENT-CHECKLIST.md`, `.nvmrc`
- Re-enabled ESLint at build time in `next.config.ts` (was previously
  `ignoreDuringBuilds: true` — token drift wasn't failing the build)
- Baseline at time of writing: Next 15.3.3, Tailwind 3.4.17, six Sanity
  schemas (room, experience, offer, journalPost, testimonial, teamMember),
  seven-token colour system (forest/forestdeep/gold/goldbright/parchment/
  warmgrey/ink), Craigmore House as the reference build
