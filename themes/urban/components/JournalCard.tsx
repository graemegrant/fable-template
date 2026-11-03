import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/image';
import type { Locale } from '@/lib/locales';
import type { JournalPost } from '@/lib/types';
import { formatDate } from '@/lib/ui/format';

/** Two variants: `featured` (a paper spread, like a magazine cover story)
 *  and `standard` (photo, mono dateline, headline). */
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
      <Link href={`/journal/${post.slug}`} className="group grid bg-canvas text-ink md:grid-cols-2">
        <div className="relative aspect-landscape overflow-hidden md:aspect-auto md:min-h-480px">
          <Image
            src={imgSrc(post.heroImage)}
            alt={post.imageAlt ?? post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-103"
          />
        </div>
        <div className="flex flex-col justify-between gap-10 p-6 md:p-10 lg:p-14">
          <SectionLabel variant="onpaper">
            {section} / {t('featuredSuffix')}
          </SectionLabel>
          <div>
            <h2 className="font-condensed font-heading text-4xl font-extrabold uppercase leading-none md:text-6xl">{post.title}</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-ink/80">{post.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-5 font-mono text-xs uppercase tracking-18">
            <span className="text-ink/70">
              {post.author} / {formatDate(post.publishedAt, locale)} / {post.readingTime}
            </span>
            <span className="text-accent">{t('readTheStory')}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${post.slug}`} className="group block h-full">
      <div className="relative aspect-wide overflow-hidden bg-canvas/5">
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
