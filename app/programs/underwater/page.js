import React from "react";
import TabContents from "./components/TabContents";
import Image from "next/image";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[600px] flex items-center justify-center relative">
        <Image src={"/program4/underwatertop.png"} alt="scuberdiving" fill className="object-cover"/>
        <div className="absolute bottom-12 left-12 gap-y-2 flex flex-col">
          <div className="text-5xl font-bold text-white">Underwater Dance</div>
          <div className="text-3xl text-white">심해 속에서 펼쳐지는 예술의 무대, 언더워터 댄스</div>
        </div>
      </div>
      <div className="w-full h-48 flex flex-col items-center justify-center gap-y-5">
        <div className="text-3xl">Underwater Dance</div>
        <div className="text-5xl font-bold">언더워터 댄스</div>
      </div>
      <TabContents></TabContents>

    </div>
  );
}
