import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import { Pressable, Text, View } from 'dripsy';
import ExploringSVG from '@/assets/images/exploring.svg';
import Button from '../components/Button';
import { X } from 'phosphor-react-native';
import { router } from 'expo-router';
import { Alert, Linking } from 'react-native';

function EnableNotifications() {
  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status === 'granted') {
        router.push('/user/create-profile');
      }
    };

    checkPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status, canAskAgain } = await Notifications.getPermissionsAsync();

    if (status === 'granted') {
      router.push('/user/create-profile');
      return;
    }

    if (canAskAgain) {
      await Notifications.requestPermissionsAsync();
      router.push('/user/create-profile');
      return;
    } else {
      Alert.alert(
        'Permission denied permanently',
        'You have denied notifications. Please enable it manually in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings()
          }
        ]
      );
    }
  };

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
          paddingTop: 64,
          px: '$4',
          position: 'relative'
        }}
      >
        <ExploringSVG width="80%" height={300} />

        <Text
          sx={{
            fontSize: 16,
            textAlign: 'center',
            maxWidth: '80%',
            mb: 32
          }}
        >
          Turn on notifications to be sure you get your friend's messages right
          away. Don't miss a chance to connect!
        </Text>

        <Button width="80%" onPress={requestNotificationPermission}>
          Enable Notifications
        </Button>

        <View
          sx={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Pressable
            sx={{
              width: 60,
              height: 60,
              borderRadius: 80,
              backgroundColor: 'rgba(0, 48, 73, 0.3)',
              textAlign: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => router.push('/user/create-profile')}
          >
            <X size={30} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

export default EnableNotifications;
