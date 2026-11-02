'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from './Motion';
import { imgSrc } from '@/lib/image';
import { useLightbox } from '@/lib/ui/useLightbox';

/** Image grid with a full-screen lightbox: prev/next, ESC and backdrop close. */
export default function GalleryLightbox({ images, alt }: { images: unknown[]; alt: string }) {
  const t = useTranslations('shared');
  const srcs = images.map((i) => imgSrc(i)).filter(Boolean);
  const { openIndex, open: setOpenIndex, next, prev } = useLightbox(srcs.length);

  if (!srcs.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {srcs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden rounded-img bg-canvasalt ${i === 0 ? 'col-span-2 row-span-2 aspect-landscape' : 'aspect-landscape'}`}
            aria-label={t('galleryOpenPhoto', { n: i + 1, total: srcs.length })}
          >
            <Image
              src={src}
              alt={`${alt} — ${t('galleryPhotoSuffix', { n: i + 1 })}`}
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
            className="fixed inset-0 z-80 flex items-center justify-center bg-primary/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t('galleryTitle')}
          >
            <button type="button" className="absolute right-6 top-6 font-body text-3xl text-canvas/70 hover:text-canvas" aria-label={t('galleryClose')}>
              ×
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 font-body text-2xl text-canvas/70 hover:text-canvas md:left-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={t('galleryPrevious')}
            >
              ←
            </button>
            <div className="relative h-80vh w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={srcs[openIndex]} alt={`${alt} — ${t('galleryPhotoSuffix', { n: openIndex + 1 })}`} fill sizes="100vw" className="object-contain" />
            </div>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 font-body text-2xl text-canvas/70 hover:text-canvas md:right-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={t('galleryNext')}
            >
              →
            </button>
            <p className="absolute bottom-6 font-body text-xs uppercase tracking-25 text-canvas/60">
              {openIndex + 1} / {srcs.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
