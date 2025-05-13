import Badge from '@/app/components/Badge';
import Button from '@/app/components/Button';
import Checkbox from '@/app/components/Checkbox';
import ModalHeader from '@/app/components/ModalHeader';
import { Tag, useTags } from '@/hooks/useTags';
import { useAddPlaceStore } from '@/stores/addPlaceStore';
import theme from '@/theme';
import { getBgColor } from '@/utils';
import { FlatList, Pressable, Text, TextInput, View } from 'dripsy';
import React, { useState } from 'react';

function AddTags() {
  const { data } = useAddPlaceStore();
  const tags = useTags('breathe');
  const backgroundColor = getBgColor(data.color);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <View sx={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalHeader
        showBackButton={false}
        showCloseButton
        rightButton={
          <Button
            variant="secondary"
            size="sm"
            sx={{
              backgroundColor,
              color: data.color
            }}
          >
            Add
          </Button>
        }
        title="Add Tags"
      />

      <View sx={{ px: '$6' }}>
        <TextInput
          placeholder="Search tags"
          sx={{
            width: '100%',
            fontSize: 16,
            px: '$4',
            py: '$3',
            borderRadius: 12,
            backgroundColor: theme.colors.$inputBg
          }}
        />

        {/* SELECTED TAGS */}
        <View
          sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: '$2', py: '$4' }}
        >
          {selectedTags.length > 0 ? (
            <>
              {selectedTags.map(id => {
                const tag = tags.find(t => t.id === id);

                return (
                  <>
                    {tag && (
                      <Badge
                        Icon={tag?.Icon}
                        label={tag?.label}
                        color={data.color}
                      />
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <Text sx={{ color: theme.colors.$gray300 }}>No tags selected</Text>
          )}
        </View>
      </View>

      {/* SUGGESTED TAGS */}
      <View sx={{ px: '$6', py: '$4', backgroundColor: theme.colors.$inputBg }}>
        <Text
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: theme.colors.$gray300
          }}
        >
          Suggested
        </Text>
      </View>

      <FlatList
        data={tags}
        keyExtractor={item => (item as Tag).id}
        sx={{ px: '$6', backgroundColor: '#fff' }}
        renderItem={({ item }) => {
          const tag = item as Tag;
          return (
            <Pressable
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: '$3',
                borderBottomColor: theme.colors.$gray200,
                borderBottomWidth: 1
              }}
              onPress={() => toggleTag(tag.id)}
            >
              <View
                sx={{ flexDirection: 'row', alignItems: 'center', gap: '$4' }}
              >
                <tag.Icon width={24} height={24} />
                <Text style={{ fontSize: 16 }}>{tag.label}</Text>
              </View>
              <Checkbox
                color={data.color}
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

export default AddTags;
