'use client';

import { useTranslations } from 'next-intl';
import { useCookieBanner } from '@/lib/ui/useCookieBanner';

/**
 * Cinematic cookie banner: a floating glass panel above the bottom edge
 * (its padding is part of the height it publishes). In front of everything else fixed to the bottom (z-90,
 * above the mobile booking bar's z-80). Behaviour, including publishing its
 * height for the booking bar, is shared in lib/ui/useCookieBanner.ts.
 */
export default function CookieBanner() {
  const t = useTranslations('cookies');
  const { visible, ref, choose } = useCookieBanner();
  if (!visible) return null;

  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-90 p-2 lg:p-3">
      <div className="glass-deep mx-auto flex max-w-screen-lg flex-col gap-2 rounded-card p-2 sm:flex-row sm:items-center">
        <p className="flex-1 px-4 py-2 font-body text-sm leading-snug text-canvas/85">{t('message')}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="glass min-h-12 flex-1 rounded-ctrl px-6 font-mono text-xs uppercase tracking-18 text-canvas transition-colors hover:bg-canvas/10 sm:flex-none"
          >
            {t('essential')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="min-h-12 flex-1 rounded-ctrl bg-accentfill px-6 font-mono text-xs uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas sm:flex-none"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
