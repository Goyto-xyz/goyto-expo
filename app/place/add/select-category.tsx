import React from 'react';
import ModalHeader from '@/app/components/ModalHeader';
import { View, Text, FlatList } from 'dripsy';

import BreatheIcon from '@/assets/icons/categories/breathe.svg';
import EatDrinkIcon from '@/assets/icons/categories/eat-drink.svg';
import ExploreIcon from '@/assets/icons/categories/explore.svg';
import PartyIcon from '@/assets/icons/categories/party.svg';
import PlayIcon from '@/assets/icons/categories/play.svg';
import RelaxIcon from '@/assets/icons/categories/relax.svg';
import ShopIcon from '@/assets/icons/categories/shop.svg';
import SweatIcon from '@/assets/icons/categories/sweat.svg';
import TravelIcon from '@/assets/icons/categories/travel.svg';
import WorkIcon from '@/assets/icons/categories/work.svg';
import { SvgProps } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import theme from '@/theme';
import { router } from 'expo-router';
import { useAddPlaceStore } from '@/stores/addPlaceStore';

type Category = {
  id: string;
  label: string;
  Icon: React.FC<SvgProps>;
};

const CATEGORIES: Category[] = [
  { id: 'breathe', label: 'Breathe', Icon: BreatheIcon },
  { id: 'eat_drink', label: 'Eat & Drink', Icon: EatDrinkIcon },
  { id: 'explore', label: 'Explore', Icon: ExploreIcon },
  { id: 'party', label: 'Party', Icon: PartyIcon },
  { id: 'play', label: 'Play', Icon: PlayIcon },
  { id: 'relax', label: 'Relax', Icon: RelaxIcon },
  { id: 'shop', label: 'Shop', Icon: ShopIcon },
  { id: 'sweat', label: 'Sweat', Icon: SweatIcon },
  { id: 'travel', label: 'Travel', Icon: TravelIcon },
  { id: 'work', label: 'Work', Icon: WorkIcon }
];

function SelectCategory() {
  const { setCategoryId } = useAddPlaceStore();

  return (
    <View sx={{ px: '$6' }}>
      <ModalHeader showBackButton={false} title="This is a place to..." />

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => (item as Category).label}
        renderItem={({ item }) => {
          const category = item as Category;
          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                paddingVertical: 10,
                borderBottomColor: theme.colors.$gray200,
                borderBottomWidth: 1
              }}
              onPress={() => {
                router.dismissTo('/place/add/add-name');
                setCategoryId(category.id);
              }}
            >
              <category.Icon width={24} height={24} />
              <Text style={{ fontSize: 16 }}>{category.label}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default SelectCategory;
