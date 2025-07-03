import { generateNearbyCoordinates } from '@/utils';
import { Place, useNearbyPlaces } from './useNearbyPlaces';
import { useMemo } from 'react';

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  coordinates: [number, number];
  placeId?: string | null;
};

function offsetCoordinate(
  coordinate: [number, number],
  distanceInMeters: number,
  bearingInDegrees: number
): [number, number] {
  const R = 6_378_100; // Earth radius in meters
  const bearing = (bearingInDegrees * Math.PI) / 180;
  const lng = coordinate[0];
  const lat = coordinate[1];

  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const newLat = Math.asin(
    Math.sin(latRad) * Math.cos(distanceInMeters / R) +
      Math.cos(latRad) * Math.sin(distanceInMeters / R) * Math.cos(bearing)
  );

  const newLng =
    lngRad +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distanceInMeters / R) * Math.cos(latRad),
      Math.cos(distanceInMeters / R) - Math.sin(latRad) * Math.sin(newLat)
    );

  return [(newLng * 180) / Math.PI, (newLat * 180) / Math.PI];
}
function generateFriendLocations(
  nearbyPlaces: Place[],
  currentLocation: [number, number],
  count: number
): { coordinates: [number, number]; placeId: string | null }[] {
  const friendLocations: {
    coordinates: [number, number];
    placeId: string | null;
  }[] = [];

  // Assign friends to existing places (max 2)
  const shuffledPlaces = [...nearbyPlaces].sort(() => 0.5 - Math.random());
  const numFromPlaces = Math.min(2, shuffledPlaces.length);

  for (let i = 0; i < numFromPlaces; i++) {
    const place = shuffledPlaces[i];
    const offsetCoord = offsetCoordinate(place.coordinates, 25, 135);

    friendLocations.push({
      coordinates: offsetCoord,
      placeId: place.id
    });
  }

  // Generate remaining friends near currentLocation
  const remaining = count - friendLocations.length;
  const generatedCoords = generateNearbyCoordinates(
    currentLocation,
    remaining,
    1000
  );

  for (let i = 0; i < generatedCoords.length; i++) {
    friendLocations.push({
      coordinates: generatedCoords[i],
      placeId: null
    });
  }

  return friendLocations;
}

export function useNearbyFriends(currentLocation: [number, number]) {
  const nearbyPlaces = useNearbyPlaces(currentLocation);
  const locations = useMemo(
    () => generateFriendLocations(nearbyPlaces, currentLocation, 4),
    [currentLocation, nearbyPlaces]
  );

  const friends = useMemo<Friend[]>(
    () => [
      {
        id: '1',
        name: 'Alice Johnson',
        avatar: 'bafkreiefyjkizch5bzv7css3cwz6wsix3nxfvo2inxqmazvoufx2ybrvz4',
        coordinates: locations[0].coordinates
      },
      {
        id: '2',
        name: 'Bob Smith',
        avatar: 'bafkreies744hij7o5tndy2wpw2zdfdgiro5rmjplbgda7prnux56elc7fe',
        coordinates: locations[1].coordinates
      },
      {
        id: '3',
        name: 'Charlie Brown',
        avatar: 'bafkreiclq7ywxurifcfxvp5dgaxjkxhvyid57hlnmx3o5dskknzdgwrxh4',
        coordinates: locations[2].coordinates
      },
      {
        id: '4',
        name: 'Diana Prince',
        avatar: 'bafkreihtvrievdsx36afwi6j6x25mlgph5cfkfexx6gvedudatgsnapsyu',
        coordinates: locations[3].coordinates
      }
    ],
    [currentLocation]
  );

  return friends;
}
