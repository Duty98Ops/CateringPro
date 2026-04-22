import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="h-20 flex items-center justify-between px-8 bg-white/50 border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">Panel Kendali</h1>
                <p className="text-sm text-slate-500">Kelola operasional dapur Anda secara efisien.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
               {/* Add action buttons here if needed */}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
