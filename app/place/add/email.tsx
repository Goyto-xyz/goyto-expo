import Button from '@/app/components/Button';
import ModalHeader from '@/app/components/ModalHeader';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { isValidEmail } from '@/utils';
import { View, TextInput } from 'dripsy';
import { router } from 'expo-router';
import React, { useState } from 'react';

function AddEmail() {
  const { data, setContact } = useAddPlaceStore();
  const [email, setLocalEmail] = useState(data.contact.email);
  const [emailIsValid, setEmailIsValid] = useState(false);

  const onEmailChange = (text: string) => {
    setLocalEmail(text);
    setEmailIsValid(isValidEmail(text));
  };

  const onSave = () => {
    setContact({ email });
    router.dismiss();
  };

  return (
    <View sx={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalHeader showBackButton={false} showCloseButton title="Add Email" />

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
          placeholder="youremail@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={data.contact.email}
          onChangeText={onEmailChange}
          sx={{
            fontSize: 16,
            textAlignVertical: 'top',
            pb: '$3',
            borderBottomWidth: 1,
            borderBottomColor: '$gray200'
          }}
        />

        <Button onPress={onSave} disabled={!emailIsValid}>
          Save Email
        </Button>
      </View>
    </View>
  );
}

export default AddEmail;
