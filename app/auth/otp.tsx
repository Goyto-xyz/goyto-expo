import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'dripsy';
import { OtpInput } from 'react-native-otp-entry';
import theme from '@/theme';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import Button from '../components/Button';
import { useUserStore } from '@/stores/userStore';

function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { user, action } = useUserStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onOtpChange = (_otp: string) => {
    setOtp(_otp);
    setDisabled(_otp.length !== 6);
  };

  const handleResendOTP = () => {
    setCanResend(false);
    setCountdown(30);

    // TODP: Implement resend OTP logic here
  };

  const onVerifyOTP = () => {
    // TODO: Implement OTP verification logic here
    switch (action) {
      case 'createAccount':
        router.push('/wallet/link');
        break;
      case 'signIn':
        router.push('/wallet/linked-check');
        break;
      case 'linkEmail':
        router.push('/settings/allow-access');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="OTP Verification" showBackButton={false} />

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
        {user && (
          <Text>
            We've sent a verification code to{' '}
            <Text style={{ fontWeight: 'bold' }}>{user.email}</Text>
          </Text>
        )}

        <OtpInput
          numberOfDigits={6}
          theme={{
            containerStyle: {
              gap: 1
            },
            pinCodeContainerStyle: {
              backgroundColor: '#fff',
              height: 50,
              width: 50,
              borderRadius: 16
            },
            filledPinCodeContainerStyle: {
              backgroundColor: '#fff'
            },
            pinCodeTextStyle: {
              fontSize: 20,
              fontFamily: 'Inter',
              fontWeight: '600'
            }
          }}
          onTextChange={onOtpChange}
        />

        <Button width="80%" onPress={onVerifyOTP} disabled={disabled}>
          Verify
        </Button>

        <Text sx={{ fontSize: 14, marginTop: 20 }}>
          Didn't receive code?{' '}
          {canResend ? (
            <Text
              sx={{ textDecorationLine: 'underline' }}
              onPress={handleResendOTP}
            >
              Resend OTP
            </Text>
          ) : (
            <Text sx={{ textDecorationLine: 'underline' }}>
              Resend in {countdown}s
            </Text>
          )}
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}

export default OTPVerification;
