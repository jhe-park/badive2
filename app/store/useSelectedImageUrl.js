import { create } from "zustand"

const useSelectedImageUrl = create((set) => ({
  selectedImageUrl: "", 
  setSelectedImageUrl: (selectedImageUrl) => set({ selectedImageUrl }),
}))

export default useSelectedImageUrl