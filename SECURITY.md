# SECURITY.md

## 1. Secrets — never in the repo, ever

All secrets (`RESEND_API_KEY`, `SANITY_API_TOKEN`, any booking-engine
API credentials) live in:
- **Local dev**: `.env.local` (gitignored — never `.env`, never committed)
- **Production**: Vercel → Project → Settings → Environment Variables
- **CI/backups**: GitHub repo Settings → Secrets and variables → Actions

`.env.example` documents which variables exist and stays committed —
it must never contain a real value, only blanks or placeholder shapes.

If a secret is ever accidentally committed: rotate it immediately (in
Sanity/Resend/wherever it was issued) — removing it from a later commit
does not remove it from git history. Rotating is the only real fix.

## 2. Token scoping

- **Sanity tokens**: create a dedicated token per purpose per client —
  a read-only token for the backup workflow, a separate write token
  only if/when something needs write access (e.g. a future admin tool).
  Don't reuse one all-access token across purposes or across clients.
- **Resend**: one API key per client's sending domain, not a shared key
  across all client sites.
- **Booking engine credentials**: these belong to the client, not
  Codero. Codero needs the deep-link URL, not login access to the
  client's booking engine account, unless a specific piece of work
  requires it.

## 3. Rotation

- Sanity backup token: rotate annually (see `MAINTENANCE.md`)
- Any token you suspect may have been exposed (shared over an insecure
  channel, visible in a screen-share, etc.): rotate immediately, don't
  wait for the annual cycle

## 4. Access ownership per client — who holds what

This is the part that actually matters at multi-client scale: know who
owns each account, so you're never locked out of a client's site and a
client is never locked out of their own domain if they leave Codero.
Record this in the client's `docs/clients/[hotel-slug].md` (see
`CLIENT-ONBOARDING-TEMPLATE.md`, "Access & ownership" section):

- **Domain registrar** — should be the client's own account. Codero
  gets DNS access, not registrar login.
- **Vercel project** — recommend a Codero team with the client added
  as a collaborator, or transfer to the client's own Vercel account at
  offboarding — decide per contract, but know which one applies before
  you build.
- **Sanity project** — same question: Codero-owned org with the client
  invited, or client-owned project from day one. Whoever technically
  owns the free-tier project can lock the other party out — don't leave
  this undecided.
- **GitHub repo** — lives in Codero's account during the build; decide
  contractually whether the client receives a copy/transfer at
  handoff or ongoing access is part of the retainer.

## 5. If something goes wrong

1. Rotate any credential that might be involved, immediately
2. Roll back the live deployment (Vercel dashboard, instant rollback —
   see `MAINTENANCE.md` "When something breaks")
3. Check the most recent Sanity backup artifact is intact before
   assuming content is recoverable
4. Fix forward on a `fix/*` branch, verified by `guardrails.yml` before
   merging to `main`
