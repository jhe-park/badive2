import { create } from 'zustand';

export type TSelectedResult = {
  instructor: string;
  program: string;
  noParticipants: number;
  date: Date[];
  instructor_id: number;
  program_id: number;
  slot_id: number[];
  slot_start_time: string;
  slot_end_time: string;
  slot_date: string;
  slot_current_participants: number | null;
  slot_max_participants: number | null;
  price: number;
  totalPrice: number;
  isAgree: boolean;
  region: string | null;
  category: string | null;
};

export const selectedResultInitializedValueWhenChangeProgram = {
  noParticipants: 1,
  date: [],
  instructor_id: null,
  instructor: '',
  program_id: null,
  slot_id: null,
  slot_start_time: '',
  slot_end_time: '',
  slot_date: '',
  slot_current_participants: null,
  slot_max_participants: null,
  price: null,
  totalPrice: 0,
  isAgree: false,
  region: null,
  category: null,
};

export const selectedResultInitializedValueWhenChangeCategory = {
  instructor_id: null,
  instructor: '',
  region: null,
  program: '',
  program_id: null,
  date: [],
  slot_id: null,
  slot_start_time: '',
  slot_end_time: '',
  slot_date: '',
  slot_current_participants: null,
  slot_max_participants: null,
  price: null,
  totalPrice: 0,
  isAgree: false,
};

export const selectedResultInitializedValue = {
  category: null,
  program: '',
  program_id: null,
  region: null,
  instructor_id: null,
  instructor: '',
  noParticipants: 1,
  date: [],
  slot_id: null,
  slot_start_time: '',
  slot_end_time: '',
  slot_date: '',
  slot_current_participants: null,
  slot_max_participants: null,
  price: null,
  totalPrice: 0,
  isAgree: false,
};

export const useSelectedResult = create<{
  selectedResult: TSelectedResult;
  setSelectedResult: (result: TSelectedResult) => void;
}>(set => ({
  selectedResult: {
    ...selectedResultInitializedValue,
  },
  setSelectedResult: result => set({ selectedResult: result }),
}));
