import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react';
import { View, Text, TextInput, Image } from 'dripsy';
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
    return nearbyPlaces.reduce((nearest, place) => {
      const dist = getDistance(location, place.coordinates);
      const nearestDist = getDistance(location, nearest.coordinates);
      return dist < nearestDist ? place : nearest;
    }, nearbyPlaces[0]);
  }, [location, nearbyPlaces]);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.present(),
    close: () => bottomSheetRef.current?.close()
  }));

  if (!nearestPlace) return null;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing
      animateOnMount
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
              <View
                style={{
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: 'rgba(0,0,0,0.3)',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  elevation: 1
                }}
              >
                <Image
                  source={nearestPlace.icon}
                  style={{
                    width: 60,
                    height: 60
                  }}
                />
              </View>
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
