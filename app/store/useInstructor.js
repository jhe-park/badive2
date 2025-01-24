import { create } from "zustand"

const useInstructor = create((set) => ({
  instructor: "정은지 강사",
  setInstructor: (instructor) => set({ instructor }),
}))

export default useInstructor