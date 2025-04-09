import React from 'react';
import { SafeAreaView, View } from 'dripsy';

type Props = {
  children: React.ReactNode;
  sx?: any;
  backgroundColor?: string;
};

const SafeAreaWrapper = ({ children, sx, backgroundColor }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          ...sx
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
