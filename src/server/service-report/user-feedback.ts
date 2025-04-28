import { isAxiosError } from 'axios';

import apiClient from '../fetcher';

export interface UserFeedbackPayload {
  serviceReportId: number;
  userId: number;
  courtesy: string;
  communication: string;
  friendliness: string;
  professionalism: string;
  overallSatisfaction: string;
  comments: string;
}

export const createUserFeedback = async (payload: UserFeedbackPayload) => {
  try {
    const response = await apiClient.post('/feedbacks', payload);
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

export const getUserFeedbacks = async () => {
  try {
    const response = await apiClient.get('/feedbacks');
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
