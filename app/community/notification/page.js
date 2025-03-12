import React from "react";
import Image from "next/image";
import NotificationTable from "./components/NotificationTable";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[40vh] lg:h-auto lg:aspect-[1920/600] flex flex-col items-center justify-center relative ">
        <Image
          src={"/notification/notification.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="flex flex-col items-center justify-center w-full h-full relative gap-y-4">
          <div className="text-[14px] md:text-[24px] font-medium text-white w-full text-center">공지사항</div>
          <div className="text-[24px] md:text-[50px] text-white font-bold text-center md:text-left w-full" style={{lineHeight: "1.5"}}>
            <p className="md:text-center w-full">다양한 BADIVE 정보와</p>
            <p className="md:text-center w-full">새로운 소식을 만나보세요.</p>
          </div>
        </div>
      </div>
      <div className="w-[90%] md:max-w-[1280px] h-full md:h-full flex flex-col items-center justify-start gap-y-5">
        <NotificationTable></NotificationTable>
      </div>
    </div>
  );
}
