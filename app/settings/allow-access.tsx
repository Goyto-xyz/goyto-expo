import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import { View, Text } from 'dripsy';
import { AddressBook, Check, NavigationArrow } from 'phosphor-react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import theme from '@/theme';
import Button from '../components/Button';
import LocationSVG from '@/assets/images/location.svg';

function AllowAccess() {
  const [loading, setLoading] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [contactsEnabled, setContactsEnabled] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const locStatus = await Location.getForegroundPermissionsAsync();
      setLocationEnabled(locStatus.status === 'granted');

      const contactStatus = await Contacts.getPermissionsAsync();
      setContactsEnabled(contactStatus.status === 'granted');

      setLoading(false);
    };

    checkPermissions();
  }, []);

  const handleEnableLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationEnabled(true);
    } else {
      Alert.alert(
        'Permission denied permanently',
        'You have denied location access. Please enable it manually in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings()
          }
        ]
      );
    }
  };

  const handleEnableContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setContactsEnabled(true);
      router.push('/settings/find-contacts');
    } else {
      Alert.alert(
        'Permission denied permanently',
        'To connect with your friends, please enable contacts permission in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings()
          }
        ]
      );
    }
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header
        title="Please allow access"
        showBackButton={false}
        rightButton={
          <Button
            size="sm"
            width="auto"
            onPress={() => router.push('/settings/notifications')}
          >
            Next
          </Button>
        }
      />

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
        <LocationSVG width="80%" height={300} />

        <Text sx={{ textAlign: 'center', maxWidth: '80%' }}>
          Goyto needs access to your location to help you find friends nearby
        </Text>

        <Button
          width="80%"
          loading={loading}
          variant={locationEnabled ? 'tertiary' : 'primary'}
          onPress={handleEnableLocation}
          icon={
            locationEnabled ? (
              <Check size={24} color={theme.colors.$success} weight="bold" />
            ) : (
              <NavigationArrow
                size={24}
                color="#fff"
                weight="bold"
                style={{ transform: [{ rotate: '90deg' }] }}
              />
            )
          }
        >
          <Text
            sx={{
              marginLeft: 10,
              color: locationEnabled ? theme.colors.$success : '#fff'
            }}
          >
            Enable Location
          </Text>
        </Button>

        {contactsEnabled ? (
          <Button
            width="80%"
            onPress={() => router.push('/settings/find-contacts')}
            icon={<AddressBook size={24} color="#fff" weight="bold" />}
          >
            <Text
              sx={{
                marginLeft: 10
              }}
            >
              Find my friends
            </Text>
          </Button>
        ) : (
          <Button
            width="80%"
            loading={loading}
            onPress={handleEnableContacts}
            icon={<AddressBook size={24} color="#fff" weight="bold" />}
          >
            <Text
              sx={{
                marginLeft: 10
              }}
            >
              Enable Contacts
            </Text>
          </Button>
        )}

        <Text sx={{ fontSize: 12, textAlign: 'center', mt: 2 }}>
          Goytoputs your privacy first. We won't share your location without
          your permission. We won't text or spam your contacts.
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}

export default AllowAccess;
