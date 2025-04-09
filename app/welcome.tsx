import React from 'react';
import { Text, View, Box } from 'dripsy';
import LogoSVG from '@/assets/images/logo.svg';
import { useNavigation } from 'expo-router';
import Button from './components/Button';
import SafeAreaWrapper from './components/SafeAreaWrapper';
import theme from './theme';

function Welcome() {
  const navigation = useNavigation();

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$primary}
      sx={{ backgroundColor: '$primary' }}
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
            onPress={() => navigation.navigate('/sign-in')}
            variant="secondary"
            width="100%"
          >
            Sign In
          </Button>
          <Button
            onPress={() => navigation.navigate('/sign-in')}
            variant="primary"
            width="100%"
          >
            Create Account
          </Button>
          {/* <Pressable onPress={() => navigation.navigate('/create-account')}> */}
          {/* </Pressable> */}
        </Box>
      </View>
    </SafeAreaWrapper>
  );
}

export default Welcome;
