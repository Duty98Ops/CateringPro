import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import { Search, Bell, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
        <AppSidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="h-20 flex items-center justify-between px-4 md:px-6 lg:px-10 bg-transparent shrink-0">
            <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight shrink-0 truncate uppercase">Panel Kendali</h1>
              
              <div className="relative max-w-md w-full hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari laporan atau bahan..."
                  className="w-full bg-white/60 dark:bg-slate-900/60 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 relative">
               <ThemeToggle />
               <button className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Bell className="w-5 h-5" />
               </button>
               <button className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <Settings className="w-5 h-5" />
               </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-10 pb-10">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
