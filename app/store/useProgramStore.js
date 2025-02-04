import { create } from 'zustand'

export const useProgramStore = create((set) => ({
  programStore : [],
  setProgramStore: (programStore) => set({ programStore }),
}))


