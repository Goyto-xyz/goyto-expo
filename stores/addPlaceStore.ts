import theme from '@/theme';
import { create } from 'zustand';

type AddPlaceData = {
  name: string;
  categoryId: string | null;
  color: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

type AddPlaceStore = {
  data: AddPlaceData;
  setName: (name: string) => void;
  setCategoryId: (id: string) => void;
  setColor: (id: string) => void;
  setCoordinates: (coords: { latitude: number; longitude: number }) => void;
  clear: () => void;
};

export const useAddPlaceStore = create<AddPlaceStore>(set => ({
  data: {
    name: '',
    categoryId: null,
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
        color: theme.colors.$blue100,
        categoryId: null,
        coordinates: null
      }
    })
}));
