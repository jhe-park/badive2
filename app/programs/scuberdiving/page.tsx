import React from 'react';
import TabContents from './components/TabContents';
import Image from 'next/image';

export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[30vh] md:h-[600px] flex items-center justify-center relative">
        <Image src={'/program/contents1top.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[2vh] md:bottom-[5vh] left-[2vw] gap-y-2 md:gap-y-6 flex flex-col items-start justify-center">
          <div className="text-2xl md:text-[48px] font-bold text-white">BADIVE,</div>
          <div className="text-sm md:text-[32px] text-white">스쿠버다이빙, 프리다이빙, 머메이드</div>
          <div className="text-sm md:text-[32px] text-white">라이센스 및 강사교육을 하는 전문 교육기관</div>
        </div>
      </div>
      <div className="w-full h-24 md:h-48 flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
        <div className="text-lg md:text-3xl">Scuba Diving</div>
        <div className="text-2xl md:text-5xl font-bold">스쿠버다이빙</div>
      </div>
      <TabContents></TabContents>
    </div>
  );
}
