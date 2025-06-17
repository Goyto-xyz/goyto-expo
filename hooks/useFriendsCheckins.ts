import { useMemo } from 'react';
import { useNearbyFriends } from './useNearbyFriends';
import { Place, useNearbyPlaces } from './useNearbyPlaces';

export type FriendCheckin = {
  id: string;
  name: string;
  avatar: string;
  location: [number, number];
  place: string;
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
  currentLocation: [number, number]
): FriendCheckin[] {
  const friends = useNearbyFriends(currentLocation);
  const nearbyPlaces = useNearbyPlaces(currentLocation);

  const checkins = useMemo<FriendCheckin[]>(() => {
    return friends.map(friend => {
      const placeName =
        friend.placeId != null
          ? nearbyPlaces.find(p => p.id === friend.placeId)?.name ??
            'Unknown Place'
          : 'Somewhere nearby';

      return {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        location: friend.coordinates,
        place: placeName,
        timeAgo: getRandomTimeAgo(),
        emojiReactions: getRandomReactions()
      };
    });
  }, [friends, nearbyPlaces]);

  return checkins;
}
