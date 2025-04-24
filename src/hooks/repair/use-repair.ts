import {
  getRepairRequests,
  repairRequest,
} from '@/server/repairement/repair-request';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useRepairRequest = () => {
  return useMutation({
    mutationFn: (payload: any) => repairRequest(payload),
    onSuccess: data => {
      console.log('Repair request success', data);
    },
    onError: error => {
      console.error('Repair request error', error);
    },
  });
};

export const useGetRepairRequests = () => {
  return useQuery({
    queryKey: ['repair-requests'],
    queryFn: () => getRepairRequests(),
    select: data => data?.repairRequests ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
