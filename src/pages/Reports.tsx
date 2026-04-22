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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Laporan & Analisis</h1>
        <p className="text-slate-500 mt-1">Analisis tren pengeluaran dapur Anda secara berkala.</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="bg-white border border-slate-100 p-1.5 rounded-2xl h-auto self-start">
          <TabsTrigger value="daily" className="rounded-xl px-10 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Harian</TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-xl px-10 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Mingguan</TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-xl px-10 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Bulanan</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="font-bold text-slate-800">Statistik Harian</CardTitle>
              <CardDescription className="text-slate-500 font-medium tracking-wide">Perbandingan biaya 7 hari terakhir.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] mt-4 px-8 pb-8">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={dailyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-total)" radius={[8, 8, 0, 0]}>
                    {dailyData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === dailyData.length - 1 ? '#2563eb' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <CardHeader>
              <CardTitle>Statistik Mingguan</CardTitle>
              <CardDescription>Tren pengeluaran dalam satu bulan terakhir.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] mt-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <CardHeader>
              <CardTitle>Statistik Bulanan</CardTitle>
              <CardDescription>Ringkasan biaya sepanjang tahun berjalan.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] mt-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis hide />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
