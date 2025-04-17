import React from 'react';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import { Text } from 'dripsy';
import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';

Mapbox.setAccessToken(Constants.expoConfig?.extra?.mapboxSecretKey || '');

function Home() {
  return (
    <SafeAreaWrapper>
      <Text>{Constants.expoConfig?.extra?.mapboxSecretKey}</Text>
    </SafeAreaWrapper>
  );
}

export default Home;
