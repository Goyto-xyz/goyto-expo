import { generateNearbyCoordinates } from '@/utils';
import { useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

import CoffeeIcon from '@/assets/map-icons/coffee.svg';
import ParkIcon from '@/assets/map-icons/park.svg';
import RestaurantIcon from '@/assets/map-icons/restaurant.svg';

export type Place = {
  id: string;
  name: string;
  coordinates: [number, number];
  category: string;
  color: string;
  Icon: React.FC<SvgProps>;
};

export function useNearbyPlaces(currentLocation: [number, number]) {
  const generated = generateNearbyCoordinates(currentLocation, 5, 300);

  const places = useMemo<Place[]>(
    () => [
      {
        id: '1',
        name: 'The Beehive',
        coordinates: generated[0],
        category: 'coffee',
        color: '#df305f',
        Icon: CoffeeIcon
      },
      {
        id: '2',
        name: "John's Grill",
        coordinates: generated[1],
        category: 'restaurant',
        color: '#df305f',
        Icon: RestaurantIcon
      },
      {
        id: '3',
        name: 'The Rotunda',
        coordinates: generated[2],
        category: 'restaurant',
        color: '#df305f',
        Icon: RestaurantIcon
      },
      {
        id: '4',
        name: 'Union Park',
        coordinates: generated[3],
        category: 'park',
        color: '#62c048',
        Icon: ParkIcon
      },
      {
        id: '5',
        name: 'The Boba Guys',
        coordinates: generated[4],
        category: 'coffee',
        color: '#df305f',
        Icon: CoffeeIcon
      }
    ],
    [currentLocation]
  );

  return places;
}
