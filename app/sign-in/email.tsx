import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, View, Text, Box, TextInput } from 'dripsy';

import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { toast } from '@backpackapp-io/react-native-toast';

import theme from '../../theme';
import Button from '../components/Button';
import { Linking } from 'react-native';
import { useUserStore } from '@/stores/userStore';
import Header from '../components/Header';
import { isValidEmail } from '@/utils';

function SignInWithEmail() {
  const { setUser, setAction } = useUserStore();
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailIsValid(isValidEmail(text));
  };

  const onContinue = () => {
    if (isValidEmail(email)) {
      setUser({ email });
      setAction('signIn');
      router.push('/auth/otp');
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
      <Header title="Sign in" />
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
        <Text>Enter your email address to continue</Text>

        <TextInput
          sx={{
            bg: '#fff',
            borderRadius: 16,
            padding: '$2',
            width: '100%',
            height: 48,
            px: '$5'
          }}
          autoFocus
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="hello@goyto.xyz"
          value={email}
          onChangeText={handleEmailChange}
        />

        <Button
          disabled={!emailIsValid}
          onPress={onContinue}
          sx={{
            width: '80%'
          }}
        >
          Continue
        </Button>

        <View
          sx={{
            width: '100%',
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)'
          }}
        />

        <Button
          variant="secondary"
          onPress={() => router.push('/sign-in/wallet')}
          sx={{
            width: '80%'
          }}
        >
          Connect wallet
        </Button>

        <View
          sx={{
            fontSize: 14,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => router.push('/sign-up/email')}>
            <Text sx={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
              Sign up now
            </Text>
          </Pressable>
        </View>

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

export default SignInWithEmail;
