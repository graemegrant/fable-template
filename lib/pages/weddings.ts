import { getTranslations } from 'next-intl/server';
import { IMG } from '@/lib/data';


/** Data for the Weddings page, shared by every look. */
export async function loadWeddings() {
  const t = await getTranslations('weddings');
  const venues = [
    { name: t('southLawnName'), capacity: t('southLawnCapacity'), detail: t('southLawnDetail'), image: IMG.wedding1 },
    { name: t('diningRoomName'), capacity: t('diningRoomCapacity'), detail: t('diningRoomDetail'), image: IMG.dining2 },
    { name: t('libraryName'), capacity: t('libraryCapacity'), detail: t('libraryDetail'), image: IMG.fire },
  ];
  return { venues };
}

export type WeddingsData = Awaited<ReturnType<typeof loadWeddings>>;
