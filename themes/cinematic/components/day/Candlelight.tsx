'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { imgSrc } from '@/lib/image';
import { useScene } from '@/lib/ui/gsap/engine';

/**
 * Evening: the dining room by candlelight (A day at the house). The table
 * photograph sits dark in a rounded frame, and a warm glow, flickering
 * gently, lights it. With a mouse on desktop (`cursor`), the glow follows
 * the hand across the table, as if carrying the candle; elsewhere it rests
 * at the centre. The photograph rises out of the dark as it arrives.
 * `children` is the chapter's copy, set over the foot of the frame.
 */
export default function Candlelight({ image, children }: { image: unknown; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useScene(ref, null, ({ gsap, settings }, el) => {
    const photo = el.querySelector<HTMLElement>('[data-candle-photo]');
    const flame = el.querySelector<HTMLElement>('[data-candle]');
    if (photo) {
      gsap.fromTo(
        photo,
        { scale: 1.15, opacity: 0.4 },
        { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 20%', scrub: 0.6 } },
      );
    }
    if (!flame || !settings.patterns.cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    // Carry the candle: the glow's centre follows the pointer within the frame.
    gsap.set(flame, { left: 0, top: 0, xPercent: -50, yPercent: -50 });
    const home = () => ({ x: el.clientWidth / 2, y: el.clientHeight / 2 });
    gsap.set(flame, home());
    const x = gsap.quickTo(flame, 'x', { duration: 1.1, ease: 'power3' });
    const y = gsap.quickTo(flame, 'y', { duration: 1.1, ease: 'power3' });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const box = el.getBoundingClientRect();
      x(e.clientX - box.left);
      y(e.clientY - box.top);
    };
    const leave = () => {
      const { x: hx, y: hy } = home();
      x(hx);
      y(hy);
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  });

  return (
    <div ref={ref} className="relative flex min-h-svh items-end overflow-hidden">
      <div aria-hidden className="soft-edge absolute inset-0">
        <div data-candle-photo className="absolute inset-0">
          <Image src={imgSrc(image, 1920)} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-primarydeep/70" />
        <div data-candle className="candle pointer-events-none absolute left-1/4 top-1/4 aspect-square w-1/2" />
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-primarydeep/90 via-primarydeep/60 to-transparent" />
      </div>
      <div className="relative w-full">{children}</div>
    </div>
  );
}
