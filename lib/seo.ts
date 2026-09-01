import type { Metadata } from 'next';

/**
 * Per-page metadata helper. Produces a self-referencing canonical plus
 * matching Open Graph / Twitter tags from a single call, so every route
 * stays consistent. `metadataBase` (set in app/layout.tsx) resolves the
 * relative `path` / `image` to an absolute URL.
 *
 * A page that sets its own `openGraph` object stops inheriting the
 * file-convention OG image, so the image is set explicitly here. It
 * defaults to the site-wide `/opengraph-image`; dynamic segments pass
 * their own generated route (e.g. `/rooms/<slug>/opengraph-image`).
 */
type PageMetaArgs = {
  /** String is run through the root title template (`%s — Hotel`).
   *  Pass `{ absolute }` to opt out (the homepage). */
  title?: string | { absolute: string };
  description: string;
  /** Root-relative path, e.g. '/rooms' or '/rooms/bass-suite'. */
  path: string;
  /** Root-relative OG image route. Defaults to the site-wide image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
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
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(socialTitle ? { title: socialTitle } : {}),
      description,
      url: path,
      type,
      images: [image],
      ...(type === 'article' && (publishedTime || modifiedTime)
        ? { publishedTime, modifiedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      ...(socialTitle ? { title: socialTitle } : {}),
      description,
      images: [image],
    },
  };
}
