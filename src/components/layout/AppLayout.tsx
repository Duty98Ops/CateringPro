import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { Search, Bell, Settings } from 'lucide-react';

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="h-20 flex items-center justify-between px-4 md:px-10 bg-transparent shrink-0">
            <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight shrink-0 truncate">Panel Kendali</h1>
              
              <div className="relative max-w-md w-full hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari laporan atau bahan..."
                  className="w-full bg-white/60 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-slate-500 hover:text-blue-600">
                  <Bell className="w-5 h-5" />
               </button>
               <button className="p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-slate-500 hover:text-blue-600">
                  <Settings className="w-5 h-5" />
               </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-10">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
