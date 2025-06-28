import { Friend } from '@/hooks/useNearbyFriends';
import { View, Image } from 'dripsy';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

type Props = {
  friends: Friend[];
  activeFriendId: string | null;
  onFriendSelect: (friend: Friend | null) => void;
};

export default function NearbyFriendsStack({
  friends,
  activeFriendId,
  onFriendSelect
}: Props) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(activeFriendId ? 100 : 0, { duration: 300 });
  }, [activeFriendId]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  return (
    <TouchableWithoutFeedback onPress={() => onFriendSelect(null)}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 140,
            left: 0,
            right: 0,
            paddingLeft: 16,
            paddingRight: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          },
          animatedStyle
        ]}
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
              onPress={() => onFriendSelect(friend)}
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
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
