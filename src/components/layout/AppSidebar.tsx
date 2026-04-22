import { Utensils, LayoutDashboard, Database, PlusCircle, BarChart3, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Database, label: 'Daftar Belanja', path: '/data' },
  { icon: PlusCircle, label: 'Tambah Belanja', path: '/new-expense' },
  { icon: BarChart3, label: 'Laporan', path: '/reports' },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800">
      <SidebarHeader className="p-8 text-sidebar-foreground">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-800 dark:text-white tracking-tight leading-tight">CateringPro</span>
            <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-tight">Logistics Manager</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  className={`flex items-center gap-4 px-4 py-6 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Link to={item.path}>
                    <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 font-bold'}`} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6">
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-[24px] border border-blue-100/50 dark:border-blue-900/30 flex items-center gap-3">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
              alt="Avatar"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Admin Dapur</p>
            <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 truncate">ID: CAT-8821</p>
          </div>
          <Link to="/login" className="p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 dark:text-slate-500 hover:text-red-500">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
