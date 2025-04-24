'use client';

/* eslint-disable unicorn/no-null */
import { Home } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RepairRequestResponse } from '@/lib/types/repairement';

import { RequestDetail } from './request-details';
import { RequestList } from './request-list';

// Sample data based on the provided JSON structure
const sampleRequests = [
  {
    id: 6,
    requestNumber: 'REQ-2025-04-23-215',
    requestDate: '2025-04-23',
    department: 'IT Department',
    requesterName: 'John Doe',
    contactPhone: '1234567890',
    deviceName: 'HP',
    deviceModel: 'elitbook g4',
    serialNumber: 'SN1235634',
    assetNumber: 'ASSET-00343',
    problemDescription: 'Screen flickering intermittently',
    priority: 'Medium',
    createdAt: '2025-04-23T07:15:57.000Z',
    updatedAt: '2025-04-23T07:15:57.000Z',
    deletedAt: null,
    // Added for UI functionality
    status: 'Pending',
    time: 'Today 3:00 PM',
    technician: null,
  },
  {
    id: 5,
    requestNumber: 'REQ-2025-04-22-214',
    requestDate: '2025-04-22',
    department: 'Software Engineering',
    requesterName: 'Jane Smith',
    contactPhone: '9876543210',
    deviceName: 'Dell',
    deviceModel: 'XPS 15',
    serialNumber: 'SN9876543',
    assetNumber: 'ASSET-00342',
    problemDescription: "Computer won't boot up",
    priority: 'High',
    createdAt: '2025-04-22T14:30:22.000Z',
    updatedAt: '2025-04-22T14:30:22.000Z',
    deletedAt: null,
    // Added for UI functionality
    status: 'In Progress',
    time: 'Today 2:30 PM',
    technician: {
      id: 'tech-001',
      name: 'Amanuel Isaay',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  },
  {
    id: 4,
    requestNumber: 'REQ-2025-04-21-213',
    requestDate: '2025-04-21',
    department: 'Marketing',
    requesterName: 'Robert Johnson',
    contactPhone: '5551234567',
    deviceName: 'MacBook',
    deviceModel: 'Pro 2023',
    serialNumber: 'SN5551234',
    assetNumber: 'ASSET-00341',
    problemDescription: 'Battery drains too quickly',
    priority: 'Medium',
    createdAt: '2025-04-21T09:45:11.000Z',
    updatedAt: '2025-04-21T09:45:11.000Z',
    deletedAt: null,
    // Added for UI functionality
    status: 'Pending',
    time: 'Yesterday 9:45 AM',
    technician: null,
  },
  {
    id: 3,
    requestNumber: 'REQ-2025-04-20-212',
    requestDate: '2025-04-20',
    department: 'Finance',
    requesterName: 'Emily Davis',
    contactPhone: '3339876543',
    deviceName: 'Lenovo',
    deviceModel: 'ThinkPad T490',
    serialNumber: 'SN3339876',
    assetNumber: 'ASSET-00340',
    problemDescription: 'Keyboard not working properly',
    priority: 'Low',
    createdAt: '2025-04-20T11:20:33.000Z',
    updatedAt: '2025-04-20T11:20:33.000Z',
    deletedAt: null,
    // Added for UI functionality
    status: 'Pending',
    time: '2 days ago',
    technician: null,
  },
  {
    id: 2,
    requestNumber: 'REQ-2025-04-19-211',
    requestDate: '2025-04-19',
    department: 'Human Resources',
    requesterName: 'Michael Wilson',
    contactPhone: '7778889999',
    deviceName: 'Dell',
    deviceModel: 'Monitor U2720Q',
    serialNumber: 'SN7778889',
    assetNumber: 'ASSET-00339',
    problemDescription: 'Display shows vertical lines',
    priority: 'High',
    createdAt: '2025-04-19T15:10:45.000Z',
    updatedAt: '2025-04-19T15:10:45.000Z',
    deletedAt: null,
    // Added for UI functionality
    status: 'Completed',
    time: '3 days ago',
    technician: {
      id: 'tech-002',
      name: 'Olivia Marti',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  },
];

// Sample technicians data
const technicians = [
  {
    id: 'tech-001',
    name: 'Amanuel Isaay',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'IT Support',
    available: true,
  },
  {
    id: 'tech-002',
    name: 'Olivia Marti',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'Hardware Support',
    available: true,
  },
  {
    id: 'tech-003',
    name: 'Carlos Rodriguez',
    avatar: '/placeholder.svg?height=40&width=40',
    department: 'Software Support',
    available: true,
  },
];

export function RepairRequestDashboard() {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    sampleRequests[0].id,
  );
  const [requests, setRequests] = useState(sampleRequests);

  const selectedRequest =
    requests.find(request => request.id === selectedRequestId) || null;

  const handleAssignTechnician = (requestId: number, technicianId: string) => {
    const technician = technicians.find(tech => tech.id === technicianId);

    setRequests(previousRequests =>
      previousRequests.map(request =>
        request.id === requestId
          ? {
              ...request,
              technician: technician || null,
              status: 'In Progress',
            }
          : request,
      ),
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center gap-2">
        <Home className="text-muted-foreground h-4 w-4" />
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
              {technicians.map(tech => (
                <div key={tech.id} className="flex items-center">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage
                      src={tech.avatar || '/placeholder.svg'}
                      alt={tech.name}
                    />
                    <AvatarFallback>{tech.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
              <div className="flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                <span>Available Technicians</span>
              </div>
            </div>
          </div>

          <RequestList
            requests={requests}
            selectedRequestId={selectedRequestId ?? sampleRequests[0].id}
            onSelectRequest={id => setSelectedRequestId(id)}
          />
        </div>

        <div className="rounded-lg border bg-white shadow-sm lg:col-span-2">
          {selectedRequest && (
            <RequestDetail
              request={selectedRequest}
              technicians={technicians}
              onAssignTechnician={handleAssignTechnician}
            />
          )}
        </div>
      </div>
    </div>
  );
}
