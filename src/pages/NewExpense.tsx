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
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-slate-200">
          <Link to="/dashboard">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tambah Belanja</h1>
          <p className="text-slate-500 mt-1">Input rincian belanja bahan baku baru.</p>
        </div>
      </div>

      <Card className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <CardTitle className="font-bold text-slate-800">Rincian Transaksi</CardTitle>
          <CardDescription className="text-slate-500">Informasi ini akan tercatat dalam laporan bulanan Anda.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
            <div className="space-y-3 col-span-2 md:col-span-1">
              <Label htmlFor="date" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal</Label>
              <Input
                id="date"
                type="date"
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>

            <div className="space-y-3 col-span-2 md:col-span-1">
              <Label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Bahan Baku</Label>
              <Input
                id="name"
                placeholder="cth: Ayam Fillet, Beras, dll"
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="qty" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kuantitas</Label>
              <Input
                id="qty"
                type="number"
                placeholder="0"
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
                value={formData.qty}
                onChange={(e) => handleChange('qty', e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="unit" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Satuan Unit</Label>
              <Select value={formData.unit} onValueChange={(val) => handleChange('unit', val)}>
                <SelectTrigger className="h-12 rounded-xl border-slate-200">
                  <SelectValue placeholder="Pilih satuan" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {['kg', 'liter', 'gram', 'pcs', 'karung', 'dus'].map(u => (
                    <SelectItem key={u} value={u} className="cursor-pointer">{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 col-span-2">
              <Label htmlFor="price" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Harga Satuan (IDR)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0"
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </div>

            <div className="col-span-2 mt-4">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              >
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Estimasi Biaya</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{formatIDR(totalCost)}</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/30">
                  <Save className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>

            <div className="col-span-2 flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" className="h-12 rounded-xl px-8" asChild>
                <Link to="/dashboard">Batal</Link>
              </Button>
              <Button type="submit" className="h-12 rounded-xl px-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                Simpan Transaksi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
