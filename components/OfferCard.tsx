import Image from 'next/image';
import Link from 'next/link';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/sanity';
import type { Offer } from '@/lib/types';

/** Two variants: `grid` (card) and `feature` (alternating split layout). */
export default function OfferCard({
  offer,
  variant = 'grid',
  flip = false,
}: {
  offer: Offer;
  variant?: 'grid' | 'feature';
  flip?: boolean;
}) {
  if (variant === 'feature') {
    return (
      <article className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-img bg-warmgrey ${flip ? 'md:order-2' : ''}`}>
          <Image
            src={imgSrc(offer.image)}
            alt={offer.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          {offer.tag && (
            <span className="absolute left-0 top-6 bg-gold px-4 py-2 font-body text-[10px] uppercase tracking-[0.25em] text-forest">
              {offer.tag}
            </span>
          )}
        </div>
        <div>
          <SectionLabel>{offer.subtitle}</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-medium text-ink md:text-4xl">{offer.title}</h2>
          <p className="mt-5 font-body text-sm font-light leading-relaxed text-ink/75">{offer.description}</p>
          {offer.inclusions && (
            <ul className="mt-7 space-y-2.5 border-t border-ink/10 pt-7">
              {offer.inclusions.map((inc) => (
                <li key={inc} className="flex gap-3 font-body text-sm text-ink/80">
                  <span className="mt-[7px] h-px w-5 shrink-0 bg-gold" aria-hidden />
                  {inc}
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/contact"
            className="mt-9 inline-block rounded-ctrl border border-forest px-8 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment"
          >
            Enquire about this offer
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link href={`/offers#${offer.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-img bg-warmgrey">
        <Image
          src={imgSrc(offer.image, 1000)}
          alt={offer.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
        />
        {offer.tag && (
          <span className="absolute left-0 top-6 bg-gold px-4 py-2 font-body text-[10px] uppercase tracking-[0.25em] text-forest">
            {offer.tag}
          </span>
        )}
      </div>
      <div className="pt-6">
        <h3 className="font-heading text-2xl font-medium text-ink">{offer.title}</h3>
        <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-ink/60">{offer.subtitle}</p>
        <span className="mt-4 inline-block font-body text-[11px] uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-forest">
          View offer →
        </span>
      </div>
    </Link>
  );
}
