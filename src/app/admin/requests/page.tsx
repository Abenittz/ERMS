import React from 'react';

import { RepairRequestDashboard } from '@/components/admin/requests/repair-request-dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { useGetRepairRequests } from '@/hooks/repair/use-repair';
import { getRepairRequestSS } from '@/server/repairement/get-repairement-ss';
import { getRepairRequests } from '@/server/repairement/repair-request';

export default async function Page() {
  // const repairRequests = await getRepairRequestSS();
  // const data = repairRequests?.repairRequests;

  // console.log('Repair requests:', repairRequests);
  return (
    <div className="flex flex-row">
      <div className="container mx-auto mt-10 flex w-full flex-col gap-2">
        <header className="flex h-10 shrink-0 flex-col items-start gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mb-20 flex items-center justify-between">
            <h1 className="text-primary px-3 text-2xl font-semibold">
              Mattu University ERMS
            </h1>
          </div>
        </header>

        <RepairRequestDashboard />
        {/* <div className="flex w-full flex-1 flex-col gap-4 p-4 pt-0 md:flex-row">
          <div className="w-full">
            <div className="flex min-h-screen w-full">
              <div className="mt-20 w-full p-4 pl-0">
                <div className="w-full">
                  <RequestList />
                </div>
              </div>
            </div>
          </div>

      
        </div> */}
      </div>
      {/* <RepairRequestDashboard /> */}
    </div>
  );
}
