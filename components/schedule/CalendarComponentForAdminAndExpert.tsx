'use client';

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
  const supabase = createTypedSupabaseClient();

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const handlePrevMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className={`order-2 md:order-1 col-span-1 flex flex-col items-center justify-center gap-y-2 md:gap-y-0 h-full`}>
      <div className="flex justify-between items-center md:mb-4 w-full lg:pt-[0px]">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2">
          <ChevronLeft className="text-[20px] md:text-9xl font-bold" />
          <span className="text-[20px] sm:text-[32px]">이전달</span>
        </button>
        <div className="flex flex-col justify-center border-b-1.5 border-solid border-black items-center my-6">
          <div className="text-[25px] sm:text-[32px] font-bold">{dayjs(currentDate).format('YYYY.MM')}</div>
        </div>

        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2">
          <span className="text-[20px] sm:text-[32px]">다음달</span>
          <ChevronRight className="text-4xl md:text-9xl font-bold" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0 gap-y-2 sm:gap-y-6 md:gap-y-0 w-full border-1 pt-0 pb-6 md:p-6  border-gray-300 rounded-lg">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`font-bold text-[25px] sm:text-[32px] text-center h-16 flex items-center justify-center w-full ${index === 0 ? 'text-red-500' : ''}`}
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const currentDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPastDateOrToday = currentDateObj <= today;
          const isSelected = selectedDate && selectedDate.getTime() === currentDateObj.getTime();

          return (
            <div
              key={day}
              className={cn(
                // h-8
                `font-freesentationVF text-center text-[25px] sm:text-[32px] w-full md:h-16 sm:py-0 md:py-0 flex items-center justify-center transition font-[400]`,
                isPastDateOrToday || selectedInstructorProfile == null || selectedLectureCategory == null
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-gray-200',
                isSelected && 'bg-blue-500 text-white rounded-l-lg rounded-r-lg px-2',
              )}
              onClick={async e => {
                if (isPastDateOrToday || selectedInstructorProfile == null || selectedLectureCategory == null) {
                  e.preventDefault();
                  return;
                }

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
