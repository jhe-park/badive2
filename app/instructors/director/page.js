import React from "react";
import Image from "next/image";
import TabContents from "./components/TabContents";
import Activity from "./components/Activity";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-full h-[30vh] md:h-[600px] mt-[100px] flex flex-col items-center justify-center relative">
        <Image
          src="/instructor/instructortop.png"
          alt="instructors"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-6 left-6 rounded-lg p-4">
          <div className="absolute inset-0 bg-white opacity-70 rounded-lg" />
          <div className="relative z-10">
            <h1 className="text-medium md:text-5xl font-bold text-black">Premium Instructor</h1>
            <p className="text-sm md:text-3xl text-black">다양한 경험과 노하우를 갖춘</p>
            <p className="text-sm md:text-3xl text-black">
              BDN의 전문 다이빙 강사들을 소개합니다.
            </p>
          </div>
        </div>
      </div>
      
      <TabContents />
      <Activity></Activity>
    </div>
  );
}
