import { Stack } from 'expo-router';
import SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DripsyProvider } from 'dripsy';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toasts } from '@backpackapp-io/react-native-toast';
import {
  useFonts,
  BalsamiqSans_700Bold
} from '@expo-google-fonts/balsamiq-sans';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import { SpaceGrotesk_400Regular } from '@expo-google-fonts/space-grotesk';

import theme from '../theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BalsamiqSans: BalsamiqSans_700Bold,
    InterRegular: Inter_400Regular,
    InterMSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    SpaceGrotesk: SpaceGrotesk_400Regular
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };

    const prepare = async () => {
      await checkToken();
      setAppIsReady(true);
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <DripsyProvider theme={theme}>
      <GestureHandlerRootView>
        <Stack onLayout={onLayoutRootView}>
          {/* Home or Splash screen */}
          <Stack.Screen
            name={isLoggedIn ? 'home' : 'onboarding'}
            options={{ headerShown: false }}
          />
          {/* Auth */}
          <Stack.Screen name="sign-up/email" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in/email" options={{ headerShown: false }} />
          <Stack.Screen
            name="sign-in/wallet"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="sign-up/wallet"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="auth/otp" options={{ headerShown: false }} />

          {/* Wallet + Email linking */}
          <Stack.Screen
            name="email/linked-check"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="email/link" options={{ headerShown: false }} />
          <Stack.Screen
            name="wallet/creating"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="wallet/link" options={{ headerShown: false }} />
          <Stack.Screen
            name="wallet/linked-check"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="wallet/new" options={{ headerShown: false }} />
          <Stack.Screen
            name="wallet/recovery-phrase"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="wallet/verify-phrase"
            options={{ headerShown: false }}
          />

          {/* Permissions */}
          <Stack.Screen
            name="settings/allow-access"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/find-contacts"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/notifications"
            options={{ headerShown: false }}
          />

          {/* User */}
          <Stack.Screen
            name="user/create-profile"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="user/welcome" options={{ headerShown: false }} />
        </Stack>
        <Toasts />
      </GestureHandlerRootView>
    </DripsyProvider>
  );
}
