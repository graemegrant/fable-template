/**
 * Site navigation, shared by every look (AGENTS.md §3a). Labels are keys in
 * the `nav` messages namespace. A look decides how to show this, never what
 * it contains.
 */
export type NavChild = { labelKey: string; href: string };
export type NavItem = { labelKey: string; href?: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    labelKey: 'stay',
    children: [
      { labelKey: 'roomsAndSuites', href: '/rooms' },
      { labelKey: 'specialOffers', href: '/offers' },
    ],
  },
  { labelKey: 'dining', href: '/dining' },
  { labelKey: 'experiences', href: '/experiences' },
  { labelKey: 'weddings', href: '/weddings' },
  { labelKey: 'giftVouchers', href: '/gift-vouchers' },
  {
    labelKey: 'discover',
    children: [
      { labelKey: 'journal', href: '/journal' },
      { labelKey: 'ourStory', href: '/about' },
      { labelKey: 'location', href: '/location' },
      { labelKey: 'contact', href: '/contact' },
    ],
  },
];
