'use client';

import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CalendarView } from './calendar-view';
import { PerformanceChart } from './performance-chart';
import { RecentRepairs } from './recent-repairs';
import { TechniciansList } from './technicians-list';
import { TotalReportChart } from './total-report-chart';

// Sample data based on the existing repair request system
const performanceData = [
  { month: 'Jan', value: 120 },
  { month: 'Feb', value: 90 },
  { month: 'Mar', value: 110 },
  { month: 'Apr', value: 140 },
  { month: 'May', value: 160 },
  { month: 'Jun', value: 220 },
  { month: 'Jul', value: 280 },
  { month: 'Aug', value: 260 },
  { month: 'Sep', value: 220 },
  { month: 'Oct', value: 240 },
  { month: 'Nov', value: 210 },
  { month: 'Dec', value: 250 },
];

// Sample technicians data
const technicians = [
  {
    id: 'tech-001',
    name: 'William Kim',
    avatar: '/placeholder.svg?height=40&width=40',
    classId: 'Class ID',
    studentId: 'Student ID',
  },
  {
    id: 'tech-002',
    name: 'Isabella Nguyen',
    avatar: '/placeholder.svg?height=40&width=40',
    classId: 'Class ID',
    studentId: 'Student ID',
  },
  {
    id: 'tech-003',
    name: 'Isabella Nguyen',
    avatar: '/placeholder.svg?height=40&width=40',
    classId: '',
    studentId: 'Student ID',
  },
  {
    id: 'tech-004',
    name: 'William Kim',
    avatar: '/placeholder.svg?height=40&width=40',
    classId: '',
    studentId: 'Student ID',
  },
  {
    id: 'tech-005',
    name: 'Sofia Davis',
    avatar: '/placeholder.svg?height=40&width=40',
    classId: '',
    studentId: 'Student ID',
  },
  {
    id: 'tech-006',
    name: 'Olivia Marti',
    avatar: '/placeholder.svg?height=40&width=40',
    classId: '',
    studentId: 'Student ID',
  },
];

// Sample repair types
const repairTypes = [
  { id: 1, name: 'Laptop fix', count: 45 },
  { id: 2, name: 'Mobile fix', count: 32 },
  { id: 3, name: 'PC problem', count: 28 },
  { id: 4, name: 'Computer startup issue', count: 15 },
];

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Calculate total performance value (sum of all monthly values)
  const totalPerformance = performanceData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-primary text-3xl font-bold">
            Hello, Admin Abera
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="space-y-6 md:col-span-2">
            {/* Performance Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription>Performance</CardDescription>
                    <CardTitle className="text-primary text-4xl font-bold">
                      {totalPerformance}
                    </CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span>All</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <PerformanceChart data={performanceData} />
              </CardContent>
            </Card>

            {/* Technicians and Total Report */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Technicians List */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Technicians</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      All {technicians.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <TechniciansList technicians={technicians} />
                </CardContent>
              </Card>

              {/* Total Report */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Report</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-6">
                    <TotalReportChart
                      requestsPercentage={80}
                      fixedPercentage={75}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-blue-600">
                                Technicians
                              </p>
                              <p className="text-2xl font-bold text-blue-700">
                                200
                              </p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-2">
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
                                className="text-blue-600"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-blue-600">
                                Requests/Day
                              </p>
                              <p className="text-2xl font-bold text-blue-700">
                                200
                              </p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-2">
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
                                className="text-blue-600"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>February 2025</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CalendarView />
              </CardContent>
            </Card>

            {/* Recent Repairs */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Repairs</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <RecentRepairs repairTypes={repairTypes} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
