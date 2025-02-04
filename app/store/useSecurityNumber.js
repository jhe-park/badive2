import { create } from "zustand"

const useSecurityNumber = create((set) => ({
  securityNumber: "", 
  setSecurityNumber: (securityNumber) => set({ securityNumber }),
}))

export default useSecurityNumber