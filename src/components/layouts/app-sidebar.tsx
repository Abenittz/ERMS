'use client';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FileWarning,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UsersRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import Logo from '@/../public/logo/mettuLogo.png';
import { NavMain } from '@/components/layouts/nav-main';
import { NavUser } from '@/components/layouts/nav-user';
import { TeamSwitcher } from '@/components/layouts/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Requests',
      url: '/admin/requests',
      icon: FileWarning,
    },
    {
      title: 'Technicians',
      url: '/admin/technicians',
      icon: UsersRound,
    },
    {
      title: 'Skills',
      url: '/admin/skill-management',
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <Link href={'/'}>
        <SidebarHeader className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex-row items-center py-5">
          <div className="text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg bg-transparent">
            <Image src={Logo} alt="Logo" width={42} height={42} />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="text-textColor truncate text-base font-medium">
              Mattu university ERMS
            </span>
          </div>
        </SidebarHeader>
      </Link>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
