import type { ReactNode } from 'react';
import DayClock from './DayClock';

/**
 * An interior page set at one hour of the house's day (A day at the house,
 * as on the home page). The page is painted in that hour's light, and the
 * margin clock keeps the hour on desktop. The interior pages are all set in
 * the darker light of their hour (deep lake by morning, olive at golden
 * hour, evening green, night blue), so every component on them keeps its
 * contrast; the pale light belongs to the home page's morning.
 */
export type PageLight = 'morning' | 'golden' | 'evening' | 'night';

const LIGHT: Record<PageLight, string> = {
  morning: 'day-page-morning',
  golden: 'day-page-golden',
  evening: 'day-evening',
  night: 'day-night',
};

export default function DayPage({
  light,
  time,
  label,
  children,
}: {
  light: PageLight;
  /** The hour, "HH:MM". */
  time: string;
  /** The hour's name, for the clock. */
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <DayClock />
      <div data-day-time={time} data-day-label={label} className={`day text-canvas ${LIGHT[light]}`}>
        {children}
      </div>
    </>
  );
}
