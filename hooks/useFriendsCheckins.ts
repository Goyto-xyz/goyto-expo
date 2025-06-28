import { useMemo } from 'react';
import { Friend, useNearbyFriends } from './useNearbyFriends';
import { Place, useNearbyPlaces } from './useNearbyPlaces';

export type FriendCheckin = {
  id: string;
  name: string;
  avatar: string;
  coordinates: [number, number];
  place: Place | null;
  timeAgo: string;
  emojiReactions: string[];
};

function getRandomTimeAgo(): string {
  const mins = Math.floor(Math.random() * 20) + 1;
  return `${mins} mins`;
}

function getRandomReactions(): string[] {
  const all = ['❤️', '🔥', '😎', '👍', '✨', '👏', '🍜', '🍹', '👀', '💖'];
  return all
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 1);
}

export function useFriendsCheckins(
  friends: Friend[],
  currentLocation: [number, number]
): FriendCheckin[] {
  const nearbyPlaces = useNearbyPlaces(currentLocation);

  const checkins = useMemo<FriendCheckin[]>(() => {
    return friends.map(friend => {
      const place =
        friend.placeId != null
          ? nearbyPlaces.find(p => p.id === friend.placeId) ?? null
          : null;

      return {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        coordinates: friend.coordinates,
        place,
        timeAgo: getRandomTimeAgo(),
        emojiReactions: getRandomReactions()
      };
    });
  }, [friends, nearbyPlaces]);

  return checkins;
}
