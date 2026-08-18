# GIT-WORKFLOW.md

Each client repo is created from `fable-template` via GitHub's "Use this
template" button, which means there's no ongoing git link back to the
template by default. This file defines how that link is maintained
deliberately, and the branch/tag conventions used across every repo.

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

## 4. A template update → into an existing client repo (never automatic)

```bash
git fetch template-upstream
git log main..template-upstream/main --oneline   # review what's coming in
git checkout -b feature/pull-template-update
git merge template-upstream/main                 # resolve conflicts against client's own copy/branding
npm run build && npm run lint                    # must pass before merging to main
```

Check `CHANGELOG.md` in the template repo first so you know what a given
update actually touches before pulling it into a live, revenue-generating
client site.

## 5. Tagging launches

```bash
git tag v1.0.0
git push origin v1.0.0
```

Tag `v1.0.0` at first client launch, increment for subsequent major
relaunches (rebrand, major redesign). This gives you a rollback point per
client independent of the template's own version history.
