import React, { useState } from 'react';
import theme from '@/theme';
import { router, useGlobalSearchParams } from 'expo-router';
import { View, Text, TextInput } from 'dripsy';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import Button from '../components/Button';
import { toast } from '@backpackapp-io/react-native-toast';
import { useUserStore } from '@/stores/userStore';
import { isValidEmail } from '@/utils';

function EmailLink() {
  const { setUser, setAction } = useUserStore();
  const { connectNewEmail } = useGlobalSearchParams();

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setEmail(email);
    setEmailIsValid(isValidEmail(email));
  };

  const onContinue = () => {
    if (isValidEmail(email)) {
      router.push('/auth/otp');
      setUser({ email });
      setAction('linkEmail');
    } else {
      toast.error('Please enter a valid email address');
      setEmailIsValid(false);
    }
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header
        title="Link your email"
        showBackButton={connectNewEmail === 'true'}
        rightButton={
          <Button
            size="sm"
            onPress={() => router.push('/settings/allow-access')}
            sx={{
              width: 'auto'
            }}
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
        <Text sx={{ textAlign: 'center', maxWidth: '80%' }}>
          Add an email to secure your account and enable additional features
        </Text>

        <TextInput
          sx={{
            backgroundColor: theme.colors.$blue100,
            borderRadius: 16,
            padding: 15,
            width: '100%'
          }}
          autoFocus
          keyboardType="email-address"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />

        <Button
          disabled={!emailIsValid}
          onPress={() => router.push('/email/linked-check')}
        >
          Continue
        </Button>
      </View>
    </SafeAreaWrapper>
  );
}

export default EmailLink;
