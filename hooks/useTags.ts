import { SvgProps } from 'react-native-svg';
import BuddhistTempleIcon from '@/assets/icons/tags/breathe/buddhist-temple.svg';
import ChurchIcon from '@/assets/icons/tags/breathe/church.svg';
import HinduTempleIcon from '@/assets/icons/tags/breathe/hindu-temple.svg';
import MonasteryIcon from '@/assets/icons/tags/breathe/monastery.svg';
import MosqueIcon from '@/assets/icons/tags/breathe/mosque.svg';
import { useMemo } from 'react';

export type Tag = {
  id: string;
  label: string;
  Icon: React.FC<SvgProps>;
};

export function useTags(categoryId: string) {
  const tags = useMemo<Tag[]>(
    () => [
      {
        id: 'buddhist-temple',
        label: 'Buddhist Temple',
        Icon: BuddhistTempleIcon
      },
      {
        id: 'church',
        label: 'Church',
        Icon: ChurchIcon
      },
      {
        id: 'hindu-temple',
        label: 'Hindu Temple',
        Icon: HinduTempleIcon
      },
      {
        id: 'monastery',
        label: 'Monastery',
        Icon: MonasteryIcon
      },
      {
        id: 'mosque',
        label: 'Mosque',
        Icon: MosqueIcon
      }
    ],
    [categoryId]
  );

  return tags;
}
