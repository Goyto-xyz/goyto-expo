import { ColorValue } from 'react-native';
import {
  Pressable,
  ActivityIndicator,
  Text,
  useDripsyTheme,
  View,
  type SxProp
} from 'dripsy';

type ButtonProps = {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  sx?: SxProp;
};

const Button = ({
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  sx
}: ButtonProps) => {
  const { theme } = useDripsyTheme();

  const stylesByVariant = {
    primary: {
      backgroundColor: theme.colors?.primary ?? '#003049',
      color: '#fff'
    },
    secondary: {
      backgroundColor: theme.colors?.blue100 ?? '#BDE0FE',
      color: theme.colors?.primary ?? '#003049'
    },
    tertiary: {
      backgroundColor: '#fff',
      color: theme.colors?.primary ?? '#003049'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors?.primary ?? '#003049'
    }
  };

  const stylesBySize = {
    xs: {
      px: 8,
      py: 6,
      fontSize: 12
    },
    sm: {
      px: 12,
      py: 8,
      fontSize: 14
    },
    md: {
      px: 20,
      py: 12,
      fontSize: 16
    },
    lg: {
      px: 24,
      py: 16,
      fontSize: 18
    }
  };

  const selectedVariant = stylesByVariant[variant];
  const selectedStyle = stylesBySize[size];

  const textColor = (sx as any)?.color ?? selectedVariant.color;
  const textTransform = (sx as any)?.textTransform ?? 'uppercase';
  const fontFamily = (sx as any)?.fontFamily ?? 'BalsamiqSans';
  const fontSize = (sx as any)?.fontSize ?? selectedStyle.fontSize;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      sx={{
        // @ts-ignore
        backgroundColor: selectedVariant.backgroundColor,
        py: variant === 'ghost' ? 0 : selectedStyle.py,
        px: variant === 'ghost' ? 0 : selectedStyle.px,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : 1,
        width: '100%',
        ...sx
      }}
    >
      {loading ? (
        <ActivityIndicator sx={{ color: textColor as ColorValue }} />
      ) : (
        <View sx={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon && iconPosition === 'left' && <>{icon}</>}
          <Text
            sx={{
              color: textColor as ColorValue,
              textTransform,
              fontFamily,
              fontSize
            }}
          >
            {children}
          </Text>
          {icon && iconPosition === 'right' && <>{icon}</>}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
