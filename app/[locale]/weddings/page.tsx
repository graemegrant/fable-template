import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Weddings — ${pickLocale(hotelConfig.location.regionLabel, locale)}`,
    description: `Weddings at ${hotelConfig.name}: the whole house, the south lawn and four hundred acres, for one wedding at a time.`,
    path: '/weddings',
  });
}

export default async function WeddingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = await getTranslations('weddings');
  const venues = [
    { name: t('southLawnName'), capacity: t('southLawnCapacity'), detail: t('southLawnDetail'), image: IMG.wedding1 },
    { name: t('diningRoomName'), capacity: t('diningRoomCapacity'), detail: t('diningRoomDetail'), image: IMG.dining2 },
    { name: t('libraryName'), capacity: t('libraryCapacity'), detail: t('libraryDetail'), image: IMG.fire },
  ];
  return (
    <>
      <PageHero
        eyebrow={`${t('eyebrowLabel')} · ${pickLocale(hotelConfig.location.regionLabel, locale)}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.wedding1}
        tall
      />

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>{t('howItWorksLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              {t('exclusiveUseHeading')}
            </h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              {t('exclusiveUseP1')}
            </p>
            <p className="mt-5 font-body text-base font-light leading-body text-ink/80">
              {t('exclusiveUseP2')}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-portrait overflow-hidden rounded-img">
              <Image src={IMG.wedding2} alt={t('weddingTableAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp>
            <SectionLabel>{t('settingsLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('settingsHeading')}</h2>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-10 lg:grid-cols-3">
            {venues.map((v) => (
              <StaggerItem key={v.name}>
                <article>
                  <div className="relative aspect-landscape overflow-hidden bg-parchment">
                    <Image src={v.image} alt={v.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="pt-6">
                    <h3 className="font-heading text-2xl font-medium text-ink">{v.name}</h3>
                    <p className="mt-1 font-body text-2xs uppercase tracking-25 text-gold">{v.capacity}</p>
                    <p className="mt-4 font-body text-sm font-light leading-relaxed text-ink/75">{v.detail}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-forest">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
          <FadeUp>
            <SectionLabel variant="parchment">{t('beginLabel')}</SectionLabel>
            <h2 className="mt-6 font-heading text-4xl font-medium leading-tight text-parchment md:text-6xl">
              {t('beginHeadingLine1')}<br />{t('beginHeadingLine2')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-parchment/75">
              {t('beginBody')}
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-ctrl bg-gold px-10 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-parchment"
            >
              {t('enquireDate')}
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
