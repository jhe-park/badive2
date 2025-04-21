import { create } from 'zustand';

export const useSelectedDateStore = create<{
  globalSelectedDate: Date | null;
  setGlobalSelectedDate: (currentMonth: Date) => void;
}>(set => ({
  globalSelectedDate: null,
  setGlobalSelectedDate: (currentMonth: Date | null) => set({ globalSelectedDate: currentMonth }),
}));
