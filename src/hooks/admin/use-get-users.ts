import { useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteUser,
  getTechnicians,
  getUsers,
  updateUser,
} from '@/server/admin/users';

export const useGetTechnicians = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['technicians', page, pageSize],
    queryFn: () => getTechnicians(page, pageSize),
    select: data => data?.users ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useGetUsers = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => getUsers(page, pageSize),
    select: data => data?.users ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ userId, payload }: { userId: number; payload: any }) =>
      updateUser(userId, payload),
    onSuccess: () => {
      console.log('User updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      console.log('User deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting user:', error);
    },
  });
};
