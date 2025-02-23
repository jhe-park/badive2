import React from "react";
import Link from "next/link";
import SlideUp from "@/components/animation/SlideUp";
export default function Curriculum() {
  return (
    <div className="w-full h-[40vh] md:h-[850px] flex flex-col justify-center items-start gap-y-5 px-[2vw] py-[3vw]">
      <div className="flex gap-x-5 justify-center md:justify-start items-center w-full">
        <p className="text-2xl md:text-[36px] font-bold">BADIVE 교육과정</p>
      </div>
      <SlideUp>
        <div className="w-full h-full flex gap-2 justify-center items-center">
          <div className="w-1/3 h-full  flex justify-center items-center relative gap-2">
            <div className="w-full h-full  overflow-hidden relative group">
              <img
                src="/curriculum/curriculum1.png"
                alt="Expert 3"
                className="w-full h-full transition-transform duration-300 transform hover:scale-110 rounded-2xl"
              />
              <Link href="/programs/scuberdiving">
                <div className="text-sm md:text-[32px] font-bold absolute inset-x-0 top-1/2 transform -translate-y-full group-hover:-translate-y-1/2 h-12 md:h-36 bg-black bg-opacity-75 text-white flex justify-center items-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  스쿠버다이빙
                </div>
              </Link>
            </div>
          </div>
          <div className="w-1/3 h-full  flex justify-center items-center relative gap-2">
            <div className="w-full h-full  overflow-hidden relative group">
              <img
                src="/curriculum/curriculum2.png"
                alt="Expert 3"
                className="w-full h-full transition-transform duration-300 transform hover:scale-110 rounded-2xl"
              />
              <Link href="/programs/freediving">
                <div className="text-sm md:text-[32px] font-bold absolute inset-x-0 top-1/2 transform -translate-y-full group-hover:-translate-y-1/2 h-12 md:h-36 bg-black bg-opacity-75 text-white flex justify-center items-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  프리다이빙
                </div>
              </Link>
            </div>
          </div>
          <div className="w-1/3 h-full  flex justify-center items-center relative gap-2">
            <div className="w-full h-full  overflow-hidden relative group">
              <img
                src="/curriculum/curriculum3.png"
                alt="Expert 3"
                className="w-full h-full transition-transform duration-300 transform hover:scale-110 rounded-2xl"
              />
              <Link href="/programs/mermaid">
                <div className="text-sm md:text-[32px] font-bold absolute inset-x-0 top-1/2 transform -translate-y-full group-hover:-translate-y-1/2 h-12 md:h-36 bg-black bg-opacity-75 text-white flex justify-center items-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  머메이드
                </div>
              </Link>
            </div>
          </div>
        </div>
      </SlideUp>
    </div>
  );
}
