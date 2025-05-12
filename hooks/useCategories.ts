import BreatheIcon from '@/assets/icons/categories/breathe.svg';
import EatDrinkIcon from '@/assets/icons/categories/eat-drink.svg';
import ExploreIcon from '@/assets/icons/categories/explore.svg';
import PartyIcon from '@/assets/icons/categories/party.svg';
import PlayIcon from '@/assets/icons/categories/play.svg';
import RelaxIcon from '@/assets/icons/categories/relax.svg';
import ShopIcon from '@/assets/icons/categories/shop.svg';
import SweatIcon from '@/assets/icons/categories/sweat.svg';
import TravelIcon from '@/assets/icons/categories/travel.svg';
import WorkIcon from '@/assets/icons/categories/work.svg';
import { useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

export type Category = {
  id: string;
  label: string;
  Icon: React.FC<SvgProps>;
  color: string;
};
export function useCategories() {
  const categories = useMemo<Category[]>(
    () => [
      { id: 'breathe', label: 'Breathe', Icon: BreatheIcon, color: '#228CFD' },
      {
        id: 'eat_drink',
        label: 'Eat & Drink',
        Icon: EatDrinkIcon,
        color: '#C51A1A'
      },
      { id: 'explore', label: 'Explore', Icon: ExploreIcon, color: '#01B34E' },
      { id: 'party', label: 'Party', Icon: PartyIcon, color: '#FF0E93' },
      { id: 'play', label: 'Play', Icon: PlayIcon, color: '#103CBF' },
      { id: 'relax', label: 'Relax', Icon: RelaxIcon, color: '#F2A809' },
      { id: 'shop', label: 'Shop', Icon: ShopIcon, color: '#6632B9' },
      { id: 'sweat', label: 'Sweat', Icon: SweatIcon, color: '#B05301' },
      { id: 'travel', label: 'Travel', Icon: TravelIcon, color: '#04B6B0' },
      { id: 'work', label: 'Work', Icon: WorkIcon, color: '#1368A8' }
    ],
    []
  );

  return categories;
}
