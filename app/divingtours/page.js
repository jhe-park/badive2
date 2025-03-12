import React from "react";
import Image from "next/image";
import TourCards from "./components/TourCards";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full aspect-[1920/600] md:h-auto  h-[40vh] flex items-center justify-center relative">
        <Image
          src={"/divingtour/divingtour.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[40%] left-[30%] gap-y-2 flex flex-col">

        </div>
      </div>
      <div className="w-[90%] md:max-w-[1280px] h-full flex flex-col items-center justify-center gap-y-5">
        <TourCards></TourCards>
      </div>
    </div>
  );
}
