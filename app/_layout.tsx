import { Stack } from 'expo-router';
import SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
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
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BalsamiqSans: BalsamiqSans_700Bold,
    InterRegular: Inter_400Regular,
    InterMSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    SpaceGrotesk: SpaceGrotesk_400Regular
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      setAppIsReady(true);
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <DripsyProvider theme={theme}>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack onLayout={onLayoutRootView}>
            {/* Home or Splash screen */}
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />

            {/* Auth */}
            <Stack.Screen
              name="sign-up/email"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="sign-in/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="sign-in/email"
              options={{ headerShown: false }}
            />
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
            <Stack.Screen
              name="user/welcome"
              options={{ headerShown: false }}
            />

            {/* Place */}
            <Stack.Screen
              name="place/add/select-category"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/name"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/details"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/tags"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/snippet"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/phone"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/email"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="place/add/social"
              options={{ headerShown: false, presentation: 'modal' }}
            />

            {/* Search */}
            <Stack.Screen
              name="search"
              options={{ headerShown: false, presentation: 'modal' }}
            />

            {/* Messages Modals */}
            <Stack.Screen
              name="messages/_modal"
              options={{ headerShown: false, presentation: 'modal' }}
            />
          </Stack>
          <Toasts />
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </DripsyProvider>
  );
}
