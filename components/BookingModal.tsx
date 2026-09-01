'use client';

/**
 * Booking system: context provider, modal, and a reusable BookButton.
 * Submits to the configured booking engine with query params; falls back
 * to /contact when no engine is configured.
 */
import {
  createContext, useCallback, useContext, useEffect, useState, type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { hotelConfig } from '@/hotel.config';
import { ModalEntrance, AnimatePresence, motion } from './Motion';

const BookingContext = createContext<{ open: (roomHint?: string) => void; close: () => void }>({
  open: () => {},
  close: () => {},
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
  return (
    <button type="button" onClick={() => open(roomHint)} className={className}>
      {children ?? 'Check availability'}
    </button>
  );
}

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function BookingModalInner({ onClose, roomHint }: { onClose: () => void; roomHint?: string }) {
  const router = useRouter();
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
    const params = new URLSearchParams({
      checkin: arrival,
      checkout: departure,
      guests: String(guests),
      rooms: String(roomCount),
    });
    window.location.href = `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
  }

  const field =
    'w-full rounded-ctrl border border-ink/20 bg-parchment px-4 py-3.5 font-body text-sm text-ink focus:border-gold focus:outline-none';
  const label = 'block font-body text-2xs uppercase tracking-25 text-ink/60';

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-forest/70 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a stay"
    >
      <ModalEntrance className="w-full max-w-lg">
        <div className="bg-parchment p-8 sm:p-10" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-body text-2xs uppercase tracking-30 text-gold">Direct booking</p>
              <h2 className="mt-2 font-heading text-3xl font-medium text-ink">Book a stay</h2>
              {roomHint && (
                <p className="mt-1 font-body text-xs text-ink/60">
                  Enquiring about: <span className="text-forest">{roomHint}</span>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking"
              className="font-body text-2xl leading-none text-ink/50 transition-colors hover:text-ink"
            >
              ×
            </button>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="arrival" className={label}>Arrival</label>
                <input id="arrival" type="date" required value={arrival} min={todayPlus(0)}
                  onChange={(e) => {
                    const next = e.target.value;
                    setArrival(next);
                    if (next >= departure) setDeparture(
                      new Date(new Date(next).getTime() + 2 * 86400000).toISOString().slice(0, 10)
                    );
                  }} className={`mt-2 ${field}`} />
              </div>
              <div>
                <label htmlFor="departure" className={label}>Departure</label>
                <input id="departure" type="date" required value={departure} min={arrival}
                  onChange={(e) => setDeparture(e.target.value)} className={`mt-2 ${field}`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="guests" className={label}>Guests</label>
                <select id="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                  className={`mt-2 ${field}`}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rooms" className={label}>Rooms</label>
                <select id="rooms" value={roomCount} onChange={(e) => setRoomCount(Number(e.target.value))}
                  className={`mt-2 ${field}`}>
                  {[1, 2, 3].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'room' : 'rooms'}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-ctrl bg-forest px-8 py-4 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest"
            >
              Check availability
            </button>
          </form>

          <ul className="mt-7 space-y-2 border-t border-ink/10 pt-6">
            {hotelConfig.trustItems.map((item) => (
              <li key={item} className="flex items-center gap-3 font-body text-xs text-ink/70">
                <span className="h-px w-4 bg-gold" aria-hidden /> {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-body text-xs text-ink/60">
            Prefer to talk? Call{' '}
            <a href={`tel:${hotelConfig.contact.phoneHref}`} className="text-forest underline decoration-gold underline-offset-4">
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
    <BookingContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>{isOpen && <BookingModalInner onClose={close} roomHint={roomHint} />}</AnimatePresence>
    </BookingContext.Provider>
  );
}
