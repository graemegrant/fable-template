'use client';

/**
 * Cinematic booking panel: a frosted-glass sheet that slides in from the
 * right, inset and rounded, over a blurred page, with underline fields,
 * mono labels and a pill CTA.
 * Behaviour (context, BookButton, form state, hand-off to the booking
 * engine) is shared in lib/ui/booking.tsx. BookButton and useBooking are
 * re-exported so components import booking from one place.
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

function BookingPanel({ onClose, roomHint }: { onClose: () => void; roomHint?: string }) {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const form = useBookingForm(onClose);

  const field =
    'w-full min-w-0 border-0 border-b border-canvas/30 bg-transparent px-0 py-3 font-body text-lg text-canvas focus:border-accentondark focus:outline-none focus:ring-0';
  const label = 'block font-mono text-xs uppercase tracking-18 text-canvas/70';

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-60 flex justify-end bg-primarydeep/50 p-2 backdrop-blur-md sm:p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('bookAStay')}
    >
      <motion.div
        className="flex size-full max-w-lg flex-col overflow-y-auto rounded-card border border-canvas/15 bg-primary/80 shadow-2xl backdrop-blur-2xl backdrop-saturate-150"
        initial={{ x: '110%' }}
        animate={{ x: 0 }}
        exit={{ x: '110%' }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-canvas/10 pl-6 sm:pl-10">
          <p className="font-mono text-xs uppercase tracking-18 text-accentondark">{t('directBooking')}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="mr-2 flex size-12 items-center justify-center rounded-ctrl border border-canvas/15 font-mono text-xl text-canvas transition-colors hover:bg-canvas hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="flex-1 px-6 py-10 sm:px-10">
          <h2 className="font-heading text-6xl font-normal leading-none text-canvas">{t('bookAStay')}</h2>
          {roomHint && (
            <p className="mt-4 font-body text-sm text-canvas/70">
              {t('enquiringAbout')} <span className="text-canvas">{roomHint}</span>
            </p>
          )}

          <form onSubmit={form.submit} className="mt-10 space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="arrival" className={label}>{t('arrival')}</label>
                <input id="arrival" type="date" required value={form.arrival} min={form.minArrival}
                  onChange={(e) => form.setArrival(e.target.value)} className={field} />
              </div>
              <div>
                <label htmlFor="departure" className={label}>{t('departure')}</label>
                <input id="departure" type="date" required value={form.departure} min={form.minDeparture}
                  onChange={(e) => form.setDeparture(e.target.value)} className={field} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label htmlFor="guests" className={label}>{t('guests')}</label>
                <select id="guests" value={form.guests} onChange={(e) => form.setGuests(Number(e.target.value))} className={field}>
                  {form.guestOptions.map((n) => (
                    <option key={n} value={n}>{t('guestCount', { count: n })}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rooms" className={label}>{t('rooms')}</label>
                <select id="rooms" value={form.roomCount} onChange={(e) => form.setRoomCount(Number(e.target.value))} className={field}>
                  {form.roomOptions.map((n) => (
                    <option key={n} value={n}>{t('roomCount', { count: n })}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="flex min-h-14 w-full items-center justify-between rounded-ctrl bg-accentfill px-7 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas"
            >
              {tCommon('checkAvailability')}
              <span aria-hidden>→</span>
            </button>
          </form>

          <ul className="mt-10 border-t border-canvas/10">
            {hotelConfig.trustItems.map((item, i) => (
              <li key={i} className="flex items-center gap-4 border-b border-canvas/10 py-3 font-body text-sm text-canvas/80">
                <span className="font-mono text-xs text-accentondark">{String(i + 1).padStart(2, '0')}</span>
                {pickLocale(item, form.locale)}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 border-t border-canvas/10 p-6 font-body text-sm text-canvas/70 sm:px-10">
          <Link href="/policies" onClick={onClose} className="block underline decoration-canvas/30 underline-offset-4 hover:text-canvas">
            {t('bookingInfo')}
          </Link>
          <p>
            {t('preferToTalk')}{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="font-mono text-canvas underline decoration-accentondark underline-offset-4">
              {hotelConfig.contact.phone}
            </a>
          </p>
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
      <AnimatePresence>{state.isOpen && <BookingPanel onClose={state.close} roomHint={state.roomHint} />}</AnimatePresence>
    </BookingContext.Provider>
  );
}
