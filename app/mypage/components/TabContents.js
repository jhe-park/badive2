"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ProgramTable from "./ProgramTable";
import TourTable from "./TourTable";
import ChangeInformation from "./ChangeInformation";
import SayGoodbye from "./SayGoodbye";
import Image from "next/image";
export default function App() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full bg-black"></div>
      <div className="flex justify-between items-center mt-24">
        <div className="w-full font-bold text-2xl ">MY PAGE</div>
        <div className="flex w-1/5 h-auto bg-gray-200 rounded-lg px-5 py-2">
          <div>
            <Image src="/profile/profile.png" alt="profile" width={50} height={50} />
          </div>
          <div className="flex flex-col p-2 justify-center items-center">
          <p className="text-sm">XX님 안녕하세요</p>
          <p className="text-xs">누적 포인트 : 1000P</p>
          </div>
          
        </div>
      </div>

      <Tabs aria-label="Options" className="w-full h-12" variant="underlined">
        <Tab key="purchase" title="프로그램 예약 조회">
          <ProgramTable />
        </Tab>
        <Tab key="tour" title="다이빙 투어 예약 조회">
          <TourTable />
        </Tab>
        <Tab key="update" title="정보수정">
          <Card>
            <ChangeInformation />
          </Card>
        </Tab>
        <Tab key="delete" title="회원탈퇴">
          <Card>
            <CardBody>
              <SayGoodbye />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
