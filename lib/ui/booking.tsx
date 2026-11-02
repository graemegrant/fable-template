'use client';

/**
 * Booking behaviour shared by every look: the open/close context, the
 * BookButton that opens it, and the form state that hands off to the
 * configured booking engine (lib/bookingEngine.ts owns each engine's
 * parameter names), falling back to /contact when none is configured.
 * Each look's BookingModal.tsx provides the modal's design.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { hotelConfig } from '@/hotel.config';
import { bcp47For, type Locale } from '@/lib/locales';
import { buildBookingUrl, resolveProvider } from '@/lib/bookingEngine';

type BookingState = { open: (roomHint?: string) => void; close: () => void; isOpen: boolean };

export const BookingContext = createContext<BookingState>({ open: () => {}, close: () => {}, isOpen: false });

export function useBooking() {
  return useContext(BookingContext);
}

/** State for a look's BookingProvider: wrap children in
 *  `<BookingContext.Provider value={state.value}>`. */
export function useBookingProviderState() {
  const [isOpen, setIsOpen] = useState(false);
  const [roomHint, setRoomHint] = useState<string | undefined>();
  const open = useCallback((hint?: string) => {
    setRoomHint(hint);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, roomHint, close, value: { open, close, isOpen } };
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

export function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

export function addDays(date: string, days: number) {
  const [y, m, d] = date.split('-').map(Number);
  return isoDate(new Date(y, m - 1, d + days));
}

/** Form state and submit for a look's booking modal. Also closes on Escape
 *  and locks page scroll while mounted. */
export function useBookingForm(onClose: () => void) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [arrival, setArrivalState] = useState(todayPlus(7));
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

  /** Moving arrival past departure pushes departure two nights on. */
  function setArrival(next: string) {
    setArrivalState(next);
    if (next >= departure) setDeparture(addDays(next, 2));
  }

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

  return {
    locale,
    arrival,
    setArrival,
    departure,
    setDeparture,
    guests,
    setGuests,
    roomCount,
    setRoomCount,
    submit,
    minArrival: todayPlus(0),
    minDeparture: addDays(arrival, 1),
    guestOptions: [1, 2, 3, 4, 5, 6],
    roomOptions: [1, 2, 3],
  };
}
