import { generateNearbyCoordinates } from '@/utils';
import { useMemo } from 'react';
import { ImageSourcePropType } from 'react-native';

import CoffeeIcon from '@/assets/map-icons/coffee.png';
import ParkIcon from '@/assets/map-icons/park.png';
import RestaurantIcon from '@/assets/map-icons/restaurant.png';
import { Friend } from './useNearbyFriends';

export type Place = {
  id: string;
  name: string;
  address?: string;
  coordinates: [number, number];
  category: string;
  tags?: string[];
  icon: ImageSourcePropType;
  friends?: {
    id: string;
    name: string;
    avatar: string;
  }[];
};

export function useNearbyPlaces(currentLocation: [number, number]) {
  const generated = generateNearbyCoordinates(currentLocation, 6, 300);

  const allFriends = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'bafkreiefyjkizch5bzv7css3cwz6wsix3nxfvo2inxqmazvoufx2ybrvz4'
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'bafkreies744hij7o5tndy2wpw2zdfdgiro5rmjplbgda7prnux56elc7fe'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      avatar: 'bafkreiclq7ywxurifcfxvp5dgaxjkxhvyid57hlnmx3o5dskknzdgwrxh4'
    },
    {
      id: '4',
      name: 'Diana Prince',
      avatar: 'bafkreihtvrievdsx36afwi6j6x25mlgph5cfkfexx6gvedudatgsnapsyu'
    }
  ];

  const places = useMemo<Place[]>(
    () => [
      {
        id: '1',
        name: 'The Beehive',
        coordinates: generated[0],
        category: 'eat_drink',
        tags: ['cafe', 'fastfood'],
        icon: CoffeeIcon,
        address: '123 Coffee St, San Francisco, CA',
        friends: [allFriends[0], allFriends[1]] // Alice + Bob
      },
      {
        id: '2',
        name: "John's Grill",
        coordinates: generated[1],
        category: 'eat_drink',
        tags: ['restaurant'],
        icon: RestaurantIcon,
        address: '456 Grill Ave, San Francisco, CA',
        friends: [allFriends[2]] // Charlie
      },
      {
        id: '3',
        name: 'The Rotunda',
        coordinates: generated[2],
        category: 'eat_drink',
        tags: ['restaurant'],
        icon: RestaurantIcon,
        address: '789 Rotunda Blvd, San Francisco, CA',

        friends: [] // no one
      },
      {
        id: '4',
        name: 'Union Park',
        coordinates: generated[3],
        category: 'explore',
        tags: ['park', 'picnic-area'],
        icon: ParkIcon,
        address: '101 Union Park Rd, San Francisco, CA',
        friends: [allFriends[3]] // Diana
      },
      {
        id: '5',
        name: 'The Boba Guys',
        coordinates: generated[4],
        category: 'eat_drink',
        tags: ['cafe'],
        icon: CoffeeIcon,
        address: '202 Boba St, San Francisco, CA',
        friends: [] // no one
      }
    ],
    [currentLocation]
  );

  return places;
}
