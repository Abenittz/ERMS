'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  avatar: string;
  department: string;
  available: boolean;
}

interface Request {
  id: number;
  requestNumber: string;
  requestDate: string;
  department: string;
  requesterName: string;
  contactPhone: string;
  deviceName: string;
  deviceModel: string;
  serialNumber: string;
  assetNumber: string;
  problemDescription: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  status: string;
  time: string;
  technician: {
    id: string;
    name: string;
    avatar: string;
  } | null;
}

interface RequestDetailProps {
  request: Request;
  technicians: Technician[];
  onAssignTechnician: (requestId: number, technicianId: string) => void;
}

export function RequestDetail({
  request,
  technicians,
  onAssignTechnician,
}: RequestDetailProps) {
  // Format the date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {request.deviceName} {request.deviceModel}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Time</span>
                <span className="font-medium">{request.time}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">
                  Department
                </span>
                <span className="font-medium">{request.department}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={
                request.priority === 'High'
                  ? 'destructive'
                  : request.priority === 'Medium'
                    ? 'default'
                    : 'outline'
              }
            >
              {request.priority} Priority
            </Badge>
            <Badge
              variant={
                request.status === 'Pending'
                  ? 'outline'
                  : request.status === 'In Progress'
                    ? 'secondary'
                    : 'default'
              }
            >
              {request.status}
            </Badge>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Technician</span>
            {request.technician ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={request.technician.avatar || '/placeholder.svg'}
                    alt={request.technician.name}
                  />
                  <AvatarFallback>
                    {request.technician.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{request.technician.name}</span>
              </div>
            ) : (
              <span className="text-muted-foreground italic">Not assigned</span>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={request.technician ? 'outline' : 'default'}>
                {request.technician
                  ? 'Reassign Technician'
                  : 'Assign Technician'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Select Technician</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {technicians.map(tech => (
                <DropdownMenuItem
                  key={tech.id}
                  onClick={() => onAssignTechnician(request.id, tech.id)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={tech.avatar || '/placeholder.svg'}
                        alt={tech.name}
                      />
                      <AvatarFallback>
                        {tech.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{tech.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="details" className="flex-1">
        <div className="border-b px-6">
          <TabsList className="h-12 w-full justify-start space-x-6 bg-transparent p-0 md:w-1/4">
            <TabsTrigger
              value="details"
              className="data-[state=active]:border-b-primary h-12 rounded-none px-0 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:border-b-primary h-12 rounded-none px-0 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Timeline
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="data-[state=active]:border-b-primary h-12 rounded-none px-0 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Comments
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details" className="mt-0 space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="rounded-md p-0 shadow-none">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Request Information
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Request Number
                    </span>
                    <span>{request.requestNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Request Date
                    </span>
                    <span>{request.requestDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Department
                    </span>
                    <span>{request.department}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Created At
                    </span>
                    <span>{formatDate(request.createdAt)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Updated At
                    </span>
                    <span>{formatDate(request.updatedAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md p-0 shadow-none">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Requester Information
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">Name</span>
                    <span>{request.requesterName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Contact
                    </span>
                    <span>{request.contactPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md p-0 shadow-none md:col-span-2">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Device Information
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Device Name
                    </span>
                    <span>{request.deviceName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Device Model
                    </span>
                    <span>{request.deviceModel}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Serial Number
                    </span>
                    <span>{request.serialNumber}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground text-sm">
                      Asset Number
                    </span>
                    <span>{request.assetNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-md p-0 shadow-none md:col-span-2">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Problem Description
                </h3>
                <p>{request.problemDescription}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-0 p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <div className="font-medium">Request Created</div>
                <div className="text-muted-foreground text-sm">
                  {formatDate(request.createdAt)}
                </div>
                <div className="mt-1 text-sm">
                  Request was submitted by {request.requesterName}
                </div>
              </div>
            </div>

            {request.technician && (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Technician Assigned</div>
                  <div className="text-muted-foreground text-sm">
                    {formatDate(request.updatedAt)}
                  </div>
                  <div className="mt-1 text-sm">
                    {request.technician.name} was assigned to this request
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="mt-0 p-6">
          <div className="text-muted-foreground py-8 text-center">
            No comments yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
