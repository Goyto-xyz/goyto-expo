import React from 'react';
import ModalHeader from '@/app/components/ModalHeader';
import { View, Text, FlatList, Pressable } from 'dripsy';

import { TouchableOpacity } from 'react-native';
import theme from '@/theme';
import { router } from 'expo-router';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import { Category, useCategories } from '@/hooks/useCategories';

function SelectCategory() {
  const { setCategoryId, setColor } = useAddPlaceStore();
  const categories = useCategories();

  return (
    <View sx={{ px: '$6', backgroundColor: '#fff' }}>
      <ModalHeader showBackButton={false} title="This is a place to..." />

      <FlatList
        data={categories}
        keyExtractor={item => (item as Category).id}
        renderItem={({ item }) => {
          const category = item as Category;
          return (
            <Pressable
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                py: 10,
                borderBottomColor: theme.colors.$gray200,
                borderBottomWidth: 1
              }}
              onPress={() => {
                router.dismissTo('/place/add/add-name');
                setCategoryId(category.id);
                setColor(category.color);
              }}
            >
              <category.Icon width={24} height={24} />
              <Text style={{ fontSize: 16 }}>{category.label}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

export default SelectCategory;
