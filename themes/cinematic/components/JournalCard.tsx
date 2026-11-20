import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/image';
import type { Locale } from '@/lib/locales';
import type { JournalPost } from '@/lib/types';
import { formatDate } from '@/lib/ui/format';

/** Two variants: `featured` (a glass spread, like a magazine cover story)
 *  and `standard` (rounded photo, mono dateline, headline). */
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
      <Link href={`/journal/${post.slug}`} data-cursor className="glass group grid rounded-card p-2 text-canvas md:grid-cols-2">
        <div className="relative aspect-landscape overflow-hidden rounded-img md:aspect-auto md:min-h-480px">
          <Image
            src={imgSrc(post.heroImage)}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-103"
          />
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:p-14">
          <SectionLabel>
            {section} / {t('featuredSuffix')}
          </SectionLabel>
          <div>
            <h2 className="font-heading text-4xl font-normal leading-none md:text-6xl">{post.title}</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-canvas/80">{post.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-canvas/15 pt-5 font-mono text-xs uppercase tracking-18">
            <span className="text-canvas/70">
              {post.author} / {formatDate(post.publishedAt, locale)} / {post.readingTime}
            </span>
            <span className="text-accentondark">{t('readTheStory')}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${post.slug}`} data-cursor className="group block h-full">
      <div className="relative aspect-wide overflow-hidden rounded-img bg-canvas/5">
        <Image
          src={imgSrc(post.heroImage, 1000)}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
        />
      </div>
      <p className="mt-5 font-mono text-xs uppercase tracking-18 text-canvas/70">
        <span className="text-accentondark">{section}</span> / {formatDate(post.publishedAt, locale)}
      </p>
      <h3 className="mt-3 font-heading text-2xl font-bold leading-tight text-canvas transition-colors group-hover:text-accentondark">{post.title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-canvas/80">{post.excerpt}</p>
    </Link>
  );
}
