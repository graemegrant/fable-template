'use client';

/**
 * StatsBand: the hotel's figures in a hairline grid, numbers in condensed
 * display type, labels in mono, counting up on first view. CRO/SEO-safe:
 * the real values are always in the DOM (server render); the animation
 * only counts up to them, and reduced motion skips it.
 */
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, useMotionValue, animate } from 'framer-motion';
import { useLocale } from 'next-intl';
import { hotelStats, type Stat } from '@/lib/ui/stats';
import type { Locale } from '@/lib/locales';
import { EASE } from './Motion';

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(stat.value); // real value by default
  const mv = useMotionValue(stat.value);

  useEffect(() => {
    if (!inView || reduce) return;
    mv.set(0);
    const controls = animate(mv, stat.value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, reduce, mv, stat.value]);

  return (
    <div
      ref={ref}
      // Hairlines between cells: two columns on phones, four from md.
      className={`flex h-full flex-col justify-between gap-8 border-canvas/15 p-5 lg:p-8 ${index % 2 === 1 ? 'border-l' : ''} ${
        index > 0 ? 'md:border-l' : ''
      } ${index >= 2 ? 'border-t md:border-t-0' : ''}`}
    >
      <span className="font-mono text-xs text-accentondark">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <div className="font-condensed font-heading text-6xl font-extrabold leading-none text-canvas md:text-7xl">{stat.render(display)}</div>
        <div className="mt-3 font-mono text-xs uppercase leading-relaxed tracking-18 text-canvas/70">{stat.label}</div>
      </div>
    </div>
  );
}

/** Figures come from hotelConfig.stats via lib/ui/stats.ts. Renders
 *  nothing when empty. */
export default function StatsBand() {
  const locale = useLocale() as Locale;
  const stats = hotelStats(locale);
  if (!stats.length) return null;
  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-2 border-y border-canvas/15 md:grid-cols-4">
      {stats.map((s, i) => (
        <StatItem key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
}
