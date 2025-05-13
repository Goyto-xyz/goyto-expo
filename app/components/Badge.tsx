import React from 'react';
import { SxProp, Text, View } from 'dripsy';
import { getBgColor } from '@/utils';
import { SvgProps } from 'react-native-svg';

const Badge = ({
  Icon,
  label,
  color,
  sx
}: {
  Icon: React.FC<SvgProps>;
  label: string;
  color: string;
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
        px: '$5',
        py: '$3',
        gap: 8,
        ...sx
      }}
    >
      <Icon width={20} height={20} />
      <Text sx={{ ml: 8, fontSize: 16, color }}>{label}</Text>
    </View>
  );
};

export default Badge;
