'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface TotalReportChartProps {
  requestsPercentage: number;
  fixedPercentage: number;
}

export function TotalReportChart({
  requestsPercentage,
  fixedPercentage,
}: TotalReportChartProps) {
  const requestsData = [
    { name: 'Completed', value: requestsPercentage },
    { name: 'Remaining', value: 100 - requestsPercentage },
  ];

  const fixedData = [
    { name: 'Fixed', value: fixedPercentage },
    { name: 'Remaining', value: 100 - fixedPercentage },
  ];

  const COLORS = ['#2A2D74', '#e5e7eb'];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col items-center">
        <div className="relative h-[120px] w-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={requestsData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={48}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {requestsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01" />
              <path d="M17 7h.01" />
              <path d="M7 17h.01" />
              <path d="M17 17h.01" />
            </svg>
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-gray-500">Requests</p>
          <p className="text-primary text-2xl font-bold">
            {requestsPercentage}%
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative h-[120px] w-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fixedData}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={48}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {fixedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-gray-500">Fixed</p>
          <p className="text-primary text-2xl font-bold">{fixedPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
