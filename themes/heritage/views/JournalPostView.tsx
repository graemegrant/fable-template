import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { imgSrc } from '@/lib/sanity';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import PortableText from '../components/PortableText';
import SectionLabel from '../components/SectionLabel';
import { FadeUp } from '../components/Motion';
import type { JournalPostData } from '@/lib/pages/journalPost';
import { formatDate } from '@/lib/ui/format';

/** JournalPost page, Heritage look. Data comes from lib/pages/journalPost.ts. */
export default async function JournalPostView({ locale, post, featuredRoom, ctaHref, ctaExternal }: { locale: Locale } & JournalPostData) {
  const t = await getTranslations('journalDetail');
  const tSections = await getTranslations('journalSections');
  return (
    <>
      <PageHero eyebrow={post.category || tSections(post.section ?? 'story')} title={post.title} subtitle={`${post.author} · ${formatDate(post.publishedAt, locale)} · ${post.readingTime ?? ''}`} image={post.heroImage} imageAlt={post.imageAlt} />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-340">
          <FadeUp>
            <article className="max-w-3xl">
              <p className="mb-10 border-l-2 border-accent pl-6 font-heading text-2xl font-medium italic leading-relaxed text-primary">
                {post.excerpt}
              </p>
              <PortableText value={post.body} />
              {ctaHref && post.cta?.label && (
                <p className="mt-10">
                  {ctaExternal ? (
                    <a href={ctaHref} className="inline-flex min-h-11 items-center rounded-card bg-primary px-6 font-body text-2xs uppercase tracking-25 text-canvas transition-colors hover:bg-accent">
                      {post.cta.label}
                    </a>
                  ) : (
                    <Link href={ctaHref} className="inline-flex min-h-11 items-center rounded-card bg-primary px-6 font-body text-2xs uppercase tracking-25 text-canvas transition-colors hover:bg-accent">
                      {post.cta.label}
                    </Link>
                  )}
                </p>
              )}
            </article>
            <div className="mt-14 border-t border-ink/10 pt-8">
              <Link href="/journal" className="inline-flex min-h-11 items-center font-body text-2xs uppercase tracking-25 text-accent transition-colors hover:text-primary">
                {t('backToJournal')}
              </Link>
            </div>
          </FadeUp>

          {/* Featured room sidebar */}
          {featuredRoom && (
            <aside>
              <div className="rounded-card border border-ink/10 bg-canvasalt p-8 lg:sticky lg:top-28">
                <SectionLabel>{t('stayWithUs')}</SectionLabel>
                <Link href={`/rooms/${featuredRoom.slug}`} className="group mt-5 block">
                  <div className="relative aspect-landscape overflow-hidden rounded-img">
                    <Image
                      src={imgSrc(featuredRoom.heroImage, 800)}
                      alt={featuredRoom.roomType}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-medium text-ink">{featuredRoom.roomType}</h3>
                  <p className="mt-2 font-body text-sm text-ink/70">
                    {t('from')} <span className="font-heading text-lg text-primary">£{featuredRoom.rate}</span> {t('perNight')}
                  </p>
                  <span className="mt-4 inline-block font-body text-2xs uppercase tracking-20 text-accent transition-colors group-hover:text-primary">
                    {t('viewTheRoom')}
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
