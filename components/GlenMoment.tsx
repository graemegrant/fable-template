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
import { useTranslations, useLocale } from 'next-intl';
import type { Locale } from '@/lib/locales';

type Word = { text: string; brass?: boolean };

/* The word-by-word illumination effect needs structured per-word data
   (the "brass" emphasis flag), which a flat translated string can't
   carry — so each locale's sentence is spelled out here rather than
   split from a messages string. The effect works with any word count,
   so translated sentences don't need to match the English word-for-word.
   Distance converted to km for non-English locales (19 mi ≈ 31 km) —
   see the same conversion note in StatsBand.tsx. */
const SENTENCE_BY_LOCALE: Record<Locale, Word[]> = {
  en: [
    { text: 'The' }, { text: 'nearest' }, { text: 'traffic' }, { text: 'light' }, { text: 'is' },
    { text: 'nineteen', brass: true }, { text: 'miles', brass: true }, { text: 'away.', brass: true },
    { text: 'We' }, { text: 'measured.' },
    { text: 'Nobody' }, { text: 'here' }, { text: 'has' }, { text: 'ever' },
    { text: 'regretted' }, { text: 'the' }, { text: 'drive.' },
  ],
  fr: [
    { text: 'Le' }, { text: 'feu' }, { text: 'de' }, { text: 'circulation' }, { text: 'le' }, { text: 'plus' }, { text: 'proche' }, { text: 'est' }, { text: 'à' },
    { text: 'trente-et-un', brass: true }, { text: 'kilomètres.', brass: true },
    { text: 'Nous' }, { text: 'avons' }, { text: 'mesuré.' },
    { text: 'Personne' }, { text: 'ici' }, { text: 'n’a' }, { text: 'jamais' },
    { text: 'regretté' }, { text: 'le' }, { text: 'trajet.' },
  ],
  de: [
    { text: 'Die' }, { text: 'nächste' }, { text: 'Ampel' }, { text: 'ist' },
    { text: 'einunddreißig', brass: true }, { text: 'Kilometer', brass: true }, { text: 'entfernt.', brass: true },
    { text: 'Wir' }, { text: 'haben' }, { text: 'nachgemessen.' },
    { text: 'Niemand' }, { text: 'hier' }, { text: 'hat' }, { text: 'die' }, { text: 'Fahrt' }, { text: 'je' }, { text: 'bereut.' },
  ],
  es: [
    { text: 'El' }, { text: 'semáforo' }, { text: 'más' }, { text: 'cercano' }, { text: 'está' }, { text: 'a' },
    { text: 'treinta', brass: true }, { text: 'y', brass: true }, { text: 'un', brass: true }, { text: 'kilómetros.', brass: true },
    { text: 'Lo' }, { text: 'medimos.' },
    { text: 'Aquí' }, { text: 'nadie' }, { text: 'se' }, { text: 'ha' }, { text: 'arrepentido' }, { text: 'nunca' }, { text: 'del' }, { text: 'trayecto.' },
  ],
};

export default function GlenMoment() {
  const t = useTranslations('glenMoment');
  const locale = useLocale() as Locale;
  const SENTENCE = SENTENCE_BY_LOCALE[locale];
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
    <div ref={trackRef} className="relative h-240vh md:h-260vh">
      <div className="bg-glen sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10">
          <p className="font-body text-2xs uppercase tracking-30 text-goldbright">
            {t('eyebrow')}
          </p>
          <p className="mt-8 max-w-20ch font-heading text-3xl leading-heading text-parchment md:text-5xl lg:text-6xl">
            {SENTENCE.map((w, i) => (
              <span
                key={i}
                className={`transition-opacity duration-300 ${
                  isLit(i) ? 'opacity-100' : 'opacity-18'
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
