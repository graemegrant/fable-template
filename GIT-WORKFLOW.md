# GIT-WORKFLOW.md

Each client repo is created from `fable-template` via GitHub's "Use this
template" button, which means there's no ongoing git link back to the
template by default. This file defines how that link is maintained
deliberately, and the branch/tag conventions used across every repo.

For the day-to-day practice of shipping a change to a *live* client
site — which changes need a branch/PR at all vs. which go straight
through Sanity, and why none of it causes downtime — see
`DEVELOPMENT-WORKFLOW.md`. This file is about the git mechanics
specifically; that one is about the end-to-end workflow.

## 1. On creating a new client repo

Immediately after creating the repo from the template:

```bash
git clone https://github.com/graemegrant/<client-repo>.git
cd <client-repo>
git remote add template-upstream https://github.com/graemegrant/fable-template.git
git fetch template-upstream
```

`origin` = the client's own repo. `template-upstream` = the shared
template, fetched but never auto-merged.

Then record which template commit the repo started from. "Use this
template" copies the files but **not the git history**, so this file is
the only link back. Every later template pull is measured from it:

```bash
git rev-parse template-upstream/main > .template-base
git add .template-base && git commit -m "Start from fable-template $(cut -c1-7 .template-base)"
```

## 2. Branch naming (same across every repo)

- `main` — production, deploys to the client's live Vercel project
- `design/*` — visual/layout exploration, e.g. `design/hero-redesign`
- `feature/*` — new functionality, e.g. `feature/gift-vouchers-v2`
- `fix/*` — bug fixes, e.g. `fix/booking-modal-mobile`

## 3. A fix found in a client repo → back into the template

If you fix something in a client repo that's a template-level bug (not
client-specific content), cherry-pick it back:

```bash
# in fable-template, on a fix/* branch
git remote add <client>-repo https://github.com/graemegrant/<client-repo>.git
git fetch <client>-repo
git cherry-pick <commit-sha>
```

Then open a normal PR into `fable-template`'s `main` and add a line to
`CHANGELOG.md`.

Once it merges, add the resulting template commit SHA to the client
repo's `.template-skip` (one per line, `# comment` allowed). The client
already has that change, so the next template pull must not apply it a
second time.

## 4. A template update → into an existing client repo (never automatic)

**Don't `git merge template-upstream/main`.** The client repo shares no
history with the template ("Use this template" starts fresh), so a merge
conflicts on every file. Use `scripts/template-pull.mjs` (shipped with
the template). It replays only the template commits made since
`.template-base`, one file at a time:

- **Take:** files the client never changed, plus root-level `*.md`
  process docs, which are template-owned, get the template's version.
- **Merge:** files both sides changed get each commit's diff applied with
  a 3-way merge; conflicts are left marked.
- **Skip:** commits listed in `.template-skip` aren't applied.

```bash
git fetch template-upstream
node scripts/template-pull.mjs                   # dry run: commits, and which files take/merge
git checkout -b feature/pull-template-update
node scripts/template-pull.mjs --apply           # also moves .template-base forward
# resolve any conflicts it lists: keep the client's content and branding,
# take the template's mechanism
npm run lint && npx tsc --noEmit && npm run build
node scripts/seo-check.mjs --base http://localhost:3000   # against `npm start`
git add -A && git commit -m "Pull fable-template updates up to $(cut -c1-7 .template-base)"
```

Then open a PR. The `Guardrails` and `SEO` checks must pass before it
merges to `main`.

Read the template's `CHANGELOG.md` for the incoming commits first, so you
know what an update touches before pulling it into a live,
revenue-generating client site. A commit that's only relevant to the
template's demo hotel (e.g. demo imagery) can go in `.template-skip` too.

**A repo with no `.template-base`** (created before this existed): the
template commit it started from is usually in its first commit message
(`git log --reverse --format=%s | head -1`). Otherwise find the template
commit whose tree matches the repo's first commit:
`git log template-upstream/main --format='%H %T' | grep $(git rev-parse $(git rev-list --max-parents=0 HEAD)^{tree})`.

Template-level i18n *plumbing* (routing, `lib/resolveLocale.ts`, the
generated Sanity locale field types, message-file infrastructure) is a
normal template → client pull like any other fix. A client's actual
translated *content* — Sanity field values, `messages/{locale}.json`
overrides, `hotel.config.ts` locale entries — is client-specific and
must never be cherry-picked back into `fable-template`.

## 5. Tagging launches

```bash
git tag v1.0.0
git push origin v1.0.0
```

Tag `v1.0.0` at first client launch, increment for subsequent major
relaunches (rebrand, major redesign). This gives you a rollback point per
client independent of the template's own version history.
