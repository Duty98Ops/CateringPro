import React from 'react';
import { Card } from '@/components/ui/card';
import { formatIDR } from '@/lib/data';
import { Calendar, DollarSign, Package, TrendingUp, BarChart3, ShoppingCart, PieChart as PieChartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const dailyTrendData = [
  { name: '04-13', total: 0 },
  { name: '04-15', total: 0 },
  { name: '04-17', total: 0 },
  { name: '04-19', total: 0 },
  { name: '04-21', total: 0 },
  { name: '04-23', total: 0 },
  { name: '04-25', total: 0 },
  { name: '04-27', total: 0 },
  { name: '04-28', total: 1800000 },
  { name: '04-29', total: 800000 },
  { name: '04-30', total: 1700000 },
  { name: '05-01', total: 1200000 },
  { name: '05-02', total: 900000 },
  { name: '05-03', total: 2600000 },
  { name: '05-04', total: 850000 },
  { name: '05-05', total: 700000 },
  { name: '05-07', total: 0 },
  { name: '05-08', total: 300000 },
  { name: '05-09', total: 350000 },
  { name: '05-11', total: 0 },
];

const categoryData = [
  { name: 'Daging & Seafood', value: 5606000, color: '#e58c73', icon: '🥩' },
  { name: 'Bahan Pokok', value: 922000, color: '#4d5568', icon: '🌾' },
  { name: 'Bumbu & Rempah', value: 921000, color: '#8cb39d', icon: '🧂' },
  { name: 'Packaging', value: 795000, color: '#e9c46a', icon: '📦' },
  { name: 'Susu & Telur', value: 700000, color: '#5c59d9', icon: '🥚' },
  { name: 'Sayuran & Buah', value: 278000, color: '#f3722c', icon: '🥦' },
  { name: 'Gas & Utilitas', value: 350000, color: '#48cae4', icon: '🔥' },
  { name: 'Minuman', value: 184000, color: '#d90429', icon: '🥤' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border-none rounded-xl p-4 shadow-2xl text-white">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-black">{formatIDR(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-8">
      {payload.map((entry: any, index: number) => {
        const item = categoryData.find(c => c.name === entry.value);
        return (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
              <span>{item?.icon}</span>
              <span className="truncate max-w-[100px]">{entry.value}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hari Ini</p>
            <h3 className="text-3xl font-black text-[#e58c73] tracking-tight">Rp 0</h3>
          </div>
          <Calendar className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
        </Card>

        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">7 Hari Terakhir</p>
            <h3 className="text-3xl font-black text-[#5c59d9] tracking-tight">Rp 743.000</h3>
          </div>
          <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
        </Card>

        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">30 Hari Terakhir</p>
            <h3 className="text-3xl font-black text-[#8cb39d] tracking-tight">Rp 9.756.000</h3>
          </div>
          <BarChart3 className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
        </Card>

        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Keseluruhan</p>
            <h3 className="text-3xl font-black text-[#48cae4] tracking-tight whitespace-nowrap">Rp 9.831.000</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-1">11 hari • rata-rata Rp 893.727/hari</p>
          </div>
          <DollarSign className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Bar Chart */}
        <Card className="lg:col-span-2 bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl">📈</span>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Tren Pengeluaran 30 Hari</h4>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrendData} margin={{ top: 20, right: 10, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-[#2d2622]" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(value) => `Rp ${value >= 1000000 ? (value/1000000).toFixed(1) + 'jt' : (value/1000).toFixed(0) + 'rb'}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)', className: 'dark:fill-white/5' }} />
                <Bar 
                  dataKey="total" 
                  fill="#e58c73" 
                  radius={[6, 6, 6, 6]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Donut Chart */}
        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl">🏷️</span>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Komposisi Kategori</h4>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* FAB */}
      <Link 
        to="/new-expense" 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 p-4 md:p-5 bg-[#a66a5e] rounded-full shadow-2xl shadow-black/20 text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all z-50 focus:outline-none"
      >
        <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
      </Link>
    </div>
  );
}

