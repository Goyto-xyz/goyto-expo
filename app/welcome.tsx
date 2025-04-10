import React from 'react';
import { View, Box } from 'dripsy';
import LogoSVG from '@/assets/images/logo.svg';
import { useRouter } from 'expo-router';
import Button from './components/Button';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import theme from '../theme';

function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <View
        sx={{
          flex: 1
        }}
      >
        <View
          sx={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <LogoSVG width={185} height={185} />
        </View>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '$3',
            paddingX: '$6',
            width: '100%'
          }}
        >
          <Button
            onPress={() => router.push('/sign-in')}
            variant="secondary"
            width="100%"
          >
            Sign In
          </Button>
          <Button
            onPress={() => router.push('/sign-up/email')}
            variant="primary"
            width="100%"
          >
            Create Account
          </Button>
        </Box>
      </View>
    </SafeAreaWrapper>
  );
}

export default Welcome;
