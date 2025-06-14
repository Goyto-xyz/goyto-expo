// screens/ShareMyLink.tsx
import React, { useState } from 'react';
import { View, Text } from 'dripsy';
import QRCode from 'react-native-qrcode-svg';
import * as ClipboardAPI from 'expo-clipboard';
import theme from '@/theme';
import { Alert, Share, TouchableOpacity } from 'react-native';
import { Copy, PaperPlaneTilt } from 'phosphor-react-native';
import Button from '../components/Button';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';

const ShareMyLink = () => {
  const inviteLink = 'https://example.com/invite?ref=123456';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await ClipboardAPI.setStringAsync(inviteLink);
    setCopied(true);
    Alert.alert('Copied', 'Invite link copied to clipboard!');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Goyoto! Here's my invite link: ${inviteLink}`
      });
    } catch (error) {
      console.log('Error sharing link:', error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Header title="Share your invite link" />
      <View
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          px: '$4',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <QRCode value={inviteLink} size={200} />

        <Text
          selectable
          sx={{
            textAlign: 'center',
            my: 20,
            color: theme.colors.$gray300
          }}
        >
          {inviteLink}
        </Text>

        <View sx={{ flexDirection: 'row', gap: 12 }}>
          <Button
            onPress={handleShare}
            icon={<PaperPlaneTilt weight="bold" size={20} color="#fff" />}
            sx={{ width: '60%' }}
          >
            <Text style={{ color: '#fff', fontWeight: '500' }}>Share</Text>
          </Button>

          <Button
            onPress={handleCopy}
            variant="secondary"
            icon={<Copy weight="bold" size={20} />}
            sx={{ width: '40%' }}
          >
            <Text style={{ fontWeight: '500' }}>
              {copied ? 'Copied' : 'Copy'}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default ShareMyLink;
