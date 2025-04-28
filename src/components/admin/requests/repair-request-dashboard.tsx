'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetTechnicians } from '@/hooks/admin/use-get-users';
import {
  useAssignment,
  useGetAssignment,
} from '@/hooks/assignment/use-assignment';
import { useUpdateAvailability } from '@/hooks/availability/use-availability';
import { useAvailableTechnicians } from '@/hooks/availability/use-available-technician';
import { useGetRepairRequests } from '@/hooks/repair/use-repair';
import { RepairRequestResponse } from '@/lib/types/repairement';
import { createAssignment } from '@/server/assignment/assignment-request';
import { UserProfile, useUserStore } from '@/store/user-store';

import { RequestDetail } from './request-details';
import { RequestList } from './request-list';

// Assignment interface
// interface Assignment {
//   id: number
//   repairRequestId: number
//   technicianId: number
//   assignedById: number
//   assignedAt: string
//   technician: {
//     id: string
//     name: string
//     avatar: string
//   }
// }

export interface RepairRequestInterface {
  id: number;
  requestNumber: string;
  requestDate: string; // ISO date string
  department: string;
  requesterName: string;
  contactPhone: string;
  deviceName: string;
  deviceModel: string;
  serialNumber: string;
  assetNumber: string;
  problemDescription: string;
  priority: string;
  buildingBlockNumber: string | null;
  officeNumber: string | null;
  userId: number | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // ISO date string or null
}

export interface Technician {
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
  password: string;
  profileImage: string | null;
  roleId: number;
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // ISO date string or null
}

export interface Assignment {
  id: number;
  repairRequestId: number;
  technicianId: number;
  assignedById: number;
  assignedAt: string;
  RepairRequest: RepairRequestResponse;
  technician: UserProfile;
}

export interface AssignmentRequest {
  repairRequestId: number;
  technicianId: number;
  assignedById: number;
  assignedAt: string;
}
// Sample data based on the provided JSON structure
const sampleRequests = [
  {
    id: 1,
    requestNumber: 'REQ-2025-04-20-001',
    requestDate: '2025-04-20', // ISO date string
    department: 'IT Department',
    requesterName: 'John Doe',
    contactPhone: '+1234567890',
    deviceName: 'Dell Laptop',
    deviceModel: 'XPS 13',
    serialNumber: 'SN123456789',
    assetNumber: 'ASSET-00123',
    problemDescription: 'Screen flickering intermittently',
    priority: 'High',
    buildingBlockNumber: null,
    officeNumber: null,
    userId: null,
    createdAt: '2025-04-21T05:59:02.000Z', // ISO date string
    updatedAt: '2025-04-21T05:59:02.000Z', // ISO date string
    deletedAt: null,
  },
  {
    id: 2,
    requestNumber: 'REQ-2025-04-21-002',
    requestDate: '2025-04-21', // ISO date string
    department: 'Finance',
    requesterName: 'Jane Smith',
    contactPhone: '+9876543210',
    deviceName: 'HP Laptop',
    deviceModel: 'EliteBook 840',
    serialNumber: 'SN987654321',
    assetNumber: 'ASSET-00234',
    problemDescription: 'Battery not charging',
    priority: 'Medium',
    buildingBlockNumber: 'B2',
    officeNumber: '305',
    userId: 2,
    createdAt: '2025-04-21T10:15:30.000Z', // ISO date string
    updatedAt: '2025-04-21T10:15:30.000Z', // ISO date string
    deletedAt: null,
  },
  {
    id: 3,
    requestNumber: 'REQ-2025-04-22-003',
    requestDate: '2025-04-22', // ISO date string
    department: 'Marketing',
    requesterName: 'Robert Johnson',
    contactPhone: '+5551234567',
    deviceName: 'Apple MacBook',
    deviceModel: 'Pro 2021',
    serialNumber: 'SN555123456',
    assetNumber: 'ASSET-00345',
    problemDescription: 'Overheating during use',
    priority: 'Low',
    buildingBlockNumber: 'A1',
    officeNumber: '101',
    userId: 3,
    createdAt: '2025-04-22T08:45:00.000Z', // ISO date string
    updatedAt: '2025-04-22T08:45:00.000Z', // ISO date string
    deletedAt: null,
  },
];

