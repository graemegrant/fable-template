'use client';

import { useTranslations } from 'next-intl';
import { useCookieBanner } from '@/lib/ui/useCookieBanner';

/**
 * Coastal cookie banner: a rounded card floating above the bottom edge.
 * In front of everything else fixed to the bottom (z-90, above the mobile
 * booking bar's z-80). Behaviour, including publishing its height for the
 * booking bar, is shared in lib/ui/useCookieBanner.ts.
 */
export default function CookieBanner() {
  const t = useTranslations('cookies');
  const { visible, ref, choose } = useCookieBanner();
  if (!visible) return null;

  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-90 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="shadow-sand mx-auto flex max-w-3xl flex-col gap-3 rounded-card bg-primary px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6">
        <p className="font-body text-xs leading-snug text-canvas/85 sm:text-sm">{t('message')}</p>
        <div className="flex gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="min-h-11 flex-1 rounded-ctrl border border-canvas/40 px-4 font-body text-sm font-medium text-canvas transition-colors hover:border-canvas sm:flex-none"
          >
            {t('essential')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="min-h-11 flex-1 rounded-ctrl bg-accentfill px-4 font-body text-sm font-semibold text-onaccent sm:flex-none"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
