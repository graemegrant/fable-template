import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';

/**
 * Locale routing (next-intl) composed with the canonical-host noindex
 * guard. Both concerns share one matcher below — see the comment there
 * for why /studio and /api are excluded from locale routing entirely.
 *
 * Canonical-host guard: any deployment served on a host that is NOT the
 * configured production domain (Vercel preview URLs, the raw
 * `<project>.vercel.app` alias, a staging domain) gets
 * `X-Robots-Tag: noindex` so it can never be indexed and compete with /
 * cannibalise the real site.
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

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  if (GUARD_ENABLED) {
    const host = req.headers.get('host') ?? '';
    if (host !== PROD_HOST) {
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
  }

  return res;
}

/**
 * Locale routing only applies to the app/[locale] tree. /studio and /api
 * stay unprefixed (Sanity Studio, the contact-form API route) — they
 * never pass through this middleware at all, so they no longer receive
 * the noindex guard either (intentional: Studio already sets
 * `robots: noindex` via its own metadata; API routes were never
 * indexable pages). The extensionless metadata routes (opengraph-image,
 * icon, apple-icon) also live outside app/[locale] and are excluded by
 * name; every other extension-bearing path (robots.txt, sitemap.xml,
 * manifest.webmanifest, llms.txt, static assets) is excluded by the
 * trailing dot-match.
 */
export const config = {
  matcher: [
    '/((?!api|studio|_next/static|_next/image|opengraph-image|icon|apple-icon|.*\\..*).*)',
  ],
};
