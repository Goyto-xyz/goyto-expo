import { View, Text } from 'dripsy';
import { router } from 'expo-router';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import Button from '../components/Button';
import theme from '@/theme';
import ArgentXSVG from '@/assets/images/argentx.svg';
import BraavosSVG from '@/assets/images/braavos.svg';
import { useUserStore } from '@/stores/userStore';
import { Linking } from 'react-native';

function SignUpWithWallet() {
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
          px: '$4'
        }}
      >
        <Text sx={{ mb: '$4' }}>Secure onboarding with your Web3 wallet</Text>

        <Button
          icon={<ArgentXSVG width={24} height={24} />}
          onPress={() =>
            router.push(
              action === 'linkWallet' ? '/settings/allow-access' : '/email/link'
            )
          }
        >
          <Text sx={{ textTransform: 'none' }}>Argent Mobile</Text>
        </Button>

        <Button
          icon={<BraavosSVG width={24} height={24} />}
          onPress={() =>
            router.push(
              action === 'linkWallet' ? '/settings/allow-access' : '/email/link'
            )
          }
        >
          <Text sx={{ textTransform: 'none' }}>Braavos</Text>
        </Button>

        {action !== 'linkWallet' && (
          <Button
            variant="secondary"
            onPress={() => router.push('/wallet/creating')}
          >
            Create new wallet
          </Button>
        )}

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
            onPress={() => router.push('/sign-up/email')}
          >
            Sign up with email
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

export default SignUpWithWallet;
