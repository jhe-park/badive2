import { create } from 'zustand';

export const useSelectedResult = create((set) => ({
  selectedResult: {instructor:"",program:"",noParticipants:1,date:[],instructor_id:"",program_id:"",slot_id:"",slot_start_time:"",slot_end_time:"",slot_date:"",price:"",totalPrice:0,isAgree:false},
  setSelectedResult: (result) => set({ selectedResult: result }),
}));

