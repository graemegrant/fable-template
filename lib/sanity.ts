// Server-side Sanity access. Two rules keep the Sanity client (~176 KB) out
// of visitors' JavaScript:
//  - `server-only` fails the build if a client component imports this file
//    (client code gets image URLs from lib/image.ts, re-exported below);
//  - createClient comes from @sanity/client, not next-sanity, whose entry
//    also exports client components (visual editing, live loader) that
//    Next would otherwise ship to every page.
import 'server-only';
import { createClient } from '@sanity/client';

export { imgSrc } from './image';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-10-01';

/** Null when the CMS is not configured — the site then runs on lib/data.ts. */
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

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
