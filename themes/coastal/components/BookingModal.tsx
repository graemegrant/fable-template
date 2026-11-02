'use client';

/**
 * Coastal booking modal: a bottom sheet on phones, a rounded card on
 * larger screens. Behaviour (context, BookButton, form state, hand-off to
 * the booking engine) is shared in lib/ui/booking.tsx. BookButton and
 * useBooking are re-exported so components import booking from one place.
 */
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import {
  BookingContext, BookButton, useBooking, useBookingForm, useBookingProviderState,
} from '@/lib/ui/booking';
import { AnimatePresence, motion, EASE } from './Motion';

export { BookButton, useBooking };

function BookingSheet({ onClose, roomHint }: { onClose: () => void; roomHint?: string }) {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const form = useBookingForm(onClose);

  const field =
    'w-full min-w-0 rounded-ctrl border border-ink/15 bg-canvas px-5 py-3.5 font-body text-base text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accentondark sm:text-sm';
  const label = 'block px-1 font-body text-xs font-semibold text-ink/70';

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-end justify-center bg-primarydeep/50 backdrop-blur-sm sm:items-center sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('bookAStay')}
    >
      <motion.div
        className="shadow-sand w-full max-w-lg rounded-t-card bg-canvasalt p-7 sm:rounded-card sm:p-9"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" aria-hidden />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex rounded-ctrl bg-accentondark/50 px-3 py-1 font-body text-xs font-semibold text-primary">
              {t('directBooking')}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-primary">{t('bookAStay')}</h2>
            {roomHint && (
              <p className="mt-1 font-body text-sm text-ink/70">
                {t('enquiringAbout')} <span className="font-semibold text-primary">{roomHint}</span>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="flex size-11 shrink-0 items-center justify-center rounded-ctrl bg-canvas font-body text-xl leading-none text-ink/70 transition-colors hover:text-ink"
          >
            ×
          </button>
        </div>

        <form onSubmit={form.submit} className="mt-7 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="arrival" className={label}>{t('arrival')}</label>
              <input id="arrival" type="date" required value={form.arrival} min={form.minArrival}
                onChange={(e) => form.setArrival(e.target.value)} className={`mt-1.5 ${field}`} />
            </div>
            <div>
              <label htmlFor="departure" className={label}>{t('departure')}</label>
              <input id="departure" type="date" required value={form.departure} min={form.minDeparture}
                onChange={(e) => form.setDeparture(e.target.value)} className={`mt-1.5 ${field}`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="guests" className={label}>{t('guests')}</label>
              <select id="guests" value={form.guests} onChange={(e) => form.setGuests(Number(e.target.value))} className={`mt-1.5 ${field}`}>
                {form.guestOptions.map((n) => (
                  <option key={n} value={n}>{t('guestCount', { count: n })}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rooms" className={label}>{t('rooms')}</label>
              <select id="rooms" value={form.roomCount} onChange={(e) => form.setRoomCount(Number(e.target.value))} className={`mt-1.5 ${field}`}>
                {form.roomOptions.map((n) => (
                  <option key={n} value={n}>{t('roomCount', { count: n })}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="min-h-12 w-full rounded-ctrl bg-accentfill px-8 py-4 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
          >
            {tCommon('checkAvailability')}
          </button>
        </form>

        <ul className="mt-6 flex flex-wrap gap-2">
          {hotelConfig.trustItems.map((item, i) => (
            <li key={i} className="rounded-ctrl bg-canvas px-3 py-1.5 font-body text-xs text-ink/75">
              {pickLocale(item, form.locale)}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5 font-body text-sm text-ink/75">
          <Link href="/policies" onClick={onClose} className="underline decoration-accent underline-offset-4 hover:text-primary">
            {t('bookingInfo')}
          </Link>
          <span>
            {t('preferToTalk')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-semibold text-primary underline decoration-accent underline-offset-4">
              {hotelConfig.contact.phone}
            </a>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const state = useBookingProviderState();
  return (
    <BookingContext.Provider value={state.value}>
      {children}
      <AnimatePresence>{state.isOpen && <BookingSheet onClose={state.close} roomHint={state.roomHint} />}</AnimatePresence>
    </BookingContext.Provider>
  );
}
