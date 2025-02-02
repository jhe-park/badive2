import React from "react";
import TabContents from "./components/TabContents";
import Image from "next/image";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[30vh] md:h-[600px] flex items-center justify-center relative">
        <Image src={"/program/freedivingtop.png"} alt="scuberdiving" fill className="object-cover"/>
        <div className="absolute bottom-[2vh] md:bottom-[5vh] left-[2vw] gap-y-2 md:gap-y-6 flex flex-col">
          <div className="text-2xl md:text-[48px] font-bold text-white">Freediving</div>
          <div className="text-sm md:text-[32px] text-white">한 호흡으로 시작되는 무한의 여정,  프리다이빙</div>
        </div>
      </div>
      <div className="w-full h-24 md:h-48 flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
        <div className="text-lg md:text-3xl">Freediving</div>
        <div className="text-2xl md:text-5xl font-bold">프리다이빙</div>
      </div>
      <TabContents></TabContents>

    </div>
  );
}
