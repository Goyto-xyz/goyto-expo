import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import theme from '@/theme';
import { View, Text, FlatList, Image } from 'dripsy';
import Button from '../components/Button';
import * as SMS from 'expo-sms';
import { Alert } from 'react-native';
import { router } from 'expo-router';

function FindContacts() {
  const contacts = [
    {
      name: 'Dragoslav',
      numOfContacts: 2,
      avatar: require('@/assets/images/user1.png')
    },
    {
      name: 'Dragona',
      numOfContacts: 4,
      avatar: require('@/assets/images/user2.png')
    }
  ];
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const { status: notifStatus } = await Notifications.getPermissionsAsync();
      setNotificationsEnabled(notifStatus === 'granted');
    };

    checkPermission();
  }, []);

  const handleInvite = async (contactName: string) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(
        [],
        `Hey! I'm using Goyoto. Let's connect and explore together. \uD83D\uDE0A`
      );
    } else {
      Alert.alert(
        'SMS not available',
        'Your device does not support sending SMS.'
      );
    }
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header
        title="Find my friends"
        rightButton={
          <Button
            size="sm"
            width="auto"
            variant="tertiary"
            onPress={() => {
              router.push(
                notificationsEnabled
                  ? '/user/create-profile'
                  : '/settings/notifications'
              );
            }}
          >
            Done
          </Button>
        }
      />

      <View
        sx={{
          flex: 1,
          flexDirection: 'col',
          alignItems: 'start',
          justifyContent: 'start',
          paddingTop: 32,
          paddingX: '$4'
        }}
      >
        <Text
          sx={{
            fontWeight: 700,
            fontSize: 14,
            textTransform: 'uppercase',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 48, 83, 0.3)',
            paddingBottom: '$3'
          }}
        >
          Your contacts
        </Text>

        <FlatList
          data={contacts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingY: '$4',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 48, 73,0.3)',
                width: '100%'
              }}
            >
              <View
                sx={{ flexDirection: 'row', alignItems: 'start', gap: '$3' }}
              >
                <Image
                  source={item.avatar}
                  sx={{ width: 50, height: 50, borderRadius: 12 }}
                />
                <View sx={{ flexDirection: 'column' }}>
                  <Text sx={{ fontSize: 16, fontWeight: 'bold' }}>
                    {item.name}
                  </Text>

                  <Text sx={{ fontSize: 12, color: theme.colors.$blue200 }}>
                    knows {item.numOfContacts} poeple on Goyoto
                  </Text>
                </View>
              </View>

              <Button
                width="auto"
                size="xs"
                onPress={() => handleInvite(item.name)}
              >
                Invite
              </Button>
            </View>
          )}
        ></FlatList>
      </View>
    </SafeAreaWrapper>
  );
}

export default FindContacts;
