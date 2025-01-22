import React from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { Button } from "@heroui/react";
export default function page({params}) {
  console.log('params:',params.id)
  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[600px] flex items-center justify-center relative">
        <Image
          src={"/divingtour/divingtour.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[40%] left-[30%] gap-y-2 flex flex-col"></div>
      </div>
      <div className="w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5 my-24">
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-4xl font-bold flex items-center justify-center gap-x-2">
            <Chip color="danger" size="large">
              마감임박
            </Chip>
            [01/10 ~01/17] 필리핀 코론 수중 프로필 촬영 다이빙 투어
          </div>
          <div className="text-medium font-bold text-gray-500">
            조회수: 10304
          </div>
          <div className="w-full flex items-center justify-end gap-x-2">
            <div className="flex flex-col items-center justify-center gap-x-2 cursor-pointer">
              <FaRegHeart className="text-2xl text-red-500" />
              <p>좋아요</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-x-2 cursor-pointer">
              <FaRegShareFromSquare className="text-2xl" />
              <p>공유하기</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-x-2 cursor-pointer w-full">
            <img
              src="/tourdetail/tourdetail1.png"
              alt="tour1"
              className="w-full h-auto object-cover"
            />
            <img
              src="/tourdetail/tourdetail2.png"
              alt="tour1"
              className="w-full h-auto object-cover"
            />
            <img
              src="/tourdetail/tourdetail3.png"
              alt="tour1"
              className="w-full h-auto object-cover"
            />
            <img
              src="/tourdetail/tourdetail4.png"
              alt="tour1"
              className="w-full h-auto object-cover"
            />
            <img
              src="/tourdetail/tourdetail5.png"
              alt="tour1"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full h-[100px] flex items-center justify-center my-24">
            <Link
              className="flex items-center justify-center gap-x-2"
              href={`/divingtours/reservation/${params.id}`}
            >
              <Button className="text-4xl font-bold w-full h-full p-4">
                예약하기
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <p>
              ※ 해외 다이빙 투어는 신청서 작성 후, 담당자가 직접 개별 연락
              드립니다.
            </p>
            <p>※ 결제는 담당자와 개별 연락 후 진행됩니다.</p>
            <p>
              ※ 별도 문의는 @BDN 카카오 채널로 해주시면 문의 답변이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
