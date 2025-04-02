"use client";

import Image from "next/image";

export const ContactToCompany: React.FC = ({}) => {
  return (
    <div className="w-full h-full md:h-[300px] flex items-center justify-center relative">
      <Image
        src={"/inquiries/inquiriesBottom.png"}
        alt="scuberdiving"
        fill
        className="object-cover z-10"
      />
      <div className="w-[calc(1520/1920*100%)] h-2/3 flex items-center justify-center z-20 gap-x-6 md:flex-row flex-col gap-y-6 py-6 md:py-0">
        <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-center gap-y-2 bg-white py-2 md:py-0">
          <div className="h-12 w-12 md:h-24 md:w-24 relative">
            <Image
              src={"/inquiries/kakao.png"}
              alt="scuberdiving"
              fill
              className="object-cover z-10"
            />
          </div>
          <div className="text-sm md:text-2xl font-bold">
            BADIVE 카카오톡 채널 : @바다이브
          </div>
          <div className="text-xs md:text-xl">평일 문의/상담: 9:00~18:00 </div>
        </div>
        <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-center gap-y-2 bg-white py-2 md:py-0">
          <div className="h-12 w-12 md:h-24 md:w-24 relative">
            <Image
              src={"/inquiries/phone.png"}
              alt="scuberdiving"
              fill
              className="object-cover z-10"
            />
          </div>
          <div className="text-sm md:text-2xl font-bold">
            바다이브 문의 전화번호
          </div>
          <div className="text-xs md:text-xl">02-6953-4432</div>
        </div>
      </div>
    </div>
  );
};
