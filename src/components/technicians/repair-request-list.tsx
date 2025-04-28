'use client';

import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RepairRequestResponse } from '@/lib/types/repairement';

import { Assignment } from '../admin/requests/repair-request-dashboard';

interface RepairRequest {
  id: number;
  requestNumber: string;
  requestDate: string;
  department: string;
  requesterName: string;
  deviceName: string;
  deviceModel: string;
  problemDescription: string;
  priority: string;
  status: string;
  assignedAt: string;
  completedAt?: string;
}

interface RepairRequestListProps {
  requests: Assignment[];
  onRequestClick: (request: Assignment) => void;
  isCompleted?: boolean;
}

export function RepairRequestList({
  requests,
  onRequestClick,
  isCompleted = false,
}: RepairRequestListProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get badge variant based on priority
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': {
        return <Badge variant="destructive">{priority}</Badge>;
      }
      case 'medium': {
        return <Badge variant="default">{priority}</Badge>;
      }
      case 'low': {
        return <Badge variant="outline">{priority}</Badge>;
      }
      default: {
        return <Badge variant="secondary">{priority}</Badge>;
      }
    }
  };

  // Get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'assigned': {
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 hover:bg-blue-50"
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
      default: {
        return <Badge variant="secondary">{status}</Badge>;
      }
    }
  };

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-slate-100 p-3">
          {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-slate-400" />
          ) : (
            <Clock className="h-6 w-6 text-slate-400" />
          )}
        </div>
        <h3 className="text-lg font-medium">
          No {isCompleted ? 'completed' : 'assigned'} repair requests
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {isCompleted
            ? "You haven't completed any repair requests yet."
            : "You don't have any assigned repair requests at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <div className="border-input inline-flex items-center rounded-md border bg-transparent p-1">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="text-xs"
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="text-xs"
          >
            Table
          </Button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {requests.map(request => (
            <Card
              key={request.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {request.RepairRequest.deviceName}{' '}
                      {request.RepairRequest.deviceModel}
                    </CardTitle>
                    <CardDescription>
                      {request.RepairRequest.requestNumber}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getPriorityBadge(request.RepairRequest.priority)}
                    {/* {getStatusBadge(request.RepairRequest.status)} */}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm">
                  <div className="mb-2">
                    <span className="text-muted-foreground">Requester:</span>{' '}
                    {request.RepairRequest.requesterName} (
                    {request.RepairRequest.department})
                  </div>
                  <div className="mb-2">
                    <span className="text-muted-foreground">Issue:</span>{' '}
                    {request.RepairRequest.problemDescription}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>{' '}
                    {formatDate(request.RepairRequest.requestDate)}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onRequestClick(request)}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'View Details' : 'Update Progress'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request #</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.RepairRequest.requestNumber}
                  </TableCell>
                  <TableCell>
                    {request.RepairRequest.deviceName}{' '}
                    {request.RepairRequest.deviceModel}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {request.RepairRequest.problemDescription}
                  </TableCell>
                  <TableCell>{request.RepairRequest.requesterName}</TableCell>
                  <TableCell>
                    {formatDate(request.RepairRequest.requestDate)}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(request.RepairRequest.priority)}
                  </TableCell>
                  <TableCell>{getStatusBadge('assigned')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRequestClick(request)}
                      disabled={isCompleted}
                    >
                      {isCompleted ? 'View' : 'Update'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
