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

/** JournalPost page, Coastal look. Data comes from lib/pages/journalPost.ts. */
export default async function JournalPostView({ locale, post, featuredRoom, ctaHref, ctaExternal }: { locale: Locale } & JournalPostData) {
  const t = await getTranslations('journalDetail');
  const tSections = await getTranslations('journalSections');
  const ctaClass =
    'inline-flex min-h-12 items-center rounded-ctrl bg-accentfill px-7 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5';
  return (
    <>
      <PageHero
        eyebrow={post.category || tSections(post.section ?? 'story')}
        title={post.title}
        subtitle={`${post.author} · ${formatDate(post.publishedAt, locale)} · ${post.readingTime ?? ''}`}
        image={post.heroImage}
        imageAlt={post.imageAlt}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-1fr-340">
          <FadeUp>
            <article className="max-w-3xl">
              <p className="mb-10 font-heading text-2xl italic leading-relaxed text-primary md:text-3xl">{post.excerpt}</p>
              <PortableText value={post.body} />
              {ctaHref && post.cta?.label && (
                <p className="mt-10">
                  {ctaExternal ? (
                    <a href={ctaHref} className={ctaClass}>{post.cta.label}</a>
                  ) : (
                    <Link href={ctaHref} className={ctaClass}>{post.cta.label}</Link>
                  )}
                </p>
              )}
            </article>
            <div className="mt-12">
              <Link
                href="/journal"
                className="inline-flex min-h-11 items-center rounded-ctrl bg-canvasalt px-5 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-canvas"
              >
                {t('backToJournal')}
              </Link>
            </div>
          </FadeUp>

          {/* Featured room, as a raised card */}
          {featuredRoom && (
            <aside>
              <div className="shadow-sand rounded-card bg-canvas p-3 lg:sticky lg:top-28">
                <div className="px-3 pt-3">
                  <SectionLabel>{t('stayWithUs')}</SectionLabel>
                </div>
                <Link href={`/rooms/${featuredRoom.slug}`} className="group mt-4 block">
                  <div className="relative aspect-landscape overflow-hidden rounded-img">
                    <Image
                      src={imgSrc(featuredRoom.heroImage, 800)}
                      alt={featuredRoom.roomType}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
                    />
                  </div>
                  <div className="px-3 pb-3 pt-5">
                    <h3 className="font-heading text-2xl font-semibold text-primary">{featuredRoom.roomType}</h3>
                    <p className="mt-1 font-body text-sm text-ink/80">
                      {t('from')} <span className="font-heading text-lg font-semibold text-primary">£{featuredRoom.rate}</span> {t('perNight')}
                    </p>
                    <span className="mt-4 inline-flex min-h-11 items-center rounded-ctrl bg-accentfill px-5 font-body text-sm font-semibold text-onaccent">
                      {t('viewTheRoom')}
                    </span>
                  </div>
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
