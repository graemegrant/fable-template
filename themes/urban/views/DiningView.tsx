import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';
import type { DiningData } from '@/lib/pages/dining';

const blockButton =
  'inline-flex min-h-14 items-center justify-between gap-6 px-6 font-mono text-sm uppercase tracking-18 transition-colors';

/** Dining page, Urban look. Data comes from lib/pages/dining.ts. The menus
 *  are set on paper like a printed carte. */
export default async function DiningView({ chef, resolvedMenus }: { locale: Locale } & DiningData) {
  const t = await getTranslations('dining');
  return (
    <>
      <PageHero
        eyebrow={`${t('diningRoomLabel')} / ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.dining1}
        tall
      />

      {/* 01 Philosophy */}
      <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeUp className="lg:col-span-6">
            <SectionLabel index="01">{t('philosophyLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">
              {t('philosophyHeading')}
            </h2>
            <p className="mt-8 font-body text-lg leading-body text-canvas/85">{t('philosophyBody')}</p>
          </FadeUp>
          <FadeUp delay={0.15} className="lg:col-span-5 lg:col-start-8">
            <figure>
              <div className="relative aspect-portrait overflow-hidden bg-canvas/5">
                <Image src={IMG.food1} alt={t('tastingDishAlt')} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-18 text-canvas/70">Fig. 01 / {t('tastingDishAlt')}</figcaption>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* 02 Menus, printed on paper */}
      <section className="bg-canvas text-ink">
        <div className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
          <FadeUp className="grid gap-6 border-b border-ink pb-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel index="02" variant="onpaper">
                {t('menusLabel')}
              </SectionLabel>
              <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none md:text-7xl">{t('menusHeading')}</h2>
            </div>
            <p className="font-body text-base leading-relaxed text-ink/80 lg:col-span-4 lg:col-start-9 lg:self-end">{t('menusIntro')}</p>
          </FadeUp>
          <StaggerGrid className="grid lg:grid-cols-3">
            {resolvedMenus.map((menu, i) => (
              <StaggerItem key={menu.name} className="h-full">
                <article className={`h-full border-b border-ink/20 py-10 lg:border-b-0 ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i < 2 ? 'lg:pr-8' : ''}`}>
                  <h3 className="font-condensed font-heading text-3xl font-extrabold uppercase leading-none">{menu.name}</h3>
                  <p className="mt-3 font-mono text-xs uppercase tracking-18 text-accent">{menu.note}</p>
                  <ul className="mt-8 space-y-6">
                    {menu.items.map((item) => (
                      <li key={item.dish}>
                        <p className="font-heading text-lg font-bold leading-tight">{item.dish}</p>
                        <p className="mt-1 font-body text-sm text-ink/75">{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 03 Private dining */}
      <section className="border-b border-canvas/10">
        <div className="mx-auto grid max-w-screen-2xl lg:grid-cols-12">
          <div className="relative min-h-480px lg:col-span-7">
            <Image src={IMG.dining2} alt={t('privateDiningRoomAlt')} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          </div>
          <FadeUp className="px-5 py-16 lg:col-span-5 lg:px-10 lg:py-24">
            <SectionLabel index="03">{t('privateDiningLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-6xl">
              {t('libraryTableHeading')}
            </h2>
            <p className="mt-6 font-body text-base leading-body text-canvas/85">{t('libraryTableBody')}</p>
            <Link href="/contact" className={`mt-8 bg-accentfill text-onaccent hover:bg-canvas ${blockButton}`}>
              {t('enquirePrivateDining')} <span aria-hidden>→</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* 04 The chef */}
      {chef && (
        <section className="mx-auto max-w-screen-2xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <FadeUp className="lg:col-span-4">
              <div className="relative aspect-tall overflow-hidden bg-canvas/5">
                <Image src={String(chef.headshot)} alt={chef.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover grayscale" />
              </div>
            </FadeUp>
            <FadeUp delay={0.15} className="lg:col-span-7 lg:col-start-6">
              <SectionLabel index="04">{t('chefLabel')}</SectionLabel>
              <p className="mt-8 font-heading text-3xl font-semibold leading-tight text-canvas md:text-5xl">
                <span aria-hidden className="text-accentondark">“</span>
                {t('chefQuote')}
                <span aria-hidden className="text-accentondark">”</span>
              </p>
              <h2 className="font-condensed mt-10 font-heading text-4xl font-extrabold uppercase leading-none text-canvas">{chef.name}</h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-18 text-accentondark">{chef.role}</p>
              <p className="mt-6 max-w-2xl font-body text-base leading-body text-canvas/85">
                {chef.bio}
                {t('chefBioSuffix')}
              </p>
            </FadeUp>
          </div>
        </section>
      )}
    </>
  );
}
