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
    title: "머메이드",
    image: "/programnew/mermaid3.png",
    subtitle: "어드밴스 머메이드",
    description: "예술을 한 단계 더 깊게! 어드밴스 머메이드!",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론교육",
        highlight: "1회",
      },
      {
        image: "/programnew/icon2.png",
        text: "제한수역(다이빙 풀) 교육",
        highlight: "2회",
      },
      {
        image: "/programnew/icon11.png",
        text: "수중 표현 예술 교육",
        highlight: "",
      },
    ],
    condition: "※ 만 12세 이상 가능",
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
    guideCondition: [
      {
        title: "＊머메이드 서울 교육은 3인이상 가능합니다.",
      },
      {
        title:
          "＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.  ",
      },
    ],
    instruction: [
      {
        title: "이론교육",
        description1: `<div>머메이드 이론강습</div>`,
        description2: `
        <div>머메이드 지식에 대한 이론강습</div>  
        `,
      },
      {
        title: "제한수역교육",
        description1: ``,
        description2: `
        <div>머메이딩, 레스큐 / 문제관리 스킬 및 머메이드 다이빙의 진행을 배우고 또 준비하기 위한 두번의 제한 수역 세션</div> 
        `,
      },
      {
        title: "수중 표현 예술 교육",
        description1: ``,
        description2: `
        <div>· 돌핀(버터플라이)킥 · C자형 및 U자형 사이드 턴과 같은 머메이드 스킬, 후진 공중제비 회전, 수중 핸드 쉐이킹, 머메이드 버블, 백 글라이드</div> 
        `,
      }
    ],
    groupImage: "/programnew/mermaidgroup.png",
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
