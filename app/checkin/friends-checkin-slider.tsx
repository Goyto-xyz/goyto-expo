import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useFriendsCheckins } from '@/hooks/useFriendsCheckins';
import { useUserStore } from '@/stores/userStore';

type FriendCheckin = {
  id: string;
  name: string;
  coordinates: [number, number];
  place: string;
  timeAgo: string;
  emojiReactions: string[];
};

type Props = {
  selectedId: string | null;
  onSlideChange: (friend: FriendCheckin) => void;
};

const { width } = Dimensions.get('window');

const FriendsCheckinSlider = ({ selectedId, onSlideChange }: Props) => {
  const location = useUserStore();
  const friends = useFriendsCheckins(location || [0, 0]);
  const index = selectedId ? friends.findIndex(f => f.id === selectedId) : 0;

  return (
    <Carousel
      width={width * 0.8}
      height={120}
      style={{ alignSelf: 'center' }}
      data={friends}
      defaultIndex={index}
      scrollAnimationDuration={400}
      onSnapToItem={i => onSlideChange(friends[i])}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.place}</Text>
          <Text>{item.timeAgo} ago</Text>
          <Text>{item.emojiReactions.join(' ')}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default FriendsCheckinSlider;
