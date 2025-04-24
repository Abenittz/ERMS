import { isAxiosError } from 'axios';

import {
  changePasswordPayload,
  ForgotPayload,
  InvitationPayload,
  LoginPayload,
  ResetPayload,
  UserFormData,
} from '@/lib/types/auth-types';
import { useUserStore } from '@/store/user-store';

import apiClient, { setCookie } from '../fetcher';

export const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post('/auth/login', payload);

    if (response.data.token) {
      setCookie('accessToken', response.data.token);
    }

    const { token, userWithoutPassword } = response.data;
    useUserStore.getState().setUser(userWithoutPassword, token);
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

export const registration = async (payload: UserFormData) => {
  try {
    const response = await apiClient.post('/auth/register', payload);
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

export const invitation = async (payload: InvitationPayload) => {
  try {
    const response = await apiClient.post('/registration/invite', payload);
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
