'use client';

import { TypeDBprofile, TypeDBreservationJoinWithTimeslot } from '@/utils/supabase/dbTableTypes';
import { Tab, Tabs } from '@nextui-org/react';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import Image from 'next/image';
import ChangeInformation from './ChangeInformation';
import ProgramTable from './ProgramTable';
import SayGoodbye from './SayGoodbye';
import TourTable from './TourTable';

export default function TabContentsForRegisteredPrograms({
  profile,
  registeredPrograms,
  totalCountOfRegisteredPrograms,
}: {
  profile: PostgrestSingleResponse<TypeDBprofile>;
  registeredPrograms: TypeDBreservationJoinWithTimeslot[];
  totalCountOfRegisteredPrograms: number;
}) {
  return (
    <div style={{ fontFamily: 'Freesentation-9Black' }} className="flex h-full w-full flex-col">
      <div className="w-full bg-black"></div>
      <div className="mt-24 flex items-center justify-between">
        <div className="w-full text-2xl font-bold">MY PAGE</div>
        <div className="flex h-auto w-full items-center justify-center rounded-lg bg-gray-200 px-2 md:w-1/5 md:px-5 md:py-2">
          <div className="relative hidden h-12 w-12 md:block md:h-24 md:w-24">
            <Image src="/profile/profile.png" alt="profile" fill />
          </div>
          <div className="flex w-full flex-col items-center justify-center p-2 md:w-48">
            <p className="text-sm">{profile?.data?.name}님 안녕하세요</p>
            <p className="text-xs">누적 포인트 : {profile?.data?.point}P</p>
          </div>
        </div>
      </div>
      <Tabs aria-label="Options" className="mt-6 h-12 w-full md:my-6" variant="underlined" defaultSelectedKey={'purchase'}>
        <Tab key="purchase" title="프로그램 예약 조회">
          <ProgramTable profile={profile} registeredProgramsInDB={registeredPrograms} totalCountOfRegisteredPrograms={totalCountOfRegisteredPrograms} />
        </Tab>
        <Tab key="tour" title="다이빙 투어 예약 조회">
          <TourTable profile={profile} />
        </Tab>
        <Tab key="update" title="정보수정">
          <ChangeInformation profile={profile} />
        </Tab>
        <Tab key="delete" title="회원탈퇴">
          <SayGoodbye profile={profile} />
        </Tab>
      </Tabs>
      {/* {loading ? (
        <div className="flex flex-col gap-3 justify-center items-center gap-y-6">
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <Tabs
          aria-label="Options"
          className="w-full h-12 mt-6 md:my-6"
          variant="underlined"
        >
          <Tab key="purchase" title="프로그램 예약 조회">
            <ProgramTable profile={profile} />
          </Tab>
          <Tab key="tour" title="다이빙 투어 예약 조회">
            <TourTable profile={profile} />
          </Tab>
          <Tab key="update" title="정보수정">
            <ChangeInformation profile={profile} />
          </Tab>
          <Tab key="delete" title="회원탈퇴">
            <SayGoodbye profile={profile} />
          </Tab>
        </Tabs>
      )} */}
    </div>
  );
}
