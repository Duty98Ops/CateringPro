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
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Laporan & Analisis</h1>
        <p className="text-slate-500 mt-2 font-medium">Analisis tren pengeluaran dapur Anda secara berkala.</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-8">
        <TabsList className="bg-white/60 p-1 md:p-2 rounded-[24px] h-auto self-start shadow-sm flex overflow-x-auto max-w-full no-scrollbar">
          <TabsTrigger value="daily" className="rounded-2xl px-6 md:px-12 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200 transition-all text-slate-400 flex-1">Harian</TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-2xl px-6 md:px-12 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200 transition-all text-slate-400 flex-1">Mingguan</TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-2xl px-6 md:px-12 py-3 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-200 transition-all text-slate-400 flex-1">Bulanan</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-6 md:p-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Statistik Harian</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Perbandingan biaya 7 hari terakhir</p>
            </div>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={dailyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                    tickMargin={20} 
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#f1f5f9" radius={[12, 12, 12, 12]}>
                    {dailyData.map((_entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        className="transition-all duration-300"
                        fill={index === dailyData.length - 1 ? '#2563eb' : '#e2e8f0'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-6 md:p-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Statistik Mingguan</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Tren pengeluaran dalam satu bulan terakhir</p>
            </div>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} tickMargin={20} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#e2e8f0" radius={[12, 12, 12, 12]}>
                    {weeklyData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === weeklyData.length - 1 ? '#7c3aed' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-6 md:p-10">
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Statistik Bulanan</h2>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Ringkasan biaya sepanjang tahun berjalan</p>
            </div>
            <div className="h-[400px]">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} tickMargin={20} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#e2e8f0" radius={[12, 12, 12, 12]}>
                    {monthlyData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === monthlyData.length - 1 ? '#059669' : '#e2e8f0'} />
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
