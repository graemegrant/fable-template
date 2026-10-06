import imageUrlBuilder from '@sanity/image-url';

/*
 * Image URL helper, kept separate from lib/sanity.ts on purpose: client
 * components (KenBurnsHero, RoomCard, GalleryLightbox…) need it, and
 * importing it from lib/sanity.ts pulled the whole Sanity client
 * (next-sanity, @sanity/client, preview-kit: ~176 KB) into every visitor's
 * JavaScript. This module depends only on @sanity/image-url. Client code
 * imports from here; lib/sanity.ts stays server-only in practice.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

/** Resolve an image field to a URL. Accepts Sanity image objects or plain strings. */
export function imgSrc(image: unknown, width = 1800): string {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (builder) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return builder.image(image as any).width(width).auto('format').url();
    } catch {
      return '';
    }
  }
  return '';
}
