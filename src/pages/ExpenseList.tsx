import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_EXPENSES, formatIDR, Expense } from '@/lib/data';
import { Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);

  const filteredExpenses = expenses.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    toast.success(`${name} telah dihapus dari daftar.`);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-tight">Daftar Belanja</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">Kelola dan pantau semua transaksi bahan baku Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 md:h-12 bg-white rounded-2xl shadow-sm border-none px-4 md:px-6 flex items-center gap-2 text-slate-600 font-bold hover:shadow-md transition-all text-xs md:text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button className="h-10 md:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 px-6 md:px-8 font-bold transition-all text-xs md:text-sm">
            Ekspor Data
          </Button>
        </div>
      </div>

      <Card className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none p-2 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari transaksi..."
              className="w-full bg-slate-50/50 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder:text-slate-400 border border-slate-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[120px]">Tanggal</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest min-w-[150px]">Nama Bahan</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Kategori</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Biaya</th>
                <th className="w-[80px] px-4 md:px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 md:px-8 py-5">
                    <span className="text-sm font-bold text-slate-600 truncate block max-w-[100px] md:max-w-none">
                      {new Date(expense.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-5">
                    <span className="text-sm font-bold text-slate-800">{expense.name}</span>
                  </td>
                  <td className="px-4 md:px-8 py-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                      ${expense.category === 'PROTEIN' ? 'bg-green-100 text-green-700' : 
                        expense.category === 'BUMBU' ? 'bg-purple-100 text-purple-700' :
                        expense.category === 'SAYUR' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-slate-100 text-slate-600'}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-5">
                    <span className="text-sm font-bold text-slate-500 whitespace-nowrap">{expense.qty} {expense.unit}</span>
                  </td>
                  <td className="px-4 md:px-8 py-5 text-right text-sm font-black text-blue-600 whitespace-nowrap">
                    {formatIDR(expense.total)}
                  </td>
                  <td className="px-4 md:px-8 py-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-2xl border-none shadow-xl">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2 px-4 focus:bg-blue-50 focus:text-blue-600 transition-colors rounded-xl">
                          <Edit2 className="w-4 h-4" />
                          <span className="font-bold text-xs">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer py-2 px-4 text-red-600 focus:text-red-700 focus:bg-red-50 transition-colors rounded-xl mt-1"
                          onClick={() => handleDelete(expense.id, expense.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-bold text-xs">Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
