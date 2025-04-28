import { isAxiosError } from 'axios';

import { AvailabilityPayload } from '@/lib/types/availability-types';

import apiClient from '../fetcher';

export const getAvailability = async () => {
  try {
    const response = await apiClient.get('/availability');
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

export const getAvailabilityById = async (id: number) => {
  try {
    const response = await apiClient.get(`/tasks/availability/${id}`);
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

export const createAvailability = async (payload: AvailabilityPayload) => {
  try {
    const response = await apiClient.post('/tasks/availability', payload);
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

export const updateAvailability = async (
  id: number,
  payload: AvailabilityPayload,
) => {
  try {
    const response = await apiClient.patch(
      `/tasks/availability/${id}`,
      payload,
    );
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
