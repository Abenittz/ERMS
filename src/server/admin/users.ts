import { isAxiosError } from 'axios';

import apiClient from '../fetcher';

export const getTechnicians = async (
  page: number = 1,
  pageSize: number = 10,
) => {
  try {
    const response = await apiClient.get(
      `/user/profile?roleId=2&page=${page}&pageSize=${pageSize}`,
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

export const getUsers = async (page: number = 1, pageSize: number = 10) => {
  try {
    const response = await apiClient.get(
      `/user/profile?roleId=3&page=${page}&pageSize=${pageSize}`,
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

export const updateUser = async (userId: number, payload: any) => {
  try {
    const response = await apiClient.put(`/user/profile/${userId}?`, payload);
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

export const deleteUser = async (userId: number) => {
  try {
    const response = await apiClient.delete(`/user/profile/${userId}`);
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
