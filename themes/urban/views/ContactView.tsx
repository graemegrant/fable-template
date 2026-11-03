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

/** Contact page, Urban look. Data comes from lib/pages/contact.ts. */
export default async function ContactView({ locale, resolvedFaqs }: { locale: Locale } & ContactData) {
  const t = await getTranslations('contact');
  const term = 'font-mono text-xs uppercase tracking-18 text-canvas/70';
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.exterior} />

      <section className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <span id="enquiry" className="block scroll-mt-24" aria-hidden />
            <SectionLabel index="01">{t('enquiryLabel')}</SectionLabel>
            <h2 className="font-condensed mb-10 mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-7xl">{t('writeToUs')}</h2>
            <ContactForm />
          </FadeUp>

          <FadeUp delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="border border-canvas/20 lg:sticky lg:top-24">
              <p className="border-b border-canvas/15 px-6 py-4 font-mono text-xs uppercase tracking-18 text-accentondark">/ {t('directlyLabel')}</p>
              <dl>
                <div className="border-b border-canvas/15 px-6 py-5">
                  <dt className={term}>{t('telephone')}</dt>
                  <dd>
                    <a href={`tel:${hotelConfig.contact.phoneHref}`} className="inline-flex min-h-11 items-center font-mono text-lg text-canvas hover:text-accentondark">
                      {hotelConfig.contact.phone}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-canvas/15 px-6 py-5">
                  <dt className={term}>{t('email')}</dt>
                  <dd>
                    <a href={`mailto:${hotelConfig.contact.email}`} className="inline-flex min-h-11 items-center break-all font-mono text-base text-canvas hover:text-accentondark">
                      {hotelConfig.contact.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-canvas/15 px-6 py-5">
                  <dt className={term}>{t('address')}</dt>
                  <dd className="mt-2 font-body text-sm leading-relaxed text-canvas">
                    {hotelConfig.name}
                    <br />
                    {hotelConfig.location.address}
                    <br />
                    {pickLocale(hotelConfig.location.regionLabel, locale)}
                  </dd>
                  <dd className="mt-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${hotelConfig.name}, ${hotelConfig.location.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-18 text-accentondark hover:text-canvas"
                    >
                      {t('getDirections')}
                    </a>
                  </dd>
                </div>
                <div className="px-6 py-5">
                  <dt className={term}>{t('receptionHours')}</dt>
                  <dd className="mt-2 font-body text-sm leading-relaxed text-canvas">{pickLocale(hotelConfig.reception.display, locale)}</dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="border-t border-canvas/10">
        <div className="mx-auto grid max-w-screen-2xl gap-10 px-5 py-20 lg:grid-cols-12 lg:px-8 lg:py-28">
          <FadeUp className="lg:col-span-4">
            <SectionLabel index="02">{t('beforeYouAskLabel')}</SectionLabel>
            <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-6xl">{t('questionsAnticipated')}</h2>
          </FadeUp>
          <FadeUp delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={resolvedFaqs} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
