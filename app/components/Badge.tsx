import React from 'react';
import { Pressable, SxProp, Text, View } from 'dripsy';
import { getBgColor } from '@/utils';
import { SvgProps } from 'react-native-svg';
import { X } from 'phosphor-react-native';
import theme from '@/theme';
import tinycolor from 'tinycolor2';

const Badge = ({
  Icon,
  label,
  color,
  showDismiss,
  onDismiss,
  sx
}: {
  Icon: React.FC<SvgProps>;
  label: string;
  color: string;
  showDismiss?: boolean;
  onDismiss?: () => void;
  sx?: SxProp;
}) => {
  const backgroundColor = getBgColor(color);

  return (
    <View
      sx={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        backgroundColor,
        borderRadius: 12,
        position: 'relative',
        px: '$6',
        py: '$3',
        gap: 8,
        ...sx
      }}
    >
      <Icon width={20} height={20} />
      <Text sx={{ ml: 8, fontSize: 16, color }}>{label}</Text>
      {showDismiss && (
        <Pressable
          sx={{ position: 'absolute', top: 8, right: 5 }}
          onPress={onDismiss}
        >
          <X
            size={10}
            weight="bold"
            color={tinycolor(color).desaturate(10).toHexString()}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Badge;
