'use client';

/**
 * Heritage booking modal. The behaviour (context, BookButton, form state,
 * hand-off to the booking engine) is shared in lib/ui/booking.tsx; this
 * file is the design. BookButton and useBooking are re-exported so
 * components import booking from one place.
 */
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import {
  BookingContext, BookButton, useBooking, useBookingForm, useBookingProviderState,
} from '@/lib/ui/booking';
import { ModalEntrance, AnimatePresence, motion } from './Motion';
import type { ReactNode } from 'react';

export { BookButton, useBooking };

function BookingModalInner({ onClose, roomHint }: { onClose: () => void; roomHint?: string }) {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const form = useBookingForm(onClose);
  const { locale } = form;

  const field =
    'w-full rounded-ctrl border border-ink/20 bg-canvas px-4 py-3.5 font-body text-base text-ink focus:border-accent focus:outline-none sm:text-sm';
  const label = 'block font-body text-2xs uppercase tracking-25 text-ink/70';

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-primary/70 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('bookAStay')}
    >
      <ModalEntrance className="w-full max-w-lg">
        <div className="rounded-card bg-canvas p-8 sm:p-10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-body text-2xs uppercase tracking-30 text-accent">{t('directBooking')}</p>
              <h2 className="mt-2 font-heading text-3xl font-medium text-ink">{t('bookAStay')}</h2>
              {roomHint && (
                <p className="mt-1 font-body text-xs text-ink/70">
                  {t('enquiringAbout')} <span className="text-primary">{roomHint}</span>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="font-body text-2xl leading-none text-ink/70 transition-colors hover:text-ink"
            >
              ×
            </button>
          </div>

          <form onSubmit={form.submit} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="arrival" className={label}>{t('arrival')}</label>
                <input id="arrival" type="date" required value={form.arrival} min={form.minArrival}
                  onChange={(e) => form.setArrival(e.target.value)} className={`mt-2 ${field}`} />
              </div>
              <div>
                <label htmlFor="departure" className={label}>{t('departure')}</label>
                <input id="departure" type="date" required value={form.departure} min={form.minDeparture}
                  onChange={(e) => form.setDeparture(e.target.value)} className={`mt-2 ${field}`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className={label}>{t('guests')}</label>
                <select id="guests" value={form.guests} onChange={(e) => form.setGuests(Number(e.target.value))}
                  className={`mt-2 ${field}`}>
                  {form.guestOptions.map((n) => (
                    <option key={n} value={n}>{t('guestCount', { count: n })}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rooms" className={label}>{t('rooms')}</label>
                <select id="rooms" value={form.roomCount} onChange={(e) => form.setRoomCount(Number(e.target.value))}
                  className={`mt-2 ${field}`}>
                  {form.roomOptions.map((n) => (
                    <option key={n} value={n}>{t('roomCount', { count: n })}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-ctrl bg-primary px-8 py-4 font-body text-2xs uppercase tracking-25 text-canvas transition-colors duration-300 hover:bg-accentfill hover:text-onaccent"
            >
              {tCommon('checkAvailability')}
            </button>
          </form>

          <ul className="mt-7 space-y-2 border-t border-ink/10 pt-6">
            {hotelConfig.trustItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-body text-xs text-ink/70">
                <span className="h-px w-4 bg-accent" aria-hidden /> {pickLocale(item, locale)}
              </li>
            ))}
          </ul>
          <Link
            href="/policies"
            onClick={onClose}
            className="mt-5 inline-block font-body text-xs text-ink/70 underline decoration-accent underline-offset-4 transition-colors hover:text-primary"
          >
            {t('bookingInfo')}
          </Link>
          <p className="mt-3 font-body text-xs text-ink/70">
            {t('preferToTalk')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="text-primary underline decoration-accent underline-offset-4">
              {hotelConfig.contact.phone}
            </a>
          </p>
        </div>
      </ModalEntrance>
    </motion.div>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const state = useBookingProviderState();
  return (
    <BookingContext.Provider value={state.value}>
      {children}
      <AnimatePresence>{state.isOpen && <BookingModalInner onClose={state.close} roomHint={state.roomHint} />}</AnimatePresence>
    </BookingContext.Provider>
  );
}
