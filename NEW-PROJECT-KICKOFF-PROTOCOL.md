# New Project Kickoff Protocol — Claude Code

Standard process for starting ANY new fable-template client build. Fill in the bracketed fields at the top, hand this whole document to Claude Code as the first message (alongside the client brief and any source files), and the build sequence below is self-contained — nothing else should need re-explaining from memory each time.

---

## Fill in before sending

- **Client/project name:**
- **Repo location:**
- **Files attached:** `hotel.config.ts` / `lib/tokens.ts` (pre-written and verified, or to be generated from the client brief — state which)
- **Sanity project status:** live project exists / not yet — if not, Claude Code should use the `lib/data.ts` fallback dataset, not stall trying to connect to something that doesn't exist
- **Source material attached:** client brief (required) + stage-0 SEO baseline (required, see Step 0b). Any other audit (e.g. a sales audit PDF) is extra input, not a substitute for the baseline
- **Client's current website:** URL, or "none" (the baseline then runs against 2–3 nearest competitors)

---

## Step 0 — HARD GATE: verify this is genuinely an independent repo

**Do this before anything else, every time.** It's an easy mistake to make — client-specific work landing directly in the shared `fable-template` repo instead of its own clone — and it's expensive to untangle after the fact. Have Claude Code run, and show you the actual output of:

```
git remote -v
```

- If this points to `graemegrant/fable-template` (or shows no independent origin at all), **stop** — this is the shared template repo, not a client repo. Go create a new repo via GitHub's "Use this template" button first, then clone that.
- The output should show a remote pointing to a repo named after THIS client, not `fable-template`.

Only proceed past this point once that's confirmed.

---

## Step 0b — HARD GATE: stage-0 SEO baseline exists

**No design or build work starts until the client's SEO baseline is done.**
A rebuild is the moment a hotel is most likely to lose its search
traffic, through dropped URLs, lost local signals and drifting contact
details. The baseline is what prevents that, and it's the "before"
number every later result is measured against (SEO-PROCESS.md §1).

In the client repo, run:

```
/codero-seo baseline <current-site-url>
```

This runs the full `/seo audit` plus the local, Lighthouse-on-every-page,
backlinks, keyword-cluster, SXO and drift baseline checks, and writes
`docs/clients/<slug>/seo/<date>-baseline/SUMMARY.md`.

The gate passes when all three are true:
- [ ] `SUMMARY.md` is committed;
- [ ] its keyword → page map has gone into `CLIENT-BRIEF.md` §8;
- [ ] `redirect-map.csv` has been reviewed and its agreed entries are in `redirects.json`.

If the baseline can't be run (for example the site is down, or there's
no URL yet), stop and say so. Don't start the design on the assumption
that it'll be done later.

**Standing rule on what belongs where, going forward:**
- **`fable-template` main** = shared infrastructure only: components, the build/CI system, universal token *naming structure*, the shared demo/fallback dataset. Nothing client-specific ever merges here.
- **A client's own repo** = that client's actual identity, real colour values, real content. Nothing here gets pushed back upstream except via a deliberate, separate "backport this improvement to the template" step — not as a side effect of client work.
- If Claude Code discovers something genuinely template-level while working on a client (a bug fix, a naming improvement, a CI fix), it should say so explicitly and handle it as its own change against `fable-template`, not bundle it into client work.

---

## Opening instruction to Claude Code (paste as-is)

> Starting a new fable-template client build. Use `.nvmrc` for the Node version — don't default to whatever's already installed. Confirm this repo was created via "Use this template" and is independent of upstream before making any changes. Then confirm the stage-0 SEO baseline exists (`docs/clients/<slug>/seo/*-baseline/SUMMARY.md`); if it doesn't, run `/codero-seo baseline <current-site-url>` before any design or build work.
>
> Follow the standard 9-step build sequence below in order. Run `tsc --noEmit` and `eslint .` after every meaningful change — nothing counts as done without both passing clean. Flag anything that doesn't pass rather than working around it silently.
>
> If any step depends on something not yet provided (Sanity project, real photography, GA4 access), say so explicitly and either use the documented fallback or stop and ask — don't assume or fabricate placeholder data that looks real.

---

## The standard 9-step build sequence

(Source: Codero's internal New Client Checklist, §5 "Build Sequence" — this is the canonical sequence, reproduced here so it travels with every project rather than relying on it being remembered. The repo's own `NEW-CLIENT-CHECKLIST.md` holds the detailed build-time checks behind each step.)

1. **Brief Claude Code** with property name, location, room categories, USPs, avatar, brand colours, and the stage-0 keyword → page map, all from the attached client brief and SEO baseline, not invented
2. **Populate Sanity schemas** — rooms, offers, testimonials, experiences, journal posts, team members (skip/flag if no live Sanity project yet)
3. **Apply brand assets** — logo, colour tokens, typography into `hotel.config.ts` / `lib/tokens.ts`
4. **Upload photography**, connect to CMS image fields (flag if no real photography exists — don't silently substitute stock images without saying so)
5. **Configure the booking engine** — the client's existing booking link in `NEXT_PUBLIC_BOOKING_ENGINE_URL` (`lib/bookingEngine.ts` handles SynXis and generic links) or their embed code; never PMS admin access
6. **Connect GA4** — set `NEXT_PUBLIC_GA4_ID` (the template loads GA4 directly, and only after the visitor chooses "Accept all"; it has no GTM integration), then verify events firing
7. **SEO metadata** written across all pages, targeting the baseline's keyword → page map; the `SEO` workflow checks every PR automatically
8. **Run `/codero-seo prelaunch <staging-url>`** once real content is in: zero Critical/High before launch, then `/codero-seo launch` on the live domain (SEO-PROCESS.md §1)
9. **Quality review** against the CRO blueprint checklist

---

## Standing rules that apply to every project, not just this one

- **Colour tokens use universal, role-based names, not colour names or client names.** As of the token-system fix, the real structure is: `primary`/`primarydeep` (dark surfaces), `accent` (text/rules on light), `accentfill` (solid button/badge surfaces), `onaccent` (text on an accentfill surface), `accentondark` (accent on dark backgrounds), `canvas`/`canvasalt` (light backgrounds), `ink` (body text). This already solves the contrast problem that used to recur across builds — each role is independently tunable to clear AA. When setting a new client's colours, pick values per role with its own contrast requirement in mind, not one hue reused everywhere.
- **Typography is fixed template-wide** (`Cormorant Garamond` + `Jost`) — never varies per client, don't regenerate or substitute it.
- **Every site meets the template's site standard** (AGENTS.md §4a): mobile-first (44px tap targets, 16px form fields on phones, no text under 11px), a booking CTA and tap-to-call on every page, real depth of information, analytics only after consent.
- **Access model stays minimal, per Codero's internal New Client Checklist (§3, "What You Never Need"):** never request domain registrar login, PMS admin password, old site hosting login, or any financial system access. Embed codes and CMS Editor invites only.

---

## At the end of kickoff

Once steps 1–9 are underway or complete, confirm back which steps are done, which are blocked (and on what), and which were skipped — don't let "mostly done" quietly become "done." Use this as the shared checklist for progress tracking rather than relying on memory of where things stand.
