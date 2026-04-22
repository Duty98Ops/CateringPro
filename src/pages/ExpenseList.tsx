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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Daftar Belanja</h1>
        <p className="text-slate-500 mt-1">Kelola dan pantau semua transaksi bahan baku Anda.</p>
      </div>

      <Card className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <CardHeader className="border-b border-slate-100 px-6 py-5 flex items-center justify-between pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Cari nama bahan..."
                className="pl-10 h-11 border-slate-200 rounded-xl focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-11 rounded-xl border-slate-200 flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span>Filter Tanggal</span>
              </Button>
              <Button className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700">Ekspor Data</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal</TableHead>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Bahan</TableHead>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Qty</TableHead>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Unit</TableHead>
                <TableHead className="px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest text-right pr-6">Total Biaya</TableHead>
                <TableHead className="w-[80px] pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-slate-50">
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-slate-50/50 transition-colors border-none">
                  <TableCell className="px-6 py-4 text-sm font-medium text-slate-500">{expense.date}</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-bold text-slate-800">{expense.name}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-600">{expense.qty}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-600">{expense.unit}</TableCell>
                  <TableCell className="px-6 py-4 text-sm font-black text-right pr-6 text-slate-900">{formatIDR(expense.total)}</TableCell>
                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 rounded-lg">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(expense.id, expense.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
