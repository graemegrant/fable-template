import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';
import { IMG, menus, team } from '@/lib/data';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata: Metadata = {
  title: 'Dining',
  description: `The dining room at ${hotelConfig.name}: estate cooking by head chef Calum Ross — the river, the hill and the walled garden, in season and in order.`,
};

const chef = team.find((t) => t.role === 'Head Chef');

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="The dining room"
        title="Cooking that answers to the glen"
        subtitle="One dining room, thirty covers, a kitchen fed by the river, the hill and a walled garden planted in 1847."
        image={IMG.dining1}
        tall
      />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <FadeUp>
            <SectionLabel>The philosophy</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">
              Nothing arrives by motorway if it can walk from the garden.
            </h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              The menu is written daily, in pencil, after the kitchen has spoken to the gardener,
              the ghillie and the weather. Venison from the hill, salmon when the river allows,
              vegetables that were soil-side at dawn. The wine cellar leans old-world; the whisky
              shelf leans local; the portions lean generous.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="relative aspect-portrait">
              <Image src={IMG.food1} alt="A dish from the tasting menu" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Menus */}
      <section className="bg-warmgrey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp>
            <SectionLabel>The menus</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium text-ink md:text-5xl">What the day allows</h2>
            <p className="mt-5 max-w-xl font-body text-sm font-light leading-relaxed text-ink/70">
              Sample menus — the kitchen rewrites them daily, and the glen has final approval.
            </p>
          </FadeUp>
          <StaggerGrid className="mt-14 grid gap-10 lg:grid-cols-3">
            {menus.map((menu) => (
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
            <div className="relative aspect-landscape">
              <Image src={IMG.dining2} alt="The private dining room" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <SectionLabel>Private dining</SectionLabel>
            <h2 className="mt-5 font-heading text-4xl font-medium leading-tight text-ink md:text-5xl">The Library Table</h2>
            <p className="mt-6 font-body text-base font-light leading-body text-ink/80">
              Twelve seats, one long oak table, and the library fire at your back. The room takes
              birthdays, board awaydays and proposals with equal discretion — the kitchen will
              build a menu around the occasion, and the sommelier will overdeliver. Bookable for
              lunch or dinner, residents and non-residents alike.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-block rounded-ctrl border border-forest px-8 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment"
            >
              Enquire about private dining
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
                <div className="relative aspect-tall">
                  <Image src={String(chef.headshot)} alt={chef.name} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <SectionLabel variant="parchment">The chef</SectionLabel>
                <h2 className="mt-5 font-heading text-4xl font-medium text-parchment md:text-5xl">{chef.name}</h2>
                <p className="mt-2 font-body text-2xs uppercase tracking-25 text-gold">{chef.role}</p>
                <p className="mt-6 max-w-2xl font-body text-base font-light leading-body text-parchment/80">
                  {chef.bio} His tasting menu — six courses, whole table, no theatrics — has become
                  the quiet reason a number of guests time their stays around dinner.
                </p>
                <p className="mt-8 font-heading text-2xl font-medium italic text-parchment/90">
                  “I don’t have a style. I have a postcode.”
                </p>
              </FadeUp>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
