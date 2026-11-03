# Demos

Each folder here is a fictional hotel used to show off a look, for example
`coastal/` is Polvarra Cove, the Coastal look's demo. A demo build swaps the
demo's content in for the template's own (Craigmore House). Nothing here
affects a normal build or a client site.

## What a demo contains

| File | Replaces | Notes |
| --- | --- | --- |
| `hotel.config.ts` | `hotel.config.ts` | Same shape. Set `look`, `languages`, `noindex: true` and `demoNotice`. |
| `data.ts` | `lib/data.ts` | Same exports and shapes. `IMG` keeps the template's keys, since shared page loaders use them. |
| `messages/en.json` | Laid over `messages/en.json` | Only the keys whose wording differs. Anything not listed keeps the template's wording. |

`demos/check.ts` type-checks every demo against the files it replaces, and
`npm run check:looks` checks the message keys and builds each demo, so a
template change that a demo hasn't caught up with fails CI.

## Building one

```bash
LOOK=coastal DEMO=coastal npm run build
```

`LOOK` must match the demo's `look`; the build stops with a message if not.

## Deploying one

Each demo is its own Vercel project on this repo, with these environment
variables (Production):

- `LOOK` = the demo's look, e.g. `coastal`
- `DEMO` = the demo's folder, e.g. `coastal`
- `NEXT_PUBLIC_SITE_URL` = the demo's address, once it has a custom domain

No Sanity variables: a demo runs from its own `data.ts`.

The template's own deployment (Craigmore House, the Heritage demo) has no
demo folder; it sets `NOINDEX=1` and `NEXT_PUBLIC_DEMO_NOTICE` (the footer
line) instead. Client staging sites can use `NOINDEX=1` the same way.

## Rules

- Every demo is fictional and says so (`demoNotice`) and stays out of
  search (`noindex: true`).
- No invented press quotes or review ratings from real publications or
  platforms. Guest quotes are fine, as the footer marks the hotel as fictional.
- Phone numbers come from Ofcom's drama range (01632 960000 to 960999).
- Photos must be free to use (e.g. Unsplash License). Note the photographer
  beside each one.
