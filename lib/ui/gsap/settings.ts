/**
 * Per-hotel settings for the GSAP motion layer (lib/ui/gsap, AGENTS.md §5a).
 *
 * Set in hotel.config.ts as `motion`. Plain data with no browser code, so the
 * server can read it too (it decides whether intro elements render hidden
 * for their entrance).
 *
 * The layer runs in one of two modes, chosen by the screen:
 * - full (1024px and up): every pattern, pinned scenes, Lenis smooth scroll.
 * - soft (phones and tablets, when `mobile: 'soft'`): reveals, rising
 *   headings, word reveals, curtains and gentle parallax on native
 *   scrolling, at reduced travel. No pinned scenes, no smooth scrolling.
 * Visitors who ask for reduced motion always get the still page, and never
 * download the layer.
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
   *  scroll, the hotel's name drawing apart in depth (pinned on desktop). */
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
  /** Cards and blocks rise into place as they scroll into view. */
  reveals: boolean;
  /** Huge lines of type that slide sideways with the scroll. */
  scrollMarquee: boolean;
  /** A rounded photograph widens to fill the screen as it scrolls in. */
  expandPlates: boolean;
  /** A soft ring cursor that trails the pointer (mouse only). */
  cursor: boolean;
}

export interface MotionSettings {
  intensity: MotionIntensity;
  /** Lenis smooth scrolling on desktop. Native scrolling everywhere else,
   *  and whenever a menu or the booking modal is open. */
  smoothScroll: boolean;
  /** Phones and tablets: `soft` motion (no pins, lighter travel) or `off`
   *  (the still page). */
  mobile: 'soft' | 'off';
  patterns: MotionPatterns;
}

export type MotionMode = 'full' | 'soft';

/** Travel and duration multiplier per intensity. */
const SCALE: Record<MotionIntensity, number> = { off: 0, subtle: 0.5, standard: 1, immersive: 1.35 };

/** Patterns that pin a section while you scroll. Left out at `subtle`. */
const PINNED: Array<keyof MotionPatterns> = ['heroAperture', 'roomsReel'];

/** Left out in soft mode: the reel becomes a native swipe row, and there is
 *  no pointer to follow. (The hero keeps a soft, unpinned version.) */
const NOT_SOFT: Array<keyof MotionPatterns> = ['roomsReel', 'cursor'];

export interface ResolvedMotion {
  enabled: boolean;
  /** Whether phones and tablets get soft motion. */
  soft: boolean;
  scale: number;
  smoothScroll: boolean;
  patterns: MotionPatterns;
}

/** Applies the intensity rules to a hotel's settings, for a mode. */
export function resolveMotion(settings: MotionSettings, mode: MotionMode = 'full'): ResolvedMotion {
  const enabled = settings.intensity !== 'off';
  const patterns = { ...settings.patterns };
  for (const key of Object.keys(patterns) as Array<keyof MotionPatterns>) {
    if (!enabled || (settings.intensity === 'subtle' && PINNED.includes(key)) || (mode === 'soft' && NOT_SOFT.includes(key))) {
      patterns[key] = false;
    }
  }
  const scale = SCALE[settings.intensity] * (mode === 'soft' ? 0.6 : 1);
  return {
    enabled,
    soft: enabled && settings.mobile === 'soft',
    scale,
    smoothScroll: enabled && mode === 'full' && settings.smoothScroll,
    patterns,
  };
}

/** Media queries for each mode. Kept in step with the `.motion-intro` and
 *  `.motion-intro-soft` rules in motion.css. */
export const MOTION_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
export const SOFT_QUERY = '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)';
