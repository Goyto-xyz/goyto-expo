import { create } from 'zustand';

type AddPlaceData = {
  name: string;
  categoryId: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
};

type AddPlaceStore = {
  data: AddPlaceData;
  setName: (name: string) => void;
  setCategoryId: (id: string) => void;
  setCoordinates: (coords: { latitude: number; longitude: number }) => void;
  clear: () => void;
};

export const useAddPlaceStore = create<AddPlaceStore>(set => ({
  data: {
    name: '',
    categoryId: null,
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
        coordinates: null
      }
    })
}));
