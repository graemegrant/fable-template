import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/image';
import type { Offer } from '@/lib/types';

/** A round gold sticker for the offer tag, slightly tilted. */
function Sticker({ children }: { children: React.ReactNode }) {
  return (
    <span className="shadow-sand absolute right-4 top-4 flex size-20 rotate-6 items-center justify-center rounded-full bg-accentfill p-2 text-center font-body text-xs font-semibold leading-tight text-onaccent">
      {children}
    </span>
  );
}

/** Two variants: `grid` (card) and `feature` (alternating split panel). */
export default async function OfferCard({
  offer,
  variant = 'grid',
  flip = false,
}: {
  offer: Offer;
  variant?: 'grid' | 'feature';
  flip?: boolean;
}) {
  const t = await getTranslations('shared');
  if (variant === 'feature') {
    return (
      <article className="shadow-sand grid items-center gap-8 rounded-card bg-canvas p-3 md:grid-cols-2 lg:gap-14">
        <div className={`relative aspect-landscape overflow-hidden rounded-img bg-canvasalt ${flip ? 'md:order-2' : ''}`}>
          <Image src={imgSrc(offer.image)} alt={offer.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          {offer.tag && <Sticker>{offer.tag}</Sticker>}
        </div>
        <div className="px-4 pb-6 md:px-6 md:py-8">
          <SectionLabel>{offer.subtitle}</SectionLabel>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-heading text-primary md:text-4xl">{offer.title}</h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink/80">{offer.description}</p>
          {offer.inclusions && (
            <ul className="mt-6 space-y-3">
              {offer.inclusions.map((inc) => (
                <li key={inc} className="flex items-start gap-3 font-body text-sm text-ink/85">
                  <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accentondark/50 text-xs text-primary">✓</span>
                  {inc}
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center rounded-ctrl bg-primary px-7 py-3 font-body text-sm font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t('enquireAboutOffer')}
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link href={`/offers#${offer.slug}`} className="shadow-sand group block h-full rounded-card bg-canvas p-3 transition-transform duration-500 ease-out-expo hover:-translate-y-1">
      <div className="relative aspect-landscape overflow-hidden rounded-img bg-canvasalt">
        <Image
          src={imgSrc(offer.image, 1000)}
          alt={offer.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
        />
        {offer.tag && <Sticker>{offer.tag}</Sticker>}
      </div>
      <div className="px-3 pb-3 pt-5">
        <h3 className="font-heading text-2xl font-semibold text-primary">{offer.title}</h3>
        <p className="mt-1.5 font-body text-sm text-ink/80">{offer.subtitle}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-accent transition-colors group-hover:text-primary">
          {t('viewOffer')}
        </span>
      </div>
    </Link>
  );
}
