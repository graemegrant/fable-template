import Image from 'next/image';
import Link from 'next/link';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/sanity';
import type { JournalPost } from '@/lib/types';

function formatDate(d?: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Two variants: `featured` (full-width split hero) and `standard` (grid card). */
export default function JournalCard({
  post,
  variant = 'standard',
}: {
  post: JournalPost;
  variant?: 'standard' | 'featured';
}) {
  if (variant === 'featured') {
    return (
      <Link href={`/journal/${post.slug}`} className="group grid gap-0 bg-forest md:grid-cols-2">
        <div className="relative aspect-landscape overflow-hidden rounded-img md:aspect-auto md:min-h-480px">
          <Image
            src={imgSrc(post.heroImage)}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-103"
          />
        </div>
        <div className="flex flex-col justify-center p-10 lg:p-16">
          <SectionLabel variant="parchment">{post.category} — Featured</SectionLabel>
          <h2 className="mt-5 font-heading text-3xl font-medium leading-tight text-parchment md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-5 font-body text-sm font-light leading-relaxed text-parchment/75">{post.excerpt}</p>
          <p className="mt-8 font-body text-2xs uppercase tracking-25 text-parchment/60">
            {post.author} · {formatDate(post.publishedAt)} · {post.readingTime}
          </p>
          <span className="mt-6 font-body text-2xs uppercase tracking-25 text-gold">Read the story →</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="relative aspect-wide overflow-hidden rounded-img bg-warmgrey">
        <Image
          src={imgSrc(post.heroImage, 1000)}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
      </div>
      <div className="pt-6">
        <SectionLabel>{post.category}</SectionLabel>
        <h3 className="mt-3 font-heading text-2xl font-medium leading-snug text-ink">{post.title}</h3>
        <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink/70">{post.excerpt}</p>
        <p className="mt-4 font-body text-2xs uppercase tracking-20 text-ink/50">
          {formatDate(post.publishedAt)} · {post.readingTime}
        </p>
      </div>
    </Link>
  );
}
