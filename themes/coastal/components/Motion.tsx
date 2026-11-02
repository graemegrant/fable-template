'use client';

/**
 * Coastal motion. One easing curve, no springs.
 *
 * Coastal timings and reveal styles: shorter travel and a longer,
 * softer settle than Heritage, like something drifting in on a swell. The machinery (LazyMotion with the
 * feature bundle fetched after hydration, and the phone/reduced-motion
 * rule) is shared in lib/ui/motion.tsx; components here use the
 * lightweight `m` primitives, re-exported as `motion`.
 *
 * Scroll/entrance reveals are suppressed on reduced-motion and on small
 * viewports (AGENTS.md §5 mobile motion budget). The SSR HTML does carry
 * the hidden start state (Framer can't know the viewport on the server),
 * so every reveal element is marked `data-reveal` and app/globals.css
 * forces it visible on phones and under reduced motion from the first
 * paint: no waiting for JS to hydrate, which held mobile LCP back ~2 s.
 */
import {
  m,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { MotionProvider, useStill } from '@/lib/ui/motion';

export { MotionProvider };

export const EASE: [number, number, number, number] = [0.25, 0.8, 0.3, 1];

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}



/*
 * still-aware animations below never toggle `animate`/`whileInView` between
 * a target object and `undefined`. `useStill()` starts false on first
 * client render (matching SSR) and flips true a moment later once the
 * viewport check resolves; if the target prop itself disappears mid-flight,
 * Framer Motion freezes the element at whatever value it had reached —
 * almost always still the *initial* (invisible) one, since the flip lands
 * before the transition has visibly progressed. That froze whole sections
 * (hero text, every FadeUp/StaggerGrid block) at opacity:0 permanently on
 * phone-width viewports. Instead, `still` only ever shortens the duration
 * to ~0 — the target is always reachable.
 */
export function FadeUp({ children, className, delay = 0 }: MotionProps) {
  const still = useStill();
  return (
    <m.div
      className={className}
      data-reveal
      initial={{ opacity: still ? 1 : 0, y: still ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: still ? 0 : 1.2, delay: still ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** On-load entrance for hero text (does not wait for scroll). */
export function HeroEntrance({ children, className, delay = 0 }: MotionProps) {
  const still = useStill();
  return (
    <m.div
      className={className}
      data-reveal
      initial={{ opacity: still ? 1 : 0, y: still ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: still ? 0 : 1.4, delay: still ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/*
 * Fixed, module-level variant objects — never recreated per render. Passing
 * a new `variants` object identity on every render (as an earlier version
 * of this file did, computing it inline from `still`) breaks Framer
 * Motion's whileInView-driven variant propagation from StaggerGrid down to
 * its StaggerItem children: any re-render before the viewport observer
 * fires (e.g. Navbar's scroll-listener re-rendering the tree) hands the
 * grid a variants object it no longer recognises, and the pending 'show'
 * transition silently never arrives — freezing every item at its hidden
 * (invisible) state. Two stable variant sets (animated vs. instant) are
 * swapped by reference instead, which Framer Motion tracks correctly.
 */
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const gridVariantsStill: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
};
const itemVariantsStill: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0, ease: EASE } },
};

export function StaggerGrid({ children, className }: MotionProps) {
  const still = useStill();
  return (
    <m.div
      className={className}
      variants={still ? gridVariantsStill : gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: MotionProps) {
  const still = useStill();
  return (
    <m.div className={className} data-reveal variants={still ? itemVariantsStill : itemVariants}>
      {children}
    </m.div>
  );
}

export function PageFade({ children, className }: MotionProps) {
  const still = useStill();
  return (
    <m.div
      className={className}
      data-reveal
      initial={{ opacity: still ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: still ? 0 : 0.7, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

export function ModalEntrance({ children, className }: MotionProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.99 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/* `m` is re-exported as `motion` so callers keep a familiar name; it is the
   lightweight primitive, not the full bundle. */
export { m as motion, AnimatePresence };

/* ------------------------------------------------------------------ */
/* 2026 additions: clip reveal, parallax, and scroll-progress hooks.  */
/* All fail-visible: if JS never runs, content renders normally.      */
/* ------------------------------------------------------------------ */

/** Editorial clip reveal: image wipes open bottom-to-top while de-scaling. Once only. */
export function ClipReveal({ children, className }: MotionProps) {
  const still = useStill();
  return (
    <m.div
      className={className}
      style={{ overflow: 'hidden' }}
      data-reveal
      initial={{ clipPath: still ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: still ? 0 : 1.2, ease: EASE }}
    >
      <m.div
        data-reveal
        initial={{ scale: still ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: still ? 0 : 1.6, ease: EASE }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

/**
 * Gentle parallax within a clipped frame. Wrap an oversized child;
 * the frame parent should be overflow-hidden with a fixed aspect.
 * speed: 0.05–0.2 sensible range.
 */
export function Parallax({
  children,
  className,
  speed = 0.12,
}: MotionProps & { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  return (
    <m.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </m.div>
  );
}
