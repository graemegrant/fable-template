'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, EASE } from './Motion';
import SectionLabel from './SectionLabel';
import type { Testimonial } from '@/lib/types';

/** Guest quotes on a light background: an oversized soft quote mark, the
 *  quote in italic Fraunces, and round arrow buttons. */
export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations('shared');
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;
  const current = testimonials[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const arrow =
    'inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-canvas font-body text-lg text-primary shadow-sand transition-transform duration-300 hover:-translate-y-0.5';

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <SectionLabel variant="raised">{t('guestBookLabel')}</SectionLabel>
      <span aria-hidden className="mt-4 block font-heading text-8xl leading-none text-accent">“</span>
      <div className="min-h-260px sm:min-h-220px">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <blockquote className="font-heading text-2xl italic leading-relaxed text-primary md:text-3xl">{current.quote}</blockquote>
            <figcaption className="mt-7 font-body text-sm text-ink/80">
              <span className="font-semibold text-primary">{current.guestName}</span>
              {current.roomStayed && <> · {current.roomStayed}</>}
              {current.source && <> · {current.source}</>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 sm:gap-5">
        <button type="button" onClick={() => go(-1)} aria-label={t('testimonialPrev')} className={arrow}>
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
              <span
                aria-hidden
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-accent' : 'w-2 bg-primary/25'}`}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label={t('testimonialNext')} className={arrow}>
          →
        </button>
      </div>
    </div>
  );
}
