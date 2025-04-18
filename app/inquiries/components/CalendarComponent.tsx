'use client';

import useCalendarClick from '@/app/store/useCalendarClick';
import { useProgramStore } from '@/app/store/useProgramStore';
import { useSelectedResult } from '@/app/store/useSelectedResult';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBreservation, TypeDBTimeSlotJoined } from '@/utils/supabase/dbTableTypes';
import { getMonthlySchedule } from '@/utils/supabase/getMonthlySchedule';
import { getWholeMonthlyDate } from '@/utils/supabase/getWholeMonthlyDate';
import { Checkbox } from '@heroui/react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const MAPPER_FROM_NUMBER_TO_WEEKDAY = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

type TProps = {
  isSelectProgram: boolean;
  setIsSelectProgram: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectInstructor: boolean;
  setIsSelectInstructor: React.Dispatch<React.SetStateAction<boolean>>;
  userReservations: TypeDBreservation[];
  setSelectedImageUrl;
};

const CalendarComponent: React.FC<TProps> = ({ isSelectProgram, isSelectInstructor, setSelectedImageUrl }) => {
  const supabase = createTypedSupabaseClient();
  const refForCheckbox = useRef<HTMLInputElement>(null);
  const [monthlyTimeSlots, setMonthlyTimeSlots] = useState<TypeDBTimeSlotJoined[]>([]);

  const monthlyTimeSlotsSorted = monthlyTimeSlots?.toSorted((a, b) => parseInt(a.start_time) - parseInt(b.start_time)) ?? [];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const { programStore } = useProgramStore();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { calendarClick, setCalendarClick } = useCalendarClick();

  useEffect(() => {
    setupMonthlyTimeSlots({ newDate: new Date() });
  }, [isSelectInstructor]);

  useEffect(() => {
    if (!selectedResult?.date) {
      setSelectedDate(null);
    }
  }, [selectedResult?.date]);

  useEffect(() => {
    if (selectedResult?.program) {
      const program = programStore.find(item => item.title === selectedResult.program);
      if (program?.images) {
        setSelectedImageUrl(program.images);
      }
    }
  }, [selectedResult, programStore]);

  const setupMonthlyTimeSlots = async ({ newDate }: { newDate: Date }) => {
    const allMonthlyDays = getWholeMonthlyDate({ date: newDate });
    const monthlyTimeSlots = await getMonthlySchedule({
      selectedResult,
      supabase,
      allMonthDays: allMonthlyDays,
    });

    setMonthlyTimeSlots(monthlyTimeSlots);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
    setupMonthlyTimeSlots({ newDate });
  };

  const handlePrevMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
    setupMonthlyTimeSlots({ newDate });
  };

  const handleDateSelect = day => {
    // setCalendarClick(calendarClick + 1);
    setCalendarClick();
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    setSelectedDate({ start: selectedDate, end: selectedDate });

    const dateList = [selectedDate];

    const newSelectedResult = {
      ...selectedResult,
      date: dateList,
    };

    setSelectedResult(newSelectedResult);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const findSelectedProgram = () => {
    const selectedProgram = programStore.find(item => item.title === selectedResult?.program && item.instructor_id.name === selectedResult?.instructor);
    if (selectedProgram) {
      if (selectedProgram?.id && selectedProgram?.instructor_id?.id) {
        if (selectedResult?.program_id !== selectedProgram.id || selectedResult?.instructor_id !== selectedProgram.instructor_id.id) {
          setSelectedResult({
            ...selectedResult,
            program_id: selectedProgram.id,
            instructor_id: selectedProgram.instructor_id.id,
          });
        }
      }
    }
  };

  useEffect(() => {
    findSelectedProgram();
  }, [selectedResult?.program, selectedResult?.instructor]);

  const selectSlot = ({ slot }: { slot: TypeDBTimeSlotJoined }) => {
    const selectedDateStart = selectedDate.start;

    const selectedWeekday = MAPPER_FROM_NUMBER_TO_WEEKDAY[selectedDateStart.getDay()];
    const formattedDate = `${dayjs(selectedDateStart).format('MM/DD')}(${selectedWeekday})`;

    setSelectedResult({
      ...selectedResult,
      slot_id: [slot.id],
      slot_start_time: slot.start_time,
      slot_end_time: slot.end_time,
      slot_date: formattedDate,
      slot_current_participants: slot.current_participants,
      slot_max_participants: slot.max_participants,
      price: slot.program_id.price,
      totalPrice: slot.program_id.price * selectedResult.noParticipants,
    });
  };

  const selectedDateTimeSlots =
    selectedDate == null
      ? []
      : monthlyTimeSlotsSorted.filter(slot => {
          if (slot.start_time === '' || slot.start_time == null) {
            return false;
          }
          if (dayjs(selectedDate.start).format('YYYY-MM-DD') !== slot.date) return false;
          return true;
        });

  console.log('selectedDateTimeSlots');
  console.log(selectedDateTimeSlots);

  const selectedDateTimeSlotsAM = selectedDateTimeSlots.filter(slot => {
    if (slot.start_time < '12:00') {
      return true;
    } else return false;
  });

  const selectedDateTimeSlotsPM = selectedDateTimeSlots.filter(slot => {
    if (slot.start_time >= '12:00') {
      return true;
    } else return false;
  });

  if (!isSelectProgram || !isSelectInstructor) {
    return <div className={`order-2 md:order-1 col-span-1 flex flex-col items-center justify-center gap-y-2 md:gap-y-12 h-full`}></div>;
  }

  return (
    <div className={`order-2 md:order-1 col-span-1 flex flex-col items-center justify-center gap-y-2 md:gap-y-12 h-full`}>
      <div className="flex justify-between items-center md:mb-4 w-full lg:pt-[0px]">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2">
          <ChevronLeft className="text-4xl md:text-9xl font-bold" />
          <span className="text-[20px] lg:text-[32px] md:text-2xl">이전달</span>
        </button>
        <div
          //
          className="flex flex-col justify-center border-b-1.5 border-solid border-black items-center my-6"
        >
          <div className="font-[700] text-[20px] lg:text-[32px] md:text-3xl  ">{dayjs(currentDate).format('YYYY.MM')}</div>
        </div>

        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2">
          <span className="text-[20px] lg:text-[32px] md:text-2xl">다음달</span>
          <ChevronRight className="text-4xl md:text-9xl font-bold" />
        </button>
      </div>
      <div className="mb-6 md:mb-0 lg:mb-0 grid grid-cols-7 gap-0 gap-y-2 lg:gap-y-0 w-full border-1 px-0 pt-0 pb-6 md:p-6 border-gray-300 rounded-lg h-[306px] lg:h-[498px]">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`font-[700] text-[25px]  lg:text-[32px] md:text-3xl text-center h-16 flex items-center justify-center w-full ${index === 0 ? 'text-red-500' : ''}`}
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
          const isPastDate = currentDateObj <= today;
          const isSelected = selectedDate && selectedDate.start <= currentDateObj && selectedDate.end >= currentDateObj;
          const isValidDate = monthlyTimeSlotsSorted.some(slot => parseInt(slot.date.split('-').at(-1)) === day);

          return (
            <div
              key={day}
              className={cn(
                `text-center text-[25px] lg:text-[32px] md:text-3xl w-full h-8 md:h-16 flex items-center justify-center transition`,
                isPastDate || !isValidDate ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200',
                isSelected && 'bg-blue-500 text-white rounded-l-lg rounded-r-lg px-2',
              )}
              onClick={() => {
                if (!isPastDate) {
                  handleDateSelect(day);
                }
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
      {selectedDate?.start && selectedDateTimeSlotsAM.length > 0 && (
        <div className="flex flex-col gap-4 flex-wrap w-full px-0">
          <div className="py-1 text-[20px]">오전</div>
          <div className="flex gap-4 flex-wrap">
            {selectedDateTimeSlotsAM.map(slot => {
              slot.current_participants;
              return (
                <div key={slot.unique_id} className="flex flex-col items-center gap-1">
                  <Badge
                    variant={'outline'}
                    className={cn(
                      'text-[18px] md:text-[20px] border-[#7A7A7A] font-normal py-2 px-7 cursor-pointer',
                      selectedResult?.slot_id?.at(0) === slot.id && 'bg-btnActive text-white',
                      slot.max_participants === slot.current_participants && 'bg-[#7A7A7A] cursor-not-allowed',
                    )}
                    onClick={() => {
                      if (slot.max_participants === slot.current_participants) {
                        return;
                      }
                      if (slot.max_participants < selectedResult.noParticipants + slot.current_participants) {
                        toast.error('예약인원이 초과되었습니다. 예약인원을 줄여주세요.');
                        return;
                      }

                      selectSlot({ slot });
                    }}
                  >
                    {slot.start_time}
                  </Badge>
                  <div className="border-solid border-1 border-gray text-btnActive w-fit px-2">
                    {slot.current_participants}/{slot.max_participants}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedDate?.start && selectedDateTimeSlotsPM.length > 0 && (
        <div className="flex flex-col gap-4 flex-wrap w-full px-0">
          <div className="py-0 text-[20px]">오후</div>
          <div className="flex gap-4 flex-wrap">
            {selectedDateTimeSlotsPM.map(slot => {
              const formattedHour = parseInt(slot.start_time.split(':').at(0)) - 12;

              return (
                <div key={slot.unique_id} className="flex flex-col items-center gap-1">
                  <Badge
                    variant={'outline'}
                    className={cn(
                      'text-[18px] md:text-[20px] border-[#7A7A7A] font-normal py-2 px-7 cursor-pointer',
                      selectedResult?.slot_id?.at(0) === slot.id && 'bg-btnActive text-white',
                      slot.max_participants === slot.current_participants && 'bg-[#7A7A7A] cursor-not-allowed',
                    )}
                    // className={cn('font-normal py-2 px-7 cursor-pointer', selectedResult?.slot_id?.at(0) === slot.id && 'bg-red-500')}
                    onClick={() => {
                      if (slot.max_participants === slot.current_participants) {
                        return;
                      }
                      if (slot.max_participants < selectedResult.noParticipants + slot.current_participants) {
                        alert('예약인원이 초과되었습니다. 예약인원을 줄여주세요.');
                        return;
                      }
                      selectSlot({ slot });
                    }}
                  >
                    {`${formattedHour}:00`}
                  </Badge>
                  <div className="border-solid border-1 border-gray text-btnActive w-fit px-2">
                    {slot.current_participants}/{slot.max_participants}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedResult?.slot_date && (
        <div className="pt-6 lg:pt-0 w-full lg:w-full h-full items-center justify-start gap-y-6 flex flex-col">
          {/* h-16 */}
          <div className="w-full flex flex-col items-center justify-center border-2 border-[#0077B6] rounded-lg px-2 py-2">
            <div className="text-sm md:text-3xl">{selectedResult.program}</div>
            <div className="pt-1 text-[16px] sm:text-[16px] md:text-[18px]">
              {selectedResult?.slot_date} {selectedResult?.slot_start_time} · {selectedResult?.instructor}
            </div>
          </div>
          <div
            onClick={() => {
              refForCheckbox.current?.click();
            }}
            className=" cursor-pointer flex flex-col  items-center justify-center gap-y-2 text-sm md:text-xl text-[12px] lg:text-[18px]"
          >
            <div className="text-center flex items-center gap-2">
              <div className="">※위 내용 일정으로 예약을 신청하시겠습니까?</div>
              <div className="relative lg:top-[2px]">
                <Checkbox
                  ref={refForCheckbox}
                  size="lg"
                  isSelected={selectedResult?.isAgree}
                  onChange={() => {
                    const currentIsAgree = selectedResult?.isAgree || false;
                    setSelectedResult({
                      ...selectedResult,
                      isAgree: !currentIsAgree,
                    });
                  }}
                ></Checkbox>
              </div>
            </div>
            <p className="text-center">(하단 예약 주의사항과 환불 규정을 꼭 확인 후 결제해 주시기 바랍니다.</p>
            <p className="text-center">예약 일정은 강사님과 조율 후 변동될 수 있습니다. )</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
