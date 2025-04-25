import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import { Pressable, Text, View } from 'dripsy';
import { Switch } from 'react-native';  // Import Switch from react-native
import ExploringSVG from '@/assets/images/exploring.svg';
import Button from '../components/Button';
import { X } from 'phosphor-react-native';
import { router } from 'expo-router';
import { Alert, Linking } from 'react-native';

interface RenderSwitchProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

function EnableNotifications() {
  const [masterToggle, setMasterToggle] = useState(true);
  const [channels, setChannels] = useState({
    email: true,
    push: true,
    sound: true,
  });
  const [types, setTypes] = useState({
    comments: true,
    mentions: true,
    directMessages: true,
    likes: true,
    newFollowers: true,
    updates: true,
  });

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status === 'granted') {
        router.push('/user/create-profile');
      }
    };

    checkPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status, canAskAgain } = await Notifications.getPermissionsAsync();

    if (status === 'granted') {
      router.push('/user/create-profile');
      return;
    }

    if (canAskAgain) {
      await Notifications.requestPermissionsAsync();
      router.push('/user/create-profile');
      return;
    } else {
      Alert.alert(
        'Permission denied permanently',
        'You have denied notifications. Please enable it manually in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  // Updated renderSwitch function with type annotations
  const renderSwitch = ({ label, value, onChange, disabled = false }: RenderSwitchProps) => (
    <View sx={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
      <Text>{label}</Text>
      <Switch value={value} onValueChange={onChange} disabled={disabled} />
    </View>
  );

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <View
        sx={{
          flex: 1,
          flexDirection: 'col',
          gap: '$5',
          alignItems: 'center',
          justifyContent: 'start',
          paddingTop: 64,
          paddingX: '$4',
          position: 'relative',
        }}
      >
        <ExploringSVG width="80%" height={300} />

        <Text sx={{ fontSize: 16, textAlign: 'center', maxWidth: '80%', marginBottom: 32 }}>
          Turn on notifications to be sure you get your friend's messages right away. Don't miss a
          chance to connect!
        </Text>

        {/* Master Toggle */}
        {renderSwitch({ label: 'Enable Notifications', value: masterToggle, onChange: (val) => setMasterToggle(val) })}

        {/* Channels */}
        <Text sx={{ fontWeight: 'bold', marginTop: 16 }}>Channels</Text>
        {renderSwitch({ label: 'Email Notifications', value: channels.email, onChange: (val) => setChannels({ ...channels, email: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'Push Notifications', value: channels.push, onChange: (val) => setChannels({ ...channels, push: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'Sound', value: channels.sound, onChange: (val) => setChannels({ ...channels, sound: val }), disabled: !masterToggle })}

        {/* Types */}
        <Text sx={{ fontWeight: 'bold', marginTop: 16 }}>Notification Types</Text>
        {renderSwitch({ label: 'Comments', value: types.comments, onChange: (val) => setTypes({ ...types, comments: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'Mentions', value: types.mentions, onChange: (val) => setTypes({ ...types, mentions: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'Direct Messages', value: types.directMessages, onChange: (val) => setTypes({ ...types, directMessages: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'Likes', value: types.likes, onChange: (val) => setTypes({ ...types, likes: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'New Followers', value: types.newFollowers, onChange: (val) => setTypes({ ...types, newFollowers: val }), disabled: !masterToggle })}
        {renderSwitch({ label: 'Platform Updates', value: types.updates, onChange: (val) => setTypes({ ...types, updates: val }), disabled: !masterToggle })}

        <Button width="80%" onPress={requestNotificationPermission}>
          Save Preferences & Enable
        </Button>

        <View
          sx={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Pressable
            sx={{
              width: 60,
              height: 60,
              borderRadius: 80,
              backgroundColor: 'rgba(0, 48, 73, 0.3)',
              textAlign: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => router.push('/user/create-profile')}
          >
            <X size={30} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

export default EnableNotifications;
