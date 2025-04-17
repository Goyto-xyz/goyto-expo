import React, { useEffect, useRef, useState } from 'react';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import Mapbox, { Camera, MapView } from '@rnmapbox/maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Alert, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import LogoSVG from '@/assets/images/logo.svg';
import { SafeAreaView, View } from 'dripsy';
import { MagnifyingGlass, Plus, Users } from 'phosphor-react-native';
import theme from '@/theme';

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
  const [location, setLocation] = useState<number[]>([-74.006, 40.7128]);

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
      >
        <Camera
          zoomLevel={14}
          centerCoordinate={location}
          animationMode="none"
          animationDuration={0}
        />
      </MapView>

      <SafeAreaView
        sx={{ ...StyleSheet.absoluteFillObject }}
        pointerEvents="none"
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

          <LogoSVG width={100} />

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
      </SafeAreaView>
      {/* <View
        sx={{ ...StyleSheet.absoluteFillObject, paddingX: '$6', paddingY: 30 }}
      >
        <SafeAreaWrapper
          backgroundColor="transparent"
          sx={{ backgroundColor: 'transparent' }}
        >
          <View sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <LogoSVG width={100} />
          </View>
        </SafeAreaWrapper>
      </View> */}
    </View>
  );
}

export default Home;
