import React from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import theme from '@/theme';
import { View, Text, TextInput, Pressable } from 'dripsy';
import { router } from 'expo-router';
import Button from '../components/Button';

function NewWallet() {
  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Your new wallet" />

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
        <Text>Wallet address</Text>

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
          onPress={() => router.push('/wallet/recovery-phrase')}
        >
          Continue
        </Button>

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/wallet/creating'
            })
          }
        >
          <Text
            sx={{
              textDecorationLine: 'underline'
            }}
          >
            Regenerate wallet
          </Text>
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}

export default NewWallet;
