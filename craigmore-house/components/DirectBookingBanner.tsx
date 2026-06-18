import { BookButton } from './BookingModal';

/** Gold bar reminding guests why booking direct is the right call. */
export default function DirectBookingBanner() {
  return (
    <div className="bg-gold">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 sm:flex-row lg:px-10">
        <p className="text-center font-body text-sm text-forest sm:text-left">
          <span className="font-medium">Book direct.</span>{' '}
          The best rate, the best room in your category, and a dram waiting when you arrive.
        </p>
        <BookButton className="shrink-0 border border-forest px-7 py-3.5 font-body text-[11px] uppercase tracking-[0.25em] text-forest transition-colors duration-300 hover:bg-forest hover:text-parchment">
          Check availability
        </BookButton>
      </div>
    </div>
  );
}
