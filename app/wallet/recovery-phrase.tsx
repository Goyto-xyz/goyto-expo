import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import theme from '@/theme';
import { ScrollView, View, Text, Pressable } from 'dripsy';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { Check, Warning } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';
import Button from '../components/Button';

function RecoveryPhrase() {
  const recoveryPhrase = [
    'hair',
    'again',
    'mixed',
    'slide',
    'gloom',
    'artefact',
    'poem',
    'hidden',
    'general',
    'glare',
    'small',
    'garlic'
  ];

  const [countdown, setCountdown] = useState(5);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(recoveryPhrase.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (revealed) {
      router.push('/wallet/verify-phrase');
    } else {
      setRevealed(true);
    }
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Backup you recovery phrase" />

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
        <ScrollView>
          <View sx={{ position: 'relative', width: '100%' }}>
            <View
              sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 16,
                width: '100%'
              }}
            >
              {recoveryPhrase.map((word, index) => (
                <View
                  key={index}
                  sx={{
                    width: '30%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    mb: 16
                  }}
                >
                  <Text sx={{ width: '20%', textAlign: 'right' }}>
                    {index + 1}.
                  </Text>
                  <View
                    sx={{
                      flex: 1,
                      backgroundColor: theme.colors.$blue100,
                      borderRadius: 10,
                      py: 8
                    }}
                  >
                    <Text sx={{ textAlign: 'center' }}>{word}</Text>
                  </View>
                </View>
              ))}
            </View>

            {!revealed && (
              <BlurView
                intensity={10}
                tint="light"
                style={{
                  ...StyleSheet.absoluteFillObject
                }}
              />
            )}
          </View>

          <Pressable onPress={handleCopy}>
            <Text sx={{ textAlign: 'center', fontWeight: 600, mt: 20 }}>
              {copied ? (
                <View
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                  }}
                >
                  <Check size={20} weight="bold" />
                  <Text sx={{ fontWeight: '600', textAlign: 'center' }}>
                    {' '}
                    Copied!
                  </Text>
                </View>
              ) : (
                'Copy to clipboard'
              )}
            </Text>
          </Pressable>

          <View sx={{ py: 32, maxWidth: '95%', marginX: 'auto' }}>
            <View sx={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Warning size={24} weight="bold" color="#FB8500" />
              <Text sx={{ fontWeight: 700, color: '#FB8500' }}>
                DO NOT share your recovery phrase with ANYONE
              </Text>
            </View>
            <Text sx={{ fontSize: 14 }}>
              Anyone with your recovery phrase can have full control over your
              assets. Please stay vigilant against phishing attacks at all
              times.
            </Text>

            <View sx={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Warning size={24} weight="bold" color="#FB8500" />
              <Text sx={{ fontWeight: 700, color: '#FB8500' }}>
                Back up the phrase safely
              </Text>
            </View>
            <Text sx={{ fontSize: 14 }}>
              You will never be able to restore your account without your
              recovery phrase.
            </Text>
          </View>

          <View sx={{ flex: 1, alignItems: 'center' }}>
            <Button onPress={handleNext} disabled={countdown > 0}>
              <Text>
                {revealed
                  ? 'Next'
                  : `I understood. Show my phrase ${
                      countdown > 0 ? `(${countdown})` : ''
                    }`}
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}

export default RecoveryPhrase;
