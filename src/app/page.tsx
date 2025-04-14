'use client';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

import Mattu from '@/../public/logo/mettuLogo.png';
import { AppSidebar } from '@/components/layouts/app-sidebar';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import RequestForm from '@/components/user/request-form';
import { useState } from 'react';

export default function Page() {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const toggleRequestForm = () => {
    setIsRequestFormOpen(prev => !prev);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex">
        <SidebarTrigger />
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            {/* <Breadcrumb>
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
            </Breadcrumb> */}
          </div>
        </header>
        <div className="flex">
          <div className="container mx-auto flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex flex-col items-center justify-start gap-2 space-y-10">
              <div className="flex items-center justify-start gap-4">
                <Image src={Mattu} alt="Logo" width={62} height={51} />
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-semibold">
                    Mattu University ERMS
                  </h1>
                  <p className="text-primary/70 text-base font-medium">
                    University electronics repairement request{' '}
                  </p>
                </div>
              </div>

              {/* Clickable Request Box */}
              <div>
                <div
                  className="flex h-[50px] w-[650px] cursor-pointer items-center justify-between rounded-lg bg-white p-2"
                  onClick={toggleRequestForm}
                >
                  <h1 className="text-primary px-2">
                    Do you have any repairement request
                  </h1>
                  <div className="bg-accent flex h-full w-10 items-center justify-center rounded-md">
                    {isRequestFormOpen ? (
                      <X className="text-primary" />
                    ) : (
                      <Plus className="text-primary" />
                    )}
                  </div>
                </div>

                {/* Show/Hide RequestForm */}
                {isRequestFormOpen && <RequestForm />}
              </div>

              {/* history  */}
              <div className="">
                <h3 className="text-primary mb-4 text-lg font-semibold">
                  History
                </h3>
                <div className="space-y-3">
                  <HistoryItem title="Laptop fix" category="Laptop" />
                  <HistoryItem title="Mobile fix" category="Mobile" />
                  <HistoryItem title="PC problem" category="" />
                  <HistoryItem
                    title="Computer startup issue"
                    category="Computer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      {/* <div className="h-dvh w-[420px] bg-[#FDFDFD] p-5">
        <div className="bg-accent flex h-[270px] w-full flex-col items-center justify-center space-y-4 rounded-lg">
          <Avatar className="size-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-primary text-xl font-semibold">
              Abenezer Tesfaye
            </h1>
            <p className="text-primary/70">abenezer@gmail.com</p>
          </div>
          <Button variant={'outline'}>Edit profile</Button>
        </div>

        <div className="px-2 py-4">
          <h3 className="text-primary mb-4 text-lg font-semibold">
            February 2025
          </h3>
          <div className="grid grid-cols-7 gap-1 text-center">
            <div className="text-xs text-gray-500">Mon</div>
            <div className="text-xs text-gray-500">Tue</div>
            <div className="text-xs text-gray-500">Wed</div>
            <div className="text-xs text-gray-500">Thu</div>
            <div className="text-xs text-gray-500">Fri</div>
            <div className="text-xs text-gray-500">Sat</div>
            <div className="text-xs text-gray-500">Sun</div>

            <div className="py-2 text-base font-medium">17</div>
            <div className="bg-primary rounded-md py-2 text-base font-medium text-white">
              18
            </div>
            <div className="py-2 text-base font-medium">19</div>
            <div className="py-2 text-base font-medium">20</div>
            <div className="py-2 text-base font-medium">21</div>
            <div className="py-2 text-base font-medium">22</div>
            <div className="py-2 text-base font-medium">23</div>
          </div>
        </div>

        <div className="px-2 py-4">
          <h3 className="text-primary mb-4 text-lg font-semibold">History</h3>
          <div className="space-y-3">
            <HistoryItem title="Laptop fix" category="Laptop" />
            <HistoryItem title="Mobile fix" category="Mobile" />
            <HistoryItem title="PC problem" category="" />
            <HistoryItem title="Computer startup issue" category="Computer" />
          </div>
        </div>
      </div> */}
    </SidebarProvider>
  );
}

function HistoryItem({
  title,
  category,
}: {
  title: string;
  category?: string;
}) {
  return (
    <Card className="bg-card w-[650px] rounded-lg border-0 py-2">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h4 className="text-primary font-medium">{title}</h4>
          {category && <p className="text-xs text-gray-500">{category}</p>}
        </div>
        <Badge
          variant="outline"
          className="text-primary flex items-center gap-2 rounded-full bg-[#E3E5F5] p-1 pr-2 text-xs"
        >
          <Avatar className="size-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          Abenezer design
        </Badge>
      </CardContent>
    </Card>
  );
}
