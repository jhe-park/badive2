import React from "react";
import Image from "next/image";
import NotificationTable from "./components/NotificationTable";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[600px] flex items-center justify-center relative">
        <Image
          src={"/notification/notification.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[40%] left-[30%] gap-y-2 flex flex-col">
          <div className="text-[24px] font-medium text-white">공지사항</div>
          <div className="text-[50px] text-white font-bold">
            <p>공지사항 다양한 BDN 정보와</p>
            <p>새로운 소식을 만나보세요.</p>
             
          </div>
        </div>
      </div>
      <div className="w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5">
        <NotificationTable></NotificationTable>
      </div>
    </div>
  );
}
