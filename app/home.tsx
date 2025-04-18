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
import { SafeAreaView, View } from 'dripsy';
import {
  ChatCircleText,
  Check,
  IdentificationBadge,
  MagnifyingGlass,
  NavigationArrow,
  Plus,
  Users
} from 'phosphor-react-native';
import theme from '@/theme';
import { useMapNavigation } from '@/hooks/useMapNavigation';

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
  const [location, setLocation] = useState<[number, number]>([
    -74.006, 40.7128
  ]);
  const {
    cameraRef,
    isFollowing,
    isAtUserLocation,
    moveToUser,
    handleRegionChange,
    onRegionIsChanging
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
        onRegionDidChange={handleRegionChange}
      >
        <Camera
          ref={cameraRef}
          zoomLevel={14}
          centerCoordinate={location}
          animationMode="flyTo"
          animationDuration={0}
          followUserLocation={isFollowing}
        />

        <UserLocation />

        {/* {location && (
            <PointAnnotation id="user" coordinate={location}>
            </PointAnnotation>
        )} */}
      </MapView>

      <SafeAreaView
        sx={{ ...StyleSheet.absoluteFillObject }}
        pointerEvents="box-none"
      >
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingX: '$4'
          }}
        >
          <TouchableOpacity style={styles.button}>
            <MagnifyingGlass size={24} weight="bold" />
          </TouchableOpacity>

          <LogoSVG width={100} style={{ marginTop: -10 }} />

          <View sx={{ flexDirection: 'column', gap: 5 }}>
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
            >
              <Plus size={24} weight="bold" />
            </TouchableOpacity>
          </View>
        </View>

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
      </SafeAreaView>
    </View>
  );
}

export default Home;
