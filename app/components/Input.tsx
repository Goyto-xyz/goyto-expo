import React from 'react';
import { View, Text } from 'dripsy';
import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';
import theme from '@/theme';

type InputProps = TextInputProps & {
  label?: string;
  subLabel?: string;
  icon?: React.ReactNode;
};

export default function Input({
  label,
  subLabel,
  icon,
  style,
  ...props
}: InputProps) {
  return (
    <View sx={{ mb: 16 }}>
      {label && (
        <View
          sx={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 8
          }}
        >
          <Text sx={{ fontSize: 16, fontWeight: 'bold', mb: 5 }}>{label}</Text>

          {subLabel && (
            <Text sx={{ mb: 5, color: theme.colors.$blue200 }}>{subLabel}</Text>
          )}
        </View>
      )}

      <View
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.$inputBg,
          borderRadius: 12,
          paddingLeft: 10
        }}
      >
        {icon && <View sx={{ mr: 8 }}>{icon}</View>}
        <TextInput
          style={[
            {
              flex: 1,
              width: '100%',
              fontSize: 16,
              paddingVertical: 12,
              paddingRight: 12
            },
            style
          ]}
          {...props}
        />
      </View>
    </View>
  );
}
