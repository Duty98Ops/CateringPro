import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_EXPENSES, formatIDR } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Info, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [hasInputToday, setHasInputToday] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const exists = MOCK_EXPENSES.some(e => e.date === today);
    setHasInputToday(exists);
  }, []);

  const totalToday = MOCK_EXPENSES
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((sum, e) => sum + e.total, 0);

  const totalThisWeek = MOCK_EXPENSES.reduce((sum, e) => sum + e.total, 0); // Mocked as all recent
  const totalThisMonth = MOCK_EXPENSES.reduce((sum, e) => sum + e.total, 0); // Mocked as all recent

  const recentExpenses = MOCK_EXPENSES.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Halo, Admin Catering!</h1>
        <p className="text-slate-500 mt-1">Pantau biaya bahan baku dapur Anda hari ini.</p>
      </div>

      {!hasInputToday && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 p-2.5 rounded-xl">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">Smart Reminder</p>
              <p className="text-xs text-amber-700">Anda belum menginput transaksi pengeluaran untuk hari ini.</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="text-xs font-bold text-amber-900 px-4 py-2 hover:bg-amber-100 rounded-lg uppercase tracking-wider">
            <Link to="/new-expense">Input Sekarang</Link>
          </Button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Hari Ini', amount: totalToday, color: 'bg-blue-500' },
          { title: 'Minggu Ini', amount: totalThisWeek, color: 'bg-green-500' },
          { title: 'Bulan Ini', amount: totalThisMonth, color: 'bg-purple-500' },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden flex flex-col justify-between h-32">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-900">{formatIDR(stat.amount)}</h3>
            </div>
            <div className={`h-1 w-12 ${stat.color} rounded-full`}></div>
          </Card>
        ))}
      </div>

      <Card className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
        <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between pb-4">
          <CardTitle className="font-bold text-slate-800">Belanja Terbaru</CardTitle>
          <Button variant="ghost" asChild className="text-xs font-bold text-blue-600 hover:underline px-0 h-auto">
            <Link to="/data">Lihat Semua</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal</TableHead>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Bahan</TableHead>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Biaya</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-50">
              {recentExpenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-slate-50/50 transition-colors border-none">
                  <TableCell className="px-6 py-4 text-sm font-medium text-slate-500">{expense.date}</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-bold text-slate-800">{expense.name}</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-black text-right text-slate-900">{formatIDR(expense.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
