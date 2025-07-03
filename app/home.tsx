import React, { useEffect, useRef, useState } from 'react';
import Mapbox, {
  Camera,
  MapView,
  MarkerView,
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
import CheckinBottomSheet, {
  CheckinBottomSheetRef
} from './bottom-sheet/checkin-form';
import FriendsCheckinSlider, {
  FriendsCheckinSliderRef
} from './checkin/friends-checkin-slider';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { wrapAnimatedSvgIcon } from '@/utils';
import PlaceDetails, { PlaceDetailsRef } from './bottom-sheet/place-details';

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
  const nearbyFriends = useNearbyFriends(location);

  const mapRef = useRef<MapView | null>(null);
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

  const checkInSheetRef = useRef<CheckinBottomSheetRef>(null);
  const placeDetailsRef = useRef<PlaceDetailsRef>(null);

  const sliderRef = useRef<FriendsCheckinSliderRef>(null);
  const [activeFriendId, setActiveFriendId] = useState<string | null>(null);
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null);

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
        ref={mapRef}
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
        onPress={() => {
          setActiveFriendId(null);
          setActivePlaceId(null);
          checkInSheetRef.current?.close();
          placeDetailsRef.current?.close();
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
          const isActive = activeFriendId === friend.id;
          const scale = useSharedValue(isActive ? 1.5 : 1);

          useEffect(() => {
            scale.value = withTiming(isActive ? 1.5 : 1, {
              duration: 300
            });
          }, [activeFriendId]);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.get() }]
          }));

          return (
            <MarkerView
              key={`${friend.id}`}
              id={`${friend.id}`}
              coordinate={friend.coordinates}
            >
              <TouchableOpacity
                onPress={() => {
                  setActiveFriendId(friend.id);
                  setActivePlaceId(null);
                  sliderRef.current?.scrollToFriend(friend.id);
                  cameraRef.current?.moveTo(friend.coordinates, 500);
                  placeDetailsRef.current?.close();
                }}
              >
                <Animated.View
                  style={[
                    {
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
                    },
                    animatedStyle
                  ]}
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
                </Animated.View>
              </TouchableOpacity>
            </MarkerView>
          );
        })}

        {nearbyPlaces.map(place => {
          const isActive = activePlaceId === place.id;
          const scale = useSharedValue(isActive ? 1.5 : 1);

          useEffect(() => {
            scale.value = withTiming(isActive ? 1.5 : 1, {
              duration: 300
            });
          }, [activePlaceId]);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.get() }]
          }));

          return (
            <MarkerView
              key={`${place.id}`}
              id={`${place.id}`}
              coordinate={place.coordinates}
              style={{
                position: 'relative',
                zIndex: 1
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setActivePlaceId(place.id);
                  setActiveFriendId(null);
                  cameraRef.current?.moveTo(
                    [place.coordinates[0], place.coordinates[1] - 0.001],
                    500
                  );
                  placeDetailsRef.current?.open(place.id);
                }}
              >
                <Animated.View
                  style={[
                    {
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
                    },
                    animatedStyle
                  ]}
                >
                  <Image
                    source={place.icon}
                    style={[
                      {
                        width: 40,
                        height: 40
                      }
                    ]}
                  />
                </Animated.View>
              </TouchableOpacity>
            </MarkerView>
          );
        })}
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
            {!activeFriendId && (
              <NearbyFriendsStack
                friends={nearbyFriends}
                activeFriendId={activeFriendId}
                onFriendSelect={friend => {
                  if (friend) {
                    setActiveFriendId(friend.id);
                    setActivePlaceId(null);
                    sliderRef.current?.scrollToFriend(friend.id);
                    cameraRef.current?.moveTo(friend.coordinates, 500);
                  } else {
                    setActiveFriendId(null);
                  }
                }}
              />
            )}

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

            <PlaceDetails
              ref={placeDetailsRef}
              onClose={() => {
                setActivePlaceId(null);
              }}
            />

            <FriendsCheckinSlider
              ref={sliderRef}
              friends={nearbyFriends}
              selectedId={activeFriendId}
              onSlideChange={friend => {
                setActiveFriendId(friend.id);
                cameraRef.current?.moveTo(friend.coordinates, 500);
              }}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

export default Home;
