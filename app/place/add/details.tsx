import Button from '@/app/components/Button';
import CategoryBadge from '@/app/components/CategoryBadge';
import ModalHeader from '@/app/components/ModalHeader';
import { useCategories } from '@/hooks/useCategories';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import theme from '@/theme';
import { getBgColor } from '@/utils';
import { View, Text, ScrollView, TextInput, Pressable } from 'dripsy';
import { router } from 'expo-router';
import { Plus } from 'phosphor-react-native';
import React from 'react';

function AddDetails() {
  const { data } = useAddPlaceStore();
  const categories = useCategories();
  const backgroundColor = getBgColor(data.color);

  const selectedCategory = categories.find(cat => cat.id === data.categoryId);

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
              <CategoryBadge category={selectedCategory} />

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
                  router.push('/place/add/add-tags');
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
              fontWeight: 600
            }}
          >
            Add Snippet
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
