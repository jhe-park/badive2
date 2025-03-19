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
    image: "/programnew/freediving4.png",
    subtitle: "마스터 프리다이버(레벨4)",
    description: "한계를 넘어, 최상위 단계의 마스터 프리다이버",
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
      {
        image: "/programnew/icon2.png",
        text: "깊은수심교육",
        highlight: "4회",
      },
    ],
    condition:"※만18세이상 가능",
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
        <div>마우스필 압력평형 · FRC다이빙 · 폐 프리다이빙 · 프리다이빙 안전(감압병과 질소마취에 대한 이해)  ·다이빙 라인과 부이운용 </div>  
        `,
      },
      {
        title: "얕은수심교육",
        description1: `<div>스스로 연습을 계획하고 실습하는 과정</div>`,
        description2: `
        <div>Static(수중 숨참기)  ·DYN(핀을 사용한 다이나믹)  ·버디시스템 ·스테틱 코칭</div> 
        `,
      },
      {
        title: "깊은수심교육",
        description1: `<div>대심도 수심에 대한 스킬을 연습하는 과정</div>`,
        description2: `
        <div>CWT (수직하강)에 필요한 테크닉 연습  · 다이빙 훈련의 계획 ·FRC 다이빙  ·마우스필 시행 ·수면/수중 LMC 구조와 블랙아웃 레스큐</div> 
        `,
      }
    ],
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
    <MiddleBanner></MiddleBanner>
    {/* <SpecialAdvantage></SpecialAdvantage> */}
    {/* <Strength></Strength> */}
    <Review></Review>
    <Phone></Phone>
    <Requirement data={data}></Requirement>
  </div>
  );
}
