export interface AvailabilityPayload {
  id?: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface AvailabilityTechnician {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string; // ISO date string
  email: string;
  phone: string;
  profession: string;
  passwordResetToken: string | null;
  refreshToken: string | null;
  profileImage: string | null;
  roleId: number;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
}

export interface Availability {
  id: number;
  userId: number;
  date: string; // ISO date string
  startTime: string; // Time string (HH:mm:ss)
  endTime: string; // Time string (HH:mm:ss)
  isAvailable: boolean;
  technician: AvailabilityTechnician;
}
