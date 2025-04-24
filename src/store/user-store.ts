import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Role {
  id: number;
  name: string;
}

export interface UserProfile {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string; // ISO date string
  email: string;
  phone: string;
  profession: string;
  profileImage: string;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  role: Role;
}

interface UserStore {
  user: UserProfile | undefined;
  token: string | undefined;
  setUser: (user: UserProfile, token: string) => void;
  clearUser: () => void;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set): UserStore => ({
      user: undefined,
      token: undefined,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: undefined, token: undefined }),
    }),
    {
      name: 'user-store',
      partialize: state => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);
