'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from './Motion';
import { imgSrc } from '@/lib/sanity';

/** Image grid with a full-screen lightbox: prev/next, ESC and backdrop close. */
export default function GalleryLightbox({ images, alt }: { images: unknown[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const srcs = images.map((i) => imgSrc(i)).filter(Boolean);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? null : (i + 1) % srcs.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? null : (i - 1 + srcs.length) % srcs.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, srcs.length]);

  if (!srcs.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {srcs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden bg-warmgrey ${i === 0 ? 'col-span-2 row-span-2 aspect-landscape' : 'aspect-landscape'}`}
            aria-label={`Open photo ${i + 1} of ${srcs.length}`}
          >
            <Image
              src={src}
              alt={`${alt} — photo ${i + 1}`}
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
            className="fixed inset-0 z-80 flex items-center justify-center bg-forest/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpenIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery"
          >
            <button type="button" className="absolute right-6 top-6 font-body text-3xl text-parchment/70 hover:text-parchment" aria-label="Close gallery">
              ×
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 font-body text-2xl text-parchment/70 hover:text-parchment md:left-10"
              onClick={(e) => { e.stopPropagation(); setOpenIndex((openIndex - 1 + srcs.length) % srcs.length); }}
              aria-label="Previous photo"
            >
              ←
            </button>
            <div className="relative h-80vh w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={srcs[openIndex]} alt={`${alt} — photo ${openIndex + 1}`} fill sizes="100vw" className="object-contain" />
            </div>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 font-body text-2xl text-parchment/70 hover:text-parchment md:right-10"
              onClick={(e) => { e.stopPropagation(); setOpenIndex((openIndex + 1) % srcs.length); }}
              aria-label="Next photo"
            >
              →
            </button>
            <p className="absolute bottom-6 font-body text-xs uppercase tracking-25 text-parchment/60">
              {openIndex + 1} / {srcs.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
