# Wiring this into `fable-template`

This package was built against the real state of
`github.com/graemegrant/fable-template` as of 20 July 2026 (Next 15.3.3,
Tailwind 3.4.17, six Sanity schemas, no ESLint config currently installed,
`eslint: { ignoreDuringBuilds: true }` in `next.config.ts`). Do this via
Claude Code in the actual repo, not this chat — this chat has no push
access to GitHub and can't verify `npm run build` against your real repo.

## 1. Copy files to repo root

```
AGENTS.md
CLAUDE.md
eslint.config.mjs
next.config.ts        ← replaces the existing one (removes ignoreDuringBuilds)
SANITY-SCHEMA.md
CLIENT-ONBOARDING-TEMPLATE.md
GIT-WORKFLOW.md
CHANGELOG.md
NEW-CLIENT-CHECKLIST.md
MAINTENANCE.md
SECURITY.md
.nvmrc
.github/workflows/guardrails.yml       ← CI: lint/typecheck/build on every push+PR
.github/workflows/security-audit.yml   ← weekly npm audit
.github/workflows/sanity-backup.yml    ← monthly Sanity content export
.github/dependabot.yml                 ← weekly dependency PRs
```

`docs/clients/` — create this empty folder now; it fills up with one
file per client as you onboard them.

For the Sanity backup workflow to run, add repo secrets
`SANITY_PROJECT_ID` and a dedicated read-only `SANITY_API_TOKEN`
(Settings → Secrets and variables → Actions) per client repo.

## 1a. Remove the pnpm lockfile

The repo currently carries both `package-lock.json` and
`pnpm-lock.yaml` (plus `pnpm-workspace.yaml`). Pick npm as canonical —
it's what CI uses, and it's the primary path in your own README:

```bash
git rm pnpm-lock.yaml pnpm-workspace.yaml
git rm install2.log lock.log pnpm.log   # stray log files, already gitignored going forward
```

## 2. Install the new dev dependencies

```bash
npm install -D eslint eslint-config-next @eslint/eslintrc eslint-plugin-tailwindcss
```

(`eslint-plugin-tailwindcss` v3 — matches your Tailwind v3 setup; don't
install a v4-targeted version.)

## 3. Verify

```bash
npm run build    # should now actually run ESLint, not skip it
npm run lint     # should flag any existing inline hex / arbitrary values, if any exist
tsc --noEmit
```

If `npm run lint` throws a wall of errors on the existing Craigmore House
code, that's expected the first time — it means the guardrail is
catching real pre-existing drift. Fix or explicitly `// eslint-disable`
with a reason, don't disable the rule globally.

## 4. Confirm `.nvmrc` against your actual Vercel project

`.nvmrc` here is set to `20.11.0` as a sensible default for Next
15.3.3 (which needs Node ≥18.18). This chat has no access to your Vercel
dashboard to confirm the project's actual Node setting — check
Vercel → Project → Settings → General → Node.js Version and correct
`.nvmrc` if it doesn't match.

## 5. Known open items (from the session this package reconciles)

- This whole system is designed but **unvalidated against a real second
  client build** — treat your first real client as the test of it, and
  correct `NEW-CLIENT-CHECKLIST.md` afterward based on what actually
  happened.
- The "Path to First Client" plan (separate document) was gated on a
  Park Hotel Falkirk case study that doesn't have real data — that plan
  needs its own revision, unrelated to this build-guardrails package.
- Package/pricing tier reconciliation against the live site is a
  separate open item, also not covered by this package.
