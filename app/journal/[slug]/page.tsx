import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { hotelConfig } from '@/hotel.config';
import { sanityFetch, imgSrc } from '@/lib/sanity';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbList } from '@/lib/schema';
import { JOURNAL_BY_SLUG_QUERY, FEATURED_ROOMS_QUERY } from '@/lib/queries';
import { journalPosts as fallbackPosts, rooms as fallbackRooms } from '@/lib/data';
import type { JournalPost, Room } from '@/lib/types';
import PageHero from '@/components/PageHero';
import PortableText from '@/components/PortableText';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp } from '@/components/Motion';

export const revalidate = 600;
export function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<JournalPost | null>(
    JOURNAL_BY_SLUG_QUERY,
    { slug },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  );
  if (!post) return { title: 'Journal' };
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
    image: `/journal/${post.slug}/opengraph-image`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.publishedAt,
  });
}

function formatDate(d?: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<JournalPost | null>(
    JOURNAL_BY_SLUG_QUERY,
    { slug },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  );
  if (!post) notFound();

  const featuredRooms = await sanityFetch<Room[]>(
    FEATURED_ROOMS_QUERY, {}, fallbackRooms.filter((r) => r.featured).slice(0, 3),
  );
  const featuredRoom = featuredRooms[0];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imgSrc(post.heroImage, 1200)],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.author, url: `${hotelConfig.siteUrl}/about` },
    publisher: {
      '@type': 'Organization',
      name: hotelConfig.name,
      url: hotelConfig.siteUrl,
      logo: { '@type': 'ImageObject', url: `${hotelConfig.siteUrl}/icon` },
    },
    url: `${hotelConfig.siteUrl}/journal/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${hotelConfig.siteUrl}/journal/${post.slug}`,
    },
  };

  const breadcrumbs = breadcrumbList([
    ['Home', '/'],
    ['Journal', '/journal'],
    [post.title, `/journal/${post.slug}`],
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageHero eyebrow={post.category} title={post.title} subtitle={`${post.author} · ${formatDate(post.publishedAt)} · ${post.readingTime ?? ''}`} image={post.heroImage} imageAlt={post.imageAlt} />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-340">
          <FadeUp>
            <article className="max-w-3xl">
              <p className="mb-10 border-l-2 border-gold pl-6 font-heading text-2xl font-medium italic leading-relaxed text-forest">
                {post.excerpt}
              </p>
              <PortableText value={post.body} />
            </article>
            <div className="mt-14 border-t border-ink/10 pt-8">
              <Link href="/journal" className="font-body text-2xs uppercase tracking-25 text-gold transition-colors hover:text-forest">
                ← Back to the journal
              </Link>
            </div>
          </FadeUp>

          {/* Featured room sidebar */}
          {featuredRoom && (
            <aside>
              <div className="border border-ink/10 bg-warmgrey p-8 lg:sticky lg:top-28">
                <SectionLabel>Stay with us</SectionLabel>
                <Link href={`/rooms/${featuredRoom.slug}`} className="group mt-5 block">
                  <div className="relative aspect-landscape overflow-hidden">
                    <Image
                      src={imgSrc(featuredRoom.heroImage, 800)}
                      alt={featuredRoom.name}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-medium text-ink">{featuredRoom.name}</h3>
                  <p className="mt-2 font-body text-sm text-ink/70">
                    From <span className="font-heading text-lg text-forest">£{featuredRoom.rate}</span> / night
                  </p>
                  <span className="mt-4 inline-block font-body text-2xs uppercase tracking-20 text-gold transition-colors group-hover:text-forest">
                    View the room —
                  </span>
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
