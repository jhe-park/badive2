import React from "react";
import Image from "next/image";
import NotificationTable from "./components/NotificationTable";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[30vh] md:h-[600px] flex items-center justify-center relative">
        <Image
          src={"/notification/notification.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute md:bottom-[40%] md:left-[30%] top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 gap-y-2 flex flex-col items-center md:items-start w-full">
          <div className="text-medium md:text-[24px] font-medium text-white">공지사항</div>
          <div className="text-2xl md:text-[50px] text-white font-bold text-center md:text-left w-full">
            <p>공지사항 다양한 BDN 정보와</p>
            <p>새로운 소식을 만나보세요.</p>
          </div>
        </div>
      </div>
      <div className="w-[90%] md:w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5">
        <NotificationTable></NotificationTable>
      </div>
    </div>
  );
}
