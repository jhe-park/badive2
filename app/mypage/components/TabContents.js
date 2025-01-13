'use client'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import ProgramTable from "./ProgramTable";
import TourTable from "./TourTable";
import ChangeInformation from "./ChangeInformation";

export default function App() {
  return (
    <div className="flex w-full flex-col">
      <div className="w-full font-bold text-2xl">MY PAGE</div>
      <Tabs aria-label="Options" className="w-full h-full mt-5">
        <Tab key="purchase" title="프로그램 예약 조회">
          <Card>
            <ProgramTable />
          </Card>
        </Tab>
        <Tab key="tour" title="다이빙 투어 예약 조회">
          <Card>
            <TourTable />
          </Card>
        </Tab>
        <Tab key="update" title="정보수정">
          <Card>
            <ChangeInformation />
          </Card>
        </Tab>
        <Tab key="delete" title="회원탈퇴">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
