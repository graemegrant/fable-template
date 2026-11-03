import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { voucherTypes, IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';

/** GiftVouchers page, Urban look. Data comes from lib/pages/giftVouchers.ts.
 *  Vouchers read as tickets: a photo, the price in display type, a block button. */
export default async function GiftVouchersView({ locale }: { locale: Locale }) {
  const t = await getTranslations('giftVouchers');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.loch} />

      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <FadeUp className="grid gap-8 border-b border-canvas/15 pb-12 lg:grid-cols-12">
          <SectionLabel index="01" className="lg:col-span-3">
            {t('eyebrow')}
          </SectionLabel>
          <p className="font-body text-xl leading-snug text-canvas md:text-2xl lg:col-span-8">{t('intro')}</p>
        </FadeUp>

        <StaggerGrid className="mt-12 grid gap-6 lg:grid-cols-3">
          {voucherTypes.map((v, i) => (
            <StaggerItem key={i} className="h-full">
              <article className="flex h-full flex-col border border-canvas/20">
                <div className="relative aspect-landscape overflow-hidden bg-canvas/5">
                  <Image src={v.image} alt={pickLocale(v.name, locale) ?? ''} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  <span className="absolute left-0 top-0 bg-primary px-3 py-2 font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="flex grow flex-col p-6">
                  <p className="font-condensed font-heading text-5xl font-extrabold uppercase leading-none text-accentondark">{v.price}</p>
                  <h2 className="mt-4 font-heading text-xl font-bold uppercase leading-tight text-canvas">{pickLocale(v.name, locale)}</h2>
                  <p className="mt-3 grow font-body text-sm leading-relaxed text-canvas/80">{pickLocale(v.description, locale)}</p>
                </div>
                <Link
                  href="/contact"
                  className="flex min-h-14 items-center justify-between border-t border-canvas/20 px-6 font-mono text-sm uppercase tracking-18 text-canvas transition-colors hover:bg-accentfill hover:text-onaccent"
                >
                  {t('purchaseThis')} <span aria-hidden>→</span>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp className="mt-12 border-t border-canvas/15 pt-8">
          <p className="font-body text-base text-canvas/85">
            {t('phonePrefix')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-mono text-canvas underline decoration-accentondark underline-offset-4">
              {hotelConfig.contact.phone}
            </a>{' '}
            {t('phoneSuffix')}
          </p>
        </FadeUp>
      </section>
    </>
  );
}
