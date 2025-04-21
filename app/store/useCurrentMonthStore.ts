import { create } from 'zustand';

export const useCurrentMonthStore = create<{
  currentMonth: Date;
  setCurrentMonth: (currentMonth: Date) => void;
}>(set => ({
  currentMonth: new Date(),
  setCurrentMonth: (currentMonth: Date) => set({ currentMonth: currentMonth }),
}));
