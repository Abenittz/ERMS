import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import React from 'react';

export default function RequestList() {
  return (
    <>
      {/* Left Column - Requests List */}
      <div className="space-y-6">
        <div>
          <div className="mb-6 flex items-center">
            <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
              <span className="text-sm font-medium text-green-700">
                Available Technicians
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-white">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={`Technician ${i}`}
                    />
                    <AvatarFallback>T{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>

        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="overflow-hidden border border-gray-100 p-2">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Today 3:00 PM</span>
                    </div>
                    <div className="font-medium text-gray-800">
                      Electrical engineering / Software engineering
                    </div>
                  </div>
                </div>
                <button className="bg-primary flex h-8 w-8 items-center justify-center rounded-md text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
