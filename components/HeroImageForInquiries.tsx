"use client";

import Image from "next/image";

type TProps = Record<string, unknown>;

export const HeroImageForInquiries: React.FC<TProps> = ({}) => {
  return (
    <div className="w-full h-[40vh] md:h-[600px] flex items-center justify-center relative">
      <Image
        src={"/inquiries/inquiriesTop.png"}
        alt="scuberdiving"
        fill
        className="object-cover"
      />
      <div className="w-full h-full flex flex-col items-center justify-center gap-y-4 relative">
        <div className="text-[14px] md:text-[24px] text-center text-white w-full">
          예약/문의
        </div>
        <div className="text-[24px] md:text-[50px] text-center text-white w-full font-bold">
          <p>전국 어디서나 가능한</p>
          <p>체계적인 교육시스템을 만나보세요.</p>
        </div>
      </div>
    </div>
  );
};
