import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export interface Expense {
  id: string;
  date: string;
  name: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
  total: number;
}

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', date: format(new Date(), 'yyyy-MM-dd'), name: 'Ayam Fillet', qty: 10, unit: 'kg', pricePerUnit: 45000, total: 450000 },
  { id: '2', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), name: 'Beras Pandan Wangi', qty: 50, unit: 'kg', pricePerUnit: 14000, total: 700000 },
  { id: '3', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), name: 'Minyak Goreng Bimoli', qty: 20, unit: 'liter', pricePerUnit: 18000, total: 360000 },
  { id: '4', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), name: 'Bawang Merah', qty: 5, unit: 'kg', pricePerUnit: 35000, total: 175000 },
  { id: '5', date: format(subDays(new Date(), 4), 'yyyy-MM-dd'), name: 'Bawang Putih', qty: 5, unit: 'kg', pricePerUnit: 30000, total: 150000 },
  { id: '6', date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), name: 'Cabai Merah Keriting', qty: 2, unit: 'kg', pricePerUnit: 40000, total: 80000 },
  { id: '7', date: format(subDays(new Date(), 6), 'yyyy-MM-dd'), name: 'Daging Sapi Has Dalam', qty: 5, unit: 'kg', pricePerUnit: 120000, total: 600000 },
  { id: '8', date: format(subDays(new Date(), 7), 'yyyy-MM-dd'), name: 'Telur Ayam Broiler', qty: 10, unit: 'kg', pricePerUnit: 28000, total: 280000 },
];

export const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
