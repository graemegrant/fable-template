import type { ReactNode } from 'react';

/**
 * A day at the house: the Cinematic home page is one day, dawn to midnight.
 * Each chapter is a section painted in its hour's light (the `day-*`
 * gradients in themes/cinematic/styles.css), each starting where the last
 * ended, so scrolling down is the day passing. `time` and `label` also
 * feed DayClock, which keeps the hour in the margin.
 *
 * Light chapters (morning to afternoon) set ink type; the rest bone.
 */
export type Phase = 'dawn' | 'morning' | 'lateMorning' | 'afternoon' | 'golden' | 'evening' | 'night' | 'midnight';

const LIGHT: Record<Phase, string> = {
  dawn: 'day-dawn text-canvas',
  morning: 'day-morning text-ink',
  lateMorning: 'day-latemorning text-ink',
  afternoon: 'day-afternoon text-ink',
  golden: 'day-golden text-canvas',
  evening: 'day-evening text-canvas',
  night: 'day-night text-canvas',
  midnight: 'day-midnight text-canvas',
};

export default function DayChapter({
  phase,
  time,
  label,
  className = '',
  children,
}: {
  phase: Phase;
  /** The hour this chapter begins, "HH:MM". */
  time: string;
  /** The hour's name ("Morning"), for the clock. */
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section data-day-time={time} data-day-label={label} className={`day ${LIGHT[phase]} ${className}`}>
      {children}
    </section>
  );
}

/** The hour, set like a chapter opening: the time in the serif, a rule,
 *  the hour's name in tracked capitals. `tone`: `paper` on the light
 *  chapters, `mist` where the light is changing under it (golden hour),
 *  gold elsewhere. */
export function HourMark({
  time,
  label,
  tone = 'dark',
  className = '',
}: {
  time: string;
  label: string;
  tone?: 'dark' | 'paper' | 'mist';
  className?: string;
}) {
  const colour = { dark: 'text-accentondark', paper: 'text-accent', mist: 'text-canvas' }[tone];
  return (
    <p className={`flex items-center gap-4 font-mono text-xs uppercase tracking-25 ${colour} ${className}`}>
      <span className="font-heading text-3xl normal-case tabular-nums tracking-normal">{time}</span>
      <span aria-hidden className="h-px w-10 bg-current" />
      <span>{label}</span>
    </p>
  );
}
