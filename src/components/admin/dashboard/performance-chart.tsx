'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PerformanceChartProps {
  data: {
    month: string;
    value: number;
  }[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            dy={10}
          />
          <YAxis hide={true} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              boxShadow:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
            labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
            itemStyle={{ color: '#2A2D74' }}
            formatter={value => [`${value}`, 'Value']}
            labelFormatter={label => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2A2D74"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              fill: '#2A2D74',
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
