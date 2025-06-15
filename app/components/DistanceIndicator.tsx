import React, { useEffect, useState } from 'react';
import { View, Text } from 'dripsy';
import * as Location from 'expo-location';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { getBearing, getDistance } from '@/utils/geo';
import { NavigationArrow } from 'phosphor-react-native';
import theme from '@/theme';

type Props = {
  userLocation: [number, number];
  placeLocation: [number, number];
};

function DistanceIndicator({ userLocation, placeLocation }: Props) {
  const [heading, setHeading] = useState<number>(0);

  const distance = getDistance(userLocation, placeLocation);
  const bearingToPlace = getBearing(userLocation, placeLocation);

  // heading from sensor (compass)
  useEffect(() => {
    const subscribe = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      Location.watchHeadingAsync(data => {
        setHeading(data.trueHeading ?? data.magHeading);
      });
    };

    subscribe();
  }, []);

  // Calculate angle between user heading and place direction
  const angle = (bearingToPlace - heading + 360) % 360;

  const rotation = useSharedValue(angle);

  useEffect(() => {
    rotation.value = withTiming(angle, { duration: 200 });
  }, [angle]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }));

  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
      }}
    >
      <Text
        sx={{
          fontSize: 14,
          color: theme.colors.$gray300
        }}
      >
        {distance < 1000
          ? `${Math.round(distance)}m`
          : `${(distance / 1000).toFixed(1)}km`}
      </Text>
      <NavigationArrow
        size={14}
        weight="fill"
        style={[
          {
            transform: [{ rotate: `${angle}deg` }]
          },
          animatedStyle
        ]}
        color={theme.colors.$gray300}
      />
    </View>
  );
}

export default DistanceIndicator;
