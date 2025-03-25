import React from "react";
import SlideUp from "@/components/animation/SlideUp";
import Link from "next/link";
import Image from "next/image";
export default function Experts() {
  return (
    <div className="w-full xl:max-w-[1280px] h-full md:h-auto xl:aspect-[1280/754] md:aspect-[768/552] aspect-[375/314] flex flex-col justify-evenly items-start md:my-0 px-1 md:px-0">
      <div className="flex gap-x-5 justify-center xl:justify-start items-center w-full">
        <Image src="/logo/logo.png" alt="Expert 1" width={75} height={50} className="md:w-[75px] md:h-[50px] w-[50px] h-[25px]" />
        <p className=" text-[20px] md:text-[30px] xl:text-[35px] font-bold text-center md:text-start">BADIVE 소속강사</p>
      </div>
      <SlideUp>
      
      <div className="w-full md:aspect-[758/407] aspect-[375/222]  flex gap-2 relative">
        <Link href="/instructors/bdn">
        <Image src="/banner/expert.png" alt="Expert 1" fill className="object-cover" />
        </Link>
      </div>
      </SlideUp>
    </div>
  );
}
