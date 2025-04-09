import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { DripsyProvider, makeTheme } from 'dripsy';
import theme from './theme';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <DripsyProvider theme={theme}>
      <Stack>
        {/* Home or Splash screen */}
        <Stack.Screen
          name={isLoggedIn ? 'home' : 'welcome'}
          options={{ headerShown: false }}
        />
        {/* Auth */}
        {/* <Stack.Screen
        name="create-account"
        options={{ title: 'Create Account' }}
      /> */}
        {/* <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} /> */}
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
    </DripsyProvider>
  );
}
