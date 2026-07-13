'use client';

/**
 * GlenMoment — the single authored scroll moment on the homepage.
 * A sticky full-viewport panel inside a tall track; the sentence
 * illuminates word-by-word as the visitor scrolls through.
 *
 * Deliberately the ONLY pinned sequence on the site (restraint rule:
 * one signature moment per property). Fail-visible: words render at
 * reduced opacity, never hidden; reduced-motion shows them fully lit.
 */
import { useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const SENTENCE: { text: string; brass?: boolean }[] = [
  { text: 'The' }, { text: 'nearest' }, { text: 'traffic' }, { text: 'light' }, { text: 'is' },
  { text: 'nineteen', brass: true }, { text: 'miles', brass: true }, { text: 'away.', brass: true },
  { text: 'We' }, { text: 'measured.' },
  { text: 'Nobody' }, { text: 'here' }, { text: 'has' }, { text: 'ever' },
  { text: 'regretted' }, { text: 'the' }, { text: 'drive.' },
];

export default function GlenMoment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const litCount = useTransform(scrollYProgress, [0, 0.85], [0, SENTENCE.length]);
  useMotionValueEvent(litCount, 'change', (v) => setLit(Math.floor(v)));

  const isLit = (i: number) => reduce || i < lit;

  return (
    <div ref={trackRef} className="relative h-[240vh] md:h-[260vh]">
      <div
        className="sticky top-0 flex h-screen items-center overflow-hidden"
        style={{
          background:
            'radial-gradient(900px 500px at 80% 15%, rgba(194,154,91,0.14), transparent 60%), linear-gradient(175deg, #241D16 0%, #2B2119 45%, #1B1510 100%)',
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
          <p className="font-body text-[11px] uppercase tracking-[0.3em] text-goldbright">
            The glen
          </p>
          <p className="mt-8 max-w-[20ch] font-heading text-3xl leading-[1.32] text-parchment md:text-5xl lg:text-6xl">
            {SENTENCE.map((w, i) => (
              <span
                key={i}
                className={`transition-opacity duration-300 ${
                  isLit(i) ? 'opacity-100' : 'opacity-[0.18]'
                } ${w.brass && isLit(i) ? 'italic text-goldbright' : ''}`}
              >
                {w.text}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
