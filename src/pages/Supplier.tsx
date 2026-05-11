import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Store, Phone, MapPin, Notebook, Trash2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MOCK_SUPPLIERS, Supplier as SupplierType } from '@/lib/data';
import { toast } from 'sonner';

export default function Supplier() {
  const [suppliers, setSuppliers] = useState<SupplierType[]>(MOCK_SUPPLIERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const primaryColor = "#a66a5e";

  const handleAddSupplier = () => {
    if (!newSupplier.name) {
      toast.error('Nama Supplier wajib diisi');
      return;
    }

    const supplier: SupplierType = {
      id: Math.random().toString(36).substr(2, 9),
      ...newSupplier,
    };

    setSuppliers([...suppliers, supplier]);
    setIsModalOpen(false);
    setNewSupplier({ name: '', phone: '', address: '', notes: '' });
    toast.success('Supplier baru telah ditambahkan');
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
    toast.success('Supplier telah dihapus');
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏪</span>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight leading-tight">Supplier</h1>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button 
              style={{ backgroundColor: primaryColor }}
              className="hover:opacity-90 text-white rounded-2xl px-6 py-6 h-auto shadow-lg shadow-black/10 flex items-center gap-2 border-none transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span className="font-bold">Tambah Supplier</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-[#1a1614] rounded-[32px] border-none shadow-2xl p-0 overflow-hidden max-w-md">
            <DialogHeader className="p-8 pb-0">
              <DialogTitle className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center justify-between">
                Tambah Supplier Baru
              </DialogTitle>
            </DialogHeader>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Nama Supplier *</Label>
                <Input
                  id="name"
                  placeholder="cth: Pasar Induk"
                  className="bg-slate-50 dark:bg-[#251f1c] border-none rounded-2xl py-6 px-4 text-sm focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold text-slate-700 dark:text-slate-200"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Kontak (HP/WA)</Label>
                <Input
                  id="phone"
                  placeholder="08xx..."
                  className="bg-slate-50 dark:bg-[#251f1c] border-none rounded-2xl py-6 px-4 text-sm focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold text-slate-700 dark:text-slate-200"
                  value={newSupplier.phone}
                  onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Alamat</Label>
                <Textarea
                  id="address"
                  className="bg-slate-50 dark:bg-[#251f1c] border-none rounded-2xl py-4 px-4 text-sm focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold text-slate-700 dark:text-slate-200 min-h-[80px]"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Catatan</Label>
                <Textarea
                  id="notes"
                  className="bg-slate-50 dark:bg-[#251f1c] border-none rounded-2xl py-4 px-4 text-sm focus:ring-2 focus:ring-[#a66a5e]/20 transition-all font-bold text-slate-700 dark:text-slate-200 min-h-[80px]"
                  value={newSupplier.notes}
                  onChange={(e) => setNewSupplier({ ...newSupplier, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="p-8 pt-0 flex flex-row gap-4">
              <Button
                variant="ghost"
                className="flex-1 rounded-2xl py-6 h-auto font-bold text-slate-500 dark:text-white bg-transparent dark:bg-[#251f1c] hover:bg-slate-100 dark:hover:bg-[#2d2622]"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </Button>
              <Button
                style={{ backgroundColor: primaryColor }}
                className="flex-1 hover:opacity-90 text-white rounded-2xl py-6 h-auto font-bold shadow-lg"
                onClick={handleAddSupplier}
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="bg-white dark:bg-[#1a1614] rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border-none p-8 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 group relative">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-4 flex-1 pr-10">{supplier.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 h-10 w-10 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                onClick={() => handleDeleteSupplier(supplier.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3 mt-2">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#a66a5e] mt-1 shrink-0" />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{supplier.phone || '-'}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#a66a5e] mt-1 shrink-0" />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{supplier.address || '-'}</span>
              </div>
              {supplier.notes && (
                <div className="pt-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-500 italic">{supplier.notes}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 dark:bg-[#1a1614]/50 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800">
          <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-bold">Belum ada daftar supplier.</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Gunakan tombol "Tambah Supplier" untuk mulai mencatat.</p>
        </div>
      )}
    </div>
  );
}
