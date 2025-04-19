'use client';

import useSelectedImageUrl from '@/app/store/useSelectedImageUrl';
import { TypeDBprofile, TypeDBreservation } from '@/utils/supabase/dbTableTypes';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useState } from 'react';
import CalendarComponent from './CalendarComponent';
import { PriceAndCheckOutComponent } from './PriceAndCheckoutComponent';
import ProgramSelectComponent from './ProgramSelectComponent';

type TProps = {
  userReservations: TypeDBreservation[];
  userData: User;
  profile: TypeDBprofile;
};

const OrderComponents: React.FC<TProps> = ({ userReservations, userData, profile }) => {
  const [isSelectProgram, setIsSelectProgram] = useState(false);
  const [isSelectInstructor, setIsSelectInstructor] = useState(false);
  const { selectedImageUrl, setSelectedImageUrl } = useSelectedImageUrl();

  return (
    <>
      {isSelectProgram && selectedImageUrl && (
        <div className="relative flex aspect-square w-full max-w-[500px] items-center justify-center">
          <Image src={selectedImageUrl} alt="Program Image" fill />
        </div>
      )}
      {!isSelectProgram && (
        <div
          style={{
            aspectRatio: '1/1',
          }}
          className="relative flex w-full items-center justify-center md:h-[500px] md:w-[500px]"
        >
          <Image src="/inquiries/logo.png" alt="badive logo" width={500} height={500} className="object-contain"></Image>
        </div>
      )}
      <div className="grid h-full w-full grid-cols-1 items-start justify-center gap-x-12 gap-y-6 md:grid-cols-2 md:flex-col-reverse">
        <CalendarComponent
          setSelectedImageUrl={setSelectedImageUrl}
          userReservations={userReservations}
          isSelectProgram={isSelectProgram}
          setIsSelectProgram={setIsSelectProgram}
          isSelectInstructor={isSelectInstructor}
          setIsSelectInstructor={setIsSelectInstructor}
        />
        <ProgramSelectComponent
          isSelectProgram={isSelectProgram}
          setIsSelectProgram={setIsSelectProgram}
          isSelectInstructor={isSelectInstructor}
          setIsSelectInstructor={setIsSelectInstructor}
          userData={userData}
          profile={profile}
        />
      </div>
      <PriceAndCheckOutComponent profile={profile} userData={userData} showMode="MOBILE" />
    </>
  );
};

export default OrderComponents;
