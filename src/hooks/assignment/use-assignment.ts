import { useMutation, useQuery } from '@tanstack/react-query';

import { AssignmentRequest } from '@/lib/types/assignment';
import {
  createAssignment,
  getAssignments,
} from '@/server/assignment/assignment-request';

export const useAssignment = () => {
  return useMutation({
    mutationFn: (payload: AssignmentRequest) => createAssignment(payload),
    onSuccess: data => {
      console.log('Assigned successfully', data);
    },
    onError: error => {
      console.error('Failed to assign', error);
    },
  });
};

export const useGetAssignment = () => {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: () => getAssignments(),
    select: data => data ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
