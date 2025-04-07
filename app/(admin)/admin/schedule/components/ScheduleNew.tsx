'use client';

// import { Badge } from '@heroui/react';
// import { useRouter } from 'next/navigation';

import { LECTURE_CATEGORY } from '@/constants/constants';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { cn } from '@/lib/utils';
// import CalendarComponent from '@/app/inquiries-test/components/CalendarComponent';
import { Input, Select, SelectItem, Button, Textarea, Chip } from '@heroui/react';
import { CalendarComponentForAdminAndExpert, TFetchedTimeSlot } from './CalendarComponentForAdminAndExpert';
import { TypeDBinstructor, TypeDBprofile, TypeDBprogram, TypeDBtimeslot } from '@/utils/supabase/dbTableTypes';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { Circle, Currency, X } from 'lucide-react';
import ModalForDetailInformation from './ModalForDetailInformation';

const EVERY_TIME_SLOTS_TIME = [
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '00:00',
];

const TIME_AM_PM_ALL = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];
const TIME_AM = ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'];
const TIME_PM = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];

type TProps = {
  instructors: TypeDBinstructor[];
  profiles: TypeDBprofile[];
  programs: TypeDBprogram[];
};

export const ScheduleNew: React.FC<TProps> = ({ instructors, profiles, programs }) => {
  //   const router = useRouter();
  const supabase = createTypedSupabaseClient();
  const [selectedLectureCategory, setSelectedLectureCategory] = useState<(typeof LECTURE_CATEGORY)[number] | undefined>('스쿠버다이빙');
  const [selectedInstructor, setSelectedInstructor] = useState<TypeDBinstructor | undefined>();
  const [selectedInstructorProfile, setSelectedInstructorProfile] = useState<TypeDBprofile | undefined>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  //   const [timeslots, setTimeslots] = useState<TypeDBtimeslot[]>([]);
  const [timeSlots, setTimeSlots] = useState<TFetchedTimeSlot[]>([]);
  const [selectedTimeSlotTime, setSelectedTimeSlotTime] = useState<TFetchedTimeSlot | undefined>();
  const changeTimeSlots = ({ newTimeSlots }: { newTimeSlots: TFetchedTimeSlot[] }) => {
    setTimeSlots(newTimeSlots);
  };

  const timeSlotsRegisteredTimes = [...new Set(timeSlots)];

  const EVERY_TIME_SLOTS_OBJ = {
    '05:00': { max_participants: 0, current_participants: 0 },
    '06:00': { max_participants: 0, current_participants: 0 },
    '07:00': { max_participants: 0, current_participants: 0 },
    '08:00': { max_participants: 0, current_participants: 0 },
    '09:00': { max_participants: 0, current_participants: 0 },
    '10:00': { max_participants: 0, current_participants: 0 },
    '11:00': { max_participants: 0, current_participants: 0 },
    '12:00': { max_participants: 0, current_participants: 0 },
    '13:00': { max_participants: 0, current_participants: 0 },
    '14:00': { max_participants: 0, current_participants: 0 },
    '15:00': { max_participants: 0, current_participants: 0 },
    '16:00': { max_participants: 0, current_participants: 0 },
    '17:00': { max_participants: 0, current_participants: 0 },
    '18:00': { max_participants: 0, current_participants: 0 },
    '19:00': { max_participants: 0, current_participants: 0 },
    '20:00': { max_participants: 0, current_participants: 0 },
    '21:00': { max_participants: 0, current_participants: 0 },
    '22:00': { max_participants: 0, current_participants: 0 },
    '23:00': { max_participants: 0, current_participants: 0 },
    '00:00': { max_participants: 0, current_participants: 0 },
  };

  const everyTimeSlotCalculated = timeSlots.reduce((acc, curr) => {
    const { current_participants, max_participants, start_time } = curr;
    if (acc[curr.start_time]) {
      acc[curr.start_time].max_participants = acc[curr.start_time].max_participants + max_participants;
      acc[curr.start_time].current_participants = acc[curr.start_time].current_participants + current_participants;
    }
    return acc;
    // acc[curr.start_time]?.max_participants =
  }, EVERY_TIME_SLOTS_OBJ);

  console.log('everyTimeSlotCalculated');
  console.log(everyTimeSlotCalculated);

  //   console.log('selectedInstructor');
  //   console.log(selectedInstructor);

  return (
    <>
      <ModalForDetailInformation isOpen={isModalOpen} onClose={() => {}} onOpenChange={() => {}} />
      <div className="flex w-full">
        <div className="flex-1">
          <div className="flex justify-center">
            <Select
              className="w-[150px] lg:w-[150px]"
              onChange={async e => {
                //   console.log(1);
                //   console.log(e);
                //   console.log('e.target.value');
                //   console.log(e.target.value);

                const instructor = JSON.parse(e.target.value) as TypeDBinstructor;
                setSelectedInstructor(instructor);

                const foundProfile = profiles.find(profile => profile.email === instructor.email);
                setSelectedInstructorProfile(foundProfile);
                //   instructor.email;
                //   await supabase.from('profiles').select('*').eq('id', instructor.id).single();
                //   setSelectedInstructor(JSON.parse(e.target.value));

                //   const instructorId = parseInt(e.target.value);
                //   console.log('instructorId');
                //   console.log(instructorId);
              }}
            >
              {instructors.map(instructor => {
                return <SelectItem key={JSON.stringify(instructor)}>{instructor.name}</SelectItem>;
              })}

              {/* <SelectItem>이세원강사</SelectItem> */}
            </Select>
          </div>
          <div className="flex flex-col items-center pt-4 gap-2">
            <div className="">스케줄 등록</div>
            <div className="flex gap-4">
              <div className="">
                <Select className="w-[100px] lg:w-[100px]" onChange={async e => {}}>
                  {TIME_AM_PM_ALL.map(time => {
                    return <SelectItem key={JSON.stringify(time)}>{time}</SelectItem>;
                  })}

                  {/* <SelectItem>이세원강사</SelectItem> */}
                </Select>
              </div>
              <div className="">
                <Badge
                  variant={'outline'}
                  className={cn('font-normal py-2 px-7 cursor-pointer', selectedTimeSlotTime?.start_time == 'dkhhjsdfkjh' && 'bg-btnActive text-white')}
                  // key={time}
                  // onClick={() => setSelectedTimeSlotTime(time)}
                >
                  AM
                </Badge>
                /
                <Badge
                  variant={'outline'}
                  className={cn('font-normal py-2 px-7 cursor-pointer', selectedTimeSlotTime?.start_time == '123455' && 'bg-btnActive text-white')}
                  // key={time}
                  // onClick={() => setSelectedTimeSlotTime(time)}
                >
                  PM
                </Badge>
                {/* AM / PM */}
              </div>
              <div className="">
                <Button
                  className="justify-start  data-[hover=true]:text-foreground bg-btnActive text-white"
                  // startContent={
                  //   <Icon
                  // 	className="rotate-180 text-default-500"
                  // 	icon="solar:minus-circle-line-duotone"
                  // 	width={24}
                  //   />
                  // }
                  //   variant="light"
                  // onPress={handleSignOut}
                >
                  등록하기
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
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
          <div className="">
            <CalendarComponentForAdminAndExpert
              selectedInstructor={selectedInstructor}
              selectedLectureCategory={selectedLectureCategory}
              selectedInstructorProfile={selectedInstructorProfile}
              changeTimeSlots={changeTimeSlots}
              programs={programs}
              // isSelectInstructor={true}
              // isSelectProgram={true}
              // setIsSelectInstructor={() => {}}
              // setIsSelectProgram={() => {}}
              // setSelectedImageUrl={() => {}}
              // userReservations={[]}
            />
          </div>
        </div>
      </div>
      {timeSlots.length > 0 && (
        <div className="">
          <div className="">오전</div>
          <div className="flex gap-4 flex-wrap">
            {TIME_AM.map(time => {
              const { max_participants, current_participants } = everyTimeSlotCalculated[time];
              if (max_participants === 0) return;
              return (
                <div className="relative" key={time}>
                  {current_participants === 0 && (
                    <div className="absolute top-[-10px] right-0">
                      <X
                        // variant={'outline'}
                        className={cn('font-normal py-1 px-1 cursor-pointer bg-btnActive rounded-full text-white')}
                        // key={time}
                        // onClick={() => setSelectedTimeSlotTime(time)}
                      >
                        X
                      </X>
                    </div>
                  )}
                  <Badge
                    variant={'outline'}
                    className={cn('font-normal py-2 px-7', selectedTimeSlotTime?.start_time == time && 'bg-btnActive text-white')}
                    key={time}
                    // onClick={() => setSelectedTimeSlotTime(time)}
                  >
                    {time}
                  </Badge>
                  <div className="text-center border-solid border-1 border-black cursor-pointer hover:bg-gray-100">
                    {current_participants}/{max_participants}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-12">오후</div>
          <div className="flex gap-4 flex-wrap">
            {TIME_PM.map(time => {
              const { max_participants, current_participants } = everyTimeSlotCalculated[time];
              if (max_participants === 0) return;
              return (
                <div className="relative" key={time}>
                  {current_participants === 0 && (
                    <div className="absolute top-[-10px] right-0">
                      <X
                        // variant={'outline'}
                        className={cn('font-normal py-1 px-1 cursor-pointer bg-btnActive rounded-full text-white')}
                        // key={time}
                        // onClick={() => setSelectedTimeSlotTime(time)}
                      >
                        X
                      </X>
                    </div>
                  )}
                  <Badge
                    variant={'outline'}
                    className={cn('font-normal py-2 px-7', selectedTimeSlotTime?.start_time == time && 'bg-btnActive text-white')}
                    key={time}
                    // onClick={() => setSelectedTimeSlotTime(time)}
                  >
                    {time}
                  </Badge>
                  <div className="text-center border-solid border-1 border-black cursor-pointer hover:bg-gray-100">
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
