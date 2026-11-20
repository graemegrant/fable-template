'use client';

import { useEffect, useRef } from 'react';
import { useMotionEngine } from '@/lib/ui/gsap/engine';

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toTime = (minutes: number) => `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

/**
 * The house clock: the hour runs in the left margin as you scroll, from
 * each chapter's hour towards the next (DayChapter's `data-day-time`).
 * Desktop with the motion layer only; everywhere else each chapter's own
 * HourMark tells the time. Decorative (the hours are printed in the
 * chapters), difference-blended so it reads on pale and dark alike.
 */
export default function DayClock() {
  const engine = useMotionEngine();
  const ref = useRef<HTMLDivElement>(null);
  const on = engine?.mode === 'full';

  useEffect(() => {
    const el = ref.current;
    if (!on || !engine || !el) return;
    const { gsap, ScrollTrigger } = engine;
    const timeEl = el.querySelector<HTMLElement>('[data-clock-time]');
    const labelEl = el.querySelector<HTMLElement>('[data-clock-label]');
    const chapters = [...document.querySelectorAll<HTMLElement>('[data-day-time]')];
    if (!timeEl || !labelEl || !chapters.length) return;
    const minutes = chapters.map((c) => toMinutes(c.dataset.dayTime ?? '00:00'));
    let shown = '';
    let visible = true;

    const update = () => {
      // The hour turns as a chapter's top passes a third of the way down
      // the screen; the first chapter counts from the top of the page.
      const line = window.innerHeight / 3;
      let i = 0;
      chapters.forEach((c, k) => {
        if (c.getBoundingClientRect().top <= line) i = k;
      });
      const box = chapters[i].getBoundingClientRect();
      const through = gsap.utils.clamp(0, 1, i === 0 ? -box.top / Math.max(1, box.height - line) : (line - box.top) / box.height);
      // Past midnight (the banner and footer) the clock bows out.
      const after = chapters[chapters.length - 1].getBoundingClientRect().bottom < line;
      if (after === visible) {
        visible = !after;
        gsap.to(el, { autoAlpha: after ? 0 : 1, duration: 0.5, overwrite: true });
      }
      const next = minutes[i + 1] ?? minutes[i];
      const time = toTime(Math.round(minutes[i] + (next - minutes[i]) * through));
      const label = chapters[i].dataset.dayLabel ?? '';
      if (time + label === shown) return;
      shown = time + label;
      timeEl.textContent = time;
      labelEl.textContent = label;
    };

    gsap.set(el, { autoAlpha: 0 });
    gsap.to(el, { autoAlpha: 1, duration: 1.2, delay: 1.2 });
    const trigger = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: update });
    update();
    return () => {
      trigger.kill();
      gsap.killTweensOf(el);
    };
  }, [on, engine]);

  if (!on) return null;
  return (
    <div ref={ref} aria-hidden className="day-clock pointer-events-none fixed left-2 top-1/2 z-40 -translate-y-1/2 text-canvas lg:left-3">
      <p className="day-clock-text flex items-center gap-3 font-mono text-xs uppercase tracking-25">
        <span data-clock-time className="font-heading text-xl normal-case tabular-nums tracking-normal" />
        <span className="h-6 w-px bg-current" />
        <span data-clock-label />
      </p>
    </div>
  );
}
