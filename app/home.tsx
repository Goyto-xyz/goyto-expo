import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import Mapbox, {
  Camera,
  MapView,
  PointAnnotation,
  UserLocation
} from '@rnmapbox/maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Alert, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import LogoSVG from '@/assets/images/logo.svg';
import PinSVG from '@/assets/images/pin.svg';
import { SafeAreaView, Text, View } from 'dripsy';
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
  const [isAdding, setIsAdding] = useState(false);
  const [location, setLocation] = useState<[number, number]>([
    -74.006, 40.7128
  ]);
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
        onRegionIsChanging={onRegionIsChanging}
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

        {!isAdding && <UserLocation />}
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
            paddingX: '$4'
          }}
        >
          <TouchableOpacity style={styles.button}>
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
                transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
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
                paddingX: '$4'
              }}
            >
              <Button
                onPress={() =>
                  console.log(centerPinLocation?.[0], centerPinLocation?.[1])
                }
              >
                Add place here
              </Button>
            </View>
          </>
        ) : (
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
                backgroundColor: theme.colors.$primary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                if (!isAtUserLocation) {
                  moveToUser();
                } else {
                  Alert.alert('Check-in', 'You have checked in!');
                }
              }}
            >
              {isAtUserLocation ? (
                <Check size={30} weight="bold" color="#fff" />
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
        )}
      </SafeAreaView>
    </View>
  );
}

export default Home;
