import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useState,
  useCallback
} from 'react';
import { View, Text, TextInput, Image } from 'dripsy';
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet';
import { Place, useNearbyPlaces } from '@/hooks/useNearbyPlaces';
import { useUserStore } from '@/stores/userStore';
import { getDistance } from '@/utils/geo';
import DistanceIndicator from '../components/DistanceIndicator';
import Button from '../components/Button';
import { CaretRight, Check, Heart, MapPin, X } from 'phosphor-react-native';
import theme from '@/theme';
import { TouchableOpacity } from 'react-native';
import CheckinsIcon from '@/assets/icons/place/checkins.svg';
import FavesIcon from '@/assets/icons/place/faves.svg';
import { useTags } from '@/hooks/useTags';
import { useCategories } from '@/hooks/useCategories';
import Constants from 'expo-constants';
import { formatDistanceToNow } from 'date-fns';
import tinycolor from 'tinycolor2';

export type PlaceDetailsRef = {
  open: (placeId: string) => void;
  close: () => void;
};

type Props = {
  onClose: () => void;
};

const PlaceDetails = forwardRef<PlaceDetailsRef, Props>(({ onClose }, ref) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['52%', '90%'], []);

  const [favorited, setFavorited] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
    undefined
  );

  const { location } = useUserStore();
  const nearbyPlaces = useNearbyPlaces(location || [0, 0]);

  useImperativeHandle(ref, () => ({
    open: (id: string) => {
      const _place = nearbyPlaces.find(p => p.id === id);
      setSelectedPlace(_place);
      bottomSheetRef.current?.present();
    },
    close: () => {
      bottomSheetRef.current?.close();
      onClose();
    }
  }));

  const tagMeta = useTags(selectedPlace?.category || '');
  const categories = useCategories();
  const categoryMeta = categories.find(c => c.id === selectedPlace?.category);

  const renderFooter = useCallback(
    (props: any) => {
      const backgroundColor = tinycolor(
        categoryMeta?.color || theme.colors.$secondary
      )
        .desaturate(30)
        .lighten(35)
        .toHexString();

      const color = tinycolor(categoryMeta?.color || theme.colors.$primary)
        .desaturate(10)
        .toHexString();

      return (
        <BottomSheetFooter {...props} bottomInset={0}>
          <View
            sx={{
              backgroundColor: '#fff',
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 15,
              pt: '$5',
              pb: '$8',
              px: '$4'
            }}
          >
            <Button
              variant="secondary"
              icon={<Check weight="bold" size={20} color={color} />}
              sx={{
                backgroundColor,
                color
              }}
            >
              I'm here!
            </Button>
          </View>
        </BottomSheetFooter>
      );
    },
    [categoryMeta]
  );

  if (!selectedPlace) return null;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
      animateOnMount
      onDismiss={() => onClose?.()}
    >
      <BottomSheetView
        style={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          position: 'relative'
        }}
      >
        <View
          sx={{
            flexDirection: 'column',
            flex: 1,
            height: '100%',
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
                width: 40,
                height: 40,
                borderRadius: 40,
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
                width: 40,
                height: 40,
                borderRadius: 40,
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
            <Text sx={{ fontSize: 25, fontWeight: 800 }}>
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
              <CheckinsIcon width={40} height={40} />
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
              <FavesIcon width={40} height={40} />
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

          {/* Address */}
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: theme.colors.$gray100,
              borderRadius: 25,
              paddingX: '$6',
              paddingY: '$3'
            }}
          >
            <MapPin weight="bold" size={25} color={categoryMeta?.color} />
            <Text sx={{ fontSize: 16 }}>{selectedPlace.address}</Text>
          </View>

          <>
            {selectedPlace.addedBy && (
              <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text sx={{ fontSize: 16, color: theme.colors.$gray300 }}>
                  Added by&nbsp;
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    color: theme.colors.$gray300,
                    textDecorationLine: 'underline'
                  }}
                >
                  {selectedPlace.addedBy}
                </Text>
                <Text
                  sx={{
                    fontSize: 16,
                    color: theme.colors.$gray300
                  }}
                >
                  &nbsp;
                  {formatDistanceToNow(selectedPlace.addedAt || Date.now(), {
                    addSuffix: true
                  })}
                </Text>
              </View>
            )}
          </>

          <View sx={{ flexDirection: 'column', gap: 20, mt: 10 }}>
            <Button
              variant="tertiary"
              sx={{ backgroundColor: theme.colors.$gray200 }}
            >
              Edit place
            </Button>

            <Button
              variant="secondary"
              sx={{
                backgroundColor: theme.colors.$gray200,
                color: theme.colors.$failed
              }}
            >
              Report place
            </Button>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default PlaceDetails;
