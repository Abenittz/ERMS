import { useMutation, useQuery } from '@tanstack/react-query';

import { AvailabilityPayload } from '@/lib/types/availability-types';
import {
  getAvailabilityById,
  updateAvailability,
} from '@/server/availability/availability-service';

export const useUpdateAvailability = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: AvailabilityPayload;
    }) => updateAvailability(id, payload),
    onMutate: () => {
      console.log('Updating availability...');
    },
    onSuccess: data => {
      console.log('Updated availability successfully', data);
    },
    onError: error => {
      console.error('Failed to update availability', error);
    },
  });
};

export const useGetAvailabilityById = (id: number) => {
  return useQuery({
    queryKey: ['availability', id],
    queryFn: () => getAvailabilityById(id),
    select: data => data,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
