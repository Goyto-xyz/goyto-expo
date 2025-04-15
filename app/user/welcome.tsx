import React from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import { Text, View } from 'dripsy';
import TravelSVG from '@/assets/images/travel.svg';
import Button from '../components/Button';
import { router } from 'expo-router';

function Welcome() {
  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <View
        sx={{
          flex: 1,
          flexDirection: 'col',
          gap: '$5',
          alignItems: 'center',
          justifyContent: 'start',
          paddingTop: 32,
          paddingX: '$5'
        }}
      >
        <Text
          sx={{
            fontFamily: 'BalsamiqSans',
            fontSize: 24,
            textTransform: 'uppercase',
            marginBottom: 50
          }}
        >
          Good to go
        </Text>
        <TravelSVG width="80%" height={300} />

        <Text sx={{ fontSize: 16, textAlign: 'center' }}>
          Goyoto makes it fun an easy to keep up with your friends in the real
          world. Add your favorite places, check in, and share what's up.
        </Text>
        <Text sx={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
          Most of all...have fun
        </Text>

        <Button onPress={() => router.push('/home')}>Roger Roger!</Button>
      </View>
    </SafeAreaWrapper>
  );
}

export default Welcome;
