'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface RepairType {
  id: number;
  name: string;
  count: number;
}

interface RecentRepairsProps {
  repairTypes: RepairType[];
}

export function RecentRepairs({ repairTypes }: RecentRepairsProps) {
  return (
    <div className="space-y-4">
      {repairTypes.map(repair => (
        <div
          key={repair.id}
          className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-100"
        >
          <div>
            <p className="font-medium">{repair.name}</p>
            <p className="text-xs text-gray-500">Count: {repair.count}</p>
          </div>
          <Avatar className="h-6 w-6 bg-indigo-100">
            <AvatarFallback className="text-xs text-indigo-700">
              AM
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}
