import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function RequestDetail() {
  return (
    <div className="w-2/4 rounded-lg border border-gray-100 bg-white p-6">
      <div className="space-y-6">
        <div>
          <div className="mb-1 text-gray-500">Repairment</div>
          <h2 className="text-2xl font-bold text-gray-800">
            Laptop Startup issue
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <div className="mb-1 text-sm text-gray-500">Time</div>
            <div className="text-gray-800">Today 3:00PM</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500">Department</div>
            <div className="text-gray-800">Software Engineering</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500">Address</div>
            <div className="text-gray-800">Block 509/19</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500">Category</div>
            <div className="text-gray-800">Laptop</div>
          </div>
          <div>
            <div className="mb-1 text-sm text-gray-500">Technician</div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src="/placeholder.svg?height=30&width=30"
                  alt="Amanuel sisay"
                />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="text-gray-800">Amanuel sisay</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=50&width=50"
              alt="Olivia Marti"
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Olivia Marti</div>
            <Badge
              variant="outline"
              className="text-xs font-normal text-gray-500"
            >
              student ID
            </Badge>
          </div>
        </div>

        <div className="text-sm leading-relaxed text-gray-600">
          Provide a step-by-step guide on how users can browse and book travel
          services on your platform. Include information on searching for
          destinations, selecting dates, choosing accommodation, and completing
          the booking process. Mention any special features or tools that can
          help users find the best deals.
        </div>
      </div>
    </div>
  );
}
