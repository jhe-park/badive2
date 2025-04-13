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
import SpecialAdvantage from "../../components/SpecialAdvantage";
import Strength from "../../components/Strength";
export default function () {
  const data = {
    title: "프리다이빙",
    image: "/programnew/freediving1.png",
    subtitle: "풀 프리다이버(레벨1)",
    description: "프리다이빙 입문자를 위한 완벽한 출발점",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론수업",
        highlight: "1회",
      },
      {
        image: "/programnew/icon2.png",
        text: "얕은수심교육",
        highlight: "1회",
      },
    ],
    condition:"※만12세이상 가능",
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
        title: "이론교육",
        description1: `<div>프리다이빙 이론강습</div>`,
        description2: `
        <div>프리다이빙 호흡 · 압력평형방법  ·프리다이빙 안전(LMC와 BO상황구조)</div>  
        `,
      },
      {
        title: "얕은수심교육",
        description1: `<div>강사님과 함께 기본적인 스킬을 배우고 숙달하는 과정</div>`,
        description2: `
        <div>· 장비 사용 방법· 적절한 호흡법 · Static(수중 숨참기)  ·DYN(핀을 사용한 다이나믹)  ·효율적인 피닝과 자세 · 수면 LMC 구조와 블랙아웃 레스큐</div> 
        `,
      }
    ],
    groupImage: "/programnew/freedivinggroup.png",
  };
  return (
    <div
    style={{ fontFamily: "Hakgyoansim" }}
    className="w-full lg:max-w-[1280px] h-full flex flex-col items-center justify-center mt-7"
  >
    <TopHeader></TopHeader>
    <MainTitle data={data}></MainTitle>
    <MainDetail data={data}></MainDetail>
    <Instruction data={data} />
    <MiddleBanner data={data}></MiddleBanner>
    {/* <SpecialAdvantage></SpecialAdvantage> */}
    {/* <Strength></Strength> */}
    <Review></Review>
    <Phone></Phone>
    <Requirement data={data}></Requirement>
  </div>
  );
}
