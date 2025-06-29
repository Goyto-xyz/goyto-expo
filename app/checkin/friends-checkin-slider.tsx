import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { FriendCheckin, useFriendsCheckins } from '@/hooks/useFriendsCheckins';
import { useUserStore } from '@/stores/userStore';
import { View, Text, Image } from 'dripsy';
import Constants from 'expo-constants';
import { Friend } from '@/hooks/useNearbyFriends';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { CaretLeft, CaretRight } from 'phosphor-react-native';
import theme from '@/theme';
import DistanceIndicator from '../components/DistanceIndicator';

export type FriendsCheckinSliderRef = {
  scrollToFriend: (friendId: string) => void;
};

type Props = {
  friends: Friend[];
  selectedId: string | null;
  onSlideChange: (friend: FriendCheckin) => void;
};

const { width } = Dimensions.get('window');

const FriendsCheckinSlider = forwardRef<FriendsCheckinSliderRef, Props>(
  ({ friends, selectedId, onSlideChange }, ref) => {
    const { location } = useUserStore();
    const checkins = useFriendsCheckins(friends, location || [0, 0]);
    const index = selectedId ? friends.findIndex(f => f.id === selectedId) : 0;

    const carouselRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useImperativeHandle(ref, () => ({
      scrollToFriend: (friendId: string) => {
        const idx = checkins.findIndex(f => f.id === friendId);
        if (idx !== -1) {
          carouselRef.current?.scrollTo({ index: idx, animated: true });
        }
      }
    }));

    const translateY = useSharedValue(500);

    useEffect(() => {
      translateY.value = withTiming(selectedId ? 0 : 500, { duration: 300 });
    }, [selectedId]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }]
    }));

    const handlePrev = () => {
      if (!carouselRef.current) return;
      const nextIndex = (currentIndex + 1) % checkins.length;
      carouselRef.current.scrollTo({ index: nextIndex, animated: true });
    };

    const handleNext = () => {
      if (!carouselRef.current) return;
      const prevIndex = (currentIndex - 1 + checkins.length) % checkins.length;
      carouselRef.current.scrollTo({ index: prevIndex, animated: true });
    };

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 120,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            zIndex: 20
          },
          animatedStyle
        ]}
      >
        <View
          sx={{
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 8,
            paddingRight: 8
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 15,
              top: '40%',
              zIndex: 10
            }}
            onPress={handlePrev}
          >
            <CaretLeft size={30} color={theme.colors.$gray300} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: '40%',
              zIndex: 10
            }}
            onPress={handleNext}
          >
            <CaretRight size={30} color={theme.colors.$gray300} />
          </TouchableOpacity>

          <Carousel
            ref={carouselRef}
            width={width}
            height={220}
            loop
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 45
            }}
            style={{ alignSelf: 'center' }}
            data={checkins}
            defaultIndex={index}
            scrollAnimationDuration={500}
            onSnapToItem={i => {
              setCurrentIndex(i);
              onSlideChange(checkins[i]);
            }}
            renderItem={({ item }) => (
              <View
                sx={{
                  flexDirection: 'column',
                  height: 220,
                  justifyContent: 'center'
                }}
              >
                <View
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    padding: 20,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 4,
                    gap: 10
                  }}
                >
                  {item.place && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                          shadowColor: 'rgba(0,0,0,0.3)',
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                          elevation: 1
                        }}
                      >
                        <Image
                          source={item.place.icon}
                          style={{
                            width: 40,
                            height: 40
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontFamily: theme.fonts.button,
                          fontSize: 16,
                          color: '#fff',
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 20,
                          shadowColor: 'rgba(0,0,0,0.3)',
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 1,
                          shadowRadius: 2,
                          elevation: 1,
                          backgroundColor: item.place.color
                        }}
                      >
                        {item.place.name}
                      </Text>
                    </View>
                  )}

                  <View
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 10
                    }}
                  >
                    <Image
                      source={{
                        uri: `${Constants.expoConfig?.extra?.pinataGatewayUrl}/ipfs/${item.avatar}`
                      }}
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 12
                      }}
                      resizeMode="contain"
                      fadeDuration={0}
                    />
                    <View
                      sx={{
                        flexDirection: 'column',
                        gap: 5
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold'
                        }}
                      >
                        {item.name}
                      </Text>
                      <View
                        sx={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5
                        }}
                      >
                        <Text sx={{ color: theme.colors.$gray300 }}>
                          {item.timeAgo} ago
                        </Text>
                        <Text sx={{ color: theme.colors.$gray300 }}>•</Text>
                        {location && (
                          <DistanceIndicator
                            userLocation={location}
                            placeLocation={item.coordinates}
                          />
                        )}
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text sx={{ fontSize: 40 }}>
                      {item.emojiReactions.join(' ')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </Animated.View>
    );
  }
);

export default FriendsCheckinSlider;
