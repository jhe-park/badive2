import { create } from "zustand";

export type TSelectedResult = {
  instructor: string;
  program: string;
  noParticipants: number;
  date: Date[];
  instructor_id: number;
  program_id: number;
  // slot_id: string;
  slot_id: number[];
  slot_start_time: string;
  slot_end_time: string;
  slot_date: string;
  // price: string;
  price: number;
  totalPrice: number;
  isAgree: boolean;
};

export const useSelectedResult = create<{
  selectedResult: TSelectedResult;
  setSelectedResult: (result: any) => void;
}>((set) => ({
  selectedResult: {
    instructor: "",
    program: "",
    noParticipants: 1,
    date: [],
    instructor_id: null,
    program_id: null,
    // instructor_id: "",
    // program_id: "",
    slot_id: null,
    slot_start_time: "",
    slot_end_time: "",
    slot_date: "",
    price: null,
    totalPrice: 0,
    isAgree: false,
  },
  setSelectedResult: (result) => set({ selectedResult: result }),
}));
