import { faqs } from '@/lib/data';
import { pickLocale } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


/** Data for the Contact page, shared by every look. */
export async function loadContact(locale: Locale) {
  const resolvedFaqs = faqs.map((f) => ({ q: pickLocale(f.q, locale) ?? '', a: pickLocale(f.a, locale) ?? '' }));
  return { resolvedFaqs };
}

export type ContactData = Awaited<ReturnType<typeof loadContact>>;
