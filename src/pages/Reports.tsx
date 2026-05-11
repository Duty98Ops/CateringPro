import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_EXPENSES, formatIDR } from '@/lib/data';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Calendar, DollarSign, Package, CalendarDays } from 'lucide-react';

const dailyData = [
  { name: '04-28', total: 1800000 },
  { name: '04-29', total: 800000 },
  { name: '04-30', total: 1700000 },
  { name: '05-01', total: 1200000 },
  { name: '05-02', total: 900000 },
  { name: '05-03', total: 2600000 },
  { name: '05-04', total: 850000 },
  { name: '05-05', total: 700000 },
  { name: '05-08', total: 300000 },
  { name: '05-09', total: 350000 },
];

const categoryBreakdown = [
  { label: 'Daging & Seafood', icon: '🥩', total: 5606000, percentage: 57.5, color: '#e58c73' },
  { label: 'Bahan Pokok', icon: '🌾', total: 922000, percentage: 9.5, color: '#373f51' },
  { label: 'Bumbu & Rempah', icon: '🧂', total: 921000, percentage: 9.4, color: '#8cb39d' },
  { label: 'Packaging', icon: '📦', total: 795000, percentage: 8.1, color: '#e9c46a' },
  { label: 'Susu & Telur', icon: '🥚', total: 700000, percentage: 7.2, color: '#5c59d9' },
  { label: 'Gas & Utilitas', icon: '🔥', total: 350000, percentage: 3.6, color: '#48cae4' },
  { label: 'Sayuran & Buah', icon: '🥦', total: 278000, percentage: 2.8, color: '#f3722c' },
  { label: 'Minuman', icon: '🥤', total: 184000, percentage: 1.9, color: '#d90429' },
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

export default function Reports() {
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [dateFrom, setDateFrom] = useState('2026-04-12');
  const [dateTo, setDateTo] = useState('2026-05-11');

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">📊</span>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight">Laporan</h1>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="range" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-[#1a1614] p-1.5 rounded-full h-auto flex max-w-fit border border-slate-200 dark:border-slate-800/50">
          <TabsTrigger 
            value="range" 
            className="rounded-full px-6 py-2.5 font-bold text-xs data-[state=active]:bg-[#a66a5e] data-[state=active]:text-white text-slate-500 transition-all flex items-center gap-2"
          >
            🗓️ Rentang Tanggal
          </TabsTrigger>
          <TabsTrigger 
            value="monthly" 
            className="rounded-full px-6 py-2.5 font-bold text-xs data-[state=active]:bg-[#a66a5e] data-[state=active]:text-white text-slate-500 transition-all flex items-center gap-2"
          >
            🗓️ Bulanan
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Dari</label>
          <div className="relative">
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-white dark:bg-[#1a1614] border border-slate-200 dark:border-slate-800/50 rounded-2xl py-3 px-6 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-[#a66a5e] transition-all w-48 appearance-none shadow-sm"
            />
            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-600 pointer-events-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Sampai</label>
          <div className="relative">
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-white dark:bg-[#1a1614] border border-slate-200 dark:border-slate-800/50 rounded-2xl py-3 px-6 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-[#a66a5e] transition-all w-48 appearance-none shadow-sm"
            />
            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-600 pointer-events-none" />
          </div>
        </div>
        <button className="bg-[#a66a5e] hover:opacity-90 text-white rounded-2xl px-8 h-[46px] font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 shadow-black/5 dark:shadow-black/20">
          Tampilkan
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Pengeluaran</p>
            <h3 className="text-3xl font-black text-[#a66a5e] tracking-tight">Rp 9.756.000</h3>
          </div>
          <DollarSign className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-8 right-8 w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </Card>

        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hari dengan Data</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200 tracking-tight">10</h3>
          </div>
          <Calendar className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">🗓️</span>
          </div>
        </Card>

        <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Item</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200 tracking-tight">45</h3>
          </div>
          <Package className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-100 dark:text-slate-800/20 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute top-8 right-8 w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </Card>
      </div>

      {/* Main Bar Chart */}
      <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8 border-l-4 border-[#a66a5e] pl-4">Pengeluaran per Hari</h4>
        <div className="h-[400px] w-full min-h-0 min-w-0">
          {isMounted && (
            <ResponsiveContainer width="100%" height={400} minWidth={0}>
              <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
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
                  fill="#8cb39d" 
                  radius={[8, 8, 8, 8]}
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Breakdown Kategori */}
      <Card className="bg-white dark:bg-[#1a1614] border-none rounded-[32px] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-10 border-l-4 border-[#a66a5e] pl-4">Breakdown Kategori</h4>
        <div className="space-y-6">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 group">
              <div className="flex items-center gap-3 w-64 shrink-0">
                <span className="text-lg w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-lg group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-black text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat.label}</span>
              </div>
              <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden relative">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                />
              </div>
              <div className="w-48 text-right flex items-center justify-end gap-4 shrink-0">
                <span className="text-sm font-black text-slate-800 dark:text-slate-200">{formatIDR(cat.total)}</span>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 w-12">{cat.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
