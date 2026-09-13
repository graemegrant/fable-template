/**
 * Root-level fallback for any request the middleware matcher doesn't
 * rewrite into app/[locale] (e.g. a path outside every known route).
 * Deliberately minimal and locale-agnostic — no hotelConfig/translation
 * dependency, since this can render outside any [locale] segment and
 * needs its own <html>/<body> (same reasoning as app/studio/layout.tsx).
 * The real, localized 404 guests actually see in normal use is
 * app/[locale]/not-found.tsx.
 */
import Link from 'next/link';
import { DEFAULT_LOCALE } from '@/lib/locales';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1>Not found</h1>
        <p>
          <Link href={`/${DEFAULT_LOCALE}`}>Return home</Link>
        </p>
      </body>
    </html>
  );
}
