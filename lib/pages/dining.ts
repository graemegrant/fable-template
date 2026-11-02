import { menus, team } from '@/lib/data';
import { pickLocale, resolveTeamMember } from '@/lib/resolveLocale';
import type { Locale } from '@/lib/locales';


const rawChef = team.find((t) => t.role.en === 'Head Chef');

/** Data for the Dining page, shared by every look. */
export async function loadDining(locale: Locale) {
  const chef = rawChef ? resolveTeamMember(rawChef, locale) : undefined;
  const resolvedMenus = menus.map((menu) => ({
    name: pickLocale(menu.name, locale) ?? '',
    note: pickLocale(menu.note, locale) ?? '',
    items: menu.items.map((item) => ({
      dish: pickLocale(item.dish, locale) ?? '',
      detail: pickLocale(item.detail, locale) ?? '',
    })),
  }));
  return { chef, resolvedMenus };
}

export type DiningData = Awaited<ReturnType<typeof loadDining>>;
