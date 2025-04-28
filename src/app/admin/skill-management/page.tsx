import React from 'react';

import { SkillManagement } from '@/components/skill/skill-management';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function Page() {
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

        <SkillManagement />
      </div>
    </div>
  );
}
