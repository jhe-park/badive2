import { create } from 'zustand';

type TCalendarFetchStatus = 'CALENDAR_FETCH_READY' | 'CALENDAR_FETCH_WORK_IN_PROGRESS' | 'CALENDAR_FETCH_COMPLETED' | 'CALENDAR_FETCH_ERROR';

const useCalenderFetchStatusStore = create<{
  calendarFetchStatus: TCalendarFetchStatus;
  setCalendarFetch: (arg: TCalendarFetchStatus) => void;
}>(set => ({
  calendarFetchStatus: 'CALENDAR_FETCH_READY',
  setCalendarFetch: (info: TCalendarFetchStatus) => {
    return set({ calendarFetchStatus: info });
  },
}));

export default useCalenderFetchStatusStore;
