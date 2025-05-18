import Button from '@/app/components/Button';
import ModalHeader from '@/app/components/ModalHeader';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { isValidURL } from '@/utils';
import { View, TextInput } from 'dripsy';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

function AddSocial() {
  const { data, setSocial } = useAddPlaceStore();
  const type = useLocalSearchParams().type as string;

  const [username, setUsername] = useState(
    data.social[type as keyof typeof data.social]
  );

  const onChangeText = (text: string) => {
    setUsername(text);
  };

  const onSave = () => {
    setSocial({ [type]: username });
    router.dismiss();
  };

  const isDisabled = !username || (type === 'website' && !isValidURL(username));

  return (
    <View sx={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalHeader
        showBackButton={false}
        showCloseButton
        title={`Add ${type}`}
      />

      <View
        sx={{
          px: '$6',
          pt: '$7',
          pb: '$10',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <TextInput
          autoFocus
          placeholder="@username"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={data.social[type as keyof typeof data.social]}
          onChangeText={onChangeText}
          sx={{
            fontSize: 16,
            textAlignVertical: 'top',
            pb: '$3',
            borderBottomWidth: 1,
            borderBottomColor: '$gray200'
          }}
        />

        <Button onPress={onSave} disabled={isDisabled}>
          Save
        </Button>
      </View>
    </View>
  );
}

export default AddSocial;
