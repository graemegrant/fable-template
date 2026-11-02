import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import type { Locale } from '@/lib/locales';
import NotFoundView from '@look/views/NotFoundView';

// Next injects `noindex` for not-found automatically — don't also set the
// `robots` key here or the page emits two <meta name="robots"> tags.
export const metadata: Metadata = {
  title: 'Page not found',
};

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  return <NotFoundView locale={locale} />;
}
