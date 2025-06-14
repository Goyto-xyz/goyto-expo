import { create } from 'zustand';

type User = {
  email: string;
};

type ActionType =
  | 'createAccount'
  | 'signIn'
  | 'linkEmail'
  | 'linkWallet'
  | null;

type UserStore = {
  user: User | null;
  action: ActionType;
  location: [number, number] | null;
  setUser: (user: User) => void;
  setAction: (action: ActionType) => void;
  setLocation: (location: [number, number] | null) => void;
  clear: () => void;
};

export const useUserStore = create<UserStore>(set => ({
  user: null,
  action: null,
  location: null,
  setUser: user => set({ user }),
  setAction: action => set({ action }),
  setLocation: location => set({ location }),
  clear: () => set({ user: null, action: null })
}));
