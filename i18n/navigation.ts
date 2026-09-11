import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/** Locale-aware Link/router/usePathname — use these instead of next/link
 *  and next/navigation anywhere in app/[locale]/** and its components, so
 *  internal links carry the current locale prefix automatically. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
