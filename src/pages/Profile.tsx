import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Profile() {
  const user = {
    name: 'Admin Catering Dapur Rasa',
    email: 'admin@dapurrasa.id',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profil berhasil diperbarui!');
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">Profil Pengguna</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Atur informasi akun dan identitas Catering Anda.</p>
      </div>

      <Card className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-none overflow-hidden">
        <div className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800 p-12 text-center relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="mb-6 flex justify-center relative z-10">
            <div className="relative group">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-2xl transition-transform group-hover:scale-105 duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg cursor-pointer hover:bg-blue-700 transition-all hover:scale-110 active:scale-95">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path d="M12 4v16m8-8H4" /></svg>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight relative z-10">{user.name}</h2>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mt-1 relative z-10">{user.email}</p>
        </div>
        <CardContent className="p-12">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleUpdate}>
            <div className="space-y-3">
              <Label htmlFor="name" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Nama Lengkap</Label>
              <Input
                id="name"
                defaultValue={user.name}
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Alamat Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100"
              />
            </div>
            <div className="space-y-3 col-span-1 md:col-span-2">
              <Label htmlFor="pass" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Kata Sandi Baru</Label>
              <Input
                id="pass"
                type="password"
                placeholder="••••••••"
                className="h-14 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all px-6 font-bold text-slate-700 dark:text-slate-100"
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-center pt-6">
              <Button type="submit" className="h-14 rounded-2xl px-16 bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-200 dark:shadow-blue-900/20 transition-all active:scale-95 w-full md:w-auto">
                Perbarui Profil
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
