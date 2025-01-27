import { create } from "zustand"

const useStep = create((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
}))

export default useStep