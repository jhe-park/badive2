import React from "react";
import Image from "next/image";
import FAQTable from "./components/FAQTable";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[600px] flex items-center justify-center relative">
        <Image
          src={"/faq/faq.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[40%] left-[30%] gap-y-2 flex flex-col">
          <div className="text-[24px] font-medium text-white">자주묻는질문</div>
          <div className="text-[50px] text-white font-bold">
            <p>궁금하신 내용들에 대해서</p>
            <p>빠르고 간편하게 답을 찾아보세요.</p>
             
          </div>
        </div>
      </div>
      <div className="w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5">
        <FAQTable></FAQTable>
      </div>
    </div>
  );
}
