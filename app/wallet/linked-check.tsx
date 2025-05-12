import React from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import Header from '../components/Header';
import { View, Text, TextInput, Pressable } from 'dripsy';
import Button from '../components/Button';
import { router } from 'expo-router';

function WalletLinkedCheck() {
  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Your wallet" showBackButton={false} />

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
        <Text>Your linked Starknet wallet</Text>

        <TextInput
          editable={false}
          multiline
          value={
            '0x06Dd90bE1C00DE72BCdb250879E49d676E966fD4C9959f23D8B56Fa0e9171E50'
          }
          style={{
            backgroundColor: theme.colors.$blue100,
            borderRadius: 16,
            padding: 15,
            width: '100%',
            fontFamily: 'SpaceGrotesk'
          }}
        />

        <Button
          width="80%"
          onPress={() => router.push('/settings/allow-access')}
        >
          Continue
        </Button>

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/wallet/link',
              params: { connectNewWallet: 'true' }
            })
          }
        >
          <Text
            sx={{
              textDecorationLine: 'underline'
            }}
          >
            Connect another wallet
          </Text>
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}

export default WalletLinkedCheck;
