'use client'
import SlideUp from "@/components/animation/SlideUp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
export default function Curriculum() {
  const router = useRouter();
  return (
    <div className="w-full  md:max-w-[1280px] h-auto flex flex-col justify-evenly items-start gap-y-6">
      <div className="flex gap-x-5 justify-center xl:justify-start items-center w-full">
        <Image src="/logo/logo.png" alt="logo" width={75} height={50} className="md:w-[75px] md:h-[50px] w-[50px] h-[25px]" />
        <p className="xl:text-[36px] md:text-[30px] text-[20px] font-bold">BADIVE 교육과정</p>
      </div>
      <SlideUp>
        <div className="w-full h-full grid grid-cols-2 gap-2 px-2">
          {[
            { src: "program1.png", title: "스쿠버다이빙", url:"/programs/scuberdiving" },
            { src: "program2.png", title: "프리다이빙", url:"/programs/freediving" },
            { src: "program3.png", title: "머메이드", url:"/programs/mermaid" },
            { src: "program4.png", title: "언더워터", url:"/programs/underwater" },
          ].map((item, index) => (
            <div key={index} className="relative aspect-square w-full flex justify-center items-center group">
              <div className="w-full h-full overflow-hidden rounded-3xl">
                <img
                  src={`/banner/${item.src}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  onClick={() => router.push(item.url)}
                />
              </div>
            </div>
          ))}
        </div>
      </SlideUp>
    </div>
  );
}
