import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { voucherTypes, IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import { FadeUp, StaggerGrid, StaggerItem } from '../components/Motion';

/** GiftVouchers page, Coastal look. Data comes from lib/pages/giftVouchers.ts.
 *  Vouchers read as gift tags: photo, a gold price sticker, a pill button. */
export default async function GiftVouchersView({ locale }: { locale: Locale }) {
  const t = await getTranslations('giftVouchers');
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.loch} />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <FadeUp>
          <p className="mx-auto max-w-3xl text-center font-heading text-2xl leading-snug text-primary md:text-3xl">{t('intro')}</p>
        </FadeUp>

        <StaggerGrid className="mt-14 grid gap-6 lg:grid-cols-3">
          {voucherTypes.map((v, i) => (
            <StaggerItem key={i} className="h-full">
              <article className="shadow-sand flex h-full flex-col rounded-card bg-canvas p-3">
                <div className="relative aspect-landscape overflow-hidden rounded-img bg-canvasalt">
                  <Image src={v.image} alt={pickLocale(v.name, locale) ?? ''} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  <span className="shadow-sand absolute right-4 top-4 flex size-20 rotate-6 items-center justify-center rounded-full bg-accentfill p-2 text-center font-heading text-lg font-semibold leading-tight text-onaccent">
                    {v.price}
                  </span>
                </div>
                <div className="flex grow flex-col px-3 pb-3 pt-5">
                  <h2 className="font-heading text-2xl font-semibold text-primary">{pickLocale(v.name, locale)}</h2>
                  <p className="mt-3 grow font-body text-sm leading-relaxed text-ink/80">{pickLocale(v.description, locale)}</p>
                  <Link
                    href="/contact"
                    className="mt-6 flex min-h-12 items-center justify-center rounded-ctrl bg-primary px-7 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {t('purchaseThis')}
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp className="mx-auto mt-12 max-w-2xl rounded-card bg-accentondark/35 p-6 text-center">
          <p className="font-body text-base text-ink/85">
            {t('phonePrefix')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-semibold text-primary underline decoration-accent underline-offset-4">
              {hotelConfig.contact.phone}
            </a>{' '}
            {t('phoneSuffix')}
          </p>
        </FadeUp>
      </section>
    </>
  );
}
