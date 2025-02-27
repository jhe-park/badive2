import React from "react";
import SlideUp from "@/components/animation/SlideUp";
import Link from "next/link";
export default function Experts() {
  return (
    <div className="w-[90%] md:w-[1280px] h-full md:h-auto aspect-[1280/1000] flex flex-col justify-evenly items-start my-6 md:my-0">
      <div className="flex gap-x-5 justify-center md:justify-start items-center w-full mb-4">
        <p className="text-2xl md:text-[36px] font-bold text-center md:text-start">BADIVE 소속강사</p>
      </div>
      <SlideUp>
      <div className="w-full aspect-[1280/810] flex gap-2">
        <div className="w-1/3 h-full flex flex-col justify-center items-center gap-2">
          <div className="w-full h-full bg-green-500 overflow-hidden">
            <img
              src="/experts/experts1.png"
              alt="Expert 1"
              className="w-full h-full transition-transform duration-300 transform hover:scale-110"
            />
          </div>
          <div className="w-full h-full bg-yellow-500 overflow-hidden">
            <img
              src="/experts/experts2.png"
              alt="Expert 2"
              className="w-full h-full transition-transform duration-300 transform hover:scale-110"
            />
          </div>
        </div>
        <div className="w-1/3 h-full bg-green-100 flex justify-center items-center relative gap-2">
          <div className="w-full h-full bg-green-500 overflow-hidden relative group">
            <img
              src="/experts/experts3.png"
              alt="Expert 3"
              className="w-full h-full transition-transform duration-300 transform hover:scale-110"
            />
            <Link href="/instructors/bdn">
            <div className="text-sm md:text-[32px] font-bold absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-12 md:h-36 bg-black bg-opacity-75 text-white flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              강사소개
            </div>
            </Link>
          </div>
        </div>
        <div className="w-1/3 h-full flex flex-col justify-center items-center gap-2">
          <div className="w-full h-full bg-green-500 overflow-hidden">
            <img
              src="/experts/experts4.png"
              alt="Expert 3"
              className="w-full h-full transition-transform duration-300 transform hover:scale-110"
            />
          </div>
          <div className="w-full h-full bg-yellow-500 overflow-hidden">
            <img
              src="/experts/experts5.png"
              alt="Expert 4"
              className="w-full h-full transition-transform duration-300 transform hover:scale-110"
            />
          </div>
        </div>
      </div>
      </SlideUp>
    </div>
  );
}
