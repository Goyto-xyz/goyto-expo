import React, { useEffect, useRef, useState } from 'react';
import Mapbox, {
  Camera,
  MapView,
  MarkerView,
  PointAnnotation,
  UserLocation
} from '@rnmapbox/maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Alert, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import LogoSVG from '@/assets/images/logo.svg';
import PinSVG from '@/assets/images/pin.svg';
import { SafeAreaView, Text, View, Image } from 'dripsy';
import {
  ChatCircleText,
  Check,
  IdentificationBadge,
  MagnifyingGlass,
  NavigationArrow,
  Plus,
  Users,
  X
} from 'phosphor-react-native';
import theme from '@/theme';
import { useMapNavigation } from '@/hooks/useMapNavigation';
import Button from './components/Button';
import { router } from 'expo-router';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { useNearbyPlaces } from '@/hooks/useNearbyPlaces';
import { useNearbyFriends } from '@/hooks/useNearbyFriends';
import NearbyFriendsStack from './components/NearByFriendsStack';
import { useUserStore } from '@/stores/userStore';
import CheckinBottomSheet, { MyBottomSheetRef } from './bottom-sheet/CheckIn';

Mapbox.setAccessToken(Constants.expoConfig?.extra?.mapboxSecretKey || '');

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    backgroundColor: theme.colors.$gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  }
});

function Home() {
  const { setLocation: setLocationStorage } = useUserStore();
  const { setCoordinates } = useAddPlaceStore();
  const [isAdding, setIsAdding] = useState(false);
  const [location, setLocation] = useState<[number, number]>([
    -74.006, 40.7128
  ]);

  const nearbyPlaces = useNearbyPlaces(location);
  const nearbyFriends = useNearbyFriends(location, nearbyPlaces);

  const {
    cameraRef,
    isFollowing,
    isAtUserLocation,
    centerPinLocation,
    moveToUser,
    handleRegionChange,
    onRegionIsChanging,
    onUserLocationUpdate
  } = useMapNavigation(location);

  const checkInSheetRef = useRef<MyBottomSheetRef>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (canAskAgain) {
          await Location.requestForegroundPermissionsAsync();
        } else {
          Alert.alert(
            'Permission denied permanently',
            'You have denied location access. Please enable it manually in Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings()
              }
            ]
          );
        }
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation([
        currentLocation.coords.longitude,
        currentLocation.coords.latitude
      ]);

      setLocationStorage([
        currentLocation.coords.longitude,
        currentLocation.coords.latitude
      ]);
    };

    getCurrentLocation();
  }, []);

  return (
    <View sx={{ flex: 1 }}>
      <MapView
        scaleBarEnabled={false}
        style={{
          flex: 1
        }}
        onCameraChanged={onRegionIsChanging}
        onRegionDidChange={e => {
          if (isAdding) {
            onUserLocationUpdate(e);
          } else {
            handleRegionChange(e);
          }
        }}
      >
        <Camera
          ref={cameraRef}
          zoomLevel={15}
          centerCoordinate={location}
          animationMode="none"
          animationDuration={0}
          followUserLocation={isFollowing}
        />

        <UserLocation />

        {nearbyFriends.map(friend => {
          return (
            <MarkerView
              key={`${friend.id}`}
              id={`${friend.id}`}
              coordinate={friend.coordinates}
            >
              <View
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: 'rgba(0,0,0,0.3)',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 15,
                  elevation: 10
                }}
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
              </View>
            </MarkerView>
          );
        })}

        {nearbyPlaces.map(place => (
          <PointAnnotation
            key={`${place.id}`}
            id={`${place.id}`}
            coordinate={place.coordinates}
            style={{
              position: 'relative',
              zIndex: 1
            }}
          >
            <View
              sx={{
                width: 100,
                height: 100,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: 'rgba(0,0,0,0.3)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 15,
                elevation: 10
              }}
            >
              <place.Icon width={40} height={40} />
            </View>
          </PointAnnotation>
        ))}
      </MapView>

      <SafeAreaView
        sx={{ ...StyleSheet.absoluteFillObject }}
        pointerEvents="box-none"
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: isAdding ? 'center' : 'flex-start',
            justifyContent: 'space-between',
            px: '$4'
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (isAdding) {
                moveToUser();
              } else {
                router.push('/search');
              }
            }}
          >
            {isAdding ? (
              <NavigationArrow
                size={24}
                weight="bold"
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            ) : (
              <MagnifyingGlass size={24} weight="bold" />
            )}
          </TouchableOpacity>

          {isAdding ? (
            <Text sx={{ fontSize: 20, fontWeight: 700 }}>Add Place</Text>
          ) : (
            <LogoSVG width={100} style={{ marginTop: -10 }} />
          )}

          <View sx={{ flexDirection: 'column', gap: 5 }}>
            {isAdding ? (
              <TouchableOpacity
                style={{
                  ...styles.button
                }}
                onPress={() => setIsAdding(false)}
              >
                <X size={24} weight="bold" />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6
                  }}
                  onPress={() => router.push('/friends/search')}
                >
                  <Users size={24} weight="bold" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6
                  }}
                  onPress={() => setIsAdding(true)}
                >
                  <Plus size={24} weight="bold" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {isAdding ? (
          <>
            <View
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: '-50%' }]
              }}
            >
              <PinSVG width={40} height={40} />
            </View>
            <View
              sx={{
                position: 'absolute',
                bottom: 50,
                left: 0,
                right: 0,
                px: '$4'
              }}
            >
              <Button
                onPress={() => {
                  if (centerPinLocation) {
                    setCoordinates({
                      latitude: centerPinLocation?.[1],
                      longitude: centerPinLocation?.[0]
                    });
                  }
                  router.push('/place/add/select-category');
                }}
              >
                Add place here
              </Button>
            </View>
          </>
        ) : (
          <>
            <NearbyFriendsStack
              friends={nearbyFriends}
              onFriendSelect={friend => {
                if (cameraRef.current) {
                  cameraRef.current.flyTo(friend.coordinates, 500);
                }
              }}
            />

            <View
              sx={{
                position: 'absolute',
                bottom: 50,
                alignSelf: 'center',
                width: 'fit-content',
                padding: 15,
                maxHeight: 70,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 30,
                backgroundColor: '#fff'
              }}
            >
              <TouchableOpacity style={{ ...styles.button }}>
                <ChatCircleText
                  size={30}
                  weight="bold"
                  color={theme.colors.$primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  backgroundColor: isAtUserLocation
                    ? theme.colors.$secondary
                    : theme.colors.$primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  if (!isAtUserLocation) {
                    moveToUser();
                  } else {
                    checkInSheetRef.current?.open();
                  }
                }}
              >
                {isAtUserLocation ? (
                  <Check
                    size={30}
                    weight="bold"
                    color={theme.colors.$primary}
                  />
                ) : (
                  <NavigationArrow
                    size={30}
                    weight="bold"
                    color="#fff"
                    style={{ transform: [{ rotate: '90deg' }] }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={{ ...styles.button }}>
                <IdentificationBadge
                  size={30}
                  weight="bold"
                  color={theme.colors.$primary}
                />
              </TouchableOpacity>
            </View>

            <CheckinBottomSheet ref={checkInSheetRef} />
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

export default Home;
