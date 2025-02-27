import { create } from "zustand"

const useCalendarClick = create((set) => ({
  calendarClick: 0,
  setCalendarClick: () => set((state) => ({ 
    calendarClick: state.calendarClick + 1 
  })),
}))

export default useCalendarClick