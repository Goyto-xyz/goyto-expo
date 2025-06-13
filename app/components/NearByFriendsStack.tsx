import { Friend } from '@/hooks/useNearbyFriends';
import { View, Image } from 'dripsy';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

type Props = {
  friends: Friend[];
  onFriendSelect: (friend: Friend) => void;
};

export default function NearbyFriendsStack({ friends, onFriendSelect }: Props) {
  const [activeFriendId, setActiveFriendId] = useState<string | null>(null);

  const onFriendSelected = (friend: Friend) => {
    setActiveFriendId(friend.id);
    onFriendSelect(friend);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setActiveFriendId(null)}>
      <View
        sx={{
          position: 'absolute',
          bottom: 140,
          left: 0,
          right: 0,
          px: '$4',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        {friends.slice(0, 5).map((friend, index) => {
          const isActive = activeFriendId === friend.id;
          const offset = index * -5;

          return (
            <TouchableOpacity
              key={friend.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0,
                zIndex: isActive ? 99 : friends.length - index,
                marginLeft: offset,
                borderRadius: 12,
                borderWidth: isActive ? 2 : 0,
                borderColor: isActive ? '#00A3FF' : 'transparent',
                shadowColor: isActive
                  ? 'rgba(0,0,0,0.3)'
                  : 'rgba(0,163,255,0.3)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 20
              }}
              onPress={() => onFriendSelected(friend)}
            >
              <Image
                source={{
                  uri: `${Constants.expoConfig?.extra?.pinataGatewayUrl}/ipfs/${friend.avatar}`
                }}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 12
                }}
                resizeMode="contain"
                fadeDuration={0}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </TouchableWithoutFeedback>
  );
}
