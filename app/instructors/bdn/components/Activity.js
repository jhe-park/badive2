'use client'
import React, { useState, useEffect } from "react";
import VerticalCarousel from "./VerticalCarousel";
import useInstructor from '@/app/store/useInstructor'

export default function Activity() {
  const { instructor } = useInstructor();
  const [index, setIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  const images = [
    {
      instructor:"정은지 강사",
      index: 0,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "경향신문 인터뷰",
      title: "경향신문 핀터뷰 출연",
      videoUrl: "https://youtu.be/FgB3OqxEpO8?si=Rn1FIKT3q-yJktAw"
    },
    {
      instructor:"정은지 강사",
      index: 1,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "마이크임팩트 인터뷰",
      title: "마이크임팩트 인터뷰",
      videoUrl: "https://youtu.be/v8thfWZbFw8?si=AjQMJbpBbQiCeEMG"
    },
    {
      instructor:"정은지 강사",
      index: 2,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "울진인포 인터뷰",
      title: "울진인포 인터뷰",
      videoUrl: "https://youtu.be/CPUpcAbvm2I?si=2xL92AKWpjGofdTA"
    },
    {
      instructor:"정은지 강사",
      index: 3,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "TED 강연",
      title: "TED 강연",
      videoUrl: "https://youtu.be/yvvR7-0VdRE?si=ydNj4ujn_WkjsfRL"
    },
    {
      instructor:"정은지 강사",
      index: 4,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "문데이 인터뷰",
      title: "문데이 인터뷰",
      videoUrl: "https://youtu.be/0ugbOM5L7Ew?si=4RdM8n7dT-H79Q9p"
    },
    {
      instructor:"정은지 강사",
      index: 5,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "미션파서블 출연",
      title: "미션파서블 채널 인터뷰",
      videoUrl: "https://youtu.be/rsytbH97NaM?si=2PkIswMU3HXVGNco"
    },
    {
      instructor:"정은지 강사",
      index: 6,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "정글의 법칙 출연",
      title: "정글의 법칙 출연",
      videoUrl: "https://youtu.be/ynK0AZBRC4E?si=jNhKIZeXbmrfqSNS"
    },
    {
      instructor:"정은지 강사",
      index: 7,
      src: "/instructors/expert1verticalcarousel1.png",
      alt: "정글의 법칙 매너티 촬영",
      title: "정글의 법칙 매너티 촬영",
      videoUrl: "https://youtu.be/p4m12kgZynI?si=DF5A8bR_8vJ7dTEK"
    }
  ]

  useEffect(() => {
    const filtered = images.filter(item => item.instructor === instructor);
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
