import { ColorValue } from 'react-native';
import {
  Pressable,
  ActivityIndicator,
  Text,
  useDripsyTheme,
  View
} from 'dripsy';

type ButtonProps = {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  width?: number | string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
};

const Button = ({
  onPress,
  variant = 'primary',
  size = 'md',
  width = '100%',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children
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
      backgroungColor: 'transparent',
      color: theme.colors?.primary ?? '#003049'
    }
  };

  const stylesBySize = {
    xs: {
      paddingX: 8,
      paddingY: 6,
      fontSize: 12
    },
    sm: {
      paddingX: 12,
      paddingY: 8,
      fontSize: 14
    },
    md: {
      paddingX: 20,
      paddingY: 12,
      fontSize: 16
    },
    lg: {
      paddingX: 24,
      paddingY: 16,
      fontSize: 18
    }
  };

  const selectedVariant = stylesByVariant[variant];
  const selectedStyle = stylesBySize[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      sx={{
        // @ts-ignore
        backgroundColor: selectedVariant.backgroundColor,
        paddingY: variant === 'ghost' ? 0 : selectedStyle.paddingY,
        paddingX: variant === 'ghost' ? 0 : selectedStyle.paddingX,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : 1,
        width
      }}
    >
      {loading ? (
        <ActivityIndicator
          sx={{ color: selectedVariant.color as ColorValue }}
        />
      ) : (
        <View sx={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {icon && iconPosition === 'left' && <>{icon}</>}
          <Text
            sx={{
              color: selectedVariant.color as ColorValue,
              textTransform: 'uppercase',
              fontSize: selectedStyle.fontSize,
              fontFamily: 'BalsamiqSans'
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
