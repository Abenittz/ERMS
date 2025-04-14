import { useMutation } from '@tanstack/react-query';

import {
  ForgotPayload,
  LoginPayload,
  ResetPayload,
  UserFormData,
} from '@/lib/types/auth-types';
import {
  forgotPassword,
  login,
  registration,
  resetPassword,
} from '@/server/auth/login';

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: data => {
      console.log('Login successfully:', data);
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: (payload: UserFormData) => registration(payload),
    onSuccess: data => {
      console.log('Registration successfully:', data);
    },
    onError: error => {
      console.error('Registration failed:', error);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPayload) => forgotPassword(payload),
    onSuccess: () => {
      console.log('Password reset email sent');
    },
    onError: error => {
      console.error('Error sending password reset email:', error);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPayload) => resetPassword(payload),
    onSuccess: () => {
      console.log('Password reset successfully');
    },
    onError: error => {
      console.error('Error resetting password:', error);
    },
  });
};
