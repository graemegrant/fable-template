import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import fs from 'node:fs';
import path from 'node:path';
import legacy from './redirects.json';
import { activeLook } from './themes/active';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** Baseline security headers applied to every route. Vercel also sets HSTS
 *  on custom domains; declaring it here keeps it correct on any host.
 *  Browsers ignore Strict-Transport-Security over plain HTTP. */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

/**
 * Content-Security-Policy for the public site only — deliberately excluded
 * from /studio (source pattern below), since Sanity Studio needs eval,
 * workers and blob: URLs to run and a locked-down CSP breaks it outright.
 * 'unsafe-eval' is dev-only (Next's HMR needs it); production never gets it.
 * Sanity project ID is per-client (hotel.config.ts), so connect-src/img-src
 * use wildcard subdomains rather than hardcoding one client's host.
 * Microsoft Clarity needs *.clarity.ms and c.bing.com (Microsoft's CSP
 * guidance) for its script, data and images.
 */
const isDev = process.env.NODE_ENV !== 'production';
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com https://cdn.sanity.io https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.api.sanity.io https://*.apicdn.sanity.io https://*.clarity.ms https://c.bing.com",
  "frame-src https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

/** `@look/...` resolves to the chosen look's folder (AGENTS.md §3a), so a
 *  site builds and ships only its own look. tsconfig.json maps `@look/*` to
 *  Heritage for the editor and type checks; the webpack and turbopack
 *  settings below make the build follow the active look (hotel.config.ts
 *  `look`, or the LOOK env var). */
const lookDir = path.join(process.cwd(), 'themes', activeLook);

/** A demo deployment (DEMO env var, see demos/README.md) swaps in a
 *  fictional hotel's settings and content from demos/<name>/ in place of
 *  hotel.config.ts and lib/data.ts. Unset, the template builds as normal. */
const demo = process.env.DEMO || '';
const demoDir = demo ? path.join(process.cwd(), 'demos', demo) : '';
if (demo) {
  if (!fs.existsSync(demoDir)) throw new Error(`Unknown DEMO "${demo}": there is no demos/${demo}/ folder.`);
  const demoLook = fs.readFileSync(path.join(demoDir, 'hotel.config.ts'), 'utf8').match(/look: '([a-z]+)'/)?.[1];
  if (demoLook !== activeLook) throw new Error(`DEMO=${demo} is a ${demoLook} demo: build it with LOOK=${demoLook}.`);
}
const demoSwaps = new Map(
  demo
    ? [
        ['hotel.config.ts', 'hotel.config.ts'],
        [path.join('lib', 'data.ts'), 'data.ts'],
      ].map(([from, to]) => [path.join(process.cwd(), from), path.join(demoDir, to)])
    : [],
);

const nextConfig: NextConfig = {
  // Inlined so server and browser code agree on the look being built.
  env: { LOOK: activeLook, DEMO: demo },
  webpack(config, { webpack }) {
    // Rewritten before resolution, not via resolve.alias: Next applies the
    // tsconfig.json paths (`@look/*` → Heritage) ahead of webpack aliases,
    // so an alias alone always built Heritage.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^@look\//, (resource: { request: string }) => {
        resource.request = path.join(lookDir, resource.request.slice('@look/'.length));
      }),
    );
    // Demo builds: swap the template's content files for the demo's, by
    // resolved path, so every import style (@/, relative) is covered.
    if (demoSwaps.size) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/(hotel\.config|data)\.ts$/, (resource: { createData?: { resource?: string } }) => {
          const from = resource.createData?.resource;
          const to = from && demoSwaps.get(path.normalize(from));
          if (to && resource.createData) resource.createData.resource = to;
        }),
      );
    }
    // Keep each look's (and demo's) build cache apart: Tailwind's colours
    // and radii come from the look, which webpack's cache can't see, so a
    // cache built for one look would otherwise hand its CSS to the next.
    if (config.cache && typeof config.cache === 'object') {
      config.cache.version = `${config.cache.version ?? ''}|look:${activeLook}|demo:${demo}`;
    }
    return config;
  },
  turbopack: {
    resolveAlias: { '@look': `./themes/${activeLook}` },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    // Must list every `quality` value used with next/image (KenBurnsHero
    // uses 68, PageHero uses 65) — Next 16 rejects unconfigured qualities.
    qualities: [65, 68],
    // No image source in this codebase is ever fetched wider than 1920px
    // (see lib/data.ts `u()` and lib/sanity.ts `imgSrc()` — both cap at
    // 1800-1920). Next's default deviceSizes go up to 3840, so a
    // high-DPI viewport (2x/3x DPR is now the common case) was selecting
    // that bucket for the full-bleed hero and forcing the optimizer to
    // upscale a 1800px source to 3840px on every cache miss — slower to
    // generate and blurrier than just serving the 1920px variant.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  // Inline the (small, ~9 KB gzipped) Tailwind CSS into the HTML instead of
  // linking it: the linked stylesheets were render-blocking and cost ~0.7 s
  // of mobile LCP on Lighthouse's slow-4G profile.
  experimental: {
    inlineCss: true,
  },
  // The previous site's URLs → their new pages (redirects.json, built from
  // the stage-0 SEO baseline). Permanent, so rankings and backlinks carry
  // over; runs before the locale middleware.
  async redirects() {
    return (legacy.redirects as { source: string; destination: string }[]).map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/((?!studio).*)',
        headers: [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }],
      },
    ];
  },
  // Guardrail: ESLint (including the token rules in eslint.config.mjs)
  // now runs during `next build`. It was previously set to
  // `ignoreDuringBuilds: true`, which meant drift only surfaced in a
  // manual review, not at build time. Do not re-add that flag —
  // that's exactly the gap AGENTS.md §3 and eslint.config.mjs exist to close.
};

export default withNextIntl(nextConfig);
