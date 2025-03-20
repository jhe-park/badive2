'use client'
import React from "react";
import Link from "next/link";
import SlideUp from "@/components/animation/SlideUp";
import { useRouter } from "next/navigation";
export default function Curriculum() {
  const router = useRouter();
  return (
    <div className="w-full h-full md:max-w-[1280px] xl:aspect-[1280/696] md:aspect-[768/545] aspect-[375/290] flex flex-col justify-evenly items-start ">
      <div className="flex gap-x-5 justify-center xl:justify-start items-center w-full">
        <p className="xl:text-[36px] md:text-[30px] text-[20px] font-bold">BADIVE 교육과정</p>
      </div>
      <SlideUp>
        <div className="w-full grid grid-cols-3 gap-2 px-2">
          {[
            { src: "curriculum1.png", title: "스쿠버다이빙",url:"/programs/scuberdiving" },
            { src: "curriculum2.png", title: "프리다이빙",url:"/programs/freediving" },
            { src: "curriculum3.png", title: "머메이드",url:"/programs/mermaid" },
          ].map((item, index) => (
            <div key={index} className="relative w-full flex justify-center items-center group">
              <div className="w-full overflow-hidden rounded-3xl aspect-[115/200] md:aspect-[238/400] xl:aspect-[393/550] md:max-w-[393px]">
                <img
                  src={`/curriculum/${item.src}`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  onClick={() => router.push(`/curriculum/${item.title}`)}
                />
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => router.push(item.url)}>
                  <div className="text-sm md:text-[32px] font-bold absolute w-full h-12 md:h-36 bg-black/75 text-white flex justify-center items-center opacity-0 transition-all duration-500 group-hover:opacity-100 max-w-[393px]">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SlideUp>
    </div>
  );
}
