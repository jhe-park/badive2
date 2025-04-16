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
        <div className="w-full max-w-[500px] aspect-square flex items-center justify-center relative">
          <Image src={selectedImageUrl} alt="Program Image" fill />
        </div>
      )}
      {!isSelectProgram && (
        <div
          style={{
            aspectRatio: '1/1',
          }}
          className="w-full md:w-[500px] md:h-[500px] flex items-center justify-center relative"
        >
          <Image src="/inquiries/logo.png" alt="badive logo" width={500} height={500} className="object-contain"></Image>
        </div>
      )}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-y-6 gap-x-12 md:flex-col-reverse">
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
