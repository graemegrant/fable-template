import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import FaqAccordion from '../components/FaqAccordion';
import SectionLabel from '../components/SectionLabel';
import { FadeUp } from '../components/Motion';
import type { ContactData } from '@/lib/pages/contact';

/** Contact page, Coastal look. Data comes from lib/pages/contact.ts. */
export default async function ContactView({ locale, resolvedFaqs }: { locale: Locale } & ContactData) {
  const t = await getTranslations('contact');
  const term = 'font-body text-sm text-accentondark';
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.exterior} />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-1fr-380 lg:gap-14">
          <FadeUp className="rounded-card bg-canvasalt p-6 sm:p-10">
            <span id="enquiry" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{t('enquiryLabel')}</SectionLabel>
            <h2 className="mb-8 mt-4 font-heading text-4xl font-semibold leading-heading text-primary">{t('writeToUs')}</h2>
            <ContactForm />
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="shadow-sand rounded-card bg-primarydeep p-7 text-canvas lg:sticky lg:top-28">
              <SectionLabel>{t('directlyLabel')}</SectionLabel>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className={term}>{t('telephone')}</dt>
                  <dd>
                    <a href={`tel:${hotelConfig.contact.phoneHref}`} className="inline-flex min-h-11 items-center font-heading text-2xl font-semibold">
                      {hotelConfig.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={term}>{t('email')}</dt>
                  <dd>
                    <a href={`mailto:${hotelConfig.contact.email}`} className="inline-flex min-h-11 items-center break-all font-heading text-lg font-semibold sm:text-xl">
                      {hotelConfig.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={term}>{t('address')}</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-canvas/85">
                    {hotelConfig.name}
                    <br />
                    {hotelConfig.location.address}
                    <br />
                    {pickLocale(hotelConfig.location.regionLabel, locale)}
                  </dd>
                  <dd className="mt-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${hotelConfig.name}, ${hotelConfig.location.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-ctrl bg-canvas/10 px-4 font-body text-sm font-semibold text-canvas transition-colors hover:bg-canvas/20"
                    >
                      {t('getDirections')}
                    </a>
                  </dd>
                </div>
                <div className="rounded-img bg-canvas/10 px-4 py-3">
                  <dt className={term}>{t('receptionHours')}</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-canvas">{pickLocale(hotelConfig.reception.display, locale)}</dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 lg:pb-28">
        <FadeUp>
          <div className="text-center">
            <SectionLabel>{t('beforeYouAskLabel')}</SectionLabel>
            <h2 className="mb-10 mt-4 font-heading text-4xl font-semibold leading-heading text-primary">{t('questionsAnticipated')}</h2>
          </div>
          <FaqAccordion items={resolvedFaqs} />
        </FadeUp>
      </section>
    </>
  );
}
