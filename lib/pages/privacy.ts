import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';

/*
 * Privacy & cookies notice — a starting draft every client must review
 * before launch (NEW-CLIENT-CHECKLIST.md): it needs the client's legal
 * entity as data controller. It only describes what the site does: the
 * cookies section follows whether NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_CLARITY_ID are set (analytics
 * only ever loads after consent — see components/Analytics.tsx).
 * Update `LAST_UPDATED` (here) whenever the content changes.
 */
const LAST_UPDATED = '2 October 2026';

/** Data for the Privacy page, shared by every look. */
export async function loadPrivacy() {
  const t = await getTranslations('privacy');
  const ga4 = Boolean(process.env.NEXT_PUBLIC_GA4_ID);
  const clarity = Boolean(process.env.NEXT_PUBLIC_CLARITY_ID);
  const analytics = ga4 || clarity;
  const tools = [ga4 && 'Google Analytics', clarity && 'Microsoft Clarity'].filter(Boolean).join(' and ');
  const values = {
    name: hotelConfig.name,
    address: hotelConfig.location.address,
    email: hotelConfig.contact.email,
    phone: hotelConfig.contact.phone,
    date: LAST_UPDATED,
  };
  const sections: Array<[title: string, body: string]> = [
    [t('whoTitle'), t('whoBody', values)],
    [t('collectTitle'), t('collectBody')],
    [t('useTitle'), t('useBody')],
    [t('keepTitle'), t('keepBody')],
    [t('cookiesTitle'), analytics ? t('cookiesBodyAnalytics', { tools }) : t('cookiesBodyEssential')],
    [t('rightsTitle'), t('rightsBody')],
  ];
  return { values, sections };
}

export type PrivacyData = Awaited<ReturnType<typeof loadPrivacy>>;
