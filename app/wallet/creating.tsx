import React, { useEffect } from 'react';
import Header from '../components/Header';
import theme from '@/theme';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { router } from 'expo-router';
import { View, Text } from 'dripsy';
import SecuritySVG from '@/assets/images/security.svg';

function WalletCreating() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/wallet/new');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Creating your wallet" />

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
        <Text sx={{ textAlign: 'center', maxWidth: '80%' }}>
          We're setting up your secure Web3 wallet. This may take a few seconds.
        </Text>

        <SecuritySVG width="80%" />
      </View>
    </SafeAreaWrapper>
  );
}

export default WalletCreating;
