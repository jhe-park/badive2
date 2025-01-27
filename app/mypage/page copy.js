import React from "react";
import Image from "next/image";
import PurchaseTable from "./components/ProgramTable";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-16">
      <div className="w-full font-bold text-2xl">MY PAGE</div>
      <div className="w-full grid grid-cols-4 items-center justify-start">
        <div className="flex flex-col gap-4 pt-10 col-span-1 justify-center items-start pl-10">
          <div className="text-lg font-bold hover:text-primary hover:underline cursor-pointer">
            프로그램 예약 조회
          </div>
          <div className="text-lg font-bold hover:text-primary hover:underline cursor-pointer">
            다이빙 투어 예약 조회
          </div>
          <div className="text-lg font-bold hover:text-primary hover:underline cursor-pointer">
            정보수정
          </div>
          <div className="text-lg font-bold hover:text-primary hover:underline cursor-pointer">
            회원탈퇴
          </div>
        </div>
        <div className="col-span-3">
          <div className="text-lg bg-gray-100 p-4 flex items-center justify-start gap-4 rounded-2xl">
            <div>
              <Image
                src="/profile/profile.png"
                alt="program"
                width={100}
                height={100}
              />
            </div>
            <div>
              <div className="text-lg ">SS_1님 안녕하세요</div>
              <div className="text-lg ">누적 구매금액 : 0원</div>
            </div>
          </div>
          <div>
            <PurchaseTable />
          </div>
        </div>
      </div>
    </div>
  );
}
