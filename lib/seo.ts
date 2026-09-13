import type { Metadata } from 'next';
import { LOCALES, DEFAULT_LOCALE, bcp47For, type Locale } from '@/lib/locales';

/**
 * Per-page metadata helper. Produces a self-referencing canonical, full
 * hreflang `alternates.languages` (+ `x-default`), and matching Open
 * Graph / Twitter tags from a single call, so every route stays
 * consistent. `metadataBase` (set in app/[locale]/layout.tsx) resolves
 * the relative `path` / `image` to an absolute URL.
 *
 * A page that sets its own `openGraph` object stops inheriting the
 * file-convention OG image, so the image is set explicitly here. It
 * defaults to the site-wide `/{locale}/opengraph-image`; dynamic
 * segments pass their own generated route.
 */
type PageMetaArgs = {
  locale: Locale;
  /** String is run through the root title template (`%s — Hotel`).
   *  Pass `{ absolute }` to opt out (the homepage). */
  title?: string | { absolute: string };
  description: string;
  /** Root-relative path, WITHOUT the locale prefix, e.g. '/rooms' or
   *  '/rooms/bass-suite' — this function adds the prefix for the
   *  canonical, OG url, and every hreflang alternate, so callers never
   *  build a locale-prefixed path themselves. */
  path: string;
  /** Root-relative OG image route (also without a locale prefix). Defaults
   *  to the site-wide image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  locale,
  title,
  description,
  path,
  image = '/opengraph-image',
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetaArgs): Metadata {
  const socialTitle =
    typeof title === 'string' ? title : title?.absolute;
  const localizedPath = `/${locale}${path}`;
  const localizedImage = `/${locale}${image}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l.id, `/${l.id}${path}`])),
        'x-default': `/${DEFAULT_LOCALE}${path}`,
      },
    },
    openGraph: {
      ...(socialTitle ? { title: socialTitle } : {}),
      description,
      url: localizedPath,
      type,
      locale: bcp47For(locale),
      images: [localizedImage],
      ...(type === 'article' && (publishedTime || modifiedTime)
        ? { publishedTime, modifiedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      ...(socialTitle ? { title: socialTitle } : {}),
      description,
      images: [localizedImage],
    },
  };
}
