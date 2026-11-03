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

/** Dining page, Coastal look. Data comes from lib/pages/dining.ts. */
export default async function DiningView({ chef, resolvedMenus }: { locale: Locale } & DiningData) {
  const t = await getTranslations('dining');
  return (
    <>
      <PageHero
        eyebrow={`${t('diningRoomLabel')} · ${hotelConfig.location.locality}`}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.dining1}
        tall
      />

      {/* Philosophy: words beside a rounded photo with a second dish tucked over it */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <SectionLabel>{t('philosophyLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('philosophyHeading')}</h2>
            <p className="mt-6 font-body text-lg leading-body text-ink/80">{t('philosophyBody')}</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative pb-14 pl-10 sm:pl-16">
              <div className="relative aspect-portrait overflow-hidden rounded-card">
                <Image src={IMG.food1} alt={t('tastingDishAlt')} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
              </div>
              <div className="shadow-sand absolute bottom-0 left-0 w-2/5 -rotate-3 rounded-card bg-canvas p-2">
                <div className="relative aspect-square overflow-hidden rounded-img">
                  <Image src={IMG.food2} alt="" fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Menus on sand, between two waves */}
      <div aria-hidden className="wave text-canvasalt" />
      <section className="bg-canvasalt">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 lg:px-10 lg:pb-16">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <SectionLabel>{t('menusLabel')}</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-semibold leading-heading text-primary md:text-5xl">{t('menusHeading')}</h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/80">{t('menusIntro')}</p>
          </FadeUp>
          <StaggerGrid className="mt-12 grid gap-5 lg:grid-cols-3">
            {resolvedMenus.map((menu) => (
              <StaggerItem key={menu.name} className="h-full">
                <article className="shadow-sand h-full rounded-card bg-canvas p-7 sm:p-8">
                  <h3 className="font-heading text-2xl font-semibold text-primary">{menu.name}</h3>
                  <p className="mt-2 inline-flex rounded-ctrl bg-accentondark/35 px-3 py-1 font-body text-sm font-medium text-accent">{menu.note}</p>
                  <ul className="mt-6 space-y-4">
                    {menu.items.map((item) => (
                      <li key={item.dish} className="rounded-img bg-canvasalt px-5 py-4">
                        <p className="font-heading text-lg font-semibold text-primary">{item.dish}</p>
                        <p className="mt-1 font-body text-sm text-ink/80">{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
      <div aria-hidden className="wave wave-flip text-canvasalt" />

      {/* Private dining: photo with the words on a card laid over it */}
      <section className="px-3 py-16 sm:px-5 lg:py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative aspect-landscape overflow-hidden rounded-card md:aspect-video">
            <Image src={IMG.dining2} alt={t('privateDiningRoomAlt')} fill sizes="100vw" className="object-cover" />
          </div>
          <FadeUp className="shadow-sand relative mx-3 -mt-20 rounded-card bg-canvas p-7 sm:mx-8 sm:p-10 md:absolute md:bottom-8 md:right-8 md:mx-0 md:mt-0 md:max-w-md">
            <SectionLabel>{t('privateDiningLabel')}</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-heading text-primary md:text-4xl">{t('libraryTableHeading')}</h2>
            <p className="mt-4 font-body text-base leading-body text-ink/80">{t('libraryTableBody')}</p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center rounded-ctrl bg-primary px-7 py-3 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t('enquirePrivateDining')}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Chef: a deep-sea panel with a round portrait */}
      {chef && (
        <section className="px-3 pb-10 sm:px-5">
          <FadeUp className="mx-auto max-w-7xl rounded-card bg-primarydeep px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-360-1fr lg:gap-16">
              <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full ring-8 ring-canvas/10 sm:w-72 lg:w-full">
                <Image src={String(chef.headshot)} alt={chef.name} fill sizes="(min-width: 1024px) 360px, 288px" className="object-cover" />
              </div>
              <div>
                <SectionLabel>{t('chefLabel')}</SectionLabel>
                <h2 className="mt-4 font-heading text-4xl font-semibold text-canvas md:text-5xl">{chef.name}</h2>
                <p className="mt-2 font-body text-base font-medium text-accentondark">{chef.role}</p>
                <p className="mt-5 max-w-2xl font-body text-base leading-body text-canvas/85">
                  {chef.bio}
                  {t('chefBioSuffix')}
                </p>
                <p className="mt-7 font-heading text-2xl italic text-canvas">“{t('chefQuote')}”</p>
              </div>
            </div>
          </FadeUp>
        </section>
      )}
    </>
  );
}
