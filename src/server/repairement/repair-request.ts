import { isAxiosError } from 'axios';

import { RepairRequestPayload } from '@/lib/types/repairement';

import apiClient from '../fetcher';

export const repairRequest = async (payload: RepairRequestPayload) => {
  try {
    const response = await apiClient.post('/repairs/repair-requests', payload);
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

export const getRepairRequests = async () => {
  try {
    const response = await apiClient.get('/repairs/repair-requests');
    console.log('Repair requests:', response.data);
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
