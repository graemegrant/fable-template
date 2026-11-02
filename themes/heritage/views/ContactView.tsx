import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { IMG } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';
import PageHero from '@look/components/PageHero';
import ContactForm from '@look/components/ContactForm';
import FaqAccordion from '@look/components/FaqAccordion';
import SectionLabel from '@look/components/SectionLabel';
import { FadeUp } from '@look/components/Motion';
import type { ContactData } from '@/lib/pages/contact';

/** Contact page, Heritage look. Data comes from lib/pages/contact.ts. */
export default async function ContactView({ locale, resolvedFaqs }: { locale: Locale } & ContactData) {
  const t = await getTranslations('contact');
  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        image={IMG.exterior}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-380">
          <FadeUp>
            <span id="enquiry" className="block scroll-mt-28" aria-hidden />
            <SectionLabel>{t('enquiryLabel')}</SectionLabel>
            <h2 className="mb-10 mt-5 font-heading text-4xl font-medium text-ink">{t('writeToUs')}</h2>
            <ContactForm />
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="rounded-card border border-ink/10 bg-canvasalt p-8">
              <SectionLabel>{t('directlyLabel')}</SectionLabel>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('telephone')}</dt>
                  <dd className="mt-1">
                    <a href={`tel:${hotelConfig.contact.phoneHref}`} className="inline-flex min-h-11 items-center font-heading text-xl font-medium text-primary">
                      {hotelConfig.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('email')}</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${hotelConfig.contact.email}`} className="inline-flex min-h-11 items-center break-all font-heading text-xl font-medium text-primary">
                      {hotelConfig.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('address')}</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink/80">
                    {hotelConfig.name}<br />
                    {hotelConfig.location.address}<br />
                    {pickLocale(hotelConfig.location.regionLabel, locale)}
                  </dd>
                  <dd className="mt-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        `${hotelConfig.name}, ${hotelConfig.location.address}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-body text-2xs uppercase tracking-20 text-accent transition-colors hover:text-primary"
                    >
                      {t('getDirections')}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/70">{t('receptionHours')}</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink/80">
                    {pickLocale(hotelConfig.reception.display, locale)}
                  </dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-canvasalt">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
          <FadeUp>
            <SectionLabel>{t('beforeYouAskLabel')}</SectionLabel>
            <h2 className="mb-10 mt-5 font-heading text-4xl font-medium text-ink">{t('questionsAnticipated')}</h2>
            <FaqAccordion items={resolvedFaqs} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
