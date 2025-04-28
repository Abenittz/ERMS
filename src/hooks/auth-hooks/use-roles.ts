import { useQuery } from '@tanstack/react-query';

import { getRoles } from '@/server/auth/roles';

export const useGetRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
    select: data => data,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
