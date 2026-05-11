import { Utensils, LayoutDashboard, Database, PlusCircle, Store, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Database, label: 'Daftar Belanja', path: '/data' },
  { icon: PlusCircle, label: 'Tambah Belanja', path: '/new-expense' },
  { icon: Store, label: 'Supplier', path: '/supplier' },
  { icon: BarChart3, label: 'Laporan', path: '/reports' },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800">
      <SidebarHeader className="p-8 text-sidebar-foreground">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#a66a5e] rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20">
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
                      ? 'bg-[#a66a5e]/10 text-[#a66a5e] shadow-sm'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Link to={item.path}>
                    <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-[#a66a5e]' : 'text-slate-400 dark:text-slate-500 font-bold'}`} />
                    <span className="font-bold text-sm">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
