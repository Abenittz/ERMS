import { isAxiosError } from 'axios';

import { LoginPayload } from '@/lib/types/auth-types';

import apiClient from '../fetcher';

export const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post('/auth/login', payload);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
