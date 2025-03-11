"use client";
import { Tabs, Tab, Card, CardBody, Spinner } from "@nextui-org/react";
import ProgramTable from "./ProgramTable";
import TourTable from "./TourTable";
import ChangeInformation from "./ChangeInformation";
import SayGoodbye from "./SayGoodbye";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { Skeleton } from "@heroui/react";
export default function App({ profile }) {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [point, setPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // 데이터 로드 로직 추가
      // 예: await fetchData();
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div
      style={{ fontFamily: "Freesentation-9Black" }}
      className="flex w-full h-full flex-col"
    >
      <div className="w-full bg-black"></div>
      <div className="flex justify-between items-center mt-24">
        <div className="w-full font-bold text-2xl ">MY PAGE</div>
        <div className="flex w-full md:w-1/5 h-auto bg-gray-200 rounded-lg px-2 md:px-5 md:py-2 justify-center items-center">
          <div className="hidden md:block w-12 h-12 md:w-24 md:h-24 relative">
            <Image src="/profile/profile.png" alt="profile" fill />
          </div>
          <div className="w-full md:w-48 flex flex-col p-2 justify-center items-center">
            <p className="text-sm">{profile?.data?.name}님 안녕하세요</p>
            <p className="text-xs">누적 포인트 : {profile?.data?.point}P</p>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-3 justify-center items-center gap-y-6">
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
          <div className="max-w-[50vw] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <Tabs
          aria-label="Options"
          className="w-full h-12 mt-6 md:my-6"
          variant="underlined"
        >
          <Tab key="purchase" title="프로그램 예약 조회">
            <ProgramTable profile={profile} />
          </Tab>
          <Tab key="tour" title="다이빙 투어 예약 조회">
            <TourTable profile={profile} />
          </Tab>
          <Tab key="update" title="정보수정">
            <ChangeInformation profile={profile} />
          </Tab>
          <Tab key="delete" title="회원탈퇴">
            <SayGoodbye profile={profile} />
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
