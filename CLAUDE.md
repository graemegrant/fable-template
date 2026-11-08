@AGENTS.md

## Codero HQ (source of truth)

Codero's strategy, service specs and decision log live in the `codero-hq` repo, available as an additional working directory at `C:\Users\User\Desktop\codero-hq`.

Before starting a feature:
- Read `codero-hq/00-CODERO-HANDOVER.md` and any matching brief in `codero-hq/docs/briefs/` or spec in `codero-hq/docs/services/`.
- Set the brief's status line to `in build`.

During and after a build, if anything differs from the brief or spec (scope, approach, naming, a dropped or added feature):
- Update the brief or spec in codero-hq to match what was built.
- Set its status to `built` or `changed in build`.
- Add an entry to the top of `codero-hq/DECISIONS.md`.
- If a system was built, changed or retired, update section 5 (Systems map) of `codero-hq/00-CODERO-HANDOVER.md` and its "Last updated" date.
- Commit those changes in codero-hq separately from the code commit, with a message like `docs(area): what changed`.

Never change prices, offers or package inclusions in codero-hq from a build repo. Flag them to Graeme instead.
