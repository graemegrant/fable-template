import type { NextConfig } from 'next';

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

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // Guardrail: ESLint (including the token rules in eslint.config.mjs)
  // now runs during `next build`. It was previously set to
  // `ignoreDuringBuilds: true`, which meant drift only surfaced in a
  // manual review, not at build time. Do not re-add that flag —
  // that's exactly the gap AGENTS.md §3 and eslint.config.mjs exist to close.
};

export default nextConfig;
