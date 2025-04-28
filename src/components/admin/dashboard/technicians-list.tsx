'use client';

import { ChevronRight } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Technician {
  id: string;
  name: string;
  avatar: string;
  classId: string;
  studentId: string;
}

interface TechniciansListProps {
  technicians: Technician[];
}

export function TechniciansList({ technicians }: TechniciansListProps) {
  return (
    <div className="space-y-4">
      {technicians.map(technician => (
        <div key={technician.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage
                src={technician.avatar || '/placeholder.svg'}
                alt={technician.name}
              />
              <AvatarFallback>{technician.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{technician.name}</p>
              <p className="text-xs text-gray-500">
                {technician.classId || technician.studentId}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      ))}
    </div>
  );
}
