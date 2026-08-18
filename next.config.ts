import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  // Guardrail: ESLint (including the token rules in eslint.config.mjs)
  // now runs during `next build`. It was previously set to
  // `ignoreDuringBuilds: true`, which meant drift only surfaced in a
  // manual review, not at build time. Do not re-add that flag —
  // that's exactly the gap AGENTS.md §3 and eslint.config.mjs exist to close.
};

export default nextConfig;
