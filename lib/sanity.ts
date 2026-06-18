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

/**
 * Fetch from Sanity with a static fallback. Never throws.
 * Falls back when: no project ID configured, the request fails,
 * or the CMS returns nothing (null / empty array).
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    const data = await client.fetch<T>(query, params, { cache: 'no-store' });
    if (data === null || data === undefined) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch {
    return fallback;
  }
}
