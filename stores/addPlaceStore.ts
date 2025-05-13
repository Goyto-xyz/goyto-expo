import theme from '@/theme';
import { create } from 'zustand';

type AddPlaceData = {
  name: string;
  categoryId: string | null;
  tagIds: string[];
  color: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

type AddPlaceStore = {
  data: AddPlaceData;
  setName: (name: string) => void;
  setCategoryId: (categoryId: string) => void;
  setTagIds: (tagIds: string[]) => void;
  setColor: (id: string) => void;
  setCoordinates: (coords: { latitude: number; longitude: number }) => void;
  clear: () => void;
};

export const useAddPlaceStore = create<AddPlaceStore>(set => ({
  data: {
    name: '',
    categoryId: null,
    tagIds: [],
    color: theme.colors.$blue100,
    coordinates: null
  },
  setName: name => set(state => ({ data: { ...state.data, name } })),
  setCategoryId: categoryId =>
    set(state => ({
      data: {
        ...state.data,
        categoryId
      }
    })),
  setTagIds: tagIds =>
    set(state => ({
      data: {
        ...state.data,
        tagIds
      }
    })),
  setColor: color =>
    set(state => ({
      data: {
        ...state.data,
        color
      }
    })),
  setCoordinates: coordinates =>
    set(state => ({
      data: {
        ...state.data,
        coordinates
      }
    })),
  clear: () =>
    set({
      data: {
        name: '',
        categoryId: null,
        tagIds: [],
        color: theme.colors.$blue100,
        coordinates: null
      }
    })
}));
