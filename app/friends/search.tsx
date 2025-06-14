import theme from '@/theme';
import { FlatList, Text, TextInput, View } from 'dripsy';
import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { AddressBook, CaretRight, PaperPlaneTilt } from 'phosphor-react-native';
import { router } from 'expo-router';

function FriendsSearchScreen() {
  const MOCK_FRIENDS = [
    {
      id: '1',
      name: 'Dragoslav',
      username: 'kosmonaut',
      avatar: require('@/assets/images/user1.png')
    },
    {
      id: '2',
      name: 'Dragon',
      username: '',
      avatar: require('@/assets/images/user2.png')
    }
  ];

  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState(MOCK_FRIENDS);

  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  const showResults = query.trim().length > 0;

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
            placeholder="Search by name or username..."
            placeholderTextColor={theme.colors.$gray300}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            sx={{
              flex: 1,
              width: '100%',
              fontSize: 16,
              paddingVertical: 12,
              paddingRight: 12,
              paddingLeft: 12
            }}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {showResults ? (
        <>
          {filtered.length > 0 && (
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
                Look who we found
              </Text>
            </View>
          )}

          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <View
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
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <Image
                    source={item.avatar}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12
                    }}
                  />
                  <View>
                    <Text sx={{ fontSize: 18, fontWeight: 600 }}>
                      {item.name}
                    </Text>
                    <Text sx={{ fontSize: 14, color: theme.colors.$gray300 }}>
                      {item.username}
                    </Text>
                  </View>
                </View>

                <Button
                  size="sm"
                  sx={{ width: 'auto', color: theme.colors.$primary }}
                  variant="secondary"
                >
                  ADD
                </Button>
              </View>
            )}
          />
        </>
      ) : (
        <>
          <View sx={{ px: '$4', gap: '$3' }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                justifyContent: 'space-between'
              }}
              onPress={() => {
                router.push('/friends/invite');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AddressBook size={24} />
                <Text
                  style={{
                    marginLeft: 12,
                    fontSize: 16,
                    fontWeight: 'semibold'
                  }}
                >
                  From my contacts
                </Text>
              </View>

              <CaretRight weight="bold" size={20} />
            </TouchableOpacity>

            <Button
              sx={{
                backgroundColor: theme.colors.$gray200,
                color: '#000',
                paddingVertical: 14,
                borderRadius: 999,
                gap: 8
              }}
              icon={<PaperPlaneTilt weight="bold" size={20} />}
              onPress={() => {
                router.push('/friends/share');
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>SHARE INVITE LINK</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

export default FriendsSearchScreen;
