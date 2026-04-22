import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_EXPENSES } from '@/lib/data';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const dailyData = MOCK_EXPENSES.map(e => ({
  name: e.date.split('-').slice(1).join('/'),
  total: e.total,
})).reverse();

const weeklyData = [
  { name: 'Minggu 1', total: 2500000 },
  { name: 'Minggu 2', total: 3200000 },
  { name: 'Minggu 3', total: 2800000 },
  { name: 'Minggu 4', total: 3100000 },
];

const monthlyData = [
  { name: 'Jan', total: 12000000 },
  { name: 'Feb', total: 15400000 },
  { name: 'Mar', total: 13200000 },
  { name: 'Apr', total: 14800000 },
];

const chartConfig = {
  total: {
    label: "Total Biaya",
    color: "hsl(var(--primary))",
  },
};

export default function Reports() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">Laporan & Analisis</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Analisis tren pengeluaran dapur Anda secara berkala.</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-8">
        <TabsList className="bg-white/60 dark:bg-slate-900/60 p-1 md:p-2 rounded-[24px] h-auto self-start shadow-sm flex overflow-x-auto max-w-full no-scrollbar">
          <TabsTrigger value="daily" className="rounded-2xl px-6 md:px-8 lg:px-12 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200 dark:data-[state=active]:shadow-blue-900/20 transition-all text-slate-400 dark:text-slate-500 flex-1">Harian</TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-2xl px-6 md:px-8 lg:px-12 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200 dark:data-[state=active]:shadow-blue-900/20 transition-all text-slate-400 dark:text-slate-500 flex-1">Mingguan</TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-2xl px-6 md:px-8 lg:px-12 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200 dark:data-[state=active]:shadow-blue-900/20 transition-all text-slate-400 dark:text-slate-500 flex-1">Bulanan</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-6 md:p-8 lg:p-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">Statistik Harian</h2>
              <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Perbandingan biaya 7 hari terakhir</p>
            </div>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={dailyData} margin={{ top: 0, right: 0, left: 0, bottom: 24 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 700 }} 
                    className="text-slate-500 dark:text-slate-400"
                    tickMargin={12} 
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#f1f5f9" radius={[12, 12, 12, 12]}>
                    {dailyData.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === dailyData.length - 1 ? '#2563eb' : 'currentColor'} 
                        className={`transition-all duration-300 ${index === dailyData.length - 1 ? '' : 'text-slate-100 dark:text-slate-800'}`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-6 md:p-8 lg:p-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">Statistik Mingguan</h2>
              <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Tren pengeluaran dalam satu bulan terakhir</p>
            </div>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: 0, bottom: 24 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 700 }} className="text-slate-500 dark:text-slate-400" tickMargin={12} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" radius={[12, 12, 12, 12]}>
                    {weeklyData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === weeklyData.length - 1 ? '#7c3aed' : 'currentColor'} className={index === weeklyData.length - 1 ? '' : 'text-slate-100 dark:text-slate-800'} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-6 md:p-8 lg:p-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">Statistik Bulanan</h2>
              <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Ringkasan biaya sepanjang tahun berjalan</p>
            </div>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: 0, bottom: 24 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 700 }} className="text-slate-500 dark:text-slate-400" tickMargin={12} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" radius={[12, 12, 12, 12]}>
                    {monthlyData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === monthlyData.length - 1 ? '#059669' : 'currentColor'} className={index === monthlyData.length - 1 ? '' : 'text-slate-100 dark:text-slate-800'} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
