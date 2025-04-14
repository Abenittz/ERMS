import React from 'react';

import RequestDetail from '@/components/admin/requests/request-detail';
import RequestList from '@/components/admin/requests/request-lists';
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

export default function Page() {
  return (
    <div className="flex flex-row">
      <div className="container mt-10 ml-10 flex w-10/12 flex-col gap-2">
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
        <div className="flex w-full flex-1 flex-col gap-4 p-4 pt-0 md:flex-row">
          <div className="w-full">
            <div className="flex min-h-screen w-full">
              <div className="mt-20 w-full p-4 pl-0">
                <div className="w-full">
                  <RequestList />
                </div>
              </div>
            </div>
          </div>

          {/* dsd  */}
        </div>
      </div>
      <RequestDetail />
    </div>
  );
}
