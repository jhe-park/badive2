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
    image: "/programnew/mermaid1.png",
    subtitle: "베이직 머메이드",
    description: "인어의 꿈을 현실로! 머메이드 입문과정",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론교육",
        highlight: "1회",
      },
      {
        image: "/programnew/icon2.png",
        text: "베이직 머메이드 다이빙 기술",
        highlight: "",
      },
      {
        image: "/programnew/icon2.png",
        text: "제한수역(다이빙 풀) 교육",
        highlight: "",
      },
    ],
    condition: "※ 만 6세 이상 가능 ",
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
        <div>머메이드 기초 지식에 대한 이론강습  </div>  
        `,
      },
      {
        title: "베이직 머메이드 다이빙 기술",
        description1: `<div>기본적인 다이빙 기술, 문제예방, 자기 구조 기술 다이빙 방법</div>`,
        description2: `
        <div> 머메이드 다이빙 방법 · 머메이드 다이빙 연습  </div> 
        `,
      },
      {
        title: "제한수역(다이빙풀)교육",
        description1: `<div> 다이빙을 하는 방법을 배우고, 연습하기 위한 제한 수역 세션 과정</div>`,
        description2: `
        <div>머메이드 다이빙 방법 · 머메이드 다이빙 연습</div> 
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
