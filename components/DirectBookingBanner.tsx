import { getTranslations } from 'next-intl/server';
import { BookButton } from './BookingModal';

/** Gold bar reminding guests why booking direct is the right call. */
export default async function DirectBookingBanner() {
  const t = await getTranslations('shared');
  return (
    <div className="bg-gold">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 sm:flex-row lg:px-10">
        <p className="text-center font-body text-sm text-forest sm:text-left">
          <span className="font-medium">{t('bookDirectLabel')}</span>{' '}
          {t('bookDirectBody')}
        </p>
        {/* No children passed — falls back to BookButton's own common.checkAvailability
            translation (AGENTS.md §9: never hardcode a second copy of that CTA). */}
        <BookButton className="shrink-0 rounded-ctrl border border-forest px-7 py-3.5 font-body text-2xs uppercase tracking-25 text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment" />
      </div>
    </div>
  );
}
