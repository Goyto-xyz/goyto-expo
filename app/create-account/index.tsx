import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, View, Text, Box, TextInput } from 'dripsy';

import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { ArrowLeft } from 'phosphor-react-native';
import { toast } from '@backpackapp-io/react-native-toast';

import theme from '../theme';
import Button from '../components/Button';
import { Linking } from 'react-native';
import { useUserStore } from '@/stores/userStore';

function CreateAccount() {
  const { setUser, setAction } = useUserStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
      backgroundColor={theme.colors.$primary}
      sx={{ backgroundColor: '$primary' }}
    >
      <View sx={{ flexDirection: 'row', alignItems: 'center', paddingX: '$6' }}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
        <Text
          sx={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'InterBold',
            fontSize: 18
          }}
        >
          Create account
        </Text>
        <Box sx={{ width: 24 }} />
      </View>

      <View
        sx={{
          flex: 1,
          flexDirection: 'col',
          gap: '$5',
          alignItems: 'center',
          justifyContent: 'start',
          paddingTop: 64,
          paddingX: '$4',
          width: 400
        }}
      >
        <Text sx={{ fontSize: 16, textAlign: 'center' }}>
          Enter your email address to continue
        </Text>

        <TextInput
          sx={{
            bg: '#fff',
            borderRadius: 16,
            padding: '$2',
            width: '100%',
            height: 48
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="hello@goyto.xyz"
          value={email}
          onChangeText={handleEmailChange}
        />

        <Button width="100%" disabled={!emailIsValid} onPress={onContinue}>
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
          width="100%"
          variant="secondary"
          onPress={() => router.push('/sign-up/wallet')}
        >
          Connect wallet
        </Button>

        <Text sx={{ fontSize: 14, textAlign: 'center' }}>
          Already have an account?{' '}
          <Pressable onPress={() => router.push('/sign-in')}>
            <Text sx={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
              Sign in here
            </Text>
          </Pressable>
        </Text>

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
