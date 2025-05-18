import Button from '@/app/components/Button';
import ModalHeader from '@/app/components/ModalHeader';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { View, TextInput } from 'dripsy';
import { router } from 'expo-router';
import React, { useState } from 'react';

function AddPhone() {
  const { data, setContact } = useAddPlaceStore();
  const [phone, setLocalPhone] = useState(data.contact.phone);

  const onSave = () => {
    setContact({ phone });
    router.dismiss();
  };

  return (
    <View sx={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalHeader showBackButton={false} showCloseButton title="Add Phone" />

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
          placeholder="+01 2345 6789"
          keyboardType="phone-pad"
          defaultValue={data.contact.phone}
          onChangeText={setLocalPhone}
          sx={{
            fontSize: 16,
            textAlignVertical: 'top',
            pb: '$3',
            borderBottomWidth: 1,
            borderBottomColor: '$gray200'
          }}
        />

        <Button onPress={onSave} disabled={!phone}>
          Save Phone
        </Button>
      </View>
    </View>
  );
}

export default AddPhone;
