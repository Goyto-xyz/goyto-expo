import Button from '@/app/components/Button';
import ModalHeader from '@/app/components/ModalHeader';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { View, TextInput } from 'dripsy';
import { router } from 'expo-router';
import React, { useState } from 'react';

function AddSnippet() {
  const { data, setSnippet } = useAddPlaceStore();
  const [snippet, setLocalSnippet] = useState(data.snippet);

  const onSave = () => {
    setSnippet(snippet);
    router.dismiss();
  };

  return (
    <View sx={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalHeader showBackButton={false} showCloseButton title="Add Snippet" />

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
          placeholder="Describe this place in a snippet. Snippets are an informed sentence or two describing the place, about the length of a tweet."
          multiline
          defaultValue={data.snippet}
          onChangeText={setLocalSnippet}
          sx={{
            fontSize: 16,
            textAlignVertical: 'top',
            pb: '$8',
            borderBottomWidth: 1,
            borderBottomColor: '$gray200'
          }}
        />

        <Button onPress={onSave} disabled={!snippet}>
          Save
        </Button>
      </View>
    </View>
  );
}

export default AddSnippet;
