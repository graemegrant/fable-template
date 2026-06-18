'use client';

/**
 * Shared motion system. One easing curve, no springs, no parallax.
 * Everything unhurried by design.
 */
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** On-load entrance for hero text (does not wait for scroll). */
export function HeroEntrance({ children, className, delay = 0 }: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function StaggerGrid({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      variants={gridVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function PageFade({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ModalEntrance({ children, className }: MotionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.99 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export { motion, AnimatePresence };
