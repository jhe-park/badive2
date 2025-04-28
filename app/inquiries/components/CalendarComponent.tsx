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
  }, [selectedResult?.instructor?.length > 0 && typeof selectedResult?.instructor_id === 'number']);

  useEffect(() => {
    if (!selectedResult?.date || selectedResult?.date.length === 0) {
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
    return <div className={`order-2 col-span-1 flex h-full flex-col items-center justify-center gap-y-2 md:order-1 md:gap-y-12`}></div>;
  }

  return (
    <div className={`order-2 col-span-1 flex h-full flex-col items-center justify-center gap-y-2 md:order-1 md:gap-y-12`}>
      <div className="flex w-full items-center justify-between md:mb-4 lg:pt-[0px]">
        <button
          onClick={() => {
            setMonthlyTimeSlots([]);
            setTimeout(() => {
              handlePrevMonth();
            }, 100);
          }}
          className="flex items-center justify-center gap-x-2 rounded-full p-2 transition hover:bg-gray-200"
        >
          <ChevronLeft className="text-4xl font-bold md:text-9xl" />
          <span className="text-[20px] md:text-2xl lg:text-[32px]">이전달</span>
        </button>
        <div className="my-6 flex flex-col items-center justify-center border-b-1.5 border-solid border-black">
          <div className="text-[20px] font-[700] md:text-3xl lg:text-[32px]">{dayjs(currentDate).format('YYYY.MM')}</div>
        </div>

        <button
          onClick={() => {
            setMonthlyTimeSlots([]);
            setTimeout(() => {
              handleNextMonth();
            }, 100);
          }}
          className="flex items-center justify-center gap-x-2 rounded-full p-2 transition hover:bg-gray-200"
        >
          <span className="text-[20px] md:text-2xl lg:text-[32px]">다음달</span>
          <ChevronRight className="text-4xl font-bold md:text-9xl" />
        </button>
      </div>
      <div className="mb-6 grid h-[306px] w-full grid-cols-7 gap-0 gap-y-2 rounded-lg border-1 border-gray-300 px-0 pb-6 pt-0 md:mb-0 md:p-6 lg:mb-0 lg:h-[498px] lg:gap-y-0">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`flex h-16 w-full items-center justify-center text-center text-[25px] font-[700] md:text-3xl lg:text-[32px] ${index === 0 ? 'text-red-500' : ''}`}
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
                `flex h-8 w-full items-center justify-center text-center text-[25px] transition md:h-16 md:text-3xl lg:text-[32px]`,
                isPastDate || !isValidDate ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer hover:bg-gray-200',
                isSelected && 'rounded-l-lg rounded-r-lg bg-blue-500 px-2 text-white',
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
        <div className="flex w-full flex-col flex-wrap gap-4 px-0">
          <div className="py-1 text-[20px]">오전</div>
          <div className="flex flex-wrap gap-4">
            {selectedDateTimeSlotsAM.map(slot => {
              slot.current_participants;
              return (
                <div key={slot.unique_id} className="flex flex-col items-center gap-1">
                  <Badge
                    variant={'outline'}
                    className={cn(
                      'cursor-pointer border-[#7A7A7A] px-7 py-2 text-[18px] font-normal md:text-[20px]',
                      selectedResult?.slot_id?.at(0) === slot.id && 'bg-btnActive text-white',
                      slot.max_participants === slot.current_participants && 'cursor-not-allowed bg-[#7A7A7A]',
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
                  <div className="border-gray w-fit border-1 border-solid px-2 text-btnActive">
                    {slot.current_participants}/{slot.max_participants}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedDate?.start && selectedDateTimeSlotsPM.length > 0 && (
        <div className="flex w-full flex-col flex-wrap gap-4 px-0">
          <div className="py-0 text-[20px]">오후</div>
          <div className="flex flex-wrap gap-4">
            {selectedDateTimeSlotsPM.map(slot => {
              const formattedHour = parseInt(slot.start_time.split(':').at(0)) - 12;

              return (
                <div key={slot.unique_id} className="flex flex-col items-center gap-1">
                  <Badge
                    variant={'outline'}
                    className={cn(
                      'cursor-pointer border-[#7A7A7A] px-7 py-2 text-[18px] font-normal md:text-[20px]',
                      selectedResult?.slot_id?.at(0) === slot.id && 'bg-btnActive text-white',
                      slot.max_participants === slot.current_participants && 'cursor-not-allowed bg-[#7A7A7A]',
                    )}
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
                  <div className="border-gray w-fit border-1 border-solid px-2 text-btnActive">
                    {slot.current_participants}/{slot.max_participants}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedResult?.slot_date && (
        <div className="flex h-full w-full flex-col items-center justify-start gap-y-6 pt-6 lg:w-full lg:pt-0">
          {/* h-16 */}
          <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-[#0077B6] px-2 py-2">
            <div className="text-sm md:text-3xl">{selectedResult.program}</div>
            <div className="pt-1 text-[16px] sm:text-[16px] md:text-[18px]">
              {selectedResult?.slot_date} {selectedResult?.slot_start_time} · {selectedResult?.instructor}
            </div>
          </div>
          <div
            onClick={() => {
              refForCheckbox.current?.click();
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-y-2 text-[12px] md:text-xl lg:text-[18px]"
          >
            <div className="flex items-center gap-2 text-center">
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
