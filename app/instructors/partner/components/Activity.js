'use client'
import React, { useState, useEffect } from "react";
import VerticalCarousel from "./VerticalCarousel";
import useInstructor from '@/app/store/useInstructor'
import { activities } from '@/app/instructors/components/activities'

export default function Activity() {
  const { instructor } = useInstructor();
  const [index, setIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);



  useEffect(() => {
    const filtered = activities.filter(item => item.instructor === instructor);
    console.log('filtered:', filtered)
    setSelectedItems(filtered);
  }, [instructor]);
  console.log('instructor:', instructor)
  console.log('selectedItems:', selectedItems)

  return (
    <div className="w-full h-full md:h-[1046px] flex relative flex-col items-center">
      <div className="hidden md:block absolute top-0 left-0 w-1/3 h-full bg-black z-1"></div>
      <div className="flex flex-col items-center justify-center w-full md:gap-y-6">
        <div className="text-2xl md:text-[30px] text-black">activity</div>
        <div className="text-4xl md:text-[60px] font-bold text-black">강사활동</div>
      </div>
      {selectedItems.length === 0 ? (
        <div className="w-[50vw] h-full flex items-center justify-center text-black z-10">
            <div className="my-12 md:my-0 text-2xl md:text-[40px] font-bold">준비중입니다</div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="block md:hidden absolute bottom-0 left-0 w-1/4 h-full bg-black z-1"></div>

          <div className="w-[80%] md:w-[50vw] h-full flex flex-col md:flex-row items-center justify-center text-black z-10 gap-y-6 md:gap-x-10">
            <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative">
              <VerticalCarousel images={selectedItems} index={index} setIndex={setIndex}></VerticalCarousel>

            </div>

            <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center pb-12">
              <div className="text-2xl md:text-[60px] md:text-[96px] font-bold">{instructor}</div>
              <div className="text-md md:text-[24px] md:text-[30px] mt-8 md:mt-12">
                {selectedItems[index]?.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
