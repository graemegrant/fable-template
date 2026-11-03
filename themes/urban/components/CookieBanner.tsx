'use client';

import { useTranslations } from 'next-intl';
import { useCookieBanner } from '@/lib/ui/useCookieBanner';

/**
 * Urban cookie banner: a flush black bar along the bottom edge with a
 * hairline rule. In front of everything else fixed to the bottom (z-90,
 * above the mobile booking bar's z-80). Behaviour, including publishing its
 * height for the booking bar, is shared in lib/ui/useCookieBanner.ts.
 */
export default function CookieBanner() {
  const t = useTranslations('cookies');
  const { visible, ref, choose } = useCookieBanner();
  if (!visible) return null;

  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-90 border-t border-canvas/15 bg-primarydeep">
      <div className="mx-auto flex max-w-screen-2xl flex-col sm:flex-row sm:items-stretch">
        <p className="flex-1 px-5 py-4 font-body text-sm leading-snug text-canvas/80 lg:px-8">{t('message')}</p>
        <div className="flex border-t border-canvas/10 sm:border-l sm:border-t-0">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="min-h-12 flex-1 px-6 font-mono text-xs uppercase tracking-18 text-canvas transition-colors hover:bg-canvas/10 sm:flex-none"
          >
            {t('essential')}
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="min-h-12 flex-1 bg-accentfill px-6 font-mono text-xs uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas sm:flex-none"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
