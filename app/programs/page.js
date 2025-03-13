import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[30vh] md:h-[600px] bg-red-100 relative">
        <Image
          src="/program/programtop1.png"
          alt="program1"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[2vh] md:bottom-[5vh] left-[2vw] gap-y-2 md:gap-y-6 flex flex-col items-start justify-center">
        <div className="text-2xl md:text-4xl font-bold text-white">Systematic System</div>
          <div className="flex flex-col items-start justify-center">
            <div className="text-sm md:text-2xl text-white">전문강사들에게 배우는</div>
            <div className="text-sm md:text-2xl text-white">체계적인 다이빙 강습 시스템</div>
          </div>
        </div>
      </div>
      <div className="w-full  h-[50vh] md:h-[1000px]  flex flex-col items-center justify-between ">
        <div className="w-full flex flex-col items-center justify-center h-36 md:h-[30vh]">
          <p className="text-center text-lg md:text-4xl">Diving Program</p>
          <h1 className="text-center text-2xl md:text-6xl font-bold">강습프로그램</h1>
        </div>
        <div className="w-full h-full  grid grid-cols-3">
          <div className="col-span-1  relative group">
            <Image src="/program/program1.png" alt="program1" fill className="object-cover" />
            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-12 md:h-[100px] bg-black">
              <p style={{lineHeight: "1"}} className="text-white text-lg sm:text-[20px]  md:text-[30px] lg:text-[50px] text-center">SCUBA DIVING</p>
            </div>
            {/* <Link href="/programs/scuberdiving">
            <Button className="bg-black border-2 border-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity h-1/10 w-1/4 text-sm md:text-[32px] md:p-6">
              바로가기
            </Button>
            </Link> */}
            <div className="absolute w-24 md:w-72 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-[40px]">
              스쿠버 다이빙
            </div>
          </div>
          <div className="col-span-1 relative group">
            <Image src="/program/program2.png" alt="program2" fill className="object-cover" />
            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-12 md:h-[100px] bg-black">
              <p style={{lineHeight: "1"}} className="text-white text-lg sm:text-[20px]  md:text-[30px] lg:text-[50px]">FREE DIVING</p>
            </div>
            {/* <Link href="/programs/freediving">
            <Button className="bg-black border-2 border-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity h-1/10 w-1/4 text-sm md:text-[32px] md:p-6">
              바로가기
            </Button>
            </Link> */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-[40px]">
              프리 다이빙
            </div>
          </div>
          <div className="col-span-1 relative group">
            <Image src="/program/program3.png" alt="program3" fill className="object-cover" />
            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-full h-12 md:h-[100px] bg-black">
              <p style={{lineHeight: "1"}} className="text-white text-lg sm:text-[20px]  md:text-[30px] lg:text-[50px]">MERMAID</p>
            </div>
            {/* <Link href="/programs/mermaid">
            <Button className="bg-black border-2 border-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity h-1/10 w-1/4 text-sm md:text-[32px] md:p-6">
              바로가기
            </Button>
            </Link> */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-sm md:text-[40px]">
              머메이드
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
