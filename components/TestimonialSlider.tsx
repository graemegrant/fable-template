'use client';

import { useState } from 'react';
import { AnimatePresence, motion, EASE } from './Motion';
import SectionLabel from './SectionLabel';
import type { Testimonial } from '@/lib/types';

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;
  const current = testimonials[index];
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <SectionLabel variant="parchment" className="mb-10">Guest book</SectionLabel>
      <div className="min-h-[260px] sm:min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <blockquote className="font-heading text-2xl font-medium italic leading-relaxed text-parchment md:text-3xl">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-8 font-body text-[11px] uppercase tracking-[0.25em] text-parchment/60">
              {current.guestName}
              {current.roomStayed && <> · {current.roomStayed}</>}
              {current.source && <> · {current.source}</>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-8">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial"
          className="font-body text-sm tracking-widest text-parchment/60 transition-colors hover:text-gold">
          ←
        </button>
        <div className="flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 w-1.5 transition-colors duration-300 ${i === index ? 'bg-gold' : 'bg-parchment/30'}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial"
          className="font-body text-sm tracking-widest text-parchment/60 transition-colors hover:text-gold">
          →
        </button>
      </div>
    </div>
  );
}
