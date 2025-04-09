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
  setUser: (user: User) => void;
  setAction: (action: ActionType) => void;
  clear: () => void;
};

export const useUserStore = create<UserStore>(set => ({
  user: null,
  action: null,
  setUser: user => set({ user }),
  setAction: action => set({ action }),
  clear: () => set({ user: null, action: null })
}));
