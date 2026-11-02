'use client';

import { useTranslations } from 'next-intl';
import { useCookieBanner } from '@/lib/ui/useCookieBanner';

/**
 * Heritage cookie consent banner. Sits in front of everything else fixed to
 * the bottom (z-90, above MobileBookBar's z-80) so the visitor can always see
 * and tap both choices. Behaviour, including publishing its height for the
 * booking bar, is shared in lib/ui/useCookieBanner.ts.
 */
export default function CookieBanner() {
  const t = useTranslations('cookies');
  const { visible, ref, choose } = useCookieBanner();

  if (!visible) return null;

  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-90 border-t border-accentondark/40 bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 sm:py-4 lg:px-10">
        <p className="font-body text-3xs leading-snug text-canvas/80 sm:text-xs sm:leading-relaxed">
          {t('message')}
        </p>
        <div className="flex gap-2 sm:shrink-0 sm:gap-3">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="min-h-11 flex-1 rounded-ctrl border border-canvas/40 px-4 py-2.5 font-body text-3xs uppercase tracking-20 text-canvas transition-colors hover:border-canvas sm:flex-none sm:px-5 sm:py-3"
          >
            {t('essential')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="min-h-11 flex-1 rounded-ctrl border border-canvas bg-canvas px-4 py-2.5 font-body text-3xs uppercase tracking-20 text-primary transition-colors hover:bg-transparent hover:text-canvas sm:flex-none sm:px-5 sm:py-3"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
