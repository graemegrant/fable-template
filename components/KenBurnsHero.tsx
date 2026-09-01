'use client';

import Image from 'next/image';
import Link from 'next/link';
import { hotelConfig } from '@/hotel.config';
import { HeroEntrance } from './Motion';
import { BookButton } from './BookingModal';
import { imgSrc } from '@/lib/sanity';

/** Full-screen homepage hero with a slow Ken Burns drift and staged text entrance. */
export default function KenBurnsHero({ image }: { image: unknown }) {
  return (
    <section className="relative flex min-h-85vh items-center justify-center overflow-hidden bg-forest">
      <div className="animate-kenburns absolute inset-0">
        <Image
          src={imgSrc(image, 1920)}
          alt={`${hotelConfig.name}, ${hotelConfig.location.regionLabel}`}
          fill
          priority
          quality={68}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Independent scrim: contrast holds whether or not the photo loads */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(27,21,16,0.55) 0%, rgba(27,21,16,0.25) 40%, rgba(27,21,16,0.6) 100%)',
        }}
      />

      <div className="relative px-6 text-center">
        <HeroEntrance delay={0.2}>
          <p className="font-body text-2xs uppercase tracking-40 text-goldbright">
            {hotelConfig.seo.descriptor} · {hotelConfig.seo.locationLabel}
          </p>
        </HeroEntrance>
        <HeroEntrance delay={0.45}>
          <h1 className="mt-6 font-heading text-6xl font-medium leading-none text-parchment md:text-8xl">
            {hotelConfig.name}
          </h1>
        </HeroEntrance>
        <HeroEntrance delay={0.7}>
          <p className="mt-6 font-heading text-xl font-medium italic text-parchment/90 md:text-2xl">
            {hotelConfig.tagline}
          </p>
        </HeroEntrance>
        <HeroEntrance delay={0.95}>
          {/* One primary CTA (booking, solid) per AGENTS.md §5; rooms is the
              quieter secondary. */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookButton className="w-64 rounded-ctrl bg-gold px-8 py-4 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-parchment sm:w-auto">
              Check availability
            </BookButton>
            <Link
              href="/rooms"
              className="w-64 rounded-ctrl border border-parchment/60 px-8 py-4 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-parchment hover:text-forest sm:w-auto"
            >
              View the rooms
            </Link>
          </div>
        </HeroEntrance>
      </div>

      <HeroEntrance delay={1.4} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="h-14 w-px bg-parchment/40" aria-hidden />
      </HeroEntrance>
    </section>
  );
}
