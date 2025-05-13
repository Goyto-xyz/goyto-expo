import theme from '@/theme';
import { Pressable } from 'dripsy';
import { Check } from 'phosphor-react-native';

const Checkbox = ({
  checked,
  color,
  onChange
}: {
  checked: boolean;
  color?: string;
  onChange: () => void;
}) => {
  return (
    <Pressable
      onPress={onChange}
      sx={{
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: checked
          ? color ?? theme.colors.$primary
          : theme.colors.$gray200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: checked ? color ?? theme.colors.$primary : 'white'
      }}
    >
      {checked && <Check size={16} weight="bold" color="white" />}
    </Pressable>
  );
};

export default Checkbox;
