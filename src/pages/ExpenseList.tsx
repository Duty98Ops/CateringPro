import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_EXPENSES, formatIDR, Expense } from '@/lib/data';
import { Search, Filter, MoreVertical, Edit2, Trash2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);

  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, name: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    toast.success(`${name} telah dihapus dari daftar.`);
  };

  const categories = ['ALL', 'PROTEIN', 'BUMBU', 'SEMBAKO', 'SAYUR', 'LAINNYA'];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">Daftar Belanja</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">Kelola dan pantau semua transaksi bahan baku Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 md:h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-none px-4 md:px-6 flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold hover:shadow-md transition-all text-xs md:text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button className="h-10 md:h-12 bg-[#a66a5e] hover:opacity-90 text-white rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 px-6 md:px-8 font-bold transition-all text-xs md:text-sm">
            Ekspor Data
          </Button>
        </div>
      </div>

      <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-2 overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari transaksi..."
              className="w-full bg-slate-50/50 dark:bg-slate-800/30 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#a66a5e]/20 transition-all outline-none placeholder:text-slate-400 border border-slate-100 dark:border-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64 flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-50/50 dark:bg-slate-800/30 border-none rounded-2xl py-6 px-4 text-sm focus:ring-2 focus:ring-[#a66a5e]/20 transition-all text-slate-600 dark:text-slate-300 font-bold">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-none shadow-xl dark:bg-slate-800 dark:text-slate-100">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="rounded-xl focus:bg-[#a66a5e]/10 focus:text-[#a66a5e] dark:focus:text-[#a66a5e] font-bold text-xs">
                    {cat === 'ALL' ? 'Semua Kategori' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedCategory !== 'ALL' && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                onClick={() => setSelectedCategory('ALL')}
              >
                <X className="w-4 h-4 text-slate-400" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest min-w-[120px]">Tanggal</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest min-w-[150px]">Nama Bahan</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">Kategori</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Qty</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Total Biaya</th>
                <th className="w-[80px] px-4 md:px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-4 md:px-8 py-5">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 truncate block max-w-[100px] md:max-w-none">
                        {new Date(expense.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td className="px-4 md:px-8 py-5">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{expense.name}</span>
                    </td>
                    <td className="px-4 md:px-8 py-5 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                        ${expense.category === 'PROTEIN' ? 'bg-green-100 text-green-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                          expense.category === 'BUMBU' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                          expense.category === 'SAYUR' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          expense.category === 'SEMBAKO' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 md:px-8 py-5">
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">{expense.qty} {expense.unit}</span>
                    </td>
                    <td className="px-4 md:px-8 py-5 text-right text-sm font-black text-[#a66a5e] whitespace-nowrap">
                      {formatIDR(expense.total)}
                    </td>
                    <td className="px-4 md:px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-2xl border-none shadow-xl dark:bg-slate-800 dark:text-slate-100">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2 px-4 focus:bg-[#a66a5e]/10 focus:text-[#a66a5e] transition-colors rounded-xl">
                            <Edit2 className="w-4 h-4" />
                            <span className="font-bold text-xs">Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 cursor-pointer py-2 px-4 text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/30 transition-colors rounded-xl mt-1"
                            onClick={() => handleDelete(expense.id, expense.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="font-bold text-xs">Hapus</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-slate-400 font-medium">Tidak ada transaksi ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
