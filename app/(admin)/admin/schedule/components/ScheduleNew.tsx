'use client';

import { ToastContainer, toast } from 'react-toastify';
import { LECTURE_CATEGORY } from '@/constants/constants';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Select, SelectItem, Button, Textarea, Chip } from '@heroui/react';
import { CalendarComponentForAdminAndExpert, TFetchedTimeSlot } from './CalendarComponentForAdminAndExpert';
import { TypeDBinstructor, TypeDBprofile, TypeDBprogram, TypeDBtimeslot } from '@/utils/supabase/dbTableTypes';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { X } from 'lucide-react';
import ModalForDetailInformation from './ModalForDetailInformation';
import dayjs from 'dayjs';

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

type TProps = {
  instructors: TypeDBinstructor[];
  profiles: TypeDBprofile[];
  everyPrograms: TypeDBprogram[];
};

export type TReservationsDetail = {
  productName: string;
  studentName: string;
  studentLocation: string;
  birthday: string;
  phone: string;
};

export const ScheduleNew: React.FC<TProps> = ({ instructors, profiles, everyPrograms }) => {
  const [selectedLectureCategory, setSelectedLectureCategory] = useState<(typeof LECTURE_CATEGORY)[number] | undefined>('스쿠버다이빙');
  const [selectedInstructor, setSelectedInstructor] = useState<TypeDBinstructor | undefined>();
  const [selectedInstructorProfile, setSelectedInstructorProfile] = useState<TypeDBprofile | undefined>();
  const [selectedHHMM, setSelectedHHMM] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [timeSlots, setTimeSlots] = useState<TFetchedTimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TFetchedTimeSlot | undefined>();
  const [reservationsDetail, setReservationsDetail] = useState<TReservationsDetail[]>([]);

  console.log('selectedHHMM');
  console.log(selectedHHMM);

  const supabase = createTypedSupabaseClient();

  const changeSelectedDate = ({ newDate }: { newDate: Date }) => {
    setSelectedDate(newDate);
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

  const getEveryStudentsFromPrograms = async ({ programIds, timeSlotIds }: { programIds: Set<number>; timeSlotIds: Set<number> }) => {
    try {
      const { data: reservations, error } = await supabase
        .from('reservation')
        .select('*')
        .in('time_slot_id', [...timeSlotIds])
        .eq('status', '예약확정');

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
          studentLocation: studentProfile.firstAddress.split(' ').at(0) ?? '알 수 없음',
          birthday: studentProfile.birth,
          phone: studentProfile.phone,
        };
      });

      setReservationsDetail(reservationsDetail);
    } catch (error) {
      console.error(error);
    }
  };

  const addScheduleToDB = async () => {
    // 강사정보
    // 프로그램 카테고리 정보 : 일단 카테고리에 속한 모든 프로그램을 가져온다

    debugger;
    everyPrograms.filter(program => program.category);
    let filteredPrograms: TypeDBprogram[] | undefined = undefined;
    switch (selectedLectureCategory) {
      case '스쿠버다이빙':
        filteredPrograms = everyPrograms.filter(program => {
          return program?.category === selectedLectureCategory || program?.category === '체험다이빙' ? true : false;
        });
        break;
      case '머메이드':
      case '언더워터 댄스':
      case '프리다이빙':
        filteredPrograms = everyPrograms.filter(program => {
          return program?.category === selectedLectureCategory ? true : false;
        });
        break;
      default:
        break;
    }

    filteredPrograms.map(async (program, index) => {
      // for debug;
      if (index >= 1) return;
      const date = dayjs(selectedDate).format('YYYY-MM-DD');
      const start_time = selectedHHMM;
      const uniqueId = `${program.instructor_id}_${program.id}_${date}_${start_time}`;

      debugger;
      await supabase.from('timeslot').insert({
        // id,
        // created_at,
        date,
        start_time,
        end_time: start_time,
        unique_id: uniqueId,
        program_id: program.id,
        instructor_id: program.instructor_id,
        available: true,
        current_participants: 0,
        max_participants: program.participants,
      });
    });
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
      <div className="flex w-full">
        <div className="flex-1">
          <div className="flex flex-col items-center justify-center gap-6 pt-[10%]">
            <div className="text-large">스케줄 등록</div>
            <div className="flex justify-center">
              <Select
                className="w-[150px] lg:w-[150px]"
                onChange={async e => {
                  const instructor = JSON.parse(e.target.value) as TypeDBinstructor;
                  setSelectedInstructor(instructor);

                  const foundProfile = profiles.find(profile => profile.email === instructor.email);
                  setSelectedInstructorProfile(foundProfile);
                }}
              >
                {instructors.map(instructor => {
                  return <SelectItem key={JSON.stringify(instructor)}>{instructor.name}</SelectItem>;
                })}
              </Select>
            </div>
            <div className="flex gap-2">
              {LECTURE_CATEGORY.map(category => {
                return (
                  <Badge
                    key={category}
                    variant={'outline'}
                    className={cn(
                      'font-bold text-[12px] lg:text-[14px] py-2 px-7 cursor-pointer',
                      category === selectedLectureCategory && 'bg-btnActive text-white',
                    )}
                    onClick={() => {
                      setSelectedLectureCategory(category);
                    }}
                  >
                    {category}
                  </Badge>
                );
              })}
            </div>
            <div className="flex gap-4">
              <div className="">
                <Select
                  className="w-[200px] lg:w-[200px] text-center"
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

              <div
                onClick={() => {
                  addScheduleToDB();
                }}
                className=""
              >
                등록하기
                {/* <Button className="justify-start  data-[hover=true]:text-foreground bg-btnActive text-white hover:text-white"></Button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="">
            <CalendarComponentForAdminAndExpert
              selectedDate={selectedDate}
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
      {timeSlots.length > 0 && (
        <div className="">
          <div className="">오전</div>
          <div className="flex gap-4 flex-wrap">
            {TIME_AM.map(time => {
              const { max_participants, current_participants, program_ids, time_slot_ids } = everyTimeSlotCalculated[time];

              if (max_participants === 0) return;
              return (
                <div className="relative" key={time}>
                  {current_participants === 0 && (
                    <div className="absolute top-[-10px] right-0">
                      <X className={cn('font-normal py-1 px-1 cursor-pointer bg-btnActive rounded-full text-white')}>X</X>
                    </div>
                  )}
                  <Badge
                    variant={'outline'}
                    className={cn('cursor-pointer font-normal py-2 px-7', selectedTimeSlot?.start_time == time && 'bg-btnActive text-white')}
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
                    className="text-center border-solid border-1 border-black cursor-pointer hover:bg-gray-100"
                  >
                    {current_participants}/{max_participants}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-12">오후</div>
          <div className="flex gap-4 flex-wrap">
            {TIME_PM.map(time => {
              const { max_participants, current_participants, program_ids, time_slot_ids } = everyTimeSlotCalculated[time];
              if (max_participants === 0) return;
              return (
                <div className="relative" key={time}>
                  {current_participants === 0 && (
                    <div className="absolute top-[-10px] right-0">
                      <X className={cn('font-normal py-1 px-1 cursor-pointer bg-btnActive rounded-full text-white')}>X</X>
                    </div>
                  )}
                  <Badge
                    variant={'outline'}
                    className={cn('cursor-pointer font-normal py-2 px-7', selectedTimeSlot?.start_time == time && 'bg-btnActive text-white')}
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
                    className="text-center border-solid border-1 border-black cursor-pointer hover:bg-gray-100"
                  >
                    {current_participants}/{max_participants}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-20"></div>
        </div>
      )}
    </>
  );
};
