'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(18);

  // Days of the week
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Days for February 2025 (starting from 17)
  const days = Array.from({ length: 7 }, (_, index) => index + 17);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysOfWeek.map(day => (
          <div key={day} className="py-1 text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <Button
            key={day}
            variant="ghost"
            className={cn(
              'h-10 w-10 p-0 font-normal',
              selectedDay === day &&
                'bg-indigo-900 text-white hover:bg-indigo-800 hover:text-white',
            )}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
