'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from './Motion';
import { imgSrc } from '@/lib/image';
import { useLightbox } from '@/lib/ui/useLightbox';

/** Rounded photo grid with a full-screen lightbox on deep sea: prev/next,
 *  ESC and backdrop close (shared in lib/ui/useLightbox.ts). */
export default function GalleryLightbox({ images, alt }: { images: unknown[]; alt: string }) {
  const t = useTranslations('shared');
  const srcs = images.map((i) => imgSrc(i)).filter(Boolean);
  const { openIndex, open: setOpenIndex, next, prev } = useLightbox(srcs.length);

  if (!srcs.length) return null;
  const round =
    'flex size-12 items-center justify-center rounded-full bg-canvas/15 font-body text-xl text-canvas backdrop-blur-sm transition-colors hover:bg-canvas hover:text-primary';

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {srcs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden rounded-card bg-canvasalt ${i === 0 ? 'col-span-2 row-span-2 aspect-landscape' : 'aspect-landscape'}`}
            aria-label={t('galleryOpenPhoto', { n: i + 1, total: srcs.length })}
          >
            <Image
              src={src}
              alt={`${alt}, ${t('galleryPhotoSuffix', { n: i + 1 })}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-104"
            />
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
            transition={{ duration: 0.4 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t('galleryTitle')}
          >
            <button type="button" className={`absolute right-5 top-5 ${round}`} aria-label={t('galleryClose')}>
              ×
            </button>
            <button
              type="button"
              className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-8 ${round}`}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={t('galleryPrevious')}
            >
              ←
            </button>
            <div className="relative h-80vh w-full max-w-5xl overflow-hidden rounded-card" onClick={(e) => e.stopPropagation()}>
              <Image src={srcs[openIndex]} alt={`${alt}, ${t('galleryPhotoSuffix', { n: openIndex + 1 })}`} fill sizes="100vw" className="object-contain" />
            </div>
            <button
              type="button"
              className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 md:right-8 ${round}`}
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t('galleryNext')}
            >
              →
            </button>
            <p className="absolute bottom-6 rounded-ctrl bg-canvas/15 px-4 py-1.5 font-body text-sm text-canvas">
              {openIndex + 1} / {srcs.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
