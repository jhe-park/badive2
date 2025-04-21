'use client';

import useCalenderFetchStatusStore from '@/app/store/useCalenderFetchStatusStore';
import { useCurrentMonthStore } from '@/app/store/useCurrentMonthStore';
import { useSelectedDateStore } from '@/app/store/useSelectedDateStore';
import { LECTURE_CATEGORY } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBinstructor, TypeDBprofile, TypeDBprogram } from '@/utils/supabase/dbTableTypes';
import { getFilteredTimeSlots } from '@/utils/supabase/getFilteredTimeSlots';
import { getTimeSlots } from '@/utils/supabase/getTimeSlots';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

export type TFetchedTimeSlot = {
  start_time: string;
  max_participants: number;
  current_participants: number;
  program_id: number;
  time_slot_id: number;
};

type TProps = {
  selectedInstructor: TypeDBinstructor;
  selectedInstructorProfile: TypeDBprofile;
  selectedLectureCategory: (typeof LECTURE_CATEGORY)[number] | undefined;
  changeTimeSlots: ({ newTimeSlots }: { newTimeSlots: TFetchedTimeSlot[] }) => void;
  programs: TypeDBprogram[];
  changeSelectedDate: ({ newDate }: { newDate: Date }) => void;
  selectedDate: Date | undefined;
};

export const CalendarComponentForAdminAndExpert: React.FC<TProps> = ({
  selectedInstructor,
  selectedInstructorProfile,
  selectedLectureCategory,
  changeTimeSlots,
  programs,
  changeSelectedDate,
  selectedDate,
}) => {
  const { calendarFetchStatus, setCalendarFetch } = useCalenderFetchStatusStore();

  const supabase = createTypedSupabaseClient();

  // const [currentMonth, setCurrentMonth] = useState(new Date());
  const { currentMonth, setCurrentMonth } = useCurrentMonthStore();
  const { globalSelectedDate, setGlobalSelectedDate } = useSelectedDateStore();

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newDate);
    setGlobalSelectedDate(null);
  };

  const handlePrevMonth = async () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(newDate);
    setGlobalSelectedDate(null);
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  return (
    <div className={`order-2 col-span-1 flex h-full flex-col items-center justify-center gap-y-2 md:order-1 md:gap-y-0`}>
      <div className="flex w-full items-center justify-between md:mb-4 lg:pt-[0px]">
        <button onClick={handlePrevMonth} className="flex items-center justify-center gap-x-2 rounded-full p-2 transition hover:bg-gray-200">
          <ChevronLeft className="text-[20px] font-bold md:text-9xl" />
          <span className="text-[20px] sm:text-[32px]">이전달</span>
        </button>
        <div className="my-6 flex flex-col items-center justify-center border-b-1.5 border-solid border-black">
          <div className="text-[25px] font-bold sm:text-[32px]">{dayjs(currentMonth).format('YYYY.MM')}</div>
        </div>

        <button onClick={handleNextMonth} className="flex items-center justify-center gap-x-2 rounded-full p-2 transition hover:bg-gray-200">
          <span className="text-[20px] sm:text-[32px]">다음달</span>
          <ChevronRight className="text-4xl font-bold md:text-9xl" />
        </button>
      </div>
      <div className="grid w-full grid-cols-7 gap-0 gap-y-2 rounded-lg border-1 border-gray-300 pb-6 pt-0 sm:gap-y-6 md:gap-y-0 md:p-6">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`flex h-16 w-full items-center justify-center text-center text-[25px] font-bold sm:text-[32px] ${index === 0 ? 'text-red-500' : ''}`}
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const currentDateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPastDateOrToday = currentDateObj <= today;
          const isSelected = selectedDate && selectedDate.getTime() === currentDateObj.getTime();

          return (
            <div
              key={day}
              className={cn(
                // h-8
                `flex w-full items-center justify-center text-center font-freesentationVF text-[25px] font-[400] transition sm:py-0 sm:text-[32px] md:h-16 md:py-0`,
                isPastDateOrToday || selectedInstructorProfile == null || selectedLectureCategory == null
                  ? 'cursor-not-allowed text-gray-300'
                  : 'cursor-pointer hover:bg-gray-200',
                isSelected && 'rounded-l-lg rounded-r-lg bg-blue-500 px-2 text-white',
              )}
              onClick={async e => {
                if (isPastDateOrToday || selectedInstructorProfile == null || selectedLectureCategory == null) {
                  e.preventDefault();
                  return;
                }

                setCalendarFetch('CALENDAR_FETCH_WORK_IN_PROGRESS');

                changeSelectedDate({ newDate: currentDateObj });

                const { count, error, timeSlots } = await getTimeSlots({ supabase, date: currentDateObj, instructor: selectedInstructor });

                console.log('timeSlots.length');

                console.log(timeSlots.length);

                // console.log();
                console.log({
                  programs,
                  selectedLectureCategory,
                  selectedInstructor,
                  timeSlots,
                });

                const filteredTimeSlots = getFilteredTimeSlots({
                  programs,
                  selectedLectureCategory,
                  selectedInstructor,
                  timeSlots,
                });

                console.log('filteredTimeSlots.length');
                console.log(filteredTimeSlots.length);

                changeTimeSlots({ newTimeSlots: filteredTimeSlots });
                setCalendarFetch('CALENDAR_FETCH_COMPLETED');
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};