// Sample technicians data
const techniciansData = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    gender: 'Male',
    dateOfBirth: '1995-08-15', // ISO date string
    email: 'john.doe@example.com',
    phone: '1234567890',
    profession: 'IT Support',
    passwordResetToken: null,
    refreshToken: null,
    password: '$2b$10$JQ10loE4lq4snJxW0ZsXwOY3JLLydzwEgVY1vKyfR0RdVhHorqhei',
    profileImage: 'https://example.com/image1.jpg',
    roleId: 1,
    status: 'active',
    createdAt: '2025-04-19T10:25:01.000Z', // ISO date string
    updatedAt: '2025-04-19T10:25:01.000Z', // ISO date string
    deletedAt: null,
  },
  {
    id: 2,
    firstName: 'Olivia',
    middleName: 'Grace',
    lastName: 'Smith',
    gender: 'Female',
    dateOfBirth: '1990-06-20', // ISO date string
    email: 'olivia.smith@example.com',
    phone: '9876543210',
    profession: 'Hardware Support',
    passwordResetToken: null,
    refreshToken: null,
    password: '$2b$10$n5ixwscoOzfszfOfonMfz.4mMBfo6Gx7QbYsOeTndUSLWGTzDjL1G',
    profileImage: 'https://example.com/image2.jpg',
    roleId: 2,
    status: 'active',
    createdAt: '2025-04-20T08:30:45.000Z', // ISO date string
    updatedAt: '2025-04-20T08:30:45.000Z', // ISO date string
    deletedAt: null,
  },
  {
    id: 3,
    firstName: 'Carlos',
    middleName: 'Eduardo',
    lastName: 'Rodriguez',
    gender: 'Male',
    dateOfBirth: '1988-12-05', // ISO date string
    email: 'carlos.rodriguez@example.com',
    phone: '5551234567',
    profession: 'Software Support',
    passwordResetToken: null,
    refreshToken: null,
    password: '$2b$10$JQ10loE4lq4snJxW0ZsXwOY3JLLydzwEgVY1vKyfR0RdVhHorqhei',
    profileImage: 'https://example.com/image3.jpg',
    roleId: 3,
    status: 'active',
    createdAt: '2025-04-21T12:45:30.000Z', // ISO date string
    updatedAt: '2025-04-21T12:45:30.000Z', // ISO date string
    deletedAt: null,
  },
];

// Sample assignment data
const sampleAssignments = [
  {
    id: 1,
    repairRequestId: 5,
    technicianId: 1,
    assignedById: 1,
    assignedAt: '2025-04-22T14:30:22.000Z',
    RepairRequest: {
      id: 7,
      requestNumber: 'REQ-2025-04-23-487',
      requestDate: '2025-04-23',
      department: 'IT Department',
      requesterName: 'Forest Desert',
      contactPhone: '0953464618',
      deviceName: 'Toshiba',
      deviceModel: 'split 8',
      serialNumber: 'SN233424',
      assetNumber: 'ASSSET-00232',
      problemDescription: 'Screen flickering issue',
      priority: 'Medium',
      buildingBlockNumber: null,
      officeNumber: null,
      userId: null,
      createdAt: '2025-04-23T08:59:43.000Z',
      updatedAt: '2025-04-23T08:59:43.000Z',
      deletedAt: null,
    },
    technician: {
      id: 1,
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe',
      gender: 'Male',
      dateOfBirth: '1995-08-15',
      email: 'jhon@gmail.com',
      phone: '1234567890',
      profession: 'Engineer',
      passwordResetToken: null,
      refreshToken: null,
      password: '$2b$10$JQ10loE4lq4snJxW0ZsXwOY3JLLydzwEgVY1vKyfR0RdVhHorqhei',
      profileImage: 'https://example.com/image.jpg',
      roleId: 1,
      status: 'active',
      createdAt: '2025-04-19T10:25:01.000Z',
      updatedAt: '2025-04-19T10:25:01.000Z',
      deletedAt: null,
    },
  },
  {
    id: 2,
    repairRequestId: 2,
    technicianId: 2,
    assignedById: 1,
    assignedAt: '2025-04-19T15:10:45.000Z',
    RepairRequest: {
      id: 1,
      requestNumber: 'REQ-2025-04-20-001',
      requestDate: '2025-04-20',
      department: 'IT Department',
      requesterName: 'John Doe',
      contactPhone: '+1234567890',
      deviceName: 'Dell Laptop',
      deviceModel: 'XPS 13',
      serialNumber: 'SN123456789',
      assetNumber: 'ASSET-00123',
      problemDescription: 'Screen flickering intermittently',
      priority: 'High',
      buildingBlockNumber: null,
      officeNumber: null,
      userId: null,
      createdAt: '2025-04-21T05:59:02.000Z',
      updatedAt: '2025-04-21T05:59:02.000Z',
      deletedAt: null,
    },
    technician: {
      id: 2,
      firstName: 'Forest',
      middleName: 'Frank',
      lastName: 'Desert',
      gender: 'Male',
      dateOfBirth: '2025-04-09',
      email: 'forest@gmail.com',
      phone: '0953464618',
      profession: 'Software Maitenance',
      passwordResetToken: null,
      refreshToken: null,
      password: '$2b$10$n5ixwscoOzfszfOfonMfz.4mMBfo6Gx7QbYsOeTndUSLWGTzDjL1G',
      profileImage: null,
      roleId: 3,
      status: 'active',
      createdAt: '2025-04-23T08:57:33.000Z',
      updatedAt: '2025-04-23T08:57:33.000Z',
      deletedAt: null,
    },
  },
];

