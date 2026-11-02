'use client';

import { useEffect, useState } from 'react';

/** Gallery lightbox behaviour shared by every look: which image is open,
 *  arrow keys to move, Escape to close, page scroll locked while open. */
export function useLightbox(count: number) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % count));
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + count) % count));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? null : (i + 1) % count));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? null : (i - 1 + count) % count));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, count]);

  return { openIndex, open: setOpenIndex, close: () => setOpenIndex(null), next, prev };
}
