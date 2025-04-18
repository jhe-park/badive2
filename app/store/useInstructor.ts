import { create } from 'zustand';

interface InstructorState {
  instructor: string;
  setInstructor: (instructor: string) => void;
}

const useInstructor = create<InstructorState>(set => ({
  instructor: '정은지 강사',
  setInstructor: (instructor: string) => set({ instructor }),
}));

export default useInstructor;

// import { create } from "zustand"

// const useInstructor = create((set) => ({
//   instructor: "정은지 강사",
//   setInstructor: (instructor) => set({ instructor }),
// }))

// export default useInstructor