export function RepairRequestDashboard() {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );

  const currentUser = useUserStore(state => state.user);

  const { data: requests = [], isLoading: isLoadingRequests } =
    useGetRepairRequests();
  const { data: assignments = [], refetch: refetchAssignments } =
    useGetAssignment();
  const { data: technicians = [] } = useGetTechnicians();
  const {
    data: availableTechs = [],
    isLoading: loadingAvailable,
    refetchAvailability,
  } = useAvailableTechnicians();

  const { mutateAsync: updateAvailability } = useUpdateAvailability();

  console.log('Available Technicians:', availableTechs);
  const { mutateAsync: createAssignment, isPending: assignmentPending } =
    useAssignment();
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const queryClient = useQueryClient();
  console.log('Assignments:', assignments);
  useEffect(() => {
    if (requests.length > 0 && !selectedRequestId) {
      setSelectedRequestId(requests[0].id);
    }
  }, [requests, selectedRequestId]);

  const selectedRequest =
    requests.find(
      (request: RepairRequestResponse) => request.id === selectedRequestId,
    ) || null;

  const handleAssignTechnician = async (
    requestId: number,
    technicianId: number,
  ) => {
    try {
      setIsLoading(requestId);

      const assignmentData: AssignmentRequest = {
        repairRequestId: requestId,
        technicianId: technicianId,
        assignedById: currentUser?.id ?? 1,
        assignedAt: new Date().toISOString(),
      };

      await createAssignment(assignmentData);

      await updateAvailability({
        id: technicianId,
        payload: {
          userId: technicianId,
          date: new Date().toISOString().split('T')[0], // Current date
          startTime: new Date().toISOString().split('T')[1].split('.')[0], // Current time
          endTime: new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours later
            .toISOString()
            .split('T')[1]
            .split('.')[0],
          isAvailable: false,
        },
      });

      await Promise.all([
        refetchAssignments(),
        refetchAvailability(),
        queryClient.invalidateQueries({
          queryKey: ['availability', technicianId],
        }),
      ]);

      const technician = technicians.find(
        (tech: UserProfile) => tech.id === technicianId,
      );
      if (technician) {
        toast.success('Technician Assigned', {
          description: `Technician ${technician.firstName} has been assigned to the request.`,
        });
      }
    } catch (error) {
      console.error('Error assigning technician:', error);
      toast.error('Error', {
        description: 'Failed to assign technician. Please try again.',
      });
    } finally {
      setIsLoading(null);
    }
  };

  if (isLoadingRequests) {
    return (
      <div className="container mx-auto p-4">Loading repair requests...</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/admin">
          <Home className="text-muted-foreground h-4 w-4" />
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-primary font-medium">Repairment Requests</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-white shadow-sm lg:col-span-1">
          <div className="border-b p-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Repairment Requests
            </h2>
          </div>

          <div className="border-b p-4">
            <div className="flex flex-wrap gap-2">
              {availableTechs.length > 0 ? (
                <>
                  {availableTechs.map((tech: UserProfile) => (
                    <div key={tech.id} className="flex items-center">
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage
                          src={tech.profileImage || '/placeholder.svg'}
                          alt={tech.firstName}
                        />
                        <AvatarFallback>
                          {tech.firstName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                  <div className="flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    <span>Available Technicians</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                  <span>No Technicians Available</span>
                </div>
              )}
            </div>
          </div>

          <RequestList
            requests={requests}
            selectedRequestId={selectedRequestId}
            onSelectRequest={id => setSelectedRequestId(id)}
          />
        </div>

        <div className="rounded-lg border bg-white shadow-sm lg:col-span-2">
          {selectedRequest && (
            <RequestDetail
              request={selectedRequest}
              assignment={
                assignments.find(
                  (a: Assignment) => a.repairRequestId === selectedRequest.id,
                ) || null
              }
              technicians={availableTechs}
              onAssignTechnician={handleAssignTechnician}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
