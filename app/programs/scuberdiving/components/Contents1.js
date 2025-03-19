import React from "react";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Button } from "@heroui/react";
import TopHeader from "../../components/TopHeader";
import MainTitle from "../../components/MainTitle";
import MainDetail from "../../components/MainDetail";
import { Divider } from "@heroui/react";
import Instruction from "../../components/Instruction";
import MiddleBanner from "../../components/MiddleBanner";
import Review from "../../components/Review";
import Phone from "../../components/Phone";
import Requirement from "../../components/Requirement";
export default function () {
  const data = {
    title: "스쿠버 다이빙",
    image: "/programnew/scuberdiving1.png",
    subtitle: "체험다이빙",
    description: "라이센스 없이 가능한 다이빙 체험!",
    lines: [
      {
        image: "/programnew/icon4.png",
        text: "라이센스 없어도 가능한 체험 코스 ",
        highlight: "",
      },
      {
        image: "/programnew/icon5.png",
        text: "만 10세부터~ 60세까지 참가 가능",
        highlight: "",
      },
      {
        image: "/programnew/icon6.png",
        text: "전문강사 인솔하에 안전한 다이빙 체험 ",
        highlight: "",
      },
    ],
    condition: "",
    guide: [
      {
        title: "-장소(수영장):",
        description: "강사와 협의 후 결정",
      },
      {
        title: "-준비물:",
        description: "수영복, 세면도구, 수건, 수모(수영 모자)",
      },
      {
        title: "-포함사항:",
        description: "교육비, 자격증 발급(교재비 포함)",
      },
      {
        title: "-불포함사항:",
        description: "입장료, 장비대여",
      },
    ],
    instruction: [
      {
        title: "이용안내",
        description1: `<div>호흡기 지급과 전문적인 스쿠버 다이빙 교육으로 물에 대한 공포증이 있거나 수영을 하지 못해도 체험 가능 합니다.</div>
<div>체험 다이빙 전, 명단과 동의서를 작성 후 체험을 진행합니다.</div>`,
        description12: ``,
      },
      {
        title: "주의사항",
        description1: `<div>만 19세 미만 청소년은 프로그램 이용 시 반드시 보호자가 동행하시기 바랍니다.</div>
<div>임산부, 노약자, 심혈관계 질환자 등은 체험이 불가능 합니다.</div>
<div>기침 등 호흡기 증상, 발열, 두통 등의 증상이 있다면 체험을 자제해주시고, 주최 측 판단으로 체험이 제한될 수 있습니다.</div>
<div>안전과 해상안전법에 따라 음주시 체험은 불가합니다. 음주로 인한 당일 체험 취소는 환불되지 않습니다.</div>
<div>기상악화로 인해 스케줄이 변동되거나 취소될 수 있습니다.</div>`,
        description2: `<div>체험 다이빙을 할 때는 담당 강사의 인솔하에 안전하게 진행되며, 담당 강사의 지시를 따르지 않고, 개별 행동 · 단독 행동으로 발생한 사고는 업체가 책임지지 않습니다.</div>`,
      },
    ],
  };
  return (
    <div
      style={{ fontFamily: "Hakgyoansim" }}
      className="w-full lg:max-w-[1280px] h-full flex flex-col items-center justify-center mt-7"
    >
      <TopHeader />
      <MainTitle data={data} />
      <MainDetail data={data} />
      {/* <div className="w-full flex items-center justify-start xl:my-7 mt-0">
        <div className="xl:w-full flex items-center justify-center w-1/2">
          <Divider className="xl:w-[231px] md:w-[179px] h-[1px] bg-[#0053C9] hidden md:block" />
        </div>
      </div> */}

      <Instruction data={data} />
      <MiddleBanner></MiddleBanner>
      <Review></Review>
      <Phone></Phone>
      <Requirement data={data}></Requirement>

      

      



      
    </div>
  );
}
