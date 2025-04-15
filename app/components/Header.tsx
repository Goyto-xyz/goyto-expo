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
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingX: '$4',
        position: 'relative',
        height: 48
      }}
    >
      {showBackButton ? (
        <View sx={{ position: 'absolute', left: 16, zIndex: 1 }}>
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} />
          </Pressable>
        </View>
      ) : (
        <Box sx={{ width: 24 }} />
      )}
      <Text
        sx={{
          flex: 1,
          textAlign: 'center',
          fontFamily: 'InterBold',
          fontSize: 18,
          position: 'absolute',
          left: 0,
          right: 0
        }}
      >
        {title}
      </Text>
      {rightButton && (
        <View
          sx={{
            position: 'absolute',
            right: 16,
            zIndex: 1
          }}
        >
          {rightButton}
        </View>
      )}
    </View>
  );
}

export default Header;
