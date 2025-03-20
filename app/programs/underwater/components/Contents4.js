import React from "react";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Button } from "@heroui/react";
import { FaArrowDownLong } from "react-icons/fa6";
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
    title: "언더워터 댄스",
    image: "/programnew/underwater3.png",
    subtitle: "언더워터 댄스 강사",
    description: "물속에서의 화려한 예술의 향연, 언더워터 댄스 강사",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "댄스 강사 교육(4일)",
        highlight: "",
      },
      {
        image: "/programnew/icon20.png",
        text: "업그레이드",
        highlight: "",
      }
    ],
    condition: "※ 어드밴스 언더워터 댄스 수료자 대상",
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
        title:
          "＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.  ",
      },
    ],
    instruction: [
      {
        title: "댄스 강사 교육",
        description1: `<div>총 4일 과정 DI 언더워터 댄스 강사(어드밴스 언더워터 댄스 수료자 대상)</div>`,
        description2: `
        `,
      },
      {
        title: "업그레이드",
        description1: `<div>언더워터 댄스 강사 과정 수료자는 추가적인 자격 조건을 만족하면 아래의 강사 자격으로 업그레이드 가능</div>`,
        description2: `
        <div>DIT 언더워터 댄스 트레이너</div> 
        `,
      }
    ],
    groupImage: "/programnew/underwatergroup.png",

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
