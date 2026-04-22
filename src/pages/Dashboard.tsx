import React from 'react';
import { Card } from '@/components/ui/card';
import { MOCK_EXPENSES, formatIDR } from '@/lib/data';
import { TrendingUp, TrendingDown, Bell, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const CATEGORY_STYLES = {
  PROTEIN: 'bg-green-100 text-green-700',
  BUMBU: 'bg-purple-100 text-purple-700',
  SEMBAKO: 'bg-slate-100 text-slate-600',
  SAYUR: 'bg-emerald-50 text-emerald-600',
  LAINNYA: 'bg-slate-100 text-slate-500'
};

export default function Dashboard() {
  const totalToday = MOCK_EXPENSES
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((sum, e) => sum + e.total, 0);

  const totalThisWeek = 28140000; // Mocked for design parity
  const totalThisMonth = 102500000; // Mocked for design parity

  const stats = [
    { 
      title: 'BELANJA HARI INI', 
      amount: totalToday, 
      trend: '+12%', 
      trendType: 'up', 
      chart: [20, 45, 30, 60, 100], 
      chartColor: 'bg-blue-600',
      baseColor: 'bg-blue-100'
    },
    { 
      title: 'MINGGU INI', 
      amount: totalThisWeek, 
      trend: '-4.5%', 
      trendType: 'down', 
      chart: [30, 40, 50, 70, 40, 90, 30], 
      chartColor: 'bg-violet-600',
      baseColor: 'bg-violet-100'
    },
    { 
      title: 'BULAN INI', 
      amount: totalThisMonth / 1000, 
      isK: true,
      trend: '+21%', 
      trendType: 'up', 
      chart: [40, 50, 60, 80], 
      chartColor: 'bg-emerald-700',
      baseColor: 'bg-emerald-200'
    },
  ];

  const recentExpenses = MOCK_EXPENSES.slice(0, 5);

  return (
    <div className="space-y-10 relative">
      {/* Header & Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">Halo, Admin Catering!</h1>
      <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">Pantau biaya bahan baku dapur Anda hari ini.</p>
    </div>
    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20 px-4 py-2 rounded-full shadow-sm w-fit">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Status Budget: Aman</span>
    </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.title}</p>
              <div className={`p-1 rounded-lg flex items-center gap-1 ${stat.trendType === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                {stat.trendType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-[10px] md:text-[11px] font-black tracking-tight">{stat.trend}</span>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tighter whitespace-nowrap">
                Rp {stat.isK ? `${stat.amount.toLocaleString('id-ID')}k` : stat.amount.toLocaleString('id-ID')}
              </h3>
              
              {/* Mini Chart */}
              <div className="flex items-end gap-1.5 h-10 md:h-12 pb-1 shrink-0">
                {stat.chart.map((val, i) => (
                  <div 
                    key={i} 
                    className={`w-3 md:w-4 rounded-md transition-all duration-500 ${i === stat.chart.length - 1 ? stat.chartColor : (idx === 2 ? 'bg-emerald-900/10' : stat.baseColor)}`}
                    style={{ height: `${val}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
        ))}
      </div>

      {/* Recent Transactions Table */}
      <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-2 overflow-hidden">
        <div className="p-6 md:p-8 flex items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight">Transaksi Belanja Terbaru</h2>
          <Link to="/data" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors shrink-0">Lihat Semua</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest min-w-[120px]">Tanggal</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest min-w-[150px]">Nama Bahan</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Kategori</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Total Biaya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {recentExpenses.map((expense, idx) => (
                <tr key={expense.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-4 md:px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{new Date(expense.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                      {idx === 0 && (
                        <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Baru</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 md:px-8 py-5">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{expense.name}</span>
                  </td>
                  <td className="px-4 md:px-8 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${CATEGORY_STYLES[expense.category] || CATEGORY_STYLES.LAINNYA} dark:bg-slate-800 dark:text-slate-300`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-5 text-right">
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 whitespace-nowrap">{formatIDR(expense.total)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAB */}
      <Link 
        to="/new-expense" 
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 p-4 md:p-5 bg-blue-600 rounded-full shadow-2xl shadow-blue-500/50 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-50"
      >
        <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
      </Link>
    </div>
  );
}
