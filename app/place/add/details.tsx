import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';
import ModalHeader from '@/app/components/ModalHeader';
import { useCategories } from '@/hooks/useCategories';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import theme from '@/theme';
import { getBgColor } from '@/utils';
import { View, Text, ScrollView, TextInput, Pressable } from 'dripsy';
import { router } from 'expo-router';
import { Plus } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { useTags } from '@/hooks/useTags';
import { useActionSheet } from '@expo/react-native-action-sheet';

function AddDetails() {
  const { data, setTagIds } = useAddPlaceStore();
  const categories = useCategories();
  const tags = useTags('breathe');
  const backgroundColor = getBgColor(data.color);

  const { showActionSheetWithOptions } = useActionSheet();

  const selectedCategory = categories.find(cat => cat.id === data.categoryId);

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
        console.log(buttonIndex);
        if (buttonIndex === 0) {
          router.push('/place/add/snippet');
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
            {data.snippet ? data.snippet : 'Add snippet'}
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
              fontWeight: 600
            }}
          >
            Add Phone
          </Text>
          <Text
            sx={{
              py: '$4',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Add Email
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
          <Text
            sx={{
              py: '$4',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Add Link
          </Text>
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
