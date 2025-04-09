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

import theme from '../theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BalsamiqSans: BalsamiqSans_700Bold,
    InterRegular: Inter_400Regular,
    InterMSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold
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
            name={isLoggedIn ? 'home' : 'welcome'}
            options={{ headerShown: false }}
          />
          {/* Auth */}
          <Stack.Screen
            name="create-account/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
          {/* <Stack.Screen
        name="sign-in/email"
        options={{ title: 'Sign In with Email' }}
      /> */}
          {/* <Stack.Screen
        name="sign-in/wallet"
        options={{ title: 'Sign In with Wallet' }}
      /> */}
          {/* <Stack.Screen
        name="sign-up/wallet"
        options={{ title: 'Sign Up with Wallet' }}
      /> */}
          {/* <Stack.Screen name="auth/otp" options={{ title: 'OTP Verification' }} /> */}

          {/* Wallet + Email linking */}
          {/* <Stack.Screen
        name="email/linked-check"
        options={{ title: 'Email Linked Check' }}
      /> */}
          {/* <Stack.Screen name="email/link" options={{ title: 'Link Email' }} /> */}
          {/* <Stack.Screen
        name="wallet/creating"
        options={{ title: 'Creating Wallet' }}
      /> */}
          {/* <Stack.Screen name="wallet/link" options={{ title: 'Link Wallet' }} /> */}
          {/* <Stack.Screen
        name="wallet/linked-check"
        options={{ title: 'Wallet Linked Check' }}
      /> */}
          {/* <Stack.Screen name="wallet/new" options={{ title: 'New Wallet' }} /> */}
          {/* <Stack.Screen
        name="wallet/recovery-phrase"
        options={{ title: 'Recovery Phrase' }}
      /> */}
          {/* <Stack.Screen
        name="wallet/verify-phrase"
        options={{ title: 'Verify Phrase' }}
      /> */}

          {/* Permissions */}
          {/* <Stack.Screen name="allow-access" options={{ title: 'Allow Access' }} /> */}
          {/* <Stack.Screen
        name="find-contacts"
        options={{ title: 'Find My Friends' }}
      /> */}
        </Stack>
        <Toasts />
      </GestureHandlerRootView>
    </DripsyProvider>
  );
}
