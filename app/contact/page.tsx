import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { faqs, IMG } from '@/lib/data';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import FaqAccordion from '@/components/FaqAccordion';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp } from '@/components/Motion';

export const metadata = pageMetadata({
  title: 'Contact & Directions',
  description: `Contact ${hotelConfig.name} in ${hotelConfig.location.locality} — enquiries answered by a person within one working day. Phone, email, or the form, whichever suits.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the house"
        subtitle="A person answers. Usually Isla. Always within one working day."
        image={IMG.exterior}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-1fr-380">
          <FadeUp>
            <SectionLabel>Your enquiry</SectionLabel>
            <h2 className="mb-10 mt-5 font-heading text-4xl font-medium text-ink">Write to us</h2>
            <ContactForm />
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="border border-ink/10 bg-warmgrey p-8">
              <SectionLabel>Directly</SectionLabel>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Telephone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-heading text-xl font-medium text-forest">
                      {hotelConfig.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${hotelConfig.contact.email}`} className="font-heading text-xl font-medium text-forest">
                      {hotelConfig.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Address</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink/80">
                    {hotelConfig.name}<br />
                    {hotelConfig.location.address}<br />
                    {hotelConfig.location.regionLabel}
                  </dd>
                  <dd className="mt-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        `${hotelConfig.name}, ${hotelConfig.location.address}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-2xs uppercase tracking-20 text-gold transition-colors hover:text-forest"
                    >
                      Get directions →
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-2xs uppercase tracking-20 text-ink/50">Reception hours</dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink/80">
                    {hotelConfig.reception.display}
                  </dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-warmgrey">
        <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
          <FadeUp>
            <SectionLabel>Before you ask</SectionLabel>
            <h2 className="mb-10 mt-5 font-heading text-4xl font-medium text-ink">Questions, anticipated</h2>
            <FaqAccordion items={faqs} />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
