import { isAxiosError } from 'axios';

import { AssignmentRequest } from '@/lib/types/assignment';

import apiClient from '../fetcher';

export const createAssignment = async (payload: AssignmentRequest) => {
  try {
    const response = await apiClient.post('tasks/assignments', payload);
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

export const getAssignments = async () => {
  try {
    const response = await apiClient.get('tasks/assignments');
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
