'use client';

import { format } from 'date-fns';
import {
  Calendar,
  Loader2,
  MessageSquare,
  PenToolIcon as Tool,
  Plus,
  ThumbsUp,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useGetAssignment } from '@/hooks/assignment/use-assignment';
import { useGetRepairRequests } from '@/hooks/repair/use-repair';
import { useGetServiceReports } from '@/hooks/service-report/service-report';
import {
  useCreateUserFeedback,
  useGetUserFeedbacks,
} from '@/hooks/service-report/use-user-feedback';
import { RepairRequestResponse } from '@/lib/types/repairement';
import { ServiceReportResponse } from '@/lib/types/service-report';
import { useUserStore } from '@/store/user-store';

import { Assignment } from '../admin/requests/request-details';
import { FeedbackDialog } from './feedback-dialog';

// Define the feedback interface
interface Feedback {
  serviceReportId: number;
  userId: number;
  courtesy: string;
  communication: string;
  friendliness: string;
  professionalism: string;
  overallSatisfaction: string;
  comments: string;
}

interface UserFeedback {
  id: number;
  serviceReportId: number;
  userId: number;
  courtesy: string;
  communication: string;
  friendliness: string;
  professionalism: string;
  overallSatisfaction: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserFeedbackPayload
  extends Omit<UserFeedback, 'id' | 'createdAt' | 'updatedAt'> {}

// Sample data for recent repair requests
const sampleRequests = [
  {
    id: 1,
    requestNumber: 'REQ-2025-03-24-001',
    deviceType: 'Mobile',
    deviceName: 'iPhone 13',
    deviceModel: 'A2482',
    status: 'Completed',
    requestDate: '2025-03-24T10:30:00Z',
    completedDate: '2025-03-24T14:45:00Z',
    problemDescription: 'Screen cracked and not responding to touch',
    technician: {
      id: 1,
      name: 'Amanuel Isaay',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    serviceReport: {
      id: 1,
      servicePerformed: 'Screen replacement and system diagnostic',
    },
    feedback: null,
  },
  {
    id: 2,
    requestNumber: 'REQ-2025-03-20-002',
    deviceType: 'Laptop',
    deviceName: 'Dell XPS',
    deviceModel: '15 9500',
    status: 'In Progress',
    requestDate: '2025-03-20T09:15:00Z',
    completedDate: null,
    problemDescription: 'Battery drains too quickly',
    technician: {
      id: 2,
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    serviceReport: null,
    feedback: null,
  },
  {
    id: 3,
    requestNumber: 'REQ-2025-03-15-003',
    deviceType: 'Tablet',
    deviceName: 'iPad Pro',
    deviceModel: '12.9-inch',
    status: 'Completed',
    requestDate: '2025-03-15T14:20:00Z',
    completedDate: '2025-03-18T11:30:00Z',
    problemDescription: "Won't charge properly",
    technician: {
      id: 3,
      name: 'Michael Chen',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    serviceReport: {
      id: 3,
      servicePerformed: 'Charging port replacement and system reset',
    },
    feedback: {
      serviceReportId: 3,
      userId: 1,
      courtesy: '100%',
      communication: '90%-99%',
      friendliness: '70%-90%',
      professionalism: '<70%',
      overallSatisfaction: '90%-99%',
      comments: 'Very polite, clear explanation.',
    },
  },
];
export function RecentRequestList() {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  // Get current user from store

  // Fetch real data
  // Fetch all repair requests (without filtering on the server)

  const currentUser = useUserStore(state => state.user);

  // Fetch all data with loading states
  const { data: allRequests = [], isLoading: requestsLoading } =
    useGetRepairRequests();

  const { data: assignments = [], isLoading: assignmentsLoading } =
    useGetAssignment();

  const { data: serviceReports = [], isLoading: reportsLoading } =
    useGetServiceReports();

  const { data: userFeedbacks = [], isLoading: feedbacksLoading } =
    useGetUserFeedbacks();

  // Combined loading state
  const isLoading =
    requestsLoading || assignmentsLoading || reportsLoading || feedbacksLoading;

  console.log('allRequests', allRequests);
  console.log('assignment', assignments);
  console.log('serviceReport', serviceReports);
  console.log('userFeedbacks', userFeedbacks);
  console.log('currentUser', currentUser);

  // Combine data on client side
  interface CombinedRequest extends RepairRequestResponse {
    assignment?: Assignment | null;
    serviceReport?: ServiceReportResponse | null;
    feedback?: UserFeedback | null;
  }

  useEffect(() => {
    console.log({
      currentUser,
      allRequests,
      assignments,
      serviceReports,
      userFeedbacks,
    });
  }, [currentUser, allRequests, assignments, serviceReports, userFeedbacks]);

  const userRequests = allRequests.filter(
    (request: RepairRequestResponse) => request.userId === 1,
  );

  console.log('Filtered user requests:', userRequests);
  // Updated data combination with feedback
  const requests = useMemo<CombinedRequest[]>(() => {
    console.log('Debugging data inputs:', {
      allRequests,
      assignments,
      serviceReports,
      userFeedbacks,
      currentUserId: currentUser?.id,
    });

    if (!currentUser?.id) {
      console.log('No current user ID found');
      return;
    }

    const userRequests = allRequests.filter(
      (request: RepairRequestResponse) => request.User.id === currentUser.id,
    );

    // console.log('Filtered user requests:', userRequests);

    const combined = userRequests.map(
      (request: RepairRequestResponse): CombinedRequest => {
        // Debug assignments
        const requestAssignments = assignments.find(
          (assignment: Assignment) => assignment.repairRequestId === request.id,
        );
        console.log(
          `Assignments for request ${request.id}:`,
          requestAssignments,
        );

        // Debug service reports
        const requestServiceReports = serviceReports.filter(
          (service_request: ServiceReportResponse) =>
            service_request.repairRequestId === request.id,
        );
        console.log(
          `Service reports for request ${request.id}:`,
          requestServiceReports,
        );
        const serviceReport = requestServiceReports[0] || null;

        // Debug feedbacks
        let feedback = null;
        if (serviceReport) {
          const requestFeedbacks = userFeedbacks.filter(
            (feedbacks: UserFeedback) =>
              feedbacks.serviceReportId === serviceReport.id,
          );
          console.log(
            `Feedbacks for service report ${serviceReport?.id}:`,
            requestFeedbacks,
          );
          feedback = requestFeedbacks[0] || null;
        }

        return {
          ...request,
          assignment: requestAssignments,
          serviceReport,
          feedback,
        };
      },
    );

    console.log('Final combined requests:', combined);
    return combined;
  }, [
    allRequests,
    assignments,
    serviceReports,
    userFeedbacks,
    currentUser?.id,
  ]);

  console.log('FinalRequest', requests);

  // Feedback mutation
  const { mutateAsync: submitFeedback } = useCreateUserFeedback();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

  // Handle feedback submission to API
  const handleFeedbackSubmit = async (feedback: Feedback) => {
    try {
      await submitFeedback(feedback);

      // Show success toast
      toast.success('Feedback submitted successfully');

      // Close the dialog
      setFeedbackDialogOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': {
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-700 hover:bg-green-100"
          >
            {status}
          </Badge>
        );
      }
      case 'in progress': {
        return (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-700 hover:bg-amber-100"
          >
            {status}
          </Badge>
        );
      }
      case 'pending': {
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50"
          >
            {status}
          </Badge>
        );
      }
      default: {
        return <Badge variant="secondary">{status}</Badge>;
      }
    }
  };

  // Convert percentage rating to a numeric value for visualization
  const getRatingValue = (rating: string) => {
    if (rating === '100%') return 100;
    if (rating === '90%-99%') return 95;
    if (rating === '70%-90%') return 80;
    if (rating === '<70%') return 65;
    return 0;
  };

  // Get color for rating
  const getRatingColor = (rating: string) => {
    if (rating === '100%') return 'bg-green-500';
    if (rating === '90%-99%') return 'bg-blue-500';
    if (rating === '70%-90%') return 'bg-amber-500';
    if (rating === '<70%') return 'bg-red-500';
    return 'bg-gray-300';
  };

  // Rest of your helper functions remain the same...
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Recent Requests Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Recent requests
        </h2>
      </div>

      {requests.length === 0 ? (
        <Card className="w-[650px]">
          <CardHeader>
            <CardTitle>No repair requests found</CardTitle>
            <CardDescription>
              You haven&apos;t submitted any repair requests yet.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request: CombinedRequest) => (
            <Card key={request.id} className="w-[650px] overflow-hidden">
              {/* Card content remains mostly the same, but update data access */}
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">
                    {request.deviceName} {request.deviceModel}
                  </CardTitle>
                  <CardDescription>{request.requestNumber}</CardDescription>
                </div>
                <Badge className="ml-auto">{request.deviceName}</Badge>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">
                        Request Date:
                      </span>
                      <span>{formatDate(request.requestDate)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Tool className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">Status:</span>
                      {/* <span>{getStatusBadge(request.status)}</span> */}
                    </div>

                    {request.updatedAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                          Completed Date:
                        </span>
                        <span>{formatDate(request.updatedAt)}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MessageSquare className="text-muted-foreground mt-0.5 h-4 w-4" />
                      <span className="text-muted-foreground">Problem:</span>
                      <span className="flex-1">
                        {request.problemDescription}
                      </span>
                    </div>

                    {request.assignment && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">
                          Assigned Technician:
                        </span>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={
                                request.assignment.technician.profileImage ||
                                '/placeholder.svg'
                              }
                              alt={request.assignment.technician.firstName}
                            />
                            <AvatarFallback>
                              {request.assignment.technician.firstName?.slice(
                                0,
                                2,
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {request.assignment.technician.firstName}{' '}
                            {request.assignment.technician.lastName}
                          </span>
                        </div>
                      </div>
                    )}

                    {request.serviceReport && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground">
                          Service Performed:
                        </span>
                        <span className="flex-1">
                          {request.serviceReport.servicePerformed}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Feedback Section - Only for completed requests with service reports */}
                {request.serviceReport && (
                  <div className="mt-4 border-t pt-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="flex items-center text-sm font-medium">
                        <ThumbsUp className="mr-1 h-4 w-4 text-blue-500" />
                        Feedback
                      </h4>
                      {request.feedback ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest({
                              ...request,
                              serviceReportId: request.serviceReport?.id,
                            });
                            setFeedbackDialogOpen(true);
                          }}
                        >
                          Edit Feedback
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest({
                              ...request,
                              serviceReportId: request.serviceReport?.id,
                            });
                            setFeedbackDialogOpen(true);
                          }}
                        >
                          Provide Feedback
                        </Button>
                      )}
                    </div>

                    {request.feedback ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs font-medium">
                                Overall Satisfaction
                              </span>
                              <span className="text-xs font-medium">
                                {request.feedback.overallSatisfaction}
                              </span>
                            </div>
                            <Progress
                              value={getRatingValue(
                                request.feedback.overallSatisfaction,
                              )}
                              className={`h-2 ${getRatingColor(
                                request.feedback.overallSatisfaction,
                              )}`}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-medium">
                                      Courtesy
                                    </span>
                                    <span className="text-xs font-medium">
                                      {request.feedback.courtesy}
                                    </span>
                                  </div>
                                  <Progress
                                    value={getRatingValue(
                                      request.feedback.courtesy,
                                    )}
                                    className={`h-2 ${getRatingColor(
                                      request.feedback.courtesy,
                                    )}`}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  How polite and respectful the technician was
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-medium">
                                      Communication
                                    </span>
                                    <span className="text-xs font-medium">
                                      {request.feedback.communication}
                                    </span>
                                  </div>
                                  <Progress
                                    value={getRatingValue(
                                      request.feedback.communication,
                                    )}
                                    className={`h-2 ${getRatingColor(
                                      request.feedback.communication,
                                    )}`}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  How well the technician explained issues and
                                  solutions
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-medium">
                                      Friendliness
                                    </span>
                                    <span className="text-xs font-medium">
                                      {request.feedback.friendliness}
                                    </span>
                                  </div>
                                  <Progress
                                    value={getRatingValue(
                                      request.feedback.friendliness,
                                    )}
                                    className={`h-2 ${getRatingColor(
                                      request.feedback.friendliness,
                                    )}`}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  How friendly and approachable the technician
                                  was
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <div className="mb-1 flex items-center justify-between">
                                    <span className="text-xs font-medium">
                                      Professionalism
                                    </span>
                                    <span className="text-xs font-medium">
                                      {request.feedback.professionalism}
                                    </span>
                                  </div>
                                  <Progress
                                    value={getRatingValue(
                                      request.feedback.professionalism,
                                    )}
                                    className={`h-2 ${getRatingColor(
                                      request.feedback.professionalism,
                                    )}`}
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  The technician&apos;s knowledge, expertise,
                                  and professional conduct
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">
                        No feedback provided yet. Please share your experience
                        with this repair service.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Feedback Dialog */}
      {selectedRequest && selectedRequest.serviceReport && (
        <FeedbackDialog
          open={feedbackDialogOpen}
          onOpenChange={setFeedbackDialogOpen}
          request={selectedRequest}
          serviceReportId={selectedRequest.serviceReport.id}
          userId={currentUser?.id || 0}
          existingFeedback={selectedRequest.feedback}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
