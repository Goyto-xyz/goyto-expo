import { FlatList, Text, TextInput, View } from 'dripsy';
import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import theme from '@/theme';
import Button from '@/app/components/Button';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { getBgColor } from '@/utils';

type Place = {
  id: string;
  name: string;
  address: string;
  cid: string;
};

const MOCK_MATCHES: Place[] = [
  {
    id: '1',
    name: 'Boba Guys',
    address: '3491 19th St',
    cid: 'bafkreier2owjqsk5iwcmhbogaxqndzoevmimrg7prx6b46msiz6ziahr2y'
  },
  {
    id: '2',
    name: 'The Beehive',
    address: '842 Valencia St',
    cid: 'bafkreigzh6lcwst3vxblh4il2ls2ysakjl73bqdcr5vj3yv7b4yqqfkm74'
  }
];

function AddName() {
  const [placeName, setPlaceName] = useState('');
  const { setName, data } = useAddPlaceStore();
  const backgroundColor = getBgColor(data.color);

  const handleSelectMatch = (match: (typeof MOCK_MATCHES)[0]) => {
    console.log('Selected match:', match);
  };

  const onChangeName = (_name: string) => {
    setPlaceName(_name);
  };

  const onAddName = () => {
    setName(placeName);
    router.dismissTo('/place/add/details');
  };

  return (
    <View sx={{ flex: 1, backgroundColor: theme.colors.$inputBg }}>
      <View sx={{ px: '$6', py: '$5', backgroundColor: '#fff' }}>
        <View
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 16,
            backgroundColor: theme.colors.$inputBg,
            px: '$3'
          }}
        >
          <TextInput
            autoFocus
            placeholder="Type a place name"
            sx={{
              flex: 1,
              width: '100%',
              fontSize: 16,
              paddingVertical: 12,
              paddingRight: 12
            }}
            onChangeText={onChangeName}
          />
          <Button
            disabled={!placeName}
            variant="secondary"
            size="sm"
            onPress={onAddName}
            sx={{
              backgroundColor,
              color: data.color,
              width: 'auto'
            }}
          >
            Add
          </Button>
        </View>
      </View>

      <View
        sx={{
          px: '$6',
          py: '$5',
          backgroundColor: theme.colors.$inputBg
        }}
      >
        <Text
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          Possible matches
        </Text>
      </View>

      <FlatList
        data={MOCK_MATCHES}
        keyExtractor={item => (item as Place).id}
        renderItem={({ item, index }) => {
          const place = item as Place;
          return (
            <TouchableOpacity
              onPress={() => handleSelectMatch(place)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.$gray200
              }}
            >
              <Image
                source={{
                  uri: `${Constants.expoConfig?.extra?.pinataGatewayUrl}/ipfs/${place.cid}`
                }}
                resizeMode="contain"
                style={{
                  width: 60,
                  height: 60,
                  transform: [{ rotate: index % 2 === 0 ? '10deg' : '-10deg' }]
                }}
              />
              <View>
                <Text sx={{ fontSize: 18, fontWeight: 600 }}>{place.name}</Text>
                <Text sx={{ fontSize: 14, color: theme.colors.$gray300 }}>
                  {place.address}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default AddName;
