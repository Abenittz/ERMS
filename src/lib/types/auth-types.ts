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

export interface InvitationPayload {
  email: string;
}

export interface UserFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone?: string;
  profession?: string;
  password: string;
  roleId: number;
}
