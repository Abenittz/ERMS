import { useMutation, useQuery } from '@tanstack/react-query';

import {
  addSkill,
  assignSkill,
  deleteTechnicianSkill,
  editSkill,
  getSkills,
  getTechniciansSkills,
} from '@/server/admin/skill-management';

export const useAddSkill = () => {
  return useMutation({
    mutationFn: (payload: string) => addSkill(payload),
    onSuccess: data => {
      console.log('Skill added successfully:', data);
    },
    onError: error => {
      console.error('Error adding skill:', error);
    },
  });
};

export const useEditSkill = () => {
  return useMutation({
    mutationFn: (payload: { id: string; skill: string }) => editSkill(payload),
    onSuccess: data => {
      console.log('Skill edited successfully:', data);
    },
    onError: error => {
      console.error('Error editing skill:', error);
    },
  });
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills(),
    select: data => data ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useAssignSkill = () => {
  return useMutation({
    mutationFn: (payload: { userId: number; skillId: number }) =>
      assignSkill(payload),
    onSuccess: data => {
      console.log('Skill assigned successfully:', data);
    },
    onError: error => {
      console.error('Error assigning skill:', error);
    },
  });
};

export const useGetTechniciansSkills = () => {
  return useQuery({
    queryKey: ['technicians-skills'],
    queryFn: () => getTechniciansSkills(),
    select: data => data ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useDeleteTechnicianSkill = () => {
  return useMutation({
    mutationFn: (id: number) => deleteTechnicianSkill(id),
    onSuccess: data => {
      console.log('Technician skill deleted successfully:', data);
    },
    onError: error => {
      console.error('Error deleting technician skill:', error);
    },
  });
};
