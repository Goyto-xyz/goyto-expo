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

type Category = {
  label: string;
  Icon: React.FC<SvgProps>;
};

const CATEGORIES: Category[] = [
  { label: 'Breathe', Icon: BreatheIcon },
  { label: 'Eat & Drink', Icon: EatDrinkIcon },
  { label: 'Explore', Icon: ExploreIcon },
  { label: 'Party', Icon: PartyIcon },
  { label: 'Play', Icon: PlayIcon },
  { label: 'Relax', Icon: RelaxIcon },
  { label: 'Shop', Icon: ShopIcon },
  { label: 'Sweat', Icon: SweatIcon },
  { label: 'Travel', Icon: TravelIcon },
  { label: 'Work', Icon: WorkIcon }
];

function SelectCategory() {
  return (
    <View sx={{ px: '$6' }}>
      <ModalHeader showBackButton={false} title="This is a place to..." />

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
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
              console.log(item.label);
            }}
          >
            <item.Icon width={24} height={24} />
            <Text style={{ fontSize: 16 }}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default SelectCategory;
