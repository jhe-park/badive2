'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import CalendarComponent from './CalendarComponent';
import ProgramSelectComponent from './ProgramSelectComponent';
import useSelectedImageUrl from '@/app/store/useSelectedImageUrl';

export default function OrderComponents({ userReservations, userData, profile }) {
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
        // w-56 h-56
        <div className=" flex items-center justify-center relative">
          <Image
            src="/inquiries/logo.png"
            alt="logo"
            // fill
            width={500}
            height={500}
            className="object-contain"
          ></Image>
        </div>
      )}
      <div style={{
        // direction: "rtl"
      }} className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-y-6 gap-x-12 md:flex-col-reverse">
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
    </>
  );
}
