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
    <span className="absolute left-3 top-3 rounded-ctrl bg-accentfill px-4 py-2 font-mono text-xs uppercase tracking-18 text-onaccent">{offer.tag}</span>
  );

  if (variant === 'feature') {
    return (
      <article className="glass grid rounded-card p-2 md:grid-cols-2 md:gap-4 lg:gap-8">
        <div className={`relative aspect-landscape overflow-hidden rounded-img bg-canvas/5 ${flip ? 'md:order-2' : ''}`}>
          <Image src={imgSrc(offer.image)} alt={offer.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          {tag}
        </div>
        <div className="px-4 pb-6 pt-8 md:p-8">
          {offer.subtitle && <SectionLabel>{offer.subtitle}</SectionLabel>}
          <h2 className="mt-5 font-heading text-5xl font-normal leading-none text-canvas md:text-6xl">{offer.title}</h2>
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
            className="mt-8 inline-flex min-h-14 items-center gap-6 rounded-ctrl bg-accentfill px-7 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas"
          >
            {t('enquireAboutOffer')} <span aria-hidden>→</span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link href={`/offers#${offer.slug}`} data-cursor className="glass group block h-full rounded-card p-2 transition-transform duration-500 ease-out-expo hover:-translate-y-1">
      <div className="relative aspect-landscape overflow-hidden rounded-img bg-canvas/5">
        <Image
          src={imgSrc(offer.image, 1000)}
          alt={offer.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
        />
        {tag}
      </div>
      <div className="px-4 pb-4 pt-5">
        <h3 className="font-heading text-2xl font-normal leading-none text-canvas">{offer.title}</h3>
        {offer.subtitle && <p className="mt-2 font-body text-sm text-canvas/80">{offer.subtitle}</p>}
        <span className="mt-5 inline-flex font-mono text-xs uppercase tracking-18 text-accentondark">{t('viewOffer')}</span>
      </div>
    </Link>
  );
}
