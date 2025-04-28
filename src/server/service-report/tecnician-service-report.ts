import { isAxiosError } from 'axios';

import { ServiceReport } from '@/lib/types/service-report';

import apiClient from '../fetcher';

export const createServiceReport = async (payload: ServiceReport) => {
  try {
    const response = await apiClient.post('/repairs/service-reports', payload);
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

export const getServiceReport = async () => {
  try {
    const response = await apiClient.get(`/repairs/service-reports`);
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
