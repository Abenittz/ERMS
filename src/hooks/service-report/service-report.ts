import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createServiceReport,
  getServiceReport,
} from '@/server/service-report/tecnician-service-report';

export const useCreateServiceReport = () => {
  return useMutation({
    mutationFn: (payload: any) => createServiceReport(payload),
    onSuccess: data => {
      console.log('Service report created successfully:', data);
    },
    onError: error => {
      console.error('Error creating service report:', error);
    },
  });
};

export const useGetServiceReports = () => {
  return useQuery({
    queryKey: ['service-reports'],
    queryFn: () => getServiceReport(),
    select: data => data?.serviceReports ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
