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
    image: "/programnew/scuberdiving4.png",
    subtitle: "레스큐 다이버",
    description: "구조기술과 응급처지법으로 안전한 다이빙 실천",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론 교육",
        highlight: "1회",
      },
      {
        image: "/programnew/icon2.png",
        text: "제한수역(다이빙풀) 교육",
        highlight: "",
      },
      {
        image: "/programnew/icon3.png",
        text: "개방수역(바다해양) 교육",
        highlight: "",
      },
      {
        image: "/programnew/icon4.png",
        text: "레스큐큐 다이버 자격증 발급",
        highlight: "",
      },
    ],
    condition: "※수료전 20회이상 다이빙 경험 필요",
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
        <div>NASE KOREA PPT 강습 -다이빙 의학 · 응급사항 발생 사례 + 시나리오 만들기 · 호흡법+ 공기고갈 대처법 · 다이빙 플랜짜기</div>
<div> 버디 장비 점검하기 · 응급구조 + 심폐소생술 · 상급수신호 </div>
        `,
      },
      {
        title: "제한수역(다이빙풀)",
        description1: ``,
        description2: `
        <div>맨몸 입수 · 맨몸 수영 · 입영· 수면에서 맨몸으로 지친 다이버 끌기 · 장비착용 후 수면에서 지친 다이버 끌기 · 장비 착용 후 하강 도중 상승하기</div>
<div>장비 착용 후 상승 도중 급 상습하기 · 장비 착용 후 수면에서 지친 다이버 장비 탈착하기 등</div>
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
        description2: `<div>레스큐 자격증 발급 가능 ( 수료전, 20회 이상 다이빙 경험 필요)</div>`,
      },
    ],
    groupImage: "/programnew/scubergroup.png",
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
      <SpecialAdvantage></SpecialAdvantage>
      <Strength></Strength>
      <Review></Review>
      <Phone></Phone>
      <Requirement data={data}></Requirement>
    </div>
  );
}
