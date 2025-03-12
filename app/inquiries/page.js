import React from "react";
import Image from "next/image";
import { Divider } from "@heroui/react";
import OrderComponents from "./components/OrderComponents";
import { createClient } from "@/utils/supabase/server";
export default async function page() {
  const supabase = await createClient();
  const { data: reservationData } = await supabase
    .from("reservation")
    .select("*");
  const { data } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data?.user?.id)
    .single();
  const userData = data?.user;
  // console.log('userData:',userData);
  // console.log('profile:',profile);
  let userReservations = [];
  if (userData) {
    userReservations = reservationData.filter(
      (reservation) => reservation.user_id === userData.id
    );
  }
  console.log("userReservations:", userReservations);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6">
      <div className="w-full h-[40vh] md:h-[600px] flex items-center justify-center relative">
        <Image
          src={"/inquiries/inquiriesTop.png"}
          alt="scuberdiving"
          fill
          className="object-cover"
        />
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4 relative">
          <div className="text-[14px] md:text-[24px] text-center text-white w-full">예약/문의</div>
          <div className="text-[24px] md:text-[50px] text-center text-white w-full font-bold">
            <p>전국 어디서나 가능한</p>
            <p>체계적인 교육시스템을 만나보세요.</p>
            </div>
          
        </div>
      </div>
      <div className="w-[90%] md:max-w-[1280px] h-full flex flex-col items-center justify-center gap-y-6 md:gap-y-12 py-12">
        <h1 className="text-2xl md:text-5xl font-bold text-start w-full">
          예약
        </h1>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <div className="w-full h-full flex flex-col items-center justify-center gap-x-5">
          <OrderComponents
            userReservations={userReservations}
            userData={userData}
            profile={profile}
          />
        </div>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
          <h1 className="text-lg md:text-3xl font-bold text-start w-full">
            ※ 예약 주의사항
          </h1>
          <p className="text-sm md:text-xl text-[#FF0000] w-full text-start md:pl-6">
            예약 전 주의사항 확인 후 결제 진행 부탁드립니다.
          </p>
          <div className="text-sm md:text-xl w-full h-full flex flex-col items-start justify-center gap-y-2 md:gap-y-5 border-1 border-black p-6">
            <p className="text-start">
              -스케줄 예약 시 첫 강습 스케줄만 예약되며, 이후 강습 스케줄은
              담당강사와 협의 후 진행됩니다.{" "}
            </p>
            <p className="text-start">
              -수영장 이용료, 장비 대여비는 현장 결제로 진행됩니다.{" "}
            </p>
            <p className="text-start">
              -강습 프로그램은 해당 지역을 담당하는 강사님들과 수업이 이루어
              지나, 원하는 강사님한테 강습을 원할 경우 담당 지역에서 강습이
              진행됩니다.
            </p>
            <p className="text-start">
              -강습 장소(수영장)는 강사님과 별도 협의 후 확정됩니다.
            </p>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-5">
          <h1 className="text-lg md:text-3xl font-bold text-start w-full">
            ※ 환불 규정사항
          </h1>

          <div className="text-sm md:text-xl w-full h-full flex flex-col items-start justify-center gap-y-2 md:gap-y-5 border-1 border-black p-6">
            <p>
              -예약금은 교육비 전액입니다. (수영장 이용료, 장비 대여비,라이센스
              발급비 제외)
            </p>
            <p>-교육 당일 환불은 불가합니다.</p>
            <p>-교육이 시작된 이후 잔여 교육 환불은 불가합니다.</p>
            <p>-교육시작일 기준 7일 이내 취소시 100% 환불</p>
            <p>-교육시작일 기준 1일 이내 취소시 전액 환불 불가</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full md:h-[300px] flex items-center justify-center relative">
        <Image
          src={"/inquiries/inquiriesBottom.png"}
          alt="scuberdiving"
          fill
          className="object-cover z-10"
        />
        <div className="w-[calc(1520/1920*100%)] h-2/3 flex items-center justify-center z-20 gap-x-6 md:flex-row flex-col gap-y-6 py-6 md:py-0">
          <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-center gap-y-2 bg-white py-2 md:py-0">
            <div className="h-12 w-12 md:h-24 md:w-24 relative">
              <Image
                src={"/inquiries/kakao.png"}
                alt="scuberdiving"
                fill
                className="object-cover z-10"
              />
            </div>
            <div className="text-sm md:text-2xl font-bold">
              BADIVE 카카오톡 채널 : @BADIVE
            </div>
            <div className="text-xs md:text-xl">
              평일 문의/상담: 9:00~18:00{" "}
            </div>
          </div>
          <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-center gap-y-2 bg-white py-2 md:py-0">
            <div className="h-12 w-12 md:h-24 md:w-24 relative">
              <Image
                src={"/inquiries/phone.png"}
                alt="scuberdiving"
                fill
                className="object-cover z-10"
              />
            </div>
            <div className="text-sm md:text-2xl font-bold">
              BDN 카카오톡 채널 : BDN 000
            </div>
            <div className="text-xs md:text-xl">
              평일 문의/상담: 9:00~18:00{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
