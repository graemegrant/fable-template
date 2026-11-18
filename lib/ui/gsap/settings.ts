/**
 * Per-hotel settings for the GSAP motion layer (lib/ui/gsap, AGENTS.md §5a).
 *
 * Set in hotel.config.ts as `motion`. Plain data with no browser code, so the
 * server can read it too (it decides whether intro elements render hidden
 * for the desktop entrance).
 *
 * Whatever is set here, the layer only runs on desktop-width screens (1024px
 * and up) with no reduced-motion preference. Phones, tablets and
 * reduced-motion visitors always get the still, fully readable page.
 */

/** How much the motion layer does.
 *  - off: nothing loads; the page is still.
 *  - subtle: reveals and gentle parallax at half travel; no pinned scenes.
 *  - standard: everything in `patterns`, at normal travel.
 *  - immersive: everything, with more travel and longer pinned scenes. */
export type MotionIntensity = 'off' | 'subtle' | 'standard' | 'immersive';

/** The patterns a look may use. A look ignores any it doesn't have. */
export interface MotionPatterns {
  /** Homepage hero: the photograph closes into a framed aperture as you
   *  scroll, the hotel's name drawing apart in depth (pinned scene). */
  heroAperture: boolean;
  /** Headings rise in letter by letter or line by line. */
  splitHeadings: boolean;
  /** A key paragraph lights up word by word as it scrolls past. */
  wordReveal: boolean;
  /** Rooms run sideways like a film strip while the section holds (pinned scene). */
  roomsReel: boolean;
  /** Photographs open like a curtain and settle from a slight zoom. */
  imageCurtain: boolean;
  /** Photographs drift slower than the page inside their frames. */
  parallax: boolean;
  /** The menu opens as a full-screen overlay with staggered headlines. */
  menuOverlay: boolean;
}

export interface MotionSettings {
  intensity: MotionIntensity;
  /** Lenis smooth scrolling on desktop. Native scrolling everywhere else,
   *  and whenever a menu or the booking modal is open. */
  smoothScroll: boolean;
  patterns: MotionPatterns;
}

/** Travel and duration multiplier per intensity. */
const SCALE: Record<MotionIntensity, number> = { off: 0, subtle: 0.5, standard: 1, immersive: 1.35 };

/** Patterns that pin a section while you scroll. Left out at `subtle`. */
const PINNED: Array<keyof MotionPatterns> = ['heroAperture', 'roomsReel'];

export interface ResolvedMotion {
  enabled: boolean;
  scale: number;
  smoothScroll: boolean;
  patterns: MotionPatterns;
}

/** Applies the intensity rules to a hotel's settings. */
export function resolveMotion(settings: MotionSettings): ResolvedMotion {
  const enabled = settings.intensity !== 'off';
  const patterns = { ...settings.patterns };
  for (const key of Object.keys(patterns) as Array<keyof MotionPatterns>) {
    if (!enabled || (settings.intensity === 'subtle' && PINNED.includes(key))) patterns[key] = false;
  }
  return { enabled, scale: SCALE[settings.intensity], smoothScroll: enabled && settings.smoothScroll, patterns };
}

/** Media query the motion layer runs under. Kept in step with the
 *  `.motion-intro` rule in motion.css. */
export const MOTION_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
