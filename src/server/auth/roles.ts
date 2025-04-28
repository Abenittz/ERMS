import { isAxiosError } from 'axios';

import apiClient from '../fetcher';

interface RoleInterface {
  id: string;
  name: string;
}

export const getRoles = async () => {
  try {
    const response = await apiClient.get('/auth/roles');
    const data: RoleInterface[] = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
