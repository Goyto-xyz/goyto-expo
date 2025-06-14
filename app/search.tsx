import theme from '@/theme';
import { FlatList, Text, TextInput, View } from 'dripsy';
import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { DistanceIndicator } from './components/DistanceIndicator';
import { useUserStore } from '@/stores/userStore';
import { generateNearbyCoordinates } from '@/utils';

function SearchScreen() {
  const { location } = useUserStore();
  const generated = generateNearbyCoordinates(location || [0, 0], 2, 1000);
  const MOCK_MATCHES = [
    {
      id: '1',
      name: 'Boba Guys',
      address: '3491 19th St',
      cid: 'bafkreier2owjqsk5iwcmhbogaxqndzoevmimrg7prx6b46msiz6ziahr2y',
      coordinates: generated[0]
    },
    {
      id: '2',
      name: 'The Beehive',
      address: '842 Valencia St',
      cid: 'bafkreigzh6lcwst3vxblh4il2ls2ysakjl73bqdcr5vj3yv7b4yqqfkm74',
      coordinates: generated[1]
    }
  ];

  const [places, setPlaces] = useState(MOCK_MATCHES);

  return (
    <View sx={{ flex: 1, backgroundColor: theme.colors.$gray }}>
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
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            placeholder="Search around here..."
            sx={{
              flex: 1,
              width: '100%',
              fontSize: 16,
              paddingVertical: 12,
              paddingRight: 12,
              paddingLeft: 12,
              color: theme.colors.$gray300
            }}
          />
        </View>
      </View>

      <View
        sx={{
          px: '$6',
          py: '$2'
        }}
      >
        <Text
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          2 PLACES NEAR BY
        </Text>
      </View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.$gray200
            }}
          >
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Image
                source={{
                  uri: `${Constants.expoConfig?.extra?.pinataGatewayUrl}/ipfs/${item.cid}`
                }}
                resizeMode="contain"
                style={{
                  width: 60,
                  height: 60,
                  transform: [{ rotate: index % 2 === 0 ? '10deg' : '-10deg' }]
                }}
              />
              <View>
                <Text sx={{ fontSize: 18, fontWeight: 600 }}>{item.name}</Text>
                <Text sx={{ fontSize: 14, color: theme.colors.$gray300 }}>
                  {item.address}
                </Text>
              </View>
            </View>
            {location && (
              <DistanceIndicator
                userLocation={location}
                placeLocation={item.coordinates}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default SearchScreen;
