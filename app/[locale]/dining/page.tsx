import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { IMG, menus, team } from '@/lib/data';
import { pickLocale, resolveTeamMember } from '@/lib/resolveLocale';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: `Dining & Restaurant in ${hotelConfig.location.locality}`,
    description: `The dining room at ${hotelConfig.name}, ${hotelConfig.location.locality}: estate cooking by head chef Calum Ross — the river, the hill and the walled garden, in season and in order.`,
    path: '/dining',
  });
}

// Chef lookup keys off the untranslated (English) role sub-field — a
// stable internal identifier, not the localized display text.
const rawChef = team.find((t) => t.role.en === 'Head Chef');

export default async function DiningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const chef = rawChef ? resolveTeamMember(rawChef, locale) : undefined;
  const resolvedMenus = menus.map((menu) => ({
    name: pickLocale(menu.name, locale) ?? '',
    note: pickLocale(menu.note, locale) ?? '',
    items: menu.items.map((item) => ({
      dish: pickLocale(item.dish, locale) ?? '',
      detail: pickLocale(item.detail, locale) ?? '',
    })),
  }));
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

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>{t('philosophyLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              {t('philosophyHeading')}
            </h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              {t('philosophyBody')}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-portrait overflow-hidden rounded-img">
              <Image src={IMG.food1} alt={t('tastingDishAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Menus */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp>
            <SectionLabel>{t('menusLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">{t('menusHeading')}</h2>
            <p className="mt-5 max-w-xl font-body text-sm font-light leading-relaxed text-ink/70">
              {t('menusIntro')}
            </p>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-10 lg:grid-cols-3">
            {resolvedMenus.map((menu) => (
              <StaggerItem key={menu.name}>
                <article className="h-full border border-ink/10 bg-parchment p-8">
                  <h3 className="font-heading text-2xl font-medium text-ink">{menu.name}</h3>
                  <p className="mt-2 font-body text-2xs uppercase tracking-20 text-gold">{menu.note}</p>
                  <ul className="mt-7 space-y-5 border-t border-ink/10 pt-7">
                    {menu.items.map((item) => (
                      <li key={item.dish}>
                        <p className="font-heading text-lg font-medium text-ink">{item.dish}</p>
                        <p className="mt-1 font-body text-sm font-light text-ink/65">{item.detail}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Private dining */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <div className="relative aspect-landscape overflow-hidden rounded-img">
              <Image src={IMG.dining2} alt={t('privateDiningRoomAlt')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <SectionLabel>{t('privateDiningLabel')}</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">{t('libraryTableHeading')}</h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              {t('libraryTableBody')}
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-ctrl border border-forest px-8 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment"
            >
              {t('enquirePrivateDining')}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Chef profile */}
      {chef && (
        <section className="bg-forest">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-360-1fr lg:gap-24">
              <FadeUp>
                <div className="relative aspect-tall overflow-hidden rounded-img">
                  <Image src={String(chef.headshot)} alt={chef.name} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <SectionLabel variant="parchment">{t('chefLabel')}</SectionLabel>
                <h2 className="mt-5 font-heading text-4xl font-medium text-parchment md:text-5xl">{chef.name}</h2>
                <p className="mt-2 font-body text-2xs uppercase tracking-25 text-gold">{chef.role}</p>
                <p className="mt-6 max-w-2xl font-body text-base font-light leading-body text-parchment/80">
                  {chef.bio}{t('chefBioSuffix')}
                </p>
                <p className="mt-8 font-heading text-2xl font-medium italic text-parchment/90">
                  “{t('chefQuote')}”
                </p>
              </FadeUp>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
