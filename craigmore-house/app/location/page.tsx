import type { Metadata } from 'next';
import { hotelConfig } from '@/hotel.config';
import { directions, attractions, IMG } from '@/lib/data';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Location & Directions',
  description: `Finding ${hotelConfig.name}: directions by road, rail and air, and what to see in Highland Perthshire once you arrive.`,
};

const mapSrc = `https://www.google.com/maps?q=${hotelConfig.location.lat},${hotelConfig.location.lng}&z=11&output=embed`;

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="Finding us"
        title="End of the road, start of the glen"
        subtitle={`${hotelConfig.location.address} — ninety minutes from Edinburgh, four miles from the nearest reason to hurry.`}
        image={IMG.glen}
      />

      {/* Directions grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <SectionLabel>Getting here</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Four ways in</h2>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-10 sm:grid-cols-2">
          {directions.map((d) => (
            <StaggerItem key={d.mode}>
              <article className="h-full border-t border-gold/60 pt-6">
                <h3 className="font-heading text-2xl font-medium text-ink">{d.mode}</h3>
                <p className="mt-3 font-body text-sm font-light leading-[1.8] text-ink/75">{d.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Map embed slot */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp>
            <SectionLabel>The map</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink">Where the glen narrows</h2>
            <div className="mt-10 aspect-[16/9] w-full border border-ink/10 bg-parchment">
              <iframe
                src={mapSrc}
                title={`Map showing ${hotelConfig.name}`}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-4 font-body text-xs text-ink/60">
              Postcode for satnavs: {hotelConfig.location.address.split(',').pop()?.trim()} — then follow the stone herons, not the satnav’s despair.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Nearby attractions */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <SectionLabel>Beyond the estate</SectionLabel>
          <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">Worth leaving the fire for</h2>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a) => (
            <StaggerItem key={a.name}>
              <article className="border-t border-ink/10 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-xl font-medium text-ink">{a.name}</h3>
                  <span className="shrink-0 font-body text-[11px] uppercase tracking-[0.2em] text-gold">{a.distance}</span>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink/75">{a.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>
    </>
  );
}
