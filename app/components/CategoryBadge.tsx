import React from 'react';
import { Text, View } from 'dripsy';
import { Category } from '@/hooks/useCategories';
import { getBgColor } from '@/utils';

const CategoryBadge = ({ category }: { category: Category }) => {
  if (!category) return null;

  const backgroundColor = getBgColor(category.color);

  const Icon = category.Icon;

  return (
    <View
      sx={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        backgroundColor,
        borderRadius: 12,
        px: '$5',
        py: '$3',
        gap: 8,
        mb: '$3'
      }}
    >
      <Icon width={20} height={20} />
      <Text style={{ ml: 8, fontSize: 16, color: category.color }}>
        {category.label}
      </Text>
    </View>
  );
};

export default CategoryBadge;
