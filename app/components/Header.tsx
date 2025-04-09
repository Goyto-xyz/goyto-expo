import React from 'react';
import { Pressable, View, Text, Box } from 'dripsy';
import { ArrowLeft } from 'phosphor-react-native';
import { router } from 'expo-router';

function Header({
  title,
  showBackButton = true,
  rightButton
}: {
  title: string;
  showBackButton?: boolean;
  rightButton?: React.ReactNode;
}) {
  return (
    <View sx={{ flexDirection: 'row', alignItems: 'center', paddingX: '$6' }}>
      {showBackButton && (
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
      )}
      <Text
        sx={{
          flex: 1,
          textAlign: 'center',
          fontFamily: 'InterBold',
          fontSize: 18
        }}
      >
        {title}
      </Text>
      {rightButton ? <>{rightButton}</> : <Box sx={{ width: 24 }} />}
    </View>
  );
}

export default Header;
