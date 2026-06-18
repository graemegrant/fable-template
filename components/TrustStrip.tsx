import { hotelConfig } from '@/hotel.config';

/** Horizontal strip of direct-booking trust items. Light and dark variants. */
export default function TrustStrip({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const dark = variant === 'dark';
  return (
    <div className={dark ? 'bg-forest text-parchment' : 'bg-warmgrey text-ink'}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-5">
          {hotelConfig.trustItems.map((item, i) => (
            <li key={item} className="flex items-center gap-10">
              {i > 0 && <span className={`hidden h-px w-8 sm:block ${dark ? 'bg-parchment/30' : 'bg-ink/20'}`} aria-hidden />}
              <span className="font-body text-[11px] uppercase tracking-[0.25em]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
