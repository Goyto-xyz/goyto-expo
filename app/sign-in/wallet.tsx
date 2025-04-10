import React from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import { View, Text, A } from 'dripsy';
import Header from '../components/Header';
import Button from '../components/Button';
import ArgentXSVG from '@/assets/images/argentx.svg';
import BraavosSVG from '@/assets/images/braavos.svg';
import { router } from 'expo-router';
import { Linking } from 'react-native';
import { useUserStore } from '@/stores/userStore';

function SignInWithWallet() {
  const { action } = useUserStore();

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Connect your wallet" />

      <View
        sx={{
          flex: 1,
          flexDirection: 'col',
          gap: '$5',
          alignItems: 'center',
          justifyContent: 'start',
          paddingTop: 64,
          paddingX: '$4'
        }}
      >
        <Text sx={{ marginBottom: '$4' }}>
          Use your Web3 wallet for seamless and secure login
        </Text>

        <Button
          icon={<ArgentXSVG width={24} height={24} />}
          width="80%"
          onPress={() =>
            router.push(
              action === 'linkWallet'
                ? '/settings/allow-access'
                : '/email/linked-check'
            )
          }
        >
          <Text sx={{ textTransform: 'none' }}>Argent Mobile</Text>
        </Button>

        <Button
          icon={<BraavosSVG width={24} height={24} />}
          width="80%"
          onPress={() =>
            router.push(
              action === 'linkWallet'
                ? '/settings/allow-access'
                : '/email/linked-check'
            )
          }
        >
          <Text sx={{ textTransform: 'none' }}>Braavos</Text>
        </Button>

        <View
          sx={{
            width: '100%',
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)'
          }}
        />

        {action !== 'linkWallet' && (
          <Button
            variant="secondary"
            width="80%"
            onPress={() => router.push('/sign-in/email')}
          >
            Sign in with email
          </Button>
        )}

        <Text sx={{ fontSize: 12, textAlign: 'center', mt: 2 }}>
          By using Goyoto you agree to{' '}
          <Text
            onPress={() => Linking.openURL('#')}
            sx={{ textDecorationLine: 'underline' }}
          >
            our terms
          </Text>{' '}
          and{' '}
          <Text
            onPress={() => Linking.openURL('#')}
            sx={{ textDecorationLine: 'underline' }}
          >
            privacy policy
          </Text>
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}

export default SignInWithWallet;
