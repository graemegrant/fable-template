import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/image';
import type { Locale } from '@/lib/locales';
import type { JournalPost } from '@/lib/types';
import { formatDate } from '@/lib/ui/format';

/** Two variants: `featured` (wide sand panel) and `standard` (a postcard:
 *  a white border round the photo, with the date stamped on it). */
export default async function JournalCard({
  post,
  variant = 'standard',
}: {
  post: JournalPost;
  variant?: 'standard' | 'featured';
}) {
  const t = await getTranslations('shared');
  const tSections = await getTranslations('journalSections');
  const locale = (await getLocale()) as Locale;
  const section = post.category || tSections(post.section ?? 'story');

  if (variant === 'featured') {
    return (
      <Link href={`/journal/${post.slug}`} className="group grid overflow-hidden rounded-card bg-canvasalt p-3 md:grid-cols-2">
        <div className="relative aspect-landscape overflow-hidden rounded-img md:aspect-auto md:min-h-480px">
          <Image
            src={imgSrc(post.heroImage)}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-103"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-8 md:px-10 lg:px-14">
          <SectionLabel>{section} · {t('featuredSuffix')}</SectionLabel>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-heading text-primary md:text-4xl">{post.title}</h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink/80">{post.excerpt}</p>
          <p className="mt-6 font-body text-sm text-ink/75">
            {post.author} · {formatDate(post.publishedAt, locale)} · {post.readingTime}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-accent">
            {t('readTheStory')}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/journal/${post.slug}`}
      className="shadow-sand group block h-full rounded-card bg-canvas p-3 transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-1"
    >
      <div className="relative aspect-wide overflow-hidden rounded-img bg-canvasalt">
        <Image
          src={imgSrc(post.heroImage, 1000)}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
        <span className="absolute right-3 top-3 rounded-ctrl bg-canvas/95 px-3 py-1 font-body text-xs font-medium text-primary">
          {formatDate(post.publishedAt, locale)}
        </span>
      </div>
      <div className="px-3 pb-3 pt-5">
        <SectionLabel>{section}</SectionLabel>
        <h3 className="mt-3 font-heading text-2xl font-semibold leading-heading text-primary">{post.title}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">{post.excerpt}</p>
        {post.readingTime && <p className="mt-3 font-body text-xs text-ink/75">{post.readingTime}</p>}
      </div>
    </Link>
  );
}
