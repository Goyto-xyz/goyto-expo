import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import ModalHeader from '@/app/components/ModalHeader';
import { useCategories } from '@/hooks/useCategories';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import theme from '@/theme';
import { getBgColor } from '@/utils';
import { View, Text, ScrollView, TextInput, Pressable } from 'dripsy';
import { router } from 'expo-router';
import {
  Compass,
  FacebookLogo,
  InstagramLogo,
  Plus,
  TiktokLogo,
  XLogo
} from 'phosphor-react-native';
import React from 'react';
import { useTags } from '@/hooks/useTags';
import { useActionSheet } from '@expo/react-native-action-sheet';
import GoytoIcon from '@/assets/icons/socials/goyto.svg';
import { Alert, Linking } from 'react-native';

function AddDetails() {
  const { data, setTagIds, setSocial } = useAddPlaceStore();
  const categories = useCategories();
  const tags = useTags('breathe');
  const backgroundColor = getBgColor(data.color);

  const { showActionSheetWithOptions } = useActionSheet();

  const selectedCategory = categories.find(cat => cat.id === data.categoryId);

  const socialConfig = {
    goyto: {
      label: 'Goyto',
      options: ['Edit Goyto', 'Delete Goyto', 'Cancel'],
      destructiveIndex: 1,
      cancelIndex: 2,
      editIndex: 0,
      openIndex: null,
      icon: () => <GoytoIcon width={24} height={24} />
    },
    facebook: {
      label: 'Facebook',
      options: ['Open Facebook', 'Edit Facebook', 'Delete Facebook', 'Cancel'],
      destructiveIndex: 2,
      cancelIndex: 3,
      editIndex: 1,
      openIndex: 0,
      openAppLink: (username: string) => `fb://page/${username}`,
      fallbackLink: (username: string) => `https://facebook.com/${username}`,
      icon: () => <FacebookLogo size={24} weight="bold" />
    },
    instagram: {
      label: 'Instagram',
      options: [
        'Open Instagram',
        'Edit Instagram',
        'Delete Instagram',
        'Cancel'
      ],
      destructiveIndex: 2,
      cancelIndex: 3,
      editIndex: 1,
      openIndex: 0,
      openAppLink: (username: string) =>
        `instagram://user?username=${username}`,
      fallbackLink: (username: string) => `https://instagram.com/${username}`,
      icon: () => <InstagramLogo size={24} weight="bold" />
    },
    twitter: {
      label: 'Twitter / X',
      options: [
        'Open Twitter / X',
        'Edit Twitter / X',
        'Delete Twitter / X',
        'Cancel'
      ],
      destructiveIndex: 2,
      cancelIndex: 3,
      editIndex: 1,
      openIndex: 0,
      openAppLink: (username: string) =>
        `twitter://user?screen_name=${username}`,
      fallbackLink: (username: string) => `https://twitter.com/${username}`,
      icon: () => <XLogo size={24} weight="bold" />
    },
    tiktok: {
      label: 'Tiktok',
      options: ['Open Tiktok', 'Edit Tiktok', 'Delete Tiktok', 'Cancel'],
      destructiveIndex: 2,
      cancelIndex: 3,
      editIndex: 1,
      openIndex: 0,
      openAppLink: (username: string) =>
        `snssdk1233://user/profile/${username}`,
      fallbackLink: (username: string) => `https://www.tiktok.com/@${username}`,
      icon: () => <TiktokLogo size={24} weight="bold" />
    },
    website: {
      label: 'Website',
      options: ['Open Website', 'Edit Website', 'Delete Website', 'Cancel'],
      destructiveIndex: 2,
      cancelIndex: 3,
      editIndex: 1,
      openIndex: 0,
      openAppLink: (url: string) => url,
      fallbackLink: (url: string) => url,
      icon: () => <Compass size={24} weight="bold" />
    }
  };

  const onRemoveTag = (tagId: string) => {
    const _newTagIds = data.tagIds.filter(t => t !== tagId);
    setTagIds(_newTagIds);
  };

  const openEditSnippetSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['Edit Snippet', 'Cancel'],
        cancelButtonIndex: 1
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          router.push('/place/add/snippet');
        }
      }
    );
  };

  const openEditPhoneSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['Edit Phone', 'Cancel'],
        cancelButtonIndex: 1
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          router.push('/place/add/phone');
        }
      }
    );
  };

  const openEditEmailSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['Edit Email', 'Cancel'],
        cancelButtonIndex: 1
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          router.push('/place/add/email');
        }
      }
    );
  };

  const openAddLinkSheet = () => {
    const availableSocialKeys = Object.keys(socialConfig).filter(
      key => !data.social[key as keyof typeof data.social]
    );

    const optionsLabels = [
      ...availableSocialKeys.map(
        key => `Add ${socialConfig[key as keyof typeof socialConfig].label}`
      ),
      'Cancel'
    ];

    const cancelButtonIndex = optionsLabels.length - 1;

    showActionSheetWithOptions(
      {
        options: optionsLabels,
        cancelButtonIndex
      },
      buttonIndex => {
        if (buttonIndex === cancelButtonIndex) return;

        const selectedKey = availableSocialKeys[buttonIndex as number];
        if (selectedKey) {
          router.push(`/place/add/social?type=${selectedKey}`);
        }
      }
    );
  };

  const openEditSocialSheet = (type: keyof typeof socialConfig) => {
    const config = socialConfig[type];
    const value = data.social[type];

    showActionSheetWithOptions(
      {
        options: config.options,
        title: value,
        destructiveButtonIndex: config.destructiveIndex,
        cancelButtonIndex: config.cancelIndex
      },
      buttonIndex => {
        if (config.openIndex !== null && buttonIndex === config.openIndex) {
          const appUrl = config.openAppLink?.(value);
          const fallback = config.fallbackLink?.(value);

          if (appUrl) {
            Linking.canOpenURL(appUrl)
              .then(supported => Linking.openURL(supported ? appUrl : fallback))
              .catch(err => console.error('Failed to open link', err));
          }
        }

        if (buttonIndex === config.editIndex) {
          router.push(`/place/add/social?type=${type}`);
        }

        if (buttonIndex === config.destructiveIndex) {
          Alert.alert(
            `Delete ${config.label}?`,
            `Are you sure you want to delete this ${config.label} link?`,
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                  const newSocial = { ...data.social, [type]: '' };
                  setSocial(newSocial);
                }
              }
            ]
          );
        }
      }
    );
  };

  return (
    <View sx={{ flex: 1, backgroundColor: theme.colors.$inputBg }}>
      <ModalHeader
        showBackButton={false}
        rightButton={
          <Button
            variant="secondary"
            size="sm"
            sx={{
              backgroundColor,
              color: data.color
            }}
          >
            Save
          </Button>
        }
        title="Place Details"
      />

      <ScrollView
        sx={{
          py: '$5'
        }}
      >
        {/* PLACE */}
        <Text
          sx={{
            px: '$6',
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          Place
        </Text>
        <View
          sx={{
            mt: '$4',
            px: '$6',
            backgroundColor: '#fff'
          }}
        >
          <View
            sx={{
              py: '$4',
              borderBottomWidth: 1,
              borderBottomColor: '$gray200'
            }}
          >
            <TextInput value={data.name} />
          </View>

          {selectedCategory && (
            <View sx={{ py: '$5' }}>
              <Badge
                Icon={selectedCategory.Icon}
                label={selectedCategory.label}
                color={selectedCategory.color}
                sx={{ mb: '$3' }}
              />

              {data.tagIds.length > 0 && (
                <View
                  sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '$2',
                    mb: '$3'
                  }}
                >
                  {data.tagIds.map(id => {
                    const tag = tags.find(t => t.id === id);

                    return (
                      <>
                        {tag && (
                          <Badge
                            Icon={tag.Icon}
                            label={tag.label}
                            color={data.color}
                            showDismiss
                            onDismiss={() => onRemoveTag(tag.id)}
                          />
                        )}
                      </>
                    );
                  })}
                </View>
              )}

              <Button
                icon={<Plus weight="bold" size={20} />}
                sx={{
                  alignSelf: 'flex-start',
                  width: 'auto',
                  backgroundColor: '#d9d9d9',
                  borderRadius: 12,
                  color: '$black',
                  textTransform: 'none',
                  fontFamily: 'Inter',
                  px: '$5',
                  py: '$3'
                }}
                onPress={() => {
                  router.push('/place/add/tags');
                }}
              >
                Add Tag
              </Button>
            </View>
          )}
        </View>

        {/* ABOUT */}
        <Text
          sx={{
            pt: '$7',
            px: '$6',
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          About
        </Text>

        <View
          sx={{
            mt: '$4',
            px: '$6',
            backgroundColor: '#fff'
          }}
        >
          <Text
            sx={{
              py: '$4',
              fontSize: 16,
              fontWeight: data.snippet ? 400 : 600
            }}
            onPress={() => {
              if (data.snippet) {
                openEditSnippetSheet();
              } else {
                router.push('/place/add/snippet');
              }
            }}
          >
            {data.snippet ? data.snippet : 'Add Snippet'}
          </Text>
        </View>

        {/* CONTACT */}
        <Text
          sx={{
            pt: '$7',
            px: '$6',
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          Contact
        </Text>

        <View
          sx={{
            mt: '$4',
            px: '$6',
            backgroundColor: '#fff'
          }}
        >
          <Text
            sx={{
              py: '$4',
              borderBottomWidth: 1,
              borderBottomColor: '$gray200',
              fontSize: 16,
              fontWeight: data.contact.phone ? 400 : 600
            }}
            onPress={() => {
              if (data.contact.phone) {
                openEditPhoneSheet();
              } else {
                router.push('/place/add/phone');
              }
            }}
          >
            {data.contact.phone ? data.contact.phone : 'Add Phone'}
          </Text>
          <Text
            sx={{
              py: '$4',
              fontSize: 16,
              fontWeight: data.contact.email ? 400 : 600
            }}
            onPress={() => {
              if (data.contact.email) {
                openEditEmailSheet();
              } else {
                router.push('/place/add/email');
              }
            }}
          >
            {data.contact.email ? data.contact.email : 'Add Email'}
          </Text>
        </View>

        {/* Links */}
        <Text
          sx={{
            pt: '$7',
            px: '$6',
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          Links
        </Text>

        <View
          sx={{
            mt: '$4',
            px: '$6',
            backgroundColor: '#fff'
          }}
        >
          {Object.entries(data.social).map(([key, value]) => {
            if (!value) return null;

            const config = socialConfig[key as keyof typeof socialConfig];
            if (!config) return null;

            // const Icon

            return (
              <Pressable
                key={key}
                sx={{
                  py: '$4',
                  borderBottomWidth: 1,
                  borderBottomColor: '$gray200',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '$3'
                }}
                onPress={() =>
                  openEditSocialSheet(key as keyof typeof socialConfig)
                }
              >
                {config.icon()}
                <Text
                  sx={{
                    fontSize: 16,
                    fontWeight: 400
                  }}
                >
                  {value}
                </Text>
              </Pressable>
            );
          })}

          {Object.keys(socialConfig).some(
            key => !data.social[key as keyof typeof data.social]
          ) && (
            <View>
              <Text
                sx={{
                  py: '$4',
                  fontSize: 16,
                  fontWeight: 600
                }}
                onPress={openAddLinkSheet}
              >
                Add Link
              </Text>
            </View>
          )}
        </View>

        {/* Address */}
        <Text
          sx={{
            pt: '$7',
            px: '$6',
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          Address
        </Text>
        <View
          sx={{
            mt: '$4',
            mb: '$10',
            px: '$6',
            backgroundColor: '#fff'
          }}
        >
          <TextInput
            multiline
            sx={{
              pt: '$4',
              pb: 60,
              fontSize: 16
            }}
            defaultValue={`114 Arkansas St\nSan Francisco CA 94107\nUnited States`}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default AddDetails;
