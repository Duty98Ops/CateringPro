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
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Profil Pengguna</h1>
        <p className="text-slate-500 mt-1">Atur informasi akun dan identitas Catering Anda.</p>
      </div>

      <Card className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 right-1 bg-blue-600 p-1.5 rounded-full border-2 border-white shadow-lg cursor-pointer hover:bg-blue-700 transition-colors">
                <svg className="w-3" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              </div>
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-slate-800">{user.name}</CardTitle>
          <CardDescription className="text-slate-500 font-medium">{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="space-y-3">
              <Label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</Label>
              <Input
                id="name"
                defaultValue={user.name}
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alamat Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="pass" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kata Sandi Baru</Label>
              <Input
                id="pass"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl focus:ring-blue-500 border-slate-200"
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 mt-4 font-bold">
              Perbarui Profil
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
