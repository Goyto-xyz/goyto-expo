import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, View, Text, Box, TextInput } from 'dripsy';

import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { toast } from '@backpackapp-io/react-native-toast';

import theme from '../../theme';
import Button from '../components/Button';
import { Linking } from 'react-native';
import { useUserStore } from '@/stores/userStore';
import Header from '../components/Header';
import { validateEmail } from '@/utils';

function CreateAccount() {
  const { setUser, setAction } = useUserStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailIsValid(validateEmail(text));
  };

  const onContinue = () => {
    if (validateEmail(email)) {
      setUser({ email });
      setAction('createAccount');
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
      <Header title="Create account" />
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

        <View sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <View
            sx={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)'
            }}
          />
          <Text sx={{ fontSize: 14 }}>or</Text>
          <View
            sx={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)'
            }}
          />
        </View>

        <Button
          variant="secondary"
          onPress={() => router.push('/sign-up/wallet')}
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
          <Text>Already have an account? </Text>
          <Pressable onPress={() => router.push('/sign-in')}>
            <Text sx={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
              Sign in here
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

export default CreateAccount;
