import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch } from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbList } from '@/lib/schema';
import { EXPERIENCE_BY_SLUG_QUERY, EXPERIENCES_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences } from '@/lib/data';
import type { Experience } from '@/lib/types';
import PageHero from '@/components/PageHero';
import ExperienceCard from '@/components/ExperienceCard';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';
import Link from 'next/link';

export const revalidate = 600;
export function generateStaticParams() {
  return fallbackExperiences.map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = await sanityFetch<Experience | null>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug },
    fallbackExperiences.find((e) => e.slug === slug) ?? null,
  );
  if (!exp) return { title: 'Experiences' };
  return pageMetadata({
    title: exp.name,
    description: `${exp.name} at ${hotelConfig.name} — ${exp.duration}, ${exp.price}.`,
    path: `/experiences/${exp.slug}`,
    image: `/experiences/${exp.slug}/opengraph-image`,
  });
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const exp = await sanityFetch<Experience | null>(
    EXPERIENCE_BY_SLUG_QUERY,
    { slug },
    fallbackExperiences.find((e) => e.slug === slug) ?? null,
  );
  if (!exp) notFound();

  const all = await sanityFetch<Experience[]>(EXPERIENCES_QUERY, {}, fallbackExperiences);
  const related = all.filter((e) => e.slug !== exp.slug).slice(0, 3);

  const breadcrumbs = breadcrumbList([
    ['Home', '/'],
    ['Experiences', '/experiences'],
    [exp.name, `/experiences/${exp.slug}`],
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero eyebrow={`${exp.category} · ${hotelConfig.location.locality}`} title={exp.name} subtitle={`${exp.duration} · ${exp.price}`} image={exp.heroImage} imageAlt={exp.imageAlt} />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-360">
          <div>
            <FadeUp>
              <SectionLabel>The experience</SectionLabel>
              <p className="mt-6 font-body text-lg font-light leading-body text-ink/85">{exp.description}</p>
            </FadeUp>

            {exp.includes && exp.includes.length > 0 && (
              <FadeUp className="mt-16">
                <SectionLabel>What’s included</SectionLabel>
                <ul className="mt-6 space-y-3">
                  {exp.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 font-body text-sm text-ink/80">
                      <span className="mt-9px h-px w-5 shrink-0 bg-gold" aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </div>

          <aside>
            <div className="border border-ink/10 bg-warmgrey p-8 lg:sticky lg:top-28">
              <p className="font-body text-2xs uppercase tracking-25 text-ink/60">Pricing</p>
              <p className="mt-3 font-heading text-3xl font-medium text-forest">{exp.price}</p>
              <dl className="mt-8 space-y-3 border-t border-ink/10 pt-7">
                <div className="flex justify-between gap-6">
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Duration</dt>
                  <dd className="font-body text-sm text-ink/85">{exp.duration}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Category</dt>
                  <dd className="font-body text-sm text-ink/85">{exp.category}</dd>
                </div>
                {exp.seasons && exp.seasons.length > 0 && (
                  <div className="flex justify-between gap-6">
                    <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Season</dt>
                    <dd className="text-right font-body text-sm text-ink/85">{exp.seasons.join(', ')}</dd>
                  </div>
                )}
              </dl>
              <Link
                href="/contact"
                className="mt-8 block w-full rounded-ctrl bg-forest px-8 py-4 text-center font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest"
              >
                Arrange this experience
              </Link>
              <p className="mt-5 text-center font-body text-xs text-ink/60">
                Staying with us? Ask at the desk — same-day is often possible.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp>
            <SectionLabel>While you’re here</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink">More from the estate</h2>
          </FadeUp>
          <StaggerGrid className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <StaggerItem key={e.slug}><ExperienceCard experience={e} /></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
