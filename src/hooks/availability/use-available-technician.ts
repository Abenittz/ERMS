'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import apiClient from '@/server/fetcher';
import { UserProfile } from '@/store/user-store';

import { useGetTechnicians } from '../admin/use-get-users';

export const useAvailableTechnicians = () => {
  const queryClient = useQueryClient();
  const { data: technicians = [], isLoading, error } = useGetTechnicians();
  const [availableTechs, setAvailableTechs] = useState<UserProfile[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  const refetchAvailability = async () => {
    if (technicians.length === 0) return;

    setIsLoadingAvailability(true);
    try {
      const availabilityPromises = technicians.map((tech: UserProfile) =>
        apiClient.get(`/tasks/availability/${tech.id}`).catch(() => null),
      );

      const availabilityResults = await Promise.all(availabilityPromises);

      const available = technicians.filter(
        (tech: UserProfile, index: number) => {
          const availability = availabilityResults[index]?.data;
          return availability?.isAvailable;
        },
      );

      setAvailableTechs(available);

      // Invalidate all availability queries
      technicians.forEach((tech: UserProfile) => {
        queryClient.invalidateQueries({ queryKey: ['availability', tech.id] });
      });
    } finally {
      setIsLoadingAvailability(false);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    refetchAvailability();
  }, [technicians]);

  return {
    data: availableTechs,
    isLoading: isLoading || isLoadingAvailability,
    error,
    refetchAvailability, // Expose the refetch function
  };
};
