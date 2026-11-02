'use client';

/**
 * StatsBand: the hotel's figures as soft rounded bubbles, counting up on
 * first view. CRO/SEO-safe: the real values are always in the DOM (server
 * render); the animation only counts up to them, and reduced motion skips it.
 */
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, useMotionValue, animate } from 'framer-motion';
import { useLocale } from 'next-intl';
import { hotelStats, type Stat } from '@/lib/ui/stats';
import type { Locale } from '@/lib/locales';
import { StaggerGrid, StaggerItem, EASE } from './Motion';

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(stat.value); // real value by default
  const mv = useMotionValue(stat.value);

  useEffect(() => {
    if (!inView || reduce) return;
    mv.set(0);
    const controls = animate(mv, stat.value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, reduce, mv, stat.value]);

  return (
    <div ref={ref} className="shadow-sand flex h-full flex-col items-center justify-center rounded-card bg-canvas px-4 py-8 text-center">
      <div className="font-heading text-4xl font-semibold text-primary md:text-5xl">{stat.render(display)}</div>
      <div className="mt-2 font-body text-sm leading-snug text-ink/80">{stat.label}</div>
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
    <StaggerGrid className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-6 sm:gap-5 md:grid-cols-4 lg:px-10">
      {stats.map((s) => (
        <StaggerItem key={s.label} className="h-full">
          <StatItem stat={s} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
