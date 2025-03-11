import React from "react";
import Image from "next/image";
import FAQTable from "./components/FAQTable";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-10">
      <div className="w-full h-[30vh] md:h-[600px] flex items-center justify-center relative">
        <Image
          src={"/faq/faq.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-y-2 flex flex-col items-center w-full gap-y-4">
          <div className="text-sm md:text-[24px] font-medium text-white">자주묻는질문</div>
          <div className="text-2xl md:text-[50px] text-white font-bold text-center w-full" style={{lineHeight: "1.5"}}>
            <p>궁금하신 내용들에 대해서</p>
            <p>빠르고 간편하게 답을 찾아보세요.</p>
          </div>
        </div>
      </div>
      <div className="w-[90%] md:w-[1280px] flex flex-col items-center justify-center gap-y-5 pb-10">
        <FAQTable></FAQTable>
      </div>
    </div>
  );
}
