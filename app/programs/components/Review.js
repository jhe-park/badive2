import React from "react";
import Image from "next/image";
export default function Review() {
  return (
    <div className="w-full h-auto xl:aspect-[1280/880] md:aspect-[771/880] aspect-[375/902]  max-h-[902px] md:max-h-none flex flex-col items-center justify-evenly my-6 md:my-0">
      <div className="text-[35px] md:text-[40px] xl:text-[64px] font-bold text-center">
        실제 강습 받으신
        <br className="md:hidden" />
        회원님의 {" "}
        <span className="text-[#0054CA]">솔직 리뷰</span>!
      </div>
      <div className="text-[20px] md:text-[24px] xl:text-[35px]">
        회원리뷰 <span className="text-[#FF9D00]">4.9</span> 실제 회원님들이
        <br className="md:hidden" />
        추천하시는 바다이브 강습 !{" "}
      </div>
      <div className="w-full xl:max-w-[901px] xl:aspect-[901/586] md:max-w-[731px] md:aspect-[731/656] hidden md:block">
        <img
          className="w-full h-full object-contain xl:hidden"
          src="/programnew/reviewTA.png"
          alt="review"
        />
        <img
          className="w-full h-full object-contain hidden xl:block"
          src="/programnew/reviewPC.png"
          alt="review"
        />
      </div>
      <div className="md:hidden  w-full h-full flex flex-col items-center justify-center">
        <img
          className="w-full max-w-[363px] aspect-[363-173] object-contain"
          src="/programnew/bubble1.png"
          alt="review"
        />
        <img
          className="w-full max-w-[363px] aspect-[363-173] object-contain"
          src="/programnew/bubble2.png"
          alt="review"
        />
        <img
          className="w-full max-w-[363px] aspect-[363-173] object-contain"
          src="/programnew/bubble3.png"
          alt="review"
        />
        <img
          className="w-full max-w-[363px] aspect-[363-173] object-contain"
          src="/programnew/bubble4.png"
          alt="review"
        />
      </div>
    </div>
  );
}
