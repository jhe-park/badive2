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
    console.log('filtered:',filtered)
    setSelectedItems(filtered);
  }, [instructor]);
  console.log('instructor:',instructor)
  console.log('selectedItems:',selectedItems)

  return (
    <div className="w-full h-[1046px] flex relative flex-col items-center">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-black z-1"></div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[30px] text-black">activity</h1>
        <p className="text-[60px] font-bold text-black">강사활동</p>
      </div>
      {selectedItems.length === 0 ? (
        <div className="w-[50vw] h-full flex items-center justify-center text-black z-10">
          <div className="text-[40px] font-bold">준비중입니다</div>
        </div>
      ) : (
        <div className="w-[50vw] h-full flex items-center justify-center text-black z-10 gap-x-10">
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <VerticalCarousel images={selectedItems} index={index} setIndex={setIndex}></VerticalCarousel>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <div className="text-[96px] font-bold">{instructor}</div>
            <div className="text-[30px] mt-12">
              {selectedItems[index]?.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
