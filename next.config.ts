import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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
 */
const isDev = process.env.NODE_ENV !== 'production';
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.api.sanity.io https://*.apicdn.sanity.io",
  "frame-src https://www.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
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
