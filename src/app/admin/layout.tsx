import { Toaster } from 'sonner';

import { AppSidebar } from '@/components/layouts/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import TanstackProvider from '@/providers/tanstack-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TanstackProvider>
          {children}
          <Toaster position="top-center" richColors />
        </TanstackProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
