import React from "react";
import SlideUp from "@/components/animation/SlideUp";
export default function Experts() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-start items-start gap-y-5 px-[2vw] py-[1vw]">
      <div className="flex gap-x-5 justify-center items-center">
        <p className="text-[36px] font-bold">소속강사</p>
      </div>
      <SlideUp>
      <div className="w-full h-full flex gap-2">
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
            <div className="text-[32px] font-bold absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-36 bg-black bg-opacity-75 text-white flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              강사소개
            </div>
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
