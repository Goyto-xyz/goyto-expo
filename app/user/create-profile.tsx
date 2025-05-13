import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import theme from '@/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import { router } from 'expo-router';
import { Image, View, Text, TextInput } from 'dripsy';
import * as ImagePicker from 'expo-image-picker';
import AvatarSVG from '@/assets/images/avatar.svg';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import { At, PencilSimple, User } from 'phosphor-react-native';
import Input from '../components/Input';

function CreateProfile() {
  const [avatar, setAvatar] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission denied',
        'We need access to your photos. Please enable it manually in Settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings()
          }
        ]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
      allowsEditing: true
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const onDisplayNameChange = (_displayName: string) => {
    setDisplayName(_displayName);
  };

  const onUsernameChange = (_username: string) => {
    setUsername(_username);
    const _isValid = _username.trim().length >= 3 && !_username.includes(' ');
    setIsValid(_isValid);
  };

  return (
    <SafeAreaWrapper
      backgroundColor={theme.colors.$secondary}
      sx={{ backgroundColor: '$secondary' }}
    >
      <Header
        title="Create profile"
        showBackButton={false}
        rightButton={
          <Button
            disabled={!isValid}
            size="sm"
            onPress={() => router.push('/user/welcome')}
            sx={{
              width: 'auto'
            }}
          >
            Save
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
          px: '$4'
        }}
      >
        <View>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              sx={{ width: 160, height: 160, borderRadius: 20 }}
            />
          ) : (
            <AvatarSVG />
          )}

          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: 'absolute',
              bottom: -25,
              right: -25,
              backgroundColor: '#fff',
              borderRadius: 100,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowOpacity: 0.15,
              shadowRadius: 10,
              shadowColor: '#000'
            }}
          >
            <PencilSimple size={25} weight="bold" />
          </TouchableOpacity>
        </View>

        <View sx={{ flex: 1, width: '100%', gap: 20, mt: 30 }}>
          <Input
            label="Username"
            icon={<At size={24} weight="bold" />}
            autoFocus
            autoCapitalize="none"
            onChangeText={onUsernameChange}
          />
          <Input
            label="Display Name"
            subLabel="Optional"
            icon={<User size={24} weight="bold" />}
            autoCapitalize="none"
            onChangeText={onDisplayNameChange}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

export default CreateProfile;
