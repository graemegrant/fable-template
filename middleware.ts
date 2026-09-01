import { NextResponse, type NextRequest } from 'next/server';

/**
 * Canonical-host guard.
 *
 * Any deployment served on a host that is NOT the configured production
 * domain (Vercel preview URLs, the raw `<project>.vercel.app` alias, a
 * staging domain) gets `X-Robots-Tag: noindex` so it can never be indexed
 * and compete with / cannibalise the real site.
 *
 * - No-op until `NEXT_PUBLIC_SITE_URL` is set (an un-configured build keeps
 *   its default indexable behaviour — see NEW-CLIENT-CHECKLIST.md §4).
 * - Set `ALLOW_ALL_HOSTS_INDEXABLE=true` to disable the guard entirely
 *   (e.g. a staging domain the client genuinely wants crawlable).
 */
const PROD_HOST = (() => {
  try {
    return process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host
      : '';
  } catch {
    return '';
  }
})();

const GUARD_ENABLED =
  Boolean(PROD_HOST) && process.env.ALLOW_ALL_HOSTS_INDEXABLE !== 'true';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (GUARD_ENABLED) {
    const host = req.headers.get('host') ?? '';
    if (host !== PROD_HOST) {
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:ico|png|svg|txt|xml|webmanifest)$).*)'],
};
