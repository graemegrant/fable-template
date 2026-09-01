import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-10-01';

/** Null when the CMS is not configured — the site then runs on lib/data.ts. */
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

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

/** Default ISR window for CMS content. Detail pages are prebuilt from
 *  lib/data.ts and revalidated on this cadence; CMS-only pages render
 *  on-demand and then cache for the same window. */
export const CONTENT_REVALIDATE = 600;

/**
 * Fetch from Sanity with a static fallback. Never throws.
 * Falls back when: no project ID configured, the request fails,
 * or the CMS returns nothing (null / empty array).
 *
 * Cached with ISR by default (`CONTENT_REVALIDATE`). Pass
 * `{ revalidate: 0 }` for a genuinely dynamic read.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
  opts: { revalidate?: number } = {},
): Promise<T> {
  if (!client) return fallback;
  const revalidate = opts.revalidate ?? CONTENT_REVALIDATE;
  try {
    const data = await client.fetch<T>(query, params, { next: { revalidate } });
    if (data === null || data === undefined) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}
