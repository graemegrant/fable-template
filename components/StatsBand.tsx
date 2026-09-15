'use client';

/**
 * StatsBand — editorial stats rule with count-up on first view.
 * CRO/SEO-safe: the real values are always in the DOM (server render);
 * the animation only counts up to them, and reduced-motion skips it.
 */
import { useRef, useState } from 'react';
import { useInView, useReducedMotion, motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

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
      <div className="font-heading text-4xl text-forest md:text-5xl">
        {stat.render(display)}
      </div>
      <div className="mt-2 font-body text-2xs uppercase leading-relaxed tracking-18 text-ink/60">
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBand() {
  const t = useTranslations('stats');
  const locale = useLocale();
  // The distance is a physical fact, not prose — converted to km for
  // locales that use metric (19 mi ≈ 31 km) rather than left mistranslated
  // as "19 km", which would understate the real distance.
  const isMetric = locale !== 'en';
  const stats: Stat[] = [
    { value: 12, render: (n) => `${n}`, label: t('rooms') },
    { value: 1863, render: (n) => `${n}`, label: t('family') },
    { value: isMetric ? 31 : 19, render: (n) => `${n} ${isMetric ? 'km' : 'mi'}`, label: t('trafficLight') },
    { value: 400, render: (n) => `${n.toLocaleString()}`, label: t('acres') },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-t border-gold/30 px-6 pt-12 md:grid-cols-4 lg:px-10"
    >
      {stats.map((s) => (
        <StatItem key={s.label} stat={s} />
      ))}
    </motion.div>
  );
}
