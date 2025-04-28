import { useMutation, useQuery } from '@tanstack/react-query';

import {
  createUserFeedback,
  getUserFeedbacks,
  UserFeedbackPayload,
} from '@/server/service-report/user-feedback';

export const useCreateUserFeedback = () => {
  return useMutation({
    mutationFn: (payload: UserFeedbackPayload) => createUserFeedback(payload),
    onSuccess: data => {
      console.log('User feedback created successfully:', data);
    },
    onError: error => {
      console.error('Error creating user feedback:', error);
    },
  });
};

export const useGetUserFeedbacks = () => {
  return useQuery({
    queryKey: ['user-feedbacks'],
    queryFn: () => getUserFeedbacks(),
    select: data => data?.feedbacks ?? [],
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
