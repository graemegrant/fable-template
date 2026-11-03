'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from './Motion';
import { imgSrc } from '@/lib/image';
import { useLightbox } from '@/lib/ui/useLightbox';

/** Square-cut photo grid with mono plate numbers, and a full-screen
 *  lightbox: prev/next, ESC and backdrop close (lib/ui/useLightbox.ts). */
export default function GalleryLightbox({ images, alt }: { images: unknown[]; alt: string }) {
  const t = useTranslations('shared');
  const srcs = images.map((i) => imgSrc(i)).filter(Boolean);
  const { openIndex, open: setOpenIndex, next, prev } = useLightbox(srcs.length);

  if (!srcs.length) return null;
  const square =
    'flex size-14 items-center justify-center border border-canvas/30 bg-primarydeep font-mono text-lg text-canvas transition-colors hover:border-accentondark hover:text-accentondark';
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {srcs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden bg-canvas/5 ${i === 0 ? 'col-span-2 row-span-2 aspect-landscape' : 'aspect-landscape'}`}
            aria-label={t('galleryOpenPhoto', { n: i + 1, total: srcs.length })}
          >
            <Image
              src={src}
              alt={`${alt}, ${t('galleryPhotoSuffix', { n: i + 1 })}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-104"
            />
            <span className="absolute bottom-0 left-0 bg-primary px-2 py-1 font-mono text-xs text-canvas">{pad(i + 1)}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center bg-primarydeep/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t('galleryTitle')}
          >
            <button type="button" className={`absolute right-0 top-0 ${square}`} aria-label={t('galleryClose')}>
              ×
            </button>
            <button
              type="button"
              className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 ${square}`}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={t('galleryPrevious')}
            >
              ←
            </button>
            <div className="relative h-80vh w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={srcs[openIndex]} alt={`${alt}, ${t('galleryPhotoSuffix', { n: openIndex + 1 })}`} fill sizes="100vw" className="object-contain" />
            </div>
            <button
              type="button"
              className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 ${square}`}
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t('galleryNext')}
            >
              →
            </button>
            <p className="absolute bottom-6 font-mono text-sm text-canvas">
              {pad(openIndex + 1)} <span className="text-canvas/60">/ {pad(srcs.length)}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
