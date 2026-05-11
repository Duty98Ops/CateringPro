import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatIDR } from '@/lib/data';
import { ChevronLeft, Save, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { name: 'Daging & Seafood', icon: '🥩' },
  { name: 'Bahan Pokok', icon: '🌾' },
  { name: 'Bumbu & Rempah', icon: '🧂' },
  { name: 'Packaging', icon: '📦' },
  { name: 'Susu & Telur', icon: '🥚' },
  { name: 'Sayuran & Buah', icon: '🥦' },
  { name: 'Gas & Utilitas', icon: '🔥' },
  { name: 'Minuman', icon: '🥤' }
];

const UNITS = ['kg', 'liter', 'gram', 'pcs', 'karung', 'dus', 'ikat'];

const SUPPLIERS = [
  'Sumber Rejeki',
  'Pasar Induk Utama',
  'Toko Sembako Jaya',
  'Cahaya Meat Shop',
  'Farm Fresh Jakarta'
];

interface ExpenseItem {
  id: string;
  name: string;
  qty: string;
  unit: string;
  price: string;
  category: string;
}

export default function NewExpense() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [supplier, setSupplier] = useState('');
  const [items, setItems] = useState<ExpenseItem[]>([
    { id: '1', name: '', qty: '0', unit: 'kg', price: '', category: 'Bahan Pokok' }
  ]);

  const totalCost = useMemo(() => {
    return items.reduce((sum, item) => {
      const q = parseFloat(item.qty) || 0;
      const p = parseFloat(item.price) || 0;
      return sum + (q * p);
    }, 0);
  }, [items]);

  const validItemsCount = useMemo(() => {
    return items.filter(item => item.name && item.qty && item.price).length;
  }, [items]);

  const addItem = () => {
    setItems(prev => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), name: '', qty: '0', unit: 'kg', price: '', category: 'Bahan Pokok' }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof ExpenseItem, value: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validItemsCount === 0) {
      toast.error('Harap isi setidaknya satu baris belanja dengan lengkap.');
      return;
    }
    toast.success(`${validItemsCount} item belanja berhasil ditambahkan!`);
    navigate('/data');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 p-4 md:p-0">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="rounded-2xl h-10 w-10 bg-white dark:bg-[#1a1614] border-none shadow-sm hover:shadow-md transition-all">
          <Link to="/dashboard">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Tambah Belanja</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-2 flex-1">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tanggal</Label>
          <div className="relative">
            <Input
              type="date"
              className="h-12 rounded-2xl bg-white dark:bg-[#1a1614] border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold text-slate-700 dark:text-slate-100 px-6 pr-12 appearance-none shadow-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Supplier</Label>
          <Select value={supplier} onValueChange={setSupplier}>
            <SelectTrigger className="h-12 rounded-2xl bg-white dark:bg-[#1a1614] border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold text-slate-700 dark:text-slate-100 px-6 shadow-sm">
              <SelectValue placeholder="— Pilih Supplier —" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-none shadow-2xl dark:bg-[#1a1614] dark:text-slate-100">
              {SUPPLIERS.map(s => (
                <SelectItem key={s} value={s} className="cursor-pointer py-3 px-4 font-bold rounded-xl focus:bg-[#a66a5e] focus:text-white transition-colors">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-white dark:bg-[#1a1614] rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-none overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[900px] p-8">
              <div className="grid grid-cols-[2fr_120px_100px_150px_1.5fr_50px] gap-4 mb-4 items-center px-4">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Bahan</Label>
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Jumlah</Label>
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Satuan</Label>
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Harga/Unit</Label>
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Kategori</Label>
                <div></div>
              </div>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-[2fr_120px_100px_150px_1.5fr_50px] gap-4 items-center group bg-slate-50/50 dark:bg-slate-900/30 p-2 rounded-[24px] border border-slate-50 dark:border-slate-800/50"
                    >
                      <Input
                        placeholder="cth: Ayam"
                        className="h-11 rounded-xl bg-white dark:bg-slate-950 border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all px-4 font-bold"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-11 rounded-xl bg-white dark:bg-slate-950 border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all text-center font-bold"
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                      />
                      <Select value={item.unit} onValueChange={(val) => updateItem(item.id, 'unit', val)}>
                        <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-950 border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold justify-center">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-2xl dark:bg-slate-900">
                          {UNITS.map(u => (
                            <SelectItem key={u} value={u} className="rounded-lg">{u}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">Rp</span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="h-11 rounded-xl bg-white dark:bg-slate-950 border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all pl-8 pr-3 font-bold"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                        />
                      </div>
                      <Select value={item.category} onValueChange={(val) => updateItem(item.id, 'category', val)}>
                        <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-950 border-none focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-2xl dark:bg-slate-950">
                          {CATEGORIES.map(c => (
                            <SelectItem key={c.name} value={c.name} className="rounded-lg">
                              <span className="flex items-center gap-2">
                                <span>{c.icon}</span>
                                <span className="text-xs">{c.name}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeItem(item.id)}
                        className={`transition-all ${items.length === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10'}`}
                      >
                        <Plus className="w-4 h-4 rotate-45" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <button 
                  type="button"
                  onClick={addItem}
                  className="group flex items-center gap-2 text-sm font-bold text-[#a66a5e] hover:opacity-80 transition-all mt-6 ml-4"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#a66a5e]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  Tambah Baris
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-[#1a1614] rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-none p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Belanja</p>
            <div className="flex items-baseline gap-1">
              <h2 className="text-6xl font-black text-[#e58c73] tracking-tighter">
                {formatIDR(totalCost).replace(',00', '')}
              </h2>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.1em]">{validItemsCount} item valid</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button 
              variant="ghost" 
              className="h-14 rounded-[20px] px-10 font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex-1 md:flex-none"
              onClick={() => navigate('/dashboard')}
            >
              Batal
            </Button>
            <Button 
              className="h-14 rounded-[20px] px-12 bg-[#a66a5e] hover:opacity-90 text-white font-black shadow-2xl shadow-[#a66a5e]/20 flex items-center gap-3 transition-all active:scale-95 flex-1 md:flex-none"
              onClick={handleSubmit}
            >
              <Save className="w-5 h-5" />
              Simpan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
