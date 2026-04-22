import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-900/40 mb-4">
            <Utensils className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">CateringPro</h1>
          <p className="text-slate-400 mt-2">Masuk ke Panel Kendali Dapur</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[32px] overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-white text-2xl font-bold">Selamat Datang!</CardTitle>
            <CardDescription className="text-slate-400">Gunakan akun admin Anda untuk berlanjut.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4">
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cateringpro.com"
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-600"
                  defaultValue="admin@catering.app"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pass" className="text-slate-300">Kata Sandi</Label>
                  <a href="#" className="text-xs text-blue-400 hover:underline">Lupa Sandi?</a>
                </div>
                <Input
                  id="pass"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-600"
                  defaultValue="password"
                />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg mt-4 shadow-lg shadow-blue-900/30">
                Masuk Sekarang
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-slate-500 text-sm">
                Belum punya akun? <a href="#" className="text-blue-400 hover:underline">Daftar Catering Baru</a>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-600 text-xs mt-8">
          © 2026 CateringPro Expense Tracker. Professional Food Service Tools.
        </p>
      </motion.div>
    </div>
  );
}
