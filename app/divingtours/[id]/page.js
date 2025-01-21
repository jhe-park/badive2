import React from "react";
import Image from "next/image";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[600px] flex items-center justify-center relative">
        <Image
          src={"/divingtour/divingtour.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[40%] left-[30%] gap-y-2 flex flex-col">

        </div>
      </div>
      <div className="w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5">
      </div>
    </div>
  );
}
