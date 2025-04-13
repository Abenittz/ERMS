import { isAxiosError } from 'axios';

import {
  changePasswordPayload,
  ForgotPayload,
  LoginPayload,
  ResetPayload,
} from '@/lib/types/auth-types';

import apiClient, { setCookie } from '../fetcher';

export const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post('/auth/login', payload);

    if (response.data.token) {
      setCookie('accessToken', response.data.token);
    }

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

export const forgotPassword = async (payload: ForgotPayload) => {
  try {
    const response = await apiClient.post('/auth/password/forgot', payload);
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

export const resetPassword = async (payload: ResetPayload) => {
  try {
    const response = await apiClient.post('/auth/password/reset/me', payload);
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
