'use client';
import SlideUp from '@/components/animation/SlideUp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
export default function Curriculum() {
  const router = useRouter();
  return (
    <div className="flex h-auto w-full flex-col items-start justify-evenly gap-y-6 md:max-w-[1280px]">
      <div className="flex w-full items-center justify-center gap-x-5 xl:justify-start">
        <Image src="/logo/logo.png" alt="logo" width={75} height={50} className="h-[25px] w-[50px] md:h-[50px] md:w-[75px]" />
        <p className="text-[20px] font-bold md:text-[30px] xl:text-[36px]">BADIVE 교육과정</p>
      </div>
      <SlideUp>
        <div className="grid h-full w-full grid-cols-2 gap-2 px-2">
          {[
            { src: 'program1.png', title: '스쿠버다이빙', url: '/programs/scuberdiving' },
            { src: 'program2.png', title: '프리다이빙', url: '/programs/freediving' },
            { src: 'program3.png', title: '머메이드', url: '/programs/mermaid' },
            { src: 'program4.png', title: '언더워터', url: '/programs/underwater' },
          ].map((item, index) => (
            <div key={index} className="group relative flex aspect-square w-full items-center justify-center">
              <div className="h-full w-full overflow-hidden rounded-3xl">
                <img
                  src={`/banner/${item.src}`}
                  alt={item.title}
                  className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-110"
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
