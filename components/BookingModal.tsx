'use client';

/**
 * Booking system: context provider, modal, and a reusable BookButton.
 * Hands off to the configured booking engine via lib/bookingEngine.ts
 * (which owns each engine's parameter names); falls back to /contact
 * when no engine is configured.
 */
import {
  createContext, useCallback, useContext, useEffect, useState, type ReactNode,
} from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { pickLocale } from '@/lib/resolveLocale';
import { bcp47For, type Locale } from '@/lib/locales';
import { buildBookingUrl, resolveProvider } from '@/lib/bookingEngine';
import { ModalEntrance, AnimatePresence, motion } from './Motion';

const BookingContext = createContext<{
  open: (roomHint?: string) => void;
  close: () => void;
  isOpen: boolean;
}>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useBooking() {
  return useContext(BookingContext);
}

export function BookButton({
  className,
  children,
  roomHint,
}: {
  className?: string;
  children?: ReactNode;
  roomHint?: string;
}) {
  const { open } = useBooking();
  const t = useTranslations('common');
  return (
    <button type="button" onClick={() => open(roomHint)} className={className}>
      {children ?? t('checkAvailability')}
    </button>
  );
}

// Dates are built in the guest's local time. toISOString() would give the
// UTC date, which is a day out late in the evening during BST.
function isoDate(d: Date) {
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
}

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

function addDays(date: string, days: number) {
  const [y, m, d] = date.split('-').map(Number);
  return isoDate(new Date(y, m - 1, d + days));
}

function BookingModalInner({ onClose, roomHint }: { onClose: () => void; roomHint?: string }) {
  const router = useRouter();
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const [arrival, setArrival] = useState(todayPlus(7));
  const [departure, setDeparture] = useState(todayPlus(9));
  const [guests, setGuests] = useState(2);
  const [roomCount, setRoomCount] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = hotelConfig.bookingEngineUrl;
    if (!url) {
      onClose();
      router.push('/contact');
      return;
    }
    window.location.href = buildBookingUrl(url, resolveProvider(url, hotelConfig.bookingEngine.provider), {
      arrival,
      departure,
      adults: guests,
      rooms: roomCount,
      language: bcp47For(locale),
      currency: hotelConfig.bookingEngine.currency,
    });
  }

  const field =
    'w-full rounded-ctrl border border-ink/20 bg-canvas px-4 py-3.5 font-body text-base text-ink focus:border-accent focus:outline-none sm:text-sm';
  const label = 'block font-body text-2xs uppercase tracking-25 text-ink/60';

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
                <p className="mt-1 font-body text-xs text-ink/60">
                  {t('enquiringAbout')} <span className="text-primary">{roomHint}</span>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('close')}
              className="font-body text-2xl leading-none text-ink/50 transition-colors hover:text-ink"
            >
              ×
            </button>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="arrival" className={label}>{t('arrival')}</label>
                <input id="arrival" type="date" required value={arrival} min={todayPlus(0)}
                  onChange={(e) => {
                    const next = e.target.value;
                    setArrival(next);
                    if (next >= departure) setDeparture(addDays(next, 2));
                  }} className={`mt-2 ${field}`} />
              </div>
              <div>
                <label htmlFor="departure" className={label}>{t('departure')}</label>
                <input id="departure" type="date" required value={departure} min={addDays(arrival, 1)}
                  onChange={(e) => setDeparture(e.target.value)} className={`mt-2 ${field}`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className={label}>{t('guests')}</label>
                <select id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                  className={`mt-2 ${field}`}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{t('guestCount', { count: n })}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rooms" className={label}>{t('rooms')}</label>
                <select id="rooms" value={roomCount} onChange={(e) => setRoomCount(Number(e.target.value))}
                  className={`mt-2 ${field}`}>
                  {[1, 2, 3].map((n) => (
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
            className="mt-5 inline-block font-body text-xs text-ink/60 underline decoration-accent underline-offset-4 transition-colors hover:text-primary"
          >
            {t('bookingInfo')}
          </Link>
          <p className="mt-3 font-body text-xs text-ink/60">
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
  const [isOpen, setIsOpen] = useState(false);
  const [roomHint, setRoomHint] = useState<string | undefined>();
  const open = useCallback((hint?: string) => { setRoomHint(hint); setIsOpen(true); }, []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <BookingContext.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>{isOpen && <BookingModalInner onClose={close} roomHint={roomHint} />}</AnimatePresence>
    </BookingContext.Provider>
  );
}
