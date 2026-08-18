import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';
import { voucherTypes, IMG } from '@/lib/data';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Gift Vouchers',
  description: `Gift vouchers for ${hotelConfig.name} — stays, dinners and open amounts, posted properly or delivered by email.`,
};

export default function GiftVouchersPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift vouchers"
        title="Give someone the glen"
        subtitle="Posted in proper envelopes with wax we take slightly too seriously, or emailed within the hour."
        image={IMG.loch}
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-[1.9] text-ink/80">
            All vouchers are valid for eighteen months, exchangeable against anything the house
            does, and transferable — generosity should not come with small print. Order by phone,
            email or the enquiry form, and we will arrange payment and delivery the same day.
          </p>
        </FadeUp>

        <StaggerGrid className="mt-16 grid gap-10 lg:grid-cols-3">
          {voucherTypes.map((v) => (
            <StaggerItem key={v.name}>
              <article className="flex h-full flex-col border border-ink/10">
                <div className="relative aspect-[4/3] overflow-hidden bg-warmgrey">
                  <Image src={v.image} alt={v.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="flex grow flex-col p-8">
                  <SectionLabel>{v.price}</SectionLabel>
                  <h3 className="mt-3 font-heading text-2xl font-medium text-ink">{v.name}</h3>
                  <p className="mt-4 grow font-body text-sm font-light leading-relaxed text-ink/75">{v.description}</p>
                  <Link
                    href="/contact"
                    className="mt-8 block rounded-ctrl bg-forest px-8 py-4 text-center font-body text-[11px] uppercase tracking-[0.25em] text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest"
                  >
                    Purchase this voucher
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp className="mt-16 border-t border-ink/10 pt-10 text-center">
          <p className="font-body text-sm text-ink/70">
            Prefer to order by phone? Call{' '}
            <a href={`tel:${hotelConfig.contact.phone.replace(/[^+\d]/g, '')}`} className="text-forest underline decoration-gold underline-offset-4">
              {hotelConfig.contact.phone}
            </a>{' '}
            — vouchers ordered before 2pm catch the day’s post.
          </p>
        </FadeUp>
      </section>
    </>
  );
}
