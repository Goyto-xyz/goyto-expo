import theme from '@/theme';
import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import { ScrollView, View, Text, TextInput } from 'dripsy';
import Button from '../components/Button';
import { router } from 'expo-router';

function VerifyPhrase() {
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

  const [inputIndexes, setInputIndexes] = useState<number[]>([]);
  const [userInputs, setUserInputs] = useState<{ [key: number]: string }>({});

  const getRandomIndexes = () => {
    const indexes = new Set<number>();
    while (indexes.size < 3) {
      indexes.add(Math.floor(Math.random() * 12));
    }
    return Array.from(indexes).sort((a, b) => a - b);
  };

  useEffect(() => {
    const randoms = getRandomIndexes();
    setInputIndexes(randoms);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    setUserInputs({ ...userInputs, [index]: value });
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header title="Verify recovery phrase" />

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
          <View
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16,
              width: '100%'
            }}
          >
            {recoveryPhrase.map((word, index) => {
              const isInput = inputIndexes.includes(index);

              return (
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
                  {isInput ? (
                    <TextInput
                      sx={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        textAlign: 'center',
                        py: 8
                      }}
                    />
                  ) : (
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
                  )}
                </View>
              );
            })}
          </View>

          <View sx={{ flex: 1, alignItems: 'center', mt: 32 }}>
            <Button width="80%" onPress={() => router.push('/email/link')}>
              Next
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}

export default VerifyPhrase;
