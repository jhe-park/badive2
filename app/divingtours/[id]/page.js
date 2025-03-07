import React from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { createClient } from "@/utils/supabase/server";

export default async function page({ params }) {
  const supabase = await createClient();
  const paramsdata = await params;
  const tour_id = paramsdata.id;
  const { data, error } = await supabase
    .from("tour")
    .select("*")
    .eq("id", tour_id)
    .single();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px]">
      <div className="w-full h-[30vh] md:h-[800px] flex items-center justify-center relative">
        <Image
          src={"/divingtour/divingtour.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-[40%] left-[30%] gap-y-2 flex flex-col"></div>
      </div>
      <div className="w-[90%] md:w-[66vw] h-full flex flex-col items-center justify-center gap-y-5 my-12 md:my-24">
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl md:text-4xl font-bold flex items-center justify-center gap-x-2 md:gap-x-6 md:flex-row flex-col gap-y-2">
            <Chip
              color={data.status === "마감임박" ? "danger" : "primary"}
              size="large"
            >
              {data.status}
            </Chip>
            <div className="text-2xl md:text-4xl font-bold">{data.title}</div>
          </div>

          <div className="text-medium font-bold text-gray-500">
            조회수: {data.view_count}
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
            <div
              className="w-full [&_img]:mx-auto"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
          <div className="w-1/2 md:w-full h-full  flex items-center justify-center my-6 md:m24">
            <Link
              className="flex items-center justify-center gap-x-2"
              href={`/divingtours/reservation/${tour_id}`}
            >
              <Button className="text-2xl md:text-2xl font-bold w-full h-full px-6 py-4">
                예약하기
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-start justify-center gap-y-2">
            <p>
              ※ 해외 다이빙 투어는 신청서 작성 후, 담당자가 직접 개별 연락
              드립니다.
            </p>
            <p>※ 결제는 담당자와 개별 연락 후 진행됩니다.</p>
            <p>
              ※ 별도 문의는 @바다이브 카카오 채널로 해주시면 문의 답변이 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
