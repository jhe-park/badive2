'use client';

import ClipLoader from 'react-spinners/ClipLoader';
import useExpertStore from '@/app/(expert)/expert/store/useExpertStore';
import { Badge } from '@/components/ui/badge';
import { LECTURE_CATEGORY } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBinstructor, TypeDBprofile, TypeDBprogram } from '@/utils/supabase/dbTableTypes';
import { getFilteredTimeSlots } from '@/utils/supabase/getFilteredTimeSlots';
import { getTimeSlots } from '@/utils/supabase/getTimeSlots';
import { Button, Select, SelectItem } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CalendarComponentForAdminAndExpert, TFetchedTimeSlot } from './CalendarComponentForAdminAndExpert';
import ModalForDetailInformation from './ModalForDetailInformation';
import useCalenderFetchStatusStore from '@/app/store/useCalenderFetchStatusStore';
import { getAllDatesInMonth } from '@/utils/getAllDatesInMonth';
import { useCurrentMonthStore } from '@/app/store/useCurrentMonthStore';
import { useSelectedDateStore } from '@/app/store/useSelectedDateStore';

const DATE_FOR_AVAILABLE_FALSE = [];

const TIME_MAPPING = {
  '오전 05시': '05:00',
  '오전 06시': '06:00',
  '오전 07시': '07:00',
  '오전 08시': '08:00',
  '오전 09시': '09:00',
  '오전 10시': '10:00',
  '오전 11시': '11:00',
  '오후 12시 (점심시간)': '12:00',
  '오후 01시': '13:00',
  '오후 02시': '14:00',
  '오후 03시': '15:00',
  '오후 04시': '16:00',
  '오후 05시': '17:00',
  '오후 06시': '18:00',
  '오후 07시': '19:00',
  '오후 08시': '20:00',
  '오후 09시': '21:00',
  '오후 10시': '22:00',
  '오후 11시': '23:00',
};

const TIME_AM = ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'];
const TIME_PM = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];

export type TReservationsDetail = {
  productName: string;
  studentName: string;
  studentLocation: string;
  birthday: string;
  phone: string;
  status: string;
  participants: number;
};

type TProps = {
  instructors: TypeDBinstructor[];
  instructorMyself?: TypeDBinstructor;
  profiles: TypeDBprofile[];
  everyPrograms: TypeDBprogram[];
  profilesForLoginUser?: TypeDBprofile;
  user: User;
};

