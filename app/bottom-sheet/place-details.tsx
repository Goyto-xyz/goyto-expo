import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useState
} from 'react';
import { View, Text, TextInput, Image } from 'dripsy';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNearbyPlaces } from '@/hooks/useNearbyPlaces';
import { useUserStore } from '@/stores/userStore';
import { getDistance } from '@/utils/geo';
import DistanceIndicator from '../components/DistanceIndicator';
import Button from '../components/Button';
import { CaretRight, Check, Heart, X } from 'phosphor-react-native';
import theme from '@/theme';
import { TouchableOpacity } from 'react-native';
import CheckinsIcon from '@/assets/icons/place/checkins.svg';
import FavesIcon from '@/assets/icons/place/faves.svg';
import { useTags } from '@/hooks/useTags';
import { useCategories } from '@/hooks/useCategories';
import Constants from 'expo-constants';

export type PlaceDetailsRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  placeId: string | null;
  onClose?: () => void;
};

const PlaceDetails = forwardRef<PlaceDetailsRef, Props>(
  ({ placeId, onClose }, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['60%', '90%'], []);

    const [favorited, setFavorited] = useState(false);

    const { location } = useUserStore();
    const nearbyPlaces = useNearbyPlaces(location || [0, 0]);

    const selectedPlace = useMemo(() => {
      return nearbyPlaces.find(p => p.id === placeId) || null;
    }, [placeId, nearbyPlaces]);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.present(),
      close: () => bottomSheetRef.current?.close()
    }));

    const tagMeta = useTags(selectedPlace?.category || '');
    const categories = useCategories();
    const categoryMeta = categories.find(c => c.id === selectedPlace?.category);
    const categoryColor = categoryMeta?.color ?? '#999';

    if (!selectedPlace) return null;

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing
      >
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 40 }}>
          <View
            sx={{
              flexDirection: 'column',
              gap: 20
            }}
          >
            {/* Buttons */}
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.$gray100,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  bottomSheetRef.current?.close();
                  onClose?.();
                }}
              >
                <X weight="bold" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: favorited
                    ? theme.colors.$failed
                    : theme.colors.$gray100,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  setFavorited(!favorited);
                }}
              >
                <Heart weight="bold" color={favorited ? '#fff' : '#000'} />
              </TouchableOpacity>
            </View>

            {/* Title */}
            <View
              sx={{
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Text sx={{ fontSize: 28, fontWeight: 800 }}>
                {selectedPlace.name}
              </Text>
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5
                }}
              >
                {selectedPlace.address && (
                  <>
                    <Text sx={{ color: theme.colors.$gray300 }}>
                      {selectedPlace.address.split(',')[0]}
                    </Text>
                    <Text sx={{ color: theme.colors.$gray300 }}>•</Text>
                  </>
                )}
                {location && (
                  <DistanceIndicator
                    userLocation={location}
                    placeLocation={selectedPlace.coordinates}
                  />
                )}
              </View>
            </View>

            {/* Check-ins and faves count */}
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2
              }}
            >
              <View
                sx={{
                  padding: '$5',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  backgroundColor: theme.colors.$gray100,
                  width: '50%',
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16
                }}
              >
                <CheckinsIcon />
                <View sx={{ alignItems: 'center' }}>
                  <Text
                    sx={{
                      fontFamily: theme.fonts.button,
                      fontWeight: 'bold',
                      fontSize: 18
                    }}
                  >
                    2
                  </Text>
                  <Text
                    sx={{
                      fontFamily: theme.fonts.button,
                      fontSize: 14,
                      color: theme.colors.$gray400,
                      textTransform: 'uppercase'
                    }}
                  >
                    Check-ins
                  </Text>
                </View>
              </View>
              <View
                sx={{
                  padding: '$5',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  backgroundColor: theme.colors.$gray100,
                  width: '50%',
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16
                }}
              >
                <FavesIcon />
                <View sx={{ alignItems: 'center' }}>
                  <Text
                    sx={{
                      fontFamily: theme.fonts.button,
                      fontWeight: 'bold',
                      fontSize: 18
                    }}
                  >
                    12
                  </Text>
                  <Text
                    sx={{
                      fontFamily: theme.fonts.button,
                      fontSize: 14,
                      color: theme.colors.$gray400,
                      textTransform: 'uppercase'
                    }}
                  >
                    Faves
                  </Text>
                </View>
              </View>
            </View>

            {/* Categories */}
            <View
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
                marginTop: 10
              }}
            >
              {selectedPlace.tags?.map(tagId => {
                const tag = tagMeta.find(t => t.id === tagId);
                if (!tag) return null;

                return (
                  <View
                    key={tag.id}
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                      borderRadius: 16,
                      gap: 5
                    }}
                  >
                    <tag.Icon width={24} height={24} />
                    <Text sx={{ fontSize: 16 }}>{tag.label}</Text>
                  </View>
                );
              })}
            </View>

            {/* Friends */}
            {selectedPlace.friends && selectedPlace.friends?.length > 0 && (
              <View
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '$2'
                }}
              >
                <View sx={{ flexDirection: 'row' }}>
                  {selectedPlace.friends.slice(0, 3).map((friend, index) => {
                    let rotate = '0deg';
                    if (index === 0) rotate = '-15deg';
                    if (index === 1)
                      rotate =
                        (selectedPlace.friends?.length ?? 0) > 2
                          ? '0deg'
                          : '15deg';
                    if (index === 2) rotate = '15deg';

                    return (
                      <Image
                        key={friend.id}
                        source={{
                          uri: `${Constants.expoConfig?.extra?.pinataGatewayUrl}/ipfs/${friend.avatar}`
                        }}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          borderWidth: 2,
                          borderColor: '#fff',
                          marginLeft: -5,
                          transform: [{ rotate }]
                        }}
                      />
                    );
                  })}
                </View>
                <Text sx={{ color: '$gray500', fontSize: 14 }}>
                  {selectedPlace.friends.length} friends has been here
                </Text>
              </View>
            )}

            <Button
              variant="secondary"
              icon={<Check weight="bold" size={20} />}
              onPress={() => bottomSheetRef.current?.close()}
            >
              I'm here!
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default PlaceDetails;
