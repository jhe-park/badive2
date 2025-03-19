import React from "react";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Button } from "@heroui/react";
import TopHeader from "@/app/programs/components/TopHeader";
import MainTitle from "@/app/programs/components/MainTitle";
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
    title: "스쿠버 다이빙",
    image: "/programnew/scuberdiving2.png",
    subtitle: "오픈워터 다이버",
    description: "스쿠버다이빙 첫번째 다이버 라이센스!",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론 교육",
        highlight: "1회",
      },
      {
        image: "/programnew/icon2.png",
        text: "제한수역(다이빙풀) 교육",
        highlight: "3회",
      },
      {
        image: "/programnew/icon3.png",
        text: "개방수역(바다해양) 교육",
        highlight: "",
      },
      {
        image: "/programnew/icon4.png",
        text: "오픈워터 다이버 자격증 발급",
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
        description: "입장료, 장비대여&공기통대여, 해양실습",
      },
    ],
    instruction: [
      {
        title: "이론교육",
        description1: ``,
        description2: `
        <div>NASE KOREA PPT 강습 · 다이버 예절 - 이마에 마스크 올리지 않기,  탱크  세우지 않기 등</div>
<div>수압과 압력평형(이퀄라이징) · 호흡법 · 수신호(ok(괜찮다),이상하다, 아프다 등등)</div>
        `,
      },
      {
        title: "제한수역(다이빙풀)",
        description1: ``,
        description2: `
        <div>장비 대여 및 반납 안내· 스킨다이빙(스노쿨)로 몸풀기 · 스쿠버 세트 조립 및 해체</div>
<div>수면에서 웨이트 벗기, 착용  ·수면에서 스쿠버 세트 벗기, 착용 등</div>
        `,
      },
      {
        title: "개방수역(바다해양)",
        description1: ``,
        description2: `
        <div>세션 훈련에서 습득한 스킬을 실제 바다에서 시나리오로 적용 훈련</div>
        `,
      },
      {
        title: "라이센스 발급",
        description1: ``,
        description2: `<div>오픈워터 다이버 라이센스 발급(만 10세부터 가능)</div>`,
      },
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
      <SpecialAdvantage></SpecialAdvantage>
      <Strength></Strength>
      <Review></Review>
      <Phone></Phone>
      <Requirement data={data}></Requirement>
    </div>
  );
}