export const ScheduleNew: React.FC<TProps> = ({ user, profilesForLoginUser, instructorMyself, instructors, profiles, everyPrograms }) => {
  const { calendarFetchStatus, setCalendarFetch } = useCalenderFetchStatusStore();
  const { currentMonth, setCurrentMonth } = useCurrentMonthStore();

  const pathname = usePathname();
  const router = useRouter();

  const [timeSlotUpdateStatus, setTimeSlotUpdateStatus] = useState<'UPDATE_READY' | 'UPDATE_WORK_IN_PROGRESS'>('UPDATE_READY');

  const { expertInformation, setExpertInformation } = useExpertStore();

  const [selectedLectureCategory, setSelectedLectureCategory] = useState<(typeof LECTURE_CATEGORY)[number] | undefined>('스쿠버다이빙');
  const [selectedInstructor, setSelectedInstructor] = useState<TypeDBinstructor | undefined>(instructorMyself ?? undefined);
  const [selectedInstructorProfile, setSelectedInstructorProfile] = useState<TypeDBprofile | undefined>(profilesForLoginUser ?? undefined);
  const [selectedHHMM, setSelectedHHMM] = useState<string | undefined>();

  const { globalSelectedDate, setGlobalSelectedDate } = useSelectedDateStore();

  const [timeSlots, setTimeSlots] = useState<TFetchedTimeSlot[]>([]);
  const [everyTimeSlotsForDelete, setEveryTimeSlotsForDelete] = useState<TFetchedTimeSlot[]>([]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TFetchedTimeSlot | undefined>();
  const [reservationsDetail, setReservationsDetail] = useState<TReservationsDetail[]>([]);

  const supabase = createTypedSupabaseClient();

  const changeSelectedDate = ({ newDate }: { newDate: Date }) => {
    setGlobalSelectedDate(newDate);
  };

  const changeTimeSlots = ({ newTimeSlots }: { newTimeSlots: TFetchedTimeSlot[] }) => {
    setTimeSlots(newTimeSlots);
  };

  const changeReservationsDetail = ({ reset, newReservationsDetail }: { reset?: boolean; newReservationsDetail?: TReservationsDetail[] }) => {
    if (reset) {
      setReservationsDetail([]);
    } else {
      setReservationsDetail(newReservationsDetail ?? []);
    }
  };

  const resetCalendarDate = () => {
    setGlobalSelectedDate(undefined);
    setTimeSlots([]);
  };

  const getEveryStudentsFromPrograms = async ({ programIds, timeSlotIds }: { programIds: Set<number>; timeSlotIds: Set<number> }) => {
    try {
      const { data: reservations, error } = await supabase
        .from('reservation')
        .select('*')
        .in('time_slot_id', [...timeSlotIds])
        .in('status', ['예약확정', '입금대기']);

      const { data: studentProfiles, error: errorForProfiles } = await supabase
        .from('profiles')
        .select('*')
        .in(
          'id',
          reservations.map(reservation => reservation.user_id),
        );

      const reservationsDetail = studentProfiles.map(studentProfile => {
        const foundReservation = reservations.find(reservation => reservation.user_id === studentProfile.id);

        const foundTimeSlot = timeSlots.find(timeSlot => timeSlot.time_slot_id === foundReservation.time_slot_id);
        if (foundTimeSlot == null) {
          console.error('foundTimeSlot을 찾을 수 없음');
        }

        const foundProgram = everyPrograms.find(program => program.id === foundTimeSlot.program_id);

        if (foundProgram == null) {
          console.error('프로그램을 찾을 수 없음');
        }

        return {
          productName: foundProgram.title,
          studentName: studentProfile.name,
          studentLocation: studentProfile.firstAddress?.split(' ').at(0) ?? '알 수 없음',
          birthday: studentProfile.birth,
          phone: studentProfile.phone,
          status: foundReservation.status,
          participants: foundReservation.participants,
        };
      });

      setReservationsDetail(reservationsDetail);
    } catch (error) {
      console.error(error);
    }
  };

  const addScheduleToDB = async ({ isEveryMonth }: { isEveryMonth?: boolean }) => {
    let filteredPrograms: TypeDBprogram[] | undefined = undefined;

    let isInvalid = false;
    if (selectedInstructor == null) {
      toast.error('강사를 선택해 주세요');
      isInvalid = true;
    }

    if (isEveryMonth === false && globalSelectedDate == null) {
      toast.error('날짜를 선택해 주세요');
      isInvalid = true;
    }

    if (selectedHHMM == null) {
      toast.error('등록할 시간을 선택해 주세요');
      isInvalid = true;
    }

    if (isInvalid) {
      return;
    }

    setTimeSlotUpdateStatus('UPDATE_WORK_IN_PROGRESS');

    switch (selectedLectureCategory) {
      case '스쿠버다이빙':
        filteredPrograms = everyPrograms.filter(program => {
          const isValidCategory = program?.category === selectedLectureCategory || program?.category === '체험다이빙';
          const isValidInstructor = program?.instructor_id === selectedInstructor.id;

          return isValidInstructor && isValidCategory;
        });
        break;

      case '언더워터 댄스':
        filteredPrograms = everyPrograms.filter(program => {
          const isValidCategory = program?.category === selectedLectureCategory || program?.category === '언더워터';
          const isValidInstructor = program?.instructor_id === selectedInstructor.id;

          return isValidInstructor && isValidCategory;
        });
        break;

      case '머메이드':
      case '프리다이빙':
        filteredPrograms = everyPrograms.filter(program => {
          const isValidCategory = program?.category === selectedLectureCategory;
          const isValidInstructor = program?.instructor_id === selectedInstructor.id;

          return isValidInstructor && isValidCategory;
        });
        break;

      default:
        break;
    }

    await Promise.all(
      filteredPrograms.map(async (program, index) => {
        const start_time = selectedHHMM;
        const targetDate = dayjs(globalSelectedDate).format('YYYY-MM-DD');

        if (selectedHHMM == null) {
          return;
        }

        const targetDateArr = isEveryMonth ? getAllDatesInMonth(currentMonth) : [targetDate];

        await Promise.all(
          targetDateArr.map(async targetDate => {
            const uniqueId = `${program.instructor_id}_${program.id}_${targetDate}_${start_time}`;

            try {
              const { data, error, status, statusText } = await supabase
                .from('timeslot')
                .update({
                  available: true,
                })
                .eq('unique_id', uniqueId);

              await supabase.from('timeslot').insert({
                date: targetDate,
                start_time,
                end_time: start_time,
                unique_id: uniqueId,
                program_id: program.id,
                instructor_id: program.instructor_id,
                available: true,
                current_participants: 0,
                max_participants: program.participants,
              });
            } catch (error) {
              toast.error(error);
              console.error(error);
            }
          }),
        );
      }),
    );

    const { count, error, timeSlots: timeSlotsNew } = await getTimeSlots({ supabase, date: globalSelectedDate, instructor: selectedInstructor });

    const filteredTimeSlots = getFilteredTimeSlots({
      programs: everyPrograms,
      selectedLectureCategory,
      timeSlots: timeSlotsNew,
      selectedInstructor,
    });

    changeTimeSlots({ newTimeSlots: filteredTimeSlots });

    setTimeSlotUpdateStatus('UPDATE_READY');

    if (isEveryMonth) {
      toast.success(`${selectedHHMM}시가 ${currentMonth.getMonth() + 1}월달의 모든 날짜에 등록되었습니다.`, {
        autoClose: 6500,
        style: {
          width: '300px',
        },
      });
    }
  };

  const EVERY_TIME_SLOTS_OBJ = {
    '05:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '06:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '07:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '08:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '09:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '10:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '11:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '12:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '13:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '14:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '15:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '16:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '17:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '18:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '19:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '20:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '21:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '22:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '23:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
    '00:00': { max_participants: 0, current_participants: 0, program_ids: new Set<number>(), time_slot_ids: new Set<number>() },
  };

  const everyTimeSlotCalculated = timeSlots.reduce((acc, curr) => {
    const { current_participants, max_participants, start_time } = curr;
    if (acc[curr.start_time]) {
      acc[curr.start_time].max_participants = acc[curr.start_time].max_participants + max_participants;
      acc[curr.start_time].current_participants = acc[curr.start_time].current_participants + current_participants;
      acc[curr.start_time].program_ids.add(curr.program_id);
      acc[curr.start_time].time_slot_ids.add(curr.time_slot_id);
    }
    return acc;
  }, EVERY_TIME_SLOTS_OBJ);

  const deleteTimeSlots = async ({
    timeSlotIds,
    time,
    date,
    timeSlots,
  }: {
    timeSlots: TFetchedTimeSlot[];
    timeSlotIds: number[];
    time: string;
    date: Date;
  }) => {
    const allRequestCompleted = await Promise.all(
      timeSlotIds.map(async timeSlotId => {
        const foundTimeSlot = timeSlots.find(timeslot => timeslot.time_slot_id === timeSlotId);
        const foundProgram = everyPrograms.find(program => program.id === foundTimeSlot.program_id);
        const uniqueId = `${foundProgram.instructor_id}_${foundProgram.id}_${dayjs(date).format('YYYY-MM-DD')}_${foundTimeSlot.start_time}`;

        await supabase
          .from('timeslot')
          .update({
            available: false,
          })
          .eq('unique_id', uniqueId);
      }),
    );

    const { count, error, timeSlots: timeSlotsNew } = await getTimeSlots({ supabase, date, instructor: selectedInstructor });

    const filteredTimeSlots = getFilteredTimeSlots({
      programs: everyPrograms,
      selectedLectureCategory,
      selectedInstructor,
      timeSlots: timeSlotsNew,
    });

    changeTimeSlots({ newTimeSlots: filteredTimeSlots });
  };

  function TimeSlotComponent({ times }: { times: string[] }) {
    return times
      .map(time => {
        const { max_participants, current_participants, program_ids, time_slot_ids } = everyTimeSlotCalculated[time];

        if (max_participants === 0) return;

        return (
          <div className="relative" key={time}>
            {current_participants === 0 && (
              <div className="absolute right-0 top-[-10px]">
                <X
                  onClick={() => {
                    deleteTimeSlots({
                      timeSlotIds: [...time_slot_ids],
                      time,
                      date: globalSelectedDate,
                      timeSlots,
                    });
                  }}
                  className={cn('cursor-pointer rounded-full bg-btnActive px-1 py-1 font-normal text-white')}
                >
                  X
                </X>
              </div>
            )}
            <Badge
              variant={'outline'}
              className={cn('cursor-pointer px-7 py-2 font-normal', selectedTimeSlot?.start_time == time && 'bg-btnActive text-white')}
              key={time}
              onClick={() => {
                getEveryStudentsFromPrograms({ programIds: program_ids, timeSlotIds: time_slot_ids });
              }}
            >
              {time}
            </Badge>
            <div
              onClick={() => {
                getEveryStudentsFromPrograms({ programIds: program_ids, timeSlotIds: time_slot_ids });
              }}
              className="cursor-pointer border-1 border-solid border-black text-center hover:bg-gray-100"
            >
              {current_participants}/{max_participants}
            </div>
          </div>
        );
      })
      .filter(item => item != null);
  }

  const TimeSlotAMComponents = TimeSlotComponent({ times: TIME_AM });

  const TimeSlotPMComponents = TimeSlotComponent({ times: TIME_PM });

  return (
    <>
      <ModalForDetailInformation
        reservationsDetail={reservationsDetail}
        isOpen={reservationsDetail.length > 0}
        onClose={() => {
          changeReservationsDetail({ reset: true });
        }}
        onOpenChange={() => {}}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex-1">
          <div className="flex flex-col items-center justify-center gap-6 pt-[10%]">
            <div className="text-large sm:py-4 sm:text-[40px] md:py-0 md:text-2xl">스케줄</div>
            {!instructorMyself && (
              <div className="flex justify-center">
                <Select
                  className="w-[150px] lg:w-[150px]"
                  onChange={async e => {
                    if (e.target.value == null || e.target.value === '') {
                      setSelectedInstructor(undefined);
                      setSelectedInstructorProfile(undefined);
                    } else {
                      const instructor = JSON.parse(e.target.value) as TypeDBinstructor;
                      setSelectedInstructor(instructor);

                      const foundProfile = profiles.find(profile => profile.email === instructor.email);
                      setSelectedInstructorProfile(foundProfile);
                    }

                    resetCalendarDate();
                  }}
                >
                  {instructors.map(instructor => {
                    return <SelectItem key={JSON.stringify(instructor)}>{instructor.name}</SelectItem>;
                  })}
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LECTURE_CATEGORY.map(category => {
                return (
                  <Badge
                    key={category}
                    variant={'outline'}
                    className={cn(
                      'flex cursor-pointer justify-center px-6 py-2 text-[12px] font-bold sm:px-4 sm:text-[14px] md:px-7',
                      category === selectedLectureCategory && 'bg-btnActive text-white',
                    )}
                    onClick={() => {
                      setSelectedLectureCategory(category);

                      resetCalendarDate();
                    }}
                  >
                    {category}
                  </Badge>
                );
              })}
            </div>
            <div className="flex gap-4 sm:pb-8 sm:pt-8 md:pb-0 md:pt-0">
              <div className="">
                <Select
                  className="w-[200px] text-center lg:w-[200px]"
                  onChange={async e => {
                    setSelectedHHMM(e.target.value);
                  }}
                >
                  {Object.keys(TIME_MAPPING).map(key => {
                    const timeValue = TIME_MAPPING[key];
                    return (
                      <SelectItem key={timeValue} className="text-center">
                        {key}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>

              <div className="">
                <Button
                  onPress={() => {
                    let isForbidden = false;
                    if (selectedLectureCategory == null) {
                      toast.error('강의 카테고리를 선택해 주세요');
                      isForbidden = true;
                    }
                    if (selectedInstructor == null) {
                      toast.error('강사를 선택해 주세요');
                      isForbidden = true;
                    }
                    if (globalSelectedDate == null) {
                      toast.error('달력에서 날짜를 선택해 주세요');
                      isForbidden = true;
                    }

                    if (selectedHHMM == null) {
                      toast.error('등록할 시간을 선택해 주세요');
                      isForbidden = true;
                    }

                    if (isForbidden) {
                      return;
                    }

                    addScheduleToDB({ isEveryMonth: false });
                  }}
                  className="justify-center bg-btnActive text-white hover:text-white data-[hover=true]:text-foreground"
                >
                  등록하기
                </Button>
              </div>
            </div>
            <div className="pt-4">
              <Button
                onPress={() => {
                  addScheduleToDB({ isEveryMonth: true });
                }}
                className="justify-center bg-[#004469] text-white hover:text-white data-[hover=true]:text-foreground"
              >
                일괄 등록하기
              </Button>
            </div>
            {/* <div className="">
              <Button
                onPress={() => {
                  deleteEveryTimeslot();
                }}
                className="justify-center bg-purple-500 text-white hover:text-white data-[hover=true]:text-foreground"
              >
                일괄 삭제하기
              </Button>
            </div> */}
          </div>
        </div>
        <div className="flex-1">
          <div className="">
            <CalendarComponentForAdminAndExpert
              selectedDate={globalSelectedDate}
              changeSelectedDate={changeSelectedDate}
              selectedInstructor={selectedInstructor}
              selectedLectureCategory={selectedLectureCategory}
              selectedInstructorProfile={selectedInstructorProfile}
              changeTimeSlots={changeTimeSlots}
              programs={everyPrograms}
            />
          </div>
        </div>
      </div>
      {calendarFetchStatus !== 'CALENDAR_FETCH_WORK_IN_PROGRESS' && timeSlotUpdateStatus !== 'UPDATE_WORK_IN_PROGRESS' && timeSlots.length > 0 && (
        <div className="">
          {TimeSlotAMComponents.length > 0 && (
            <>
              <div className="">오전</div>
              <div className="flex flex-wrap gap-4">{TimeSlotAMComponents}</div>
            </>
          )}
          {TimeSlotPMComponents.length > 0 && (
            <>
              <div className="pt-12">오후</div>
              <div className="flex flex-wrap gap-4">{TimeSlotPMComponents}</div>
            </>
          )}
          <div className="pt-20"></div>
        </div>
      )}
      {(calendarFetchStatus === 'CALENDAR_FETCH_WORK_IN_PROGRESS' || timeSlotUpdateStatus === 'UPDATE_WORK_IN_PROGRESS') && (
        <div className="">
          <ClipLoader size={90} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      )}
      {calendarFetchStatus !== 'CALENDAR_FETCH_WORK_IN_PROGRESS' &&
        timeSlotUpdateStatus !== 'UPDATE_WORK_IN_PROGRESS' &&
        selectedLectureCategory &&
        selectedInstructor &&
        globalSelectedDate &&
        TimeSlotAMComponents.length === 0 &&
        TimeSlotPMComponents.length === 0 && <div className="">현재 등록된 시간대가 없습니다</div>}
    </>
  );
};
