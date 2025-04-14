import { z } from 'zod';

// login schema
export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    }),
});

export type LoginInputs = z.infer<typeof loginSchema>;

// forgo schema
export const forgotSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export type ForgotInputs = z.infer<typeof forgotSchema>;

// reset password
export const resetSchema = z.object({
  newPassword: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    }),
});

export type ResetInputs = z.infer<typeof resetSchema>;
// change password me
export const changePassword = z.object({
  oldPassword: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    }),
  newPassword: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    }),
});

export type ChangePasswordInputs = z.infer<typeof changePassword>;

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().min(1, 'Middle name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Gender is required'),
  email: z.string().email('Must be a valid email address'),
  phone: z.string().optional(),
  profession: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  roleId: z.coerce.number(),
});

export type UserFormData = z.infer<typeof userSchema>;

export const invitationSchema = z.object({
  email: z.string().email('Must be a valid email address'),
});
export type InvitationInputs = z.infer<typeof invitationSchema>;
