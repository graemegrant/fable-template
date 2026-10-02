'use client';

/**
 * StatsBand — editorial stats rule with count-up on first view.
 * CRO/SEO-safe: the real values are always in the DOM (server render);
 * the animation only counts up to them, and reduced-motion skips it.
 */
import { useRef, useState } from 'react';
import { useInView, useReducedMotion, motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';

interface Stat {
  value: number;
  render: (n: number) => string;
  label: string;
}

function StatItem({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? stat.value : stat.value); // real value by default
  const mv = useMotionValue(stat.value);

  useEffect(() => {
    if (!inView || reduce) return;
    mv.set(0);
    const controls = animate(mv, stat.value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, reduce, mv, stat.value]);

  return (
    <div ref={ref}>
      <div className="font-heading text-4xl text-primary md:text-5xl">
        {stat.render(display)}
      </div>
      <div className="mt-2 font-body text-2xs uppercase leading-relaxed tracking-18 text-ink/60">
        {stat.label}
      </div>
    </div>
  );
}

/** Figures come from hotelConfig.stats, so a client build can never
 *  inherit another hotel’s numbers. Renders nothing when empty. */
export default function StatsBand() {
  const locale = useLocale() as Locale;
  // `metric` swaps in a metric value/unit for non-English locales (e.g.
  // 19 mi → 31 km) rather than leaving a mistranslated unit.
  const isMetric = locale !== 'en';
  const stats: Stat[] = hotelConfig.stats.map((s) => {
    const m = isMetric && s.metric ? s.metric : null;
    const prefix = s.prefix ?? '';
    const suffix = m ? m.suffix : (s.suffix ?? '');
    return { value: m ? m.value : s.value, render: (n) => `${prefix}${n}${suffix}`, label: pickLocale(s.label, locale) ?? '' };
  });
  if (!stats.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-t border-accent/30 px-6 pt-12 md:grid-cols-4 lg:px-10"
    >
      {stats.map((s) => (
        <StatItem key={s.label} stat={s} />
      ))}
    </motion.div>
  );
}
