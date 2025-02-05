import { create } from 'zustand';

export const useSelectedSlot = create((set) => ({
  selectedSlot: null,
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
}));

