import { generateNearbyCoordinates } from '@/utils';
import { useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';

import CoffeeIcon from '@/assets/map-icons/coffee.png';
import ParkIcon from '@/assets/map-icons/park.png';
import RestaurantIcon from '@/assets/map-icons/restaurant.png';

export type Place = {
  id: string;
  name: string;
  address?: string;
  coordinates: [number, number];
  category: string;
  tags?: string[];
  icon: ImageSourcePropType;
};

export function useNearbyPlaces(currentLocation: [number, number]) {
  const generated = generateNearbyCoordinates(currentLocation, 6, 300);

  const places = useMemo<Place[]>(
    () => [
      {
        id: '1',
        name: 'The Beehive',
        coordinates: generated[0],
        category: 'eat_drink',
        tags: ['cafe', 'fastfood'],
        icon: CoffeeIcon,
        address: '123 Coffee St, San Francisco, CA'
      },
      {
        id: '2',
        name: "John's Grill",
        coordinates: generated[1],
        category: 'eat_drink',
        tags: ['restaurant'],
        icon: RestaurantIcon,
        address: '456 Grill Ave, San Francisco, CA'
      },
      {
        id: '3',
        name: 'The Rotunda',
        coordinates: generated[2],
        category: 'eat_drink',
        tags: ['restaurant'],
        icon: RestaurantIcon,
        address: '789 Rotunda Blvd, San Francisco, CA'
      },
      {
        id: '4',
        name: 'Union Park',
        coordinates: generated[3],
        category: 'explore',
        tags: ['park', 'picnic-area'],
        icon: ParkIcon,
        address: '101 Union Park Rd, San Francisco, CA'
      },
      {
        id: '5',
        name: 'The Boba Guys',
        coordinates: generated[4],
        category: 'eat_drink',
        tags: ['cafe'],
        icon: CoffeeIcon,
        address: '202 Boba St, San Francisco, CA'
      }
    ],
    [currentLocation]
  );

  return places;
}
