'use client';

import React, { useState, useEffect } from 'react';
import VerticalCarousel from './VerticalCarousel';
import useInstructor from '@/app/store/useInstructor';
import { activities } from '@/app/instructors/components/activities';

export default function Activity() {
  const { instructor } = useInstructor();
  const [index, setIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const filtered = activities.filter(item => item.instructor === instructor);
    console.log('filtered:', filtered);
    setSelectedItems(filtered);
  }, [instructor]);

  return (
    <div className="relative flex h-full w-full flex-col items-center md:h-[836px]">
      <div className="z-1 absolute left-0 top-0 hidden h-full w-[calc(50vw-320px)] bg-black md:block"></div>
      <div className="flex w-full flex-col items-center justify-center md:gap-y-6">
        <div className="text-2xl text-black md:text-[25px]">activity</div>
        <div className="text-4xl font-bold text-black md:text-[40px]">강사활동</div>
      </div>
      {selectedItems.length === 0 ? (
        <div className="z-10 flex h-full w-[50vw] items-center justify-center text-black">
          <div className="my-12 text-2xl font-bold md:my-0 md:text-[40px]">준비중입니다</div>
        </div>
      ) : (
        <div className="flex h-full w-[1280px] flex-col items-center justify-center">
          <div className="z-1 absolute bottom-0 left-0 block h-full w-1/4 bg-black md:hidden"></div>

          <div className="z-10 flex h-full w-[80%] flex-col items-center justify-center gap-y-6 text-black md:w-full md:flex-row md:gap-x-10">
            <div className="relative flex h-full w-full flex-col items-center justify-center md:w-1/2">
              <VerticalCarousel images={selectedItems} index={index} setIndex={setIndex}></VerticalCarousel>
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center pb-12 md:w-1/2">
              <div className="text-2xl font-bold md:text-[50px]">{instructor}</div>
              <div className="text-md mt-8 md:mt-12 md:text-[20px]">{selectedItems[index]?.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
