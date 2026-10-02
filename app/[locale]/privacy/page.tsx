import { getTranslations } from 'next-intl/server';
import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { IMG } from '@/lib/data';
import { isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/locales';
import PageHero from '@/components/PageHero';
import { FadeUp } from '@/components/Motion';

/*
 * Privacy & cookies notice — a starting draft every client must review
 * before launch (NEW-CLIENT-CHECKLIST.md): it needs the client's legal
 * entity as data controller. It only describes what the site does: the
 * cookies section follows whether NEXT_PUBLIC_GA4_ID is set (analytics
 * only ever loads after consent — see components/Analytics.tsx).
 * Update `LAST_UPDATED` whenever the content changes.
 */
const LAST_UPDATED = '2 October 2026';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return pageMetadata({
    locale,
    title: 'Privacy & Cookies',
    description: `How ${hotelConfig.name} uses the information you share through this website, and the cookies it sets.`,
    path: '/privacy',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const t = await getTranslations('privacy');
  const analytics = Boolean(process.env.NEXT_PUBLIC_GA4_ID);
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
    [t('cookiesTitle'), analytics ? t('cookiesBodyAnalytics') : t('cookiesBodyEssential')],
    [t('rightsTitle'), t('rightsBody')],
  ];
  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image={IMG.dining1} />
      <section className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <FadeUp>
          <p className="font-body text-xs uppercase tracking-20 text-ink/50">{t('updated', values)}</p>
          <div className="mt-10 space-y-12">
            {sections.map(([title, body]) => (
              <div key={title}>
                <h2 className="font-heading text-3xl font-medium text-ink">{title}</h2>
                <p className="mt-4 font-body text-base font-light leading-body text-ink/80">{body}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
