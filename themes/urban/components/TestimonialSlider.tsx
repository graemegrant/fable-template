'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, EASE } from './Motion';
import SectionLabel from './SectionLabel';
import type { Testimonial } from '@/lib/types';

/** Guest quotes set large like a magazine pull quote, with a mono
 *  "01 / 05" counter and square arrow buttons. */
export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations('shared');
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;
  const current = testimonials[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  const pad = (n: number) => String(n).padStart(2, '0');
  const arrow =
    'inline-flex size-12 shrink-0 items-center justify-center border border-canvas/30 font-mono text-lg text-canvas transition-colors hover:border-accentondark hover:text-accentondark';

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="flex flex-col justify-between gap-8 lg:col-span-3">
        <SectionLabel>{t('guestBookLabel')}</SectionLabel>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label={t('testimonialPrev')} className={arrow}>
            ←
          </button>
          <p className="font-mono text-sm text-canvas" aria-live="polite">
            {pad(index + 1)} <span className="text-canvas/60">/ {pad(testimonials.length)}</span>
          </p>
          <button type="button" onClick={() => go(1)} aria-label={t('testimonialNext')} className={arrow}>
            →
          </button>
        </div>
      </div>
      <div className="min-h-260px lg:col-span-9">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <blockquote className="font-heading text-3xl font-semibold leading-tight text-canvas md:text-5xl">
              <span aria-hidden className="text-accentondark">“</span>
              {current.quote}
              <span aria-hidden className="text-accentondark">”</span>
            </blockquote>
            <figcaption className="mt-8 font-mono text-xs uppercase tracking-18 text-canvas/70">
              <span className="text-canvas">{current.guestName}</span>
              {current.roomStayed && <> / {current.roomStayed}</>}
              {current.source && <> / {current.source}</>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        {/* Dot buttons kept for direct access; drawn as hairline segments. */}
        <div className="mt-10 flex gap-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t('testimonialDot', { count: i + 1 })}
              aria-current={i === index}
              className="flex h-11 flex-1 items-center"
            >
              <span aria-hidden className={`h-0.5 w-full transition-colors duration-300 ${i === index ? 'bg-accentondark' : 'bg-canvas/20'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
