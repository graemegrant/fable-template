import type { MetadataRoute } from 'next';
import { hotelConfig } from '@/hotel.config';

/** Search + AI crawlers are welcome everywhere except the CMS and API.
 *  The AI agents are listed explicitly so the intent survives future edits. */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/studio', '/api'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${hotelConfig.siteUrl}/sitemap.xml`,
    host: hotelConfig.siteUrl,
  };
}
