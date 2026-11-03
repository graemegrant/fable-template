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

/** JournalPost page, Urban look. Data comes from lib/pages/journalPost.ts. */
export default async function JournalPostView({ locale, post, featuredRoom, ctaHref, ctaExternal }: { locale: Locale } & JournalPostData) {
  const t = await getTranslations('journalDetail');
  const tSections = await getTranslations('journalSections');
  const ctaClass =
    'inline-flex min-h-14 items-center gap-6 bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas';
  return (
    <>
      <PageHero
        eyebrow={post.category || tSections(post.section ?? 'story')}
        title={post.title}
        subtitle={`${post.author} / ${formatDate(post.publishedAt, locale)} / ${post.readingTime ?? ''}`}
        image={post.heroImage}
        imageAlt={post.imageAlt}
      />

      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7 lg:col-start-2">
            <article>
              <p className="mb-12 border-b border-canvas/15 pb-10 font-heading text-2xl font-semibold leading-snug text-canvas md:text-3xl">{post.excerpt}</p>
              <PortableText value={post.body} />
              {ctaHref && post.cta?.label && (
                <p className="mt-12">
                  {ctaExternal ? (
                    <a href={ctaHref} className={ctaClass}>
                      {post.cta.label} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <Link href={ctaHref} className={ctaClass}>
                      {post.cta.label} <span aria-hidden>→</span>
                    </Link>
                  )}
                </p>
              )}
            </article>
            <div className="mt-14 border-t border-canvas/15 pt-6">
              <Link href="/journal" className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-18 text-canvas hover:text-accentondark">
                {t('backToJournal')}
              </Link>
            </div>
          </FadeUp>

          {/* Featured room, as a ruled sidebar entry */}
          {featuredRoom && (
            <aside className="lg:col-span-3 lg:col-start-10">
              <div className="border-t border-canvas lg:sticky lg:top-24">
                <SectionLabel className="pt-4">{t('stayWithUs')}</SectionLabel>
                <Link href={`/rooms/${featuredRoom.slug}`} className="group mt-5 block">
                  <div className="relative aspect-landscape overflow-hidden bg-canvas/5">
                    <Image
                      src={imgSrc(featuredRoom.heroImage, 800)}
                      alt={featuredRoom.roomType}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
                    />
                  </div>
                  <h3 className="font-condensed mt-4 font-heading text-3xl font-extrabold uppercase leading-none text-canvas group-hover:text-accentondark">
                    {featuredRoom.roomType}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-18 text-canvas/70">
                    {t('from')} <span className="text-canvas">£{featuredRoom.rate}</span> {t('perNight')}
                  </p>
                  <span className="mt-4 inline-flex font-mono text-xs uppercase tracking-18 text-accentondark">{t('viewTheRoom')}</span>
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
