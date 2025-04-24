import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Role {
  id: number;
  name: string;
}

interface User {
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
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set): UserStore => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
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
