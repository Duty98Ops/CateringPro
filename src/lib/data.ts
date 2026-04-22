import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export interface Expense {
  id: string;
  date: string;
  name: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
  total: number;
  category: 'PROTEIN' | 'BUMBU' | 'SEMBAKO' | 'SAYUR' | 'LAINNYA';
}

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', date: format(new Date(), 'yyyy-MM-dd'), name: 'Daging Sapi Wagyu A5', qty: 2, unit: 'kg', pricePerUnit: 725000, total: 1450000, category: 'PROTEIN' },
  { id: '2', date: format(new Date(), 'yyyy-MM-dd'), name: 'Bawang Merah & Putih', qty: 5, unit: 'kg', pricePerUnit: 49000, total: 245000, category: 'BUMBU' },
  { id: '3', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), name: 'Minyak Goreng 20L', qty: 1, unit: 'dus', pricePerUnit: 380000, total: 380000, category: 'SEMBAKO' },
  { id: '4', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), name: 'Sayuran Mix Organik', qty: 10, unit: 'kg', pricePerUnit: 11500, total: 115000, category: 'SAYUR' },
  { id: '5', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), name: 'Beras Pandan Wangi 50kg', qty: 1, unit: 'karung', pricePerUnit: 650000, total: 650000, category: 'SEMBAKO' },
  { id: '6', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), name: 'Ayam Fillet', qty: 10, unit: 'kg', pricePerUnit: 45000, total: 450000, category: 'PROTEIN' },
  { id: '7', date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), name: 'Telur Ayam Broiler', qty: 10, unit: 'kg', pricePerUnit: 28000, total: 280000, category: 'SEMBAKO' },
];

export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
