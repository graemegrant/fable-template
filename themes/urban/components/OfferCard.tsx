import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SectionLabel from './SectionLabel';
import { imgSrc } from '@/lib/image';
import type { Offer } from '@/lib/types';

/** Two variants: `grid` (card) and `feature` (alternating split spread). */
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
  const tag = offer.tag && (
    <span className="absolute left-0 top-0 bg-accentfill px-3 py-2 font-mono text-xs uppercase tracking-18 text-onaccent">{offer.tag}</span>
  );

  if (variant === 'feature') {
    return (
      <article className="grid border-t border-canvas/15 pt-8 md:grid-cols-2 md:gap-12 lg:gap-20">
        <div className={`relative aspect-landscape overflow-hidden bg-canvas/5 ${flip ? 'md:order-2' : ''}`}>
          <Image src={imgSrc(offer.image)} alt={offer.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          {tag}
        </div>
        <div className="pt-8 md:pt-0">
          {offer.subtitle && <SectionLabel>{offer.subtitle}</SectionLabel>}
          <h2 className="font-condensed mt-5 font-heading text-5xl font-extrabold uppercase leading-none text-canvas md:text-6xl">{offer.title}</h2>
          <p className="mt-6 font-body text-base leading-relaxed text-canvas/80">{offer.description}</p>
          {offer.inclusions && (
            <ol className="mt-8 border-t border-canvas/15">
              {offer.inclusions.map((inc, i) => (
                <li key={inc} className="flex gap-4 border-b border-canvas/15 py-3 font-body text-sm text-canvas/90">
                  <span className="font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                  {inc}
                </li>
              ))}
            </ol>
          )}
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-14 items-center gap-6 bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas"
          >
            {t('enquireAboutOffer')} <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link href={`/offers#${offer.slug}`} className="group block h-full border border-canvas/15 transition-colors hover:border-canvas/40">
      <div className="relative aspect-landscape overflow-hidden bg-canvas/5">
        <Image
          src={imgSrc(offer.image, 1000)}
          alt={offer.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
        />
        {tag}
      </div>
      <div className="p-5">
        <h3 className="font-condensed font-heading text-2xl font-extrabold uppercase leading-none text-canvas">{offer.title}</h3>
        {offer.subtitle && <p className="mt-2 font-body text-sm text-canvas/80">{offer.subtitle}</p>}
        <span className="mt-5 inline-flex font-mono text-xs uppercase tracking-18 text-accentondark">{t('viewOffer')}</span>
      </div>
    </Link>
  );
}
