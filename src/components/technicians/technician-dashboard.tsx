'use client';

import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Loader2, User, Wrench } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAssignment } from '@/hooks/assignment/use-assignment';
import { useUpdateAvailability } from '@/hooks/availability/use-availability';
import { useCreateServiceReport } from '@/hooks/service-report/service-report';
import { RepairRequestResponse } from '@/lib/types/repairement';
import { ServiceReport } from '@/lib/types/service-report';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/user-store';

import { Assignment } from '../admin/requests/repair-request-dashboard';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { RepairProgressForm, ServiceReportInputs } from './repair-progress-fom';
import { RepairRequestList } from './repair-request-list';

// Sample data - in a real app, this would come from your API
const sampleAssignedRequests = [
  {
    id: 1,
    requestNumber: 'REQ-2025-04-23-215',
    requestDate: '2025-04-23',
    department: 'IT Department',
    requesterName: 'John Doe',
    deviceName: 'HP',
    deviceModel: 'Elitebook G4',
    problemDescription: 'Screen flickering intermittently',
    priority: 'Medium',
    status: 'Assigned',
    assignedAt: '2025-04-23T10:30:00Z',
  },
  {
    id: 2,
    requestNumber: 'REQ-2025-04-22-214',
    requestDate: '2025-04-22',
    department: 'Marketing',
    requesterName: 'Jane Smith',
    deviceName: 'Dell',
    deviceModel: 'XPS 15',
    problemDescription: "Computer won't boot up",
    priority: 'High',
    status: 'In Progress',
    assignedAt: '2025-04-22T14:15:00Z',
  },
  {
    id: 3,
    requestNumber: 'REQ-2025-04-21-213',
    requestDate: '2025-04-21',
    department: 'Finance',
    requesterName: 'Robert Johnson',
    deviceName: 'MacBook',
    deviceModel: 'Pro 2023',
    problemDescription: 'Battery drains too quickly',
    priority: 'Medium',
    status: 'Assigned',
    assignedAt: '2025-04-21T09:45:00Z',
  },
];

// Sample data for completed repairs
const sampleCompletedRequests = [
  {
    id: 4,
    requestNumber: 'REQ-2025-04-20-212',
    requestDate: '2025-04-20',
    department: 'HR',
    requesterName: 'Emily Davis',
    deviceName: 'Lenovo',
    deviceModel: 'ThinkPad T490',
    problemDescription: 'Keyboard not working properly',
    priority: 'Low',
    status: 'Completed',
    assignedAt: '2025-04-20T11:20:00Z',
    completedAt: '2025-04-21T14:30:00Z',
  },
  {
    id: 5,
    requestNumber: 'REQ-2025-04-19-211',
    requestDate: '2025-04-19',
    department: 'Sales',
    requesterName: 'Michael Wilson',
    deviceName: 'Dell',
    deviceModel: 'Monitor U2720Q',
    problemDescription: 'Display shows vertical lines',
    priority: 'High',
    status: 'Completed',
    assignedAt: '2025-04-19T15:10:00Z',
    completedAt: '2025-04-20T10:45:00Z',
  },
];

// Mock technician data - in a real app, this would come from your auth system

export function TechnicianDashboard() {
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const currentUser = useUserStore(state => state.user);

  // Fetch all assignments
  const { data: allAssignments = [], isLoading: isLoadingAssignments } =
    useGetAssignment();
  const { mutateAsync, isPending } = useCreateServiceReport();
  const { mutateAsync: updateAvailability } = useUpdateAvailability();

  // Filter assignments for current technician
  const technicianAssignments = useMemo(() => {
    if (!currentUser?.id) return [];
    return allAssignments.filter(
      (assignment: Assignment) => assignment.technicianId === currentUser.id,
    );
  }, [allAssignments, currentUser?.id]);

  const { activeAssignments, completedAssignments } = useMemo(() => {
    const active: Assignment[] = [];
    const completed: Assignment[] = [];

    technicianAssignments.forEach((assignment: Assignment) => {
      // Here you would check if there's a completed service report
      // For now, we'll just split them randomly for demonstration
      // In real app, you would check assignment.status or related service report
      Math.random() > 0.5
        ? completed.push(assignment)
        : active.push(assignment);
    });

    return { activeAssignments: active, completedAssignments: completed };
  }, [technicianAssignments]);

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedAssignment(null);
  };

  const queryClient = useQueryClient();

  const handleServiceReportSubmit = async (formData: ServiceReportInputs) => {
    if (!selectedAssignment) return;

    try {
      // Prepare the complete service report data
      const reportData: ServiceReportInputs = {
        ...formData,
        repairRequestId: selectedAssignment.repairRequestId,
        assignedTo: selectedAssignment.technicianId,
        status: 'Completed',
      };

      mutateAsync(reportData, {
        onSuccess: () => {
          toast.success('Service report submitted successfully!');
          queryClient.invalidateQueries({ queryKey: ['assignments'] });
          updateAvailability(
            {
              id: selectedAssignment.technicianId,
              payload: {
                userId: selectedAssignment.technicianId,
                date: new Date().toISOString(),
                startTime: new Date().toISOString(),
                endTime: new Date().toISOString(),
                isAvailable: true,
              },
            },
            {
              onSuccess: () => {
                toast.success('Availability updated successfully!');
              },
              onError: () => {
                toast.error('Failed to update availability');
              },
            },
          );
        },
        onError: () => {
          toast.error('Failed to submit service report');
        },
      });

      setIsFormOpen(false);
      toast.success('Service report submitted successfully!');
    } catch (error) {
      console.error('Error submitting service report:', error);
      toast.error('Failed to submit service report');
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please sign in to access the technician dashboard
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoadingAssignments) {
    return (
      <div className="container mx-auto flex justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Technician Dashboard
        </h1>
        <p className="text-slate-600">
          Welcome, {currentUser.firstName}. You have {activeAssignments.length}{' '}
          active assignments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span>Assigned Repairs ({activeAssignments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed Repairs ({completedAssignments.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Repair Requests</CardTitle>
                <CardDescription>
                  View and manage repair requests assigned to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RepairRequestList
                  requests={activeAssignments}
                  onRequestClick={handleAssignmentClick}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Repair Requests</CardTitle>
                <CardDescription>
                  View your completed repair requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RepairRequestList
                  requests={completedAssignments}
                  onRequestClick={handleAssignmentClick}
                  isCompleted
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {isFormOpen && selectedAssignment && (
        <RepairProgressForm
          request={selectedAssignment}
          technician={currentUser}
          isPending={isPending}
          onClose={handleFormClose}
          onSubmit={handleServiceReportSubmit}
        />
      )}
    </div>
  );
}

// Simple AssignmentCard component for demonstration
function AssignmentCard({
  assignment,
  isCompleted = false,
  onClick,
}: {
  assignment: Assignment;
  isCompleted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md',
        isCompleted ? 'opacity-75' : 'border-blue-200',
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">
            Request #{assignment.repairRequestId}
          </CardTitle>
          <Badge variant={isCompleted ? 'default' : 'secondary'}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </Badge>
        </div>
        <CardDescription>
          Assigned on {new Date(assignment.assignedAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <User className="text-muted-foreground h-4 w-4" />
          <span>Assigned by: User #{assignment.assignedById}</span>
        </div>
      </CardContent>
    </Card>
  );
}
