import React from 'react';
import { Pressable, View, Text } from 'dripsy';
import { router } from 'expo-router';
import { CaretRight, EnvelopeOpen, Wallet } from 'phosphor-react-native';

import theme from '@/theme';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import { useUserStore } from '@/stores/userStore';

function SignIn() {
  const { setAction } = useUserStore();

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Sign In" />

      <View sx={{ padding: 16 }}>
        <Pressable
          onPress={() => {
            router.push('/sign-in/wallet');
            setAction('signIn');
          }}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.$secondary,
            paddingY: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.$primary200
          }}
        >
          <View
            sx={{
              backgroundColor: theme.colors.$blue100,
              padding: 12,
              borderRadius: 100
            }}
          >
            <Wallet size={24} weight="regular" />
          </View>
          <Text sx={{ fontSize: 16, marginLeft: 12, flex: 1 }}>
            Sign in with wallet
          </Text>
          <CaretRight size={24} />
        </Pressable>

        {/* Email option */}
        <Pressable
          onPress={() => router.push('/sign-in/email')}
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.$secondary,
            paddingY: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.$primary200
          }}
        >
          <View
            sx={{
              backgroundColor: theme.colors.$blue100,
              padding: 12,
              borderRadius: 100
            }}
          >
            <EnvelopeOpen size={24} weight="regular" />
          </View>
          <Text sx={{ fontSize: 16, marginLeft: 12, flex: 1 }}>
            Sign in with email
          </Text>
          <CaretRight size={24} />
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}

export default SignIn;
