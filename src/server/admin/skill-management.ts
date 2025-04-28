import { isAxiosError } from 'axios';

import apiClient from '../fetcher';

export const addSkill = async (skill: string) => {
  try {
    const response = await apiClient.post('/tasks/skills', { name: skill });
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

interface skillsInterface {
  id: number;
  name: string;
}
export const getSkills = async () => {
  try {
    const response = await apiClient.get('/tasks/skills');
    const data: skillsInterface[] = response.data;
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

export const editSkill = async (payload: { id: string; skill: string }) => {
  try {
    const response = await apiClient.patch(`/tasks/skills/${payload.id}`, {
      name: payload.skill,
    });
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

export interface AssignSkillPayload {
  userId: number;
  skillId: number;
}

export const assignSkill = async (payload: AssignSkillPayload) => {
  try {
    const response = await apiClient.post('/tasks/technician-skills', payload);
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

export const getTechniciansSkills = async () => {
  try {
    const response = await apiClient.get('/tasks/technician-skills');
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

export const deleteTechnicianSkill = async (id: number) => {
  try {
    const response = await apiClient.delete(`/tasks/technician-skills/${id}`);
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
