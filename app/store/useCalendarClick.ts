import { create } from "zustand"

// 캘린더 클릭 상태를 위한 인터페이스 정의
interface CalendarClickState {
  calendarClick: number;
  setCalendarClick: () => void;
}

const useCalendarClick = create<CalendarClickState>((set) => ({
  calendarClick: 0,
  setCalendarClick: () => set((state) => ({ 
    calendarClick: state.calendarClick + 1 
  })),
}))

export default useCalendarClick

// import { create } from "zustand"

// const useCalendarClick = create((set) => ({
//   calendarClick: 0,
//   setCalendarClick: () => set((state) => ({ 
//     calendarClick: state.calendarClick + 1 
//   })),
// }))

// export default useCalendarClick