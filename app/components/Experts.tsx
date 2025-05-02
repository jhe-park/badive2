import SlideUp from '@/components/animation/SlideUp';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export default function Experts() {
  return (
    <div className="flex aspect-[375/314] h-full w-full flex-col items-start justify-evenly px-1 md:my-0 md:aspect-[768/552] md:h-auto md:px-0 xl:aspect-[1280/754] xl:max-w-[1280px]">
      <div className="flex w-full items-center justify-center gap-x-5 xl:justify-start">
        <Image src="/logo/logo.png" alt="Expert 1" width={75} height={50} className="h-[25px] w-[50px] md:h-[50px] md:w-[75px]" />
        <p className="text-center text-[20px] font-bold md:text-start md:text-[30px] xl:text-[35px]">BADIVE 소속강사</p>
      </div>
      <SlideUp>
        <div className="relative flex aspect-[375/222] w-full gap-2 md:aspect-[758/407]">
          <Link href="/instructors/bdn">
            <Image src="/banner/expert.png" alt="Expert 1" fill className="object-cover" />
          </Link>
        </div>
      </SlideUp>
    </div>
  );
}
