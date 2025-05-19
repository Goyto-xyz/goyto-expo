import Button from '@/app/components/Button';
import ModalHeader from '@/app/components/ModalHeader';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { getBgColor } from '@/utils';
import { View, TextInput } from 'dripsy';
import { router } from 'expo-router';
import React, { useState } from 'react';

function AddAddress() {
  const { data, setAddress } = useAddPlaceStore();
  const [address, setLocalAddress] = useState(data.address.detail);
  const [letterCode, setLetterCode] = useState(data.address.letterCode);

  const onSave = () => {
    setAddress({ detail: address, letterCode });
    router.dismiss();
  };

  return (
    <View sx={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalHeader
        showBackButton={false}
        showCloseButton
        title="Add Address"
        rightButton={
          <Button
            size="sm"
            sx={{
              backgroundColor: getBgColor(data.color),
              color: data.color,
              width: 'auto'
            }}
            onPress={onSave}
          >
            Save
          </Button>
        }
      />

      <View
        sx={{
          px: '$6',
          pt: '$7',
          pb: '$10',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <TextInput
          autoFocus
          multiline
          placeholder="Address"
          autoCorrect={false}
          defaultValue={data.address.detail}
          onChangeText={setLocalAddress}
          sx={{
            fontSize: 16,
            textAlignVertical: 'top',
            pb: '$10',
            borderBottomWidth: 1,
            borderBottomColor: '$gray200'
          }}
        />
        <TextInput
          placeholder="Letter code"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={data.address.letterCode}
          onChangeText={setLetterCode}
          sx={{
            fontSize: 16,
            textAlignVertical: 'top',
            mt: '$3',
            pb: '$3',
            borderBottomWidth: 1,
            borderBottomColor: '$gray200'
          }}
        />
      </View>
    </View>
  );
}

export default AddAddress;
