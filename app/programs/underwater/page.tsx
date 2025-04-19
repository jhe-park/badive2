import React from 'react';
import TabContents from './components/TabContents';
import Image from 'next/image';

export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[30vh] w-full items-center justify-center md:h-[600px]">
        <Image src={'/program4/underwatertop.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[2vh] left-[2vw] flex flex-col items-start justify-center gap-y-2 md:bottom-[5vh] md:gap-y-6">
          <div className="text-2xl font-bold text-white md:text-5xl">Underwater Dance</div>
          <div className="text-sm text-white md:text-3xl">심해 속에서 펼쳐지는 예술의 무대, 언더워터 댄스</div>
        </div>
      </div>
      <div className="flex h-24 w-full flex-col items-center justify-center gap-y-2 md:h-48 md:gap-y-5">
        <div className="text-2xl font-bold md:text-5xl">Underwater Dance</div>
        <div className="text-sm md:text-3xl">언더워터 댄스</div>
      </div>
      <TabContents></TabContents>
    </div>
  );
}
