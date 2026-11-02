'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, EASE } from './Motion';
import SectionLabel from './SectionLabel';
import type { Testimonial } from '@/lib/types';

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations('shared');
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;
  const current = testimonials[index];
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <SectionLabel variant="ondark" className="mb-10">{t('guestBookLabel')}</SectionLabel>
      <div className="min-h-260px sm:min-h-220px">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <blockquote className="font-heading text-2xl font-medium italic leading-relaxed text-canvas md:text-3xl">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-8 font-body text-2xs uppercase tracking-25 text-canvas/60">
              {current.guestName}
              {current.roomStayed && <> · {current.roomStayed}</>}
              {current.source && <> · {current.source}</>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-1 sm:gap-6">
        <button type="button" onClick={() => go(-1)} aria-label={t('testimonialPrev')}
          className="inline-flex size-11 shrink-0 items-center justify-center font-body text-sm tracking-widest text-canvas/60 transition-colors hover:text-accentondark">
          ←
        </button>
        <div className="flex">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t('testimonialDot', { count: i + 1 })}
              aria-current={i === index}
              className="inline-flex size-11 items-center justify-center"
            >
              <span className={`size-1.5 rounded-full transition-colors duration-300 ${i === index ? 'bg-accentondark' : 'bg-canvas/30'}`} aria-hidden />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label={t('testimonialNext')}
          className="inline-flex size-11 shrink-0 items-center justify-center font-body text-sm tracking-widest text-canvas/60 transition-colors hover:text-accentondark">
          →
        </button>
      </div>
    </div>
  );
}
