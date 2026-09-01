import { hotelConfig } from '@/hotel.config';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { sanityFetch } from '@/lib/sanity';
import { EXPERIENCE_BY_SLUG_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences } from '@/lib/data';
import type { Experience } from '@/lib/types';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `An experience at ${hotelConfig.name}`;

export function generateStaticParams() {
  return fallbackExperiences.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = await sanityFetch<Experience | null>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug },
    fallbackExperiences.find((e) => e.slug === slug) ?? null,
  );
  return renderOgImage({
    eyebrow: exp ? `Experience · ${exp.category}` : 'Experiences',
    title: exp ? exp.name : 'Days, properly spent',
    footer: exp ? exp.price : undefined,
  });
}
