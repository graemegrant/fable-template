'use client';

/**
 * Motion machinery shared by every look (AGENTS.md §3a): LazyMotion with
 * the feature bundle loaded after hydration (motionFeatures.ts), and the
 * rule that reveals are skipped on phones and under reduced motion
 * (AGENTS.md §5 mobile motion budget; app/globals.css forces `data-reveal`
 * elements visible from first paint there). Each look's Motion.tsx defines
 * its own timings and reveal styles on top of these.
 */
import { LazyMotion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

// The feature bundle loads after hydration rather than up front. Reveals are
// already visible without it on phones (data-reveal CSS); on desktop they
// simply start a moment later.
const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}

/** True when reveals should be skipped: reduced-motion or a phone-width viewport. */
export function useStill(): boolean {
  const reduce = useReducedMotion();
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return Boolean(reduce) || narrow;
}
