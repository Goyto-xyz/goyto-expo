import { useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

// Breathe category icons
import BuddhistTempleIcon from '@/assets/icons/tags/breathe/buddhist-temple.svg';
import ChurchIcon from '@/assets/icons/tags/breathe/church.svg';
import HinduTempleIcon from '@/assets/icons/tags/breathe/hindu-temple.svg';
import MonasteryIcon from '@/assets/icons/tags/breathe/monastery.svg';
import MosqueIcon from '@/assets/icons/tags/breathe/mosque.svg';

// Eat & Drink icons
import CafeIcon from '@/assets/icons/tags/eat-drink/cafe.svg';
import FastfoodIcon from '@/assets/icons/tags/eat-drink/fastfood.svg';
import RestaurantIcon from '@/assets/icons/tags/eat-drink/restaurant.svg';

// Explore icons
import PlaygroundIcon from '@/assets/icons/tags/explore/playground.svg';
import PicnicIcon from '@/assets/icons/tags/explore/picnic.svg';
import ParkIcon from '@/assets/icons/tags/explore/park.svg';

export type Tag = {
  id: string;
  label: string;
  Icon: React.FC<SvgProps>;
};

export function useTags(categoryId: string): Tag[] {
  return useMemo(() => {
    switch (categoryId) {
      case 'breathe':
        return [
          {
            id: 'buddhist-temple',
            label: 'Buddhist Temple',
            Icon: BuddhistTempleIcon
          },
          { id: 'church', label: 'Church', Icon: ChurchIcon },
          { id: 'hindu-temple', label: 'Hindu Temple', Icon: HinduTempleIcon },
          { id: 'monastery', label: 'Monastery', Icon: MonasteryIcon },
          { id: 'mosque', label: 'Mosque', Icon: MosqueIcon }
        ];

      case 'eat_drink':
        return [
          { id: 'cafe', label: 'Cafe', Icon: CafeIcon },
          { id: 'fastfood', label: 'Fastfood', Icon: FastfoodIcon },
          { id: 'restaurant', label: 'Restaurant', Icon: RestaurantIcon }
        ];

      case 'explore':
        return [
          { id: 'playground', label: 'Playground', Icon: PlaygroundIcon },
          { id: 'picnic-area', label: 'Picnic Area', Icon: PicnicIcon },
          { id: 'park', label: 'Park', Icon: ParkIcon }
        ];

      default:
        return [];
    }
  }, [categoryId]);
}
