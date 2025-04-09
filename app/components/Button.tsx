import { ColorValue } from 'react-native';
import { Pressable, ActivityIndicator, Text, useDripsyTheme } from 'dripsy';

type ButtonProps = {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  width?: number | string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};

const Button = ({
  onPress,
  variant = 'primary',
  size = 'md',
  width = '100%',
  disabled = false,
  loading = false,
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
    }
  };

  const stylesBySize = {
    sm: {
      paddingY: 8,
      fontSize: 14
    },
    md: {
      paddingY: 12,
      fontSize: 16
    },
    lg: {
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
        backgroundColor: selectedVariant.backgroundColor as ColorValue,
        paddingY: 16,
        paddingX: 20,
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
        <Text
          sx={{
            color: selectedVariant.color as ColorValue,
            textTransform: 'uppercase',
            fontSize: selectedStyle.fontSize,
            fontFamily: 'BalsamiqSans',
            fontWeight: 'bold'
          }}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
