import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput } from 'dripsy';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNearbyPlaces } from '@/hooks/useNearbyPlaces';
import { useUserStore } from '@/stores/userStore';
import { getDistance } from '@/utils/geo';
import DistanceIndicator from '../components/DistanceIndicator';
import Button from '../components/Button';
import { CaretRight, Check } from 'phosphor-react-native';
import theme from '@/theme';
import { router } from 'expo-router';

export type CheckinBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const CheckinBottomSheet = forwardRef<CheckinBottomSheetRef>((_, ref) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [], []);

  const { location } = useUserStore();
  const nearbyPlaces = useNearbyPlaces(location || [0, 0]);

  const nearestPlace = useMemo(() => {
    if (!location || !nearbyPlaces || nearbyPlaces.length === 0) return null;
    let nearest = nearbyPlaces[0];
    let minDist = getDistance(
      [location[0], location[1]],
      [nearest.coordinates[0], nearest.coordinates[1]]
    );

    for (let place of nearbyPlaces) {
      const dist = getDistance(
        [location[0], location[1]],
        [place.coordinates[0], place.coordinates[1]]
      );

      if (dist < minDist) {
        minDist = dist;
        nearest = place;
      }
    }

    return nearest;
  }, [location, nearbyPlaces]);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.present(),
    close: () => bottomSheetRef.current?.close()
  }));

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing
    >
      <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: '$3',
            marginBottom: '$4'
          }}
        >
          {location && nearestPlace && (
            <>
              <nearestPlace.Icon
                width={60}
                height={60}
                color="black"
                style={{
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 4
                }}
              />
              <View>
                <Text
                  sx={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    mb: '$2'
                  }}
                >
                  {nearestPlace?.name || 'Unknown Place'}
                </Text>

                <DistanceIndicator
                  userLocation={location}
                  placeLocation={nearestPlace.coordinates}
                />
              </View>
            </>
          )}
        </View>
        <Button
          sx={{
            backgroundColor: '$gray200',
            color: '#000',
            width: '70%',
            mb: '$8'
          }}
          icon={<CaretRight weight="bold" size={20} color="#000" />}
          iconPosition="right"
          onPress={() => router.push('/checkin/nearby-places')}
        >
          I'm some where else
        </Button>

        <TextInput
          placeholder="What's going on?."
          placeholderTextColor={theme.colors.$gray300}
          autoComplete="off"
          autoCorrect={false}
          sx={{
            flex: 1,
            width: '100%',
            fontSize: 16,
            borderRadius: 16,
            marginBottom: '$8',
            padding: '$3',
            backgroundColor: theme.colors.$inputBg
          }}
        />

        <Button
          variant="secondary"
          icon={<Check weight="bold" size={20} />}
          onPress={() => bottomSheetRef.current?.close()}
        >
          I'm here!
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CheckinBottomSheet;
