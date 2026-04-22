import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatIDR } from '@/lib/data';
import { ChevronLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function NewExpense() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    name: '',
    qty: '',
    unit: 'kg',
    price: '',
    category: 'PROTEIN'
  });

  const totalCost = useMemo(() => {
    const q = parseFloat(formData.qty) || 0;
    const p = parseFloat(formData.price) || 0;
    return q * p;
  }, [formData.qty, formData.price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.qty || !formData.price) {
      toast.error('Harap lengkapi semua data belanja.');
      return;
    }
    toast.success('Transaksi berhasil ditambahkan!');
    navigate('/data');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 md:gap-6">
        <Button variant="outline" size="icon" asChild className="rounded-2xl h-10 w-10 md:h-12 md:w-12 bg-white dark:bg-slate-800 border-none shadow-sm hover:shadow-md transition-all">
          <Link to="/dashboard">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-400 dark:text-slate-500" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">Tambah Belanja</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-sm md:text-base">Input rincian belanja bahan baku baru untuk dapur Anda.</p>
        </div>
      </div>

      <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none overflow-hidden">
        <div className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800 p-6 md:p-10">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Rincian Transaksi</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs md:text-sm font-medium">Data ini akan digunakan untuk laporan pengeluaran otomatis.</p>
        </div>
        <CardContent className="p-6 md:p-10">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 md:gap-y-8" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="date" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Tanggal Transaksi</Label>
              <Input
                id="date"
                type="date"
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Kategori Bahan</Label>
              <Select value={formData.category} onValueChange={(val) => handleChange('category', val)}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl dark:bg-slate-800 dark:text-slate-100">
                  {['PROTEIN', 'BUMBU', 'SEMBAKO', 'SAYUR', 'LAINNYA'].map(c => (
                    <SelectItem key={c} value={c} className="cursor-pointer py-3 px-4 font-bold rounded-xl focus:bg-blue-600 focus:text-white dark:focus:bg-blue-500 transition-colors uppercase tracking-widest text-[10px]">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 col-span-1 md:col-span-2">
              <Label htmlFor="name" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Nama Bahan Baku</Label>
              <Input
                id="name"
                placeholder="cth: Ayam Fillet, Beras Ramos, dll"
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="qty" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Kuantitas</Label>
              <Input
                id="qty"
                type="number"
                placeholder="0"
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100 uppercase"
                value={formData.qty}
                onChange={(e) => handleChange('qty', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="unit" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Satuan Unit</Label>
              <Select value={formData.unit} onValueChange={(val) => handleChange('unit', val)}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100">
                  <SelectValue placeholder="Pilih satuan" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-xl dark:bg-slate-800 dark:text-slate-100">
                  {['kg', 'liter', 'gram', 'pcs', 'karung', 'dus', 'ikat'].map(u => (
                    <SelectItem key={u} value={u} className="cursor-pointer py-3 px-4 font-bold rounded-xl focus:bg-blue-600 focus:text-white dark:focus:bg-blue-500 transition-colors uppercase tracking-widest text-[10px]">{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 col-span-1 md:col-span-2">
              <Label htmlFor="price" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Harga Satuan (IDR)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </div>

            <div className="col-span-1 md:col-span-2 mt-4 md:mt-6">
              <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className="bg-blue-600 dark:bg-blue-700 p-6 md:p-8 rounded-[32px] flex items-center justify-between shadow-2xl shadow-blue-500/30 dark:shadow-blue-950/40 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-blue-100 dark:text-blue-200 uppercase tracking-[0.2em]">Total Estimasi Biaya</p>
                  <p className="text-2xl md:text-4xl font-black text-white mt-1 tracking-tighter">{formatIDR(totalCost)}</p>
                </div>
                <div className="bg-white/20 p-3 md:p-4 rounded-2xl relative z-10 backdrop-blur-sm shadow-xl">
                  <Save className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </motion.div>
            </div>

            <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-end gap-3 md:gap-4 pt-4">
              <Button type="button" variant="ghost" className="h-12 md:h-14 rounded-2xl px-10 font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 order-2 md:order-1" asChild>
                <Link to="/dashboard">Batal</Link>
              </Button>
              <Button type="submit" className="h-12 md:h-14 rounded-2xl px-16 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-200 dark:shadow-blue-900/20 transition-all active:scale-95 order-1 md:order-2">
                Simpan Transaksi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
