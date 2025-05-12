import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import { View, Text } from 'dripsy';
import { router, useGlobalSearchParams } from 'expo-router';
import { useUserStore } from '@/stores/userStore';

function WalletLink() {
  const { connectNewWallet } = useGlobalSearchParams();
  const { action, setAction } = useUserStore();

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header
        title="Link your wallet"
        showBackButton={connectNewWallet === 'true'}
        rightButton={
          <Button
            size="sm"
            width="auto"
            onPress={() => router.push('/settings/allow-access')}
          >
            Skip
          </Button>
        }
      />

      <View
        sx={{
          flex: 1,
          flexDirection: 'col',
          gap: '$5',
          alignItems: 'center',
          justifyContent: 'start',
          paddingTop: 64,
          px: '$4'
        }}
      >
        <Text sx={{ textAlign: 'center', maxWidth: '80%', mb: '$4' }}>
          To fully access Goyto's Web3 features, link your Starknet wallet now.
          Your wallet is needed to claim rewards, check in securely, and verify
          ownership of collectibles.
        </Text>

        <Button
          width="80%"
          onPress={() => {
            router.push(
              action === 'createAccount' ? '/sign-up/wallet' : '/sign-in/wallet'
            );
            setAction('linkWallet');
          }}
        >
          Connect Wallet
        </Button>
        <Button
          width="80%"
          variant="secondary"
          onPress={() => router.push('/wallet/creating')}
        >
          Create new wallet
        </Button>
      </View>
    </SafeAreaWrapper>
  );
}

export default WalletLink;
