import React from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import Header from '../components/Header';
import { View, Text, TextInput, Pressable } from 'dripsy';
import Button from '../components/Button';
import { router } from 'expo-router';

function EmailLinkedCheck() {
  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Your email" showBackButton={false} />

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
        <Text>Your linked email</Text>

        <TextInput
          editable={false}
          value={'johndoe@example.com'}
          style={{
            backgroundColor: theme.colors.$blue100,
            borderRadius: 16,
            padding: 15,
            width: '100%'
          }}
        />

        <Button onPress={() => router.push('/settings/allow-access')}>
          Continue
        </Button>

        <Pressable
          onPress={() =>
            router.push({
              pathname: '/email/link',
              params: { connectNewEmail: 'true' }
            })
          }
        >
          <Text
            sx={{
              textDecorationLine: 'underline'
            }}
          >
            Connect another email
          </Text>
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
}

export default EmailLinkedCheck;
