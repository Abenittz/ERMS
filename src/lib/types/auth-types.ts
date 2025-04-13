export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPayload {
  email: string;
}

export interface ResetPayload {
  newPassword: string;
  confirmPassword: string;
}
export interface changePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
