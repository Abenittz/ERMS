'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Technician {
  id: string;
  name: string;
  avatar: string;
  department: string;
  available: boolean;
}

interface TechnicianSelectorProps {
  technicians: Technician[];
  onSelect: (technicianId: string) => void;
  onCancel: () => void;
}

export function TechnicianSelector({
  technicians,
  onSelect,
  onCancel,
}: TechnicianSelectorProps) {
  return (
    <Card className="w-[350px]">
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Select Technician</h3>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <div className="space-y-1">
            {technicians.map(tech => (
              <div
                key={tech.id}
                className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-slate-50"
                onClick={() => onSelect(tech.id)}
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={tech.avatar || '/placeholder.svg'}
                      alt={tech.name}
                    />
                    <AvatarFallback>{tech.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{tech.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {tech.department}
                    </div>
                  </div>
                </div>
                <div
                  className={`rounded-full px-2 py-1 text-xs ${tech.available ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
                >
                  {tech.available ? 'Available' : 'Busy'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
