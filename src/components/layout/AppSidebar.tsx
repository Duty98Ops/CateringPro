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
    <Sidebar className="bg-[#0f172a] text-slate-300 border-r border-slate-800">
      <SidebarHeader className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Utensils className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight italic">CateringPro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-slate-500 uppercase text-[10px] font-bold tracking-widest mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path} className="px-3">
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  className={`flex items-center gap-3 px-3 py-6 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-white font-medium'
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Link to={item.path}>
                    <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem className="px-3">
            <SidebarMenuButton
              asChild
              className={`flex items-center gap-3 px-3 py-6 rounded-xl transition-all duration-200 ${
                location.pathname === '/profile'
                  ? 'bg-white/10 text-white font-medium'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Link to="/profile">
                <User className="w-5 h-5" />
                <span>Profil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="px-3">
            <SidebarMenuButton
              asChild
              className="flex items-center gap-3 px-3 py-6 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              <Link to="/login">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
