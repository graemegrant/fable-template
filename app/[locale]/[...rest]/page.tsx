import { notFound } from 'next/navigation';

/** Any unknown address inside a language (e.g. /en/nope) gets the look's
 *  styled 404 in app/[locale]/not-found.tsx, not the bare root fallback. */
export default function CatchAll() {
  notFound();
}
