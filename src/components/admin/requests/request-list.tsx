'use client';

import { ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RepairRequestResponse } from '@/lib/types/repairement';

interface Request {
  id: string;
  department: string;
  time: string;
  category: string;
  status: string;
}

interface RequestListProps {
  requests: RepairRequestResponse[];
  selectedRequestId: number;
  onSelectRequest: (id: number) => void;
}

export function RequestList({
  requests,
  selectedRequestId,
  onSelectRequest,
}: Readonly<RequestListProps>) {
  return (
    <div className="divide-y">
      {requests.map(request => (
        <div
          key={request.id}
          className={cn(
            'cursor-pointer p-4 transition-colors hover:bg-slate-50',
            selectedRequestId === request.id && 'bg-slate-50',
          )}
          onClick={() => onSelectRequest(request.id)}
        >
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{request.createdAt}</span>
            </div>
            <div className="flex items-center">
              {/* <span
                className={cn(
                  'rounded-full px-2 py-1 text-xs',
                  request.status === 'Pending' && 'bg-amber-100 text-amber-800',
                  request.status === 'In Progress' &&
                    'bg-blue-100 text-blue-800',
                  request.status === 'Completed' &&
                    'bg-green-100 text-green-800',
                )}
              >
                {request.status}
              </span> */}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">
                {/* {request.category} */}
              </div>
              <div className="text-muted-foreground text-sm">
                {request.department}
              </div>
            </div>
            <ChevronRight className="text-muted-foreground h-5 w-5" />
          </div>
        </div>
      ))}
    </div>
  );
}
