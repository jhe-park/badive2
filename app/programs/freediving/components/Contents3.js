import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function Contents3() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[400px] md:h-[800px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex items-center justify-center py-6 md:py-24">
          <div className="relative w-full md:w-2/3 h-48 md:h-full">
            <Image
              src={"/program2/contents3_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
          <div className="text-lg md:text-2xl">Advanced Freediving</div>
          <div className="text-2xl md:text-5xl font-bold">어드밴스 프리다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-sm md:text-3xl">한계를 뛰어넘는 어드밴스드 프리다이버</div>
        </div>
      </div>

      <div
        className="w-full my-6 md:my-12 h-full md:h-[380px] flex flex-col items-center justify-evenly gap-y-5 p-2 md:p-0"
        style={{
          backgroundImage: "url(/program2/contents3_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-2xl md:text-5xl font-bold text-center md:text-start">
          깊은 수심에서 한계를 도전할 수 있는, 어드밴스드 프리다이버!
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          <p>
            중급 프리다이버로서
            <span className="font-bold">
              버디의 안전을 책임지고 스스로의 안전 지킬 수 있도록
            </span>
            배우는 과정
          </p>
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          ※ <span className="font-bold">만 15세 이상</span>가능(2년 이내 EFR 또는 CPR 이수하신 분)
          가능
        </div>
      </div>

      <div className="w-full h-full my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">어드밴스 프리다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black md:my-12"></Divider>
        <div className="text-sm md:text-3xl">이론교육 1회 + 제한수역(1회) + 해양교육(2회)</div>
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full md:my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-full md:h-[300px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              <p>고급 압력 평형 방법/ 이해,</p>
              <p>기압성 외상, 수중의 폐,</p>
              <p>프리다이빙 스트레칭, </p>
              <p>CO2테이블 트레이닝</p>
            </div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-full md:h-[300px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              제한수역 실습
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              <p>숨참기(스테틱 압니어) </p>
              <p>2분 30초, </p>
              <p>수평 잠영(다이나믹</p>
              <p>압니어)50미터, </p>
              <p>핀 하나로 20미터 잠영</p>
            </div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-full md:h-[300px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              해양교육
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              <p>프리폴(자유낙하), </p>
              <p>수직하강(CWT) </p>
              <p>20~24미터,</p>
              <p>수심 10미터에서 </p>
              <p>마스크 벗고 상승,</p>
              <p>LMC/BO 다이버 구조</p>
              <p>(수면/ 수심 10미터),</p>
              <p>수면에서 20미터 끌기, </p>
              <p>셀프레스큐</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-6 md:gap-y-20">
        <div className="text-2xl md:text-5xl font-bold">어드밴스드 프리다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-6 md:mt-12 mb-6 md:mb-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BAEBFF] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            이론
          </div>

          <div className="text-sm md:text-3xl px-4 md:px-0">
            ■ 어드밴스드 프리 다이빙 이론 강습
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] px-4 md:px-0">
            <p>· 고급 압력 평형 방법/ 이해 ·기압성 외상 ·수중의 폐, · 프리다이빙 스트레칭</p>
            <p>·CO2 테이블 트레이닝 </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mb-6 md:mb-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 h-12 bg-[#BBDBFE] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            제한수역 실습(1~2회)
          </div>

          <div className="text-sm md:text-3xl px-4 md:px-0">
            <p className="text-center">
              ■ 강사님과 함께 수영장에서 프리다이빙 스킬을 숙달하는 과정
            </p>
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] px-4 md:px-0">
            <p>
              · 스태틱 압니어(숨참기) 2분30초  · 수평 잠영(다이나믹 압니어) 50미터 
            </p>
            <p>·핀 하나로 20미터 잠영 </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mb-6 md:mb-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#90CAF9] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            해양교육(2회)
          </div>

          <div className="text-sm md:text-3xl px-4 md:px-0">
            ■ 실전처럼 해양에서 프리다이빙 스킬을 연습하는 과정입니다.
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] px-4 md:px-0">
            <p>· 프리폴(자유낙하)  ·수직하강(CWT) 20~24미터 · 수심 10미터에서 마스크 벗고 상승</p>
            <p>·LMC/BO 다이버 구조(수면/수심 10미터), 수면에서 20미터 끌기, 셀프 레스큐</p>
          </div>
        </div>

        <div className="text-sm md:text-3xl flex flex-col justify-evenly items-start gap-x-2 p-5 w-4/5 h-[248px] gap-y-2 px-4 md:px-12 border-2 border-black md:mt-12">
          <div>
            <span className="font-bold">- 장소(수영장):</span> 강사와 협의 후 결정
          </div>
          <div>
            <span className="font-bold">- 준비물:</span> 수영복, 세면도구, 수건
          </div>
          <div>
            <span className="font-bold">- 포함사항:</span> 교육비
          </div>
          <div>
            <span className="font-bold">- 불포함사항:</span> 입장료,
            장비풀세트&공기탱크 대여비, 체험강습비, 자격증 발급비, 해양실습비
          </div>
        </div>

        <div className="text-sm md:text-3xl">
          ※ 모든 강습 일정은 개인에 따라 교육 일정이 추가 되거나 변경될 수 있습니다.
        </div>

        <div className="w-1/2 md:w-full h-full  flex items-center justify-center my-6 md:m24">
          <Link className="flex items-center justify-center gap-x-2" href='/book'>
            <Button className="text-2xl md:text-6xl font-bold w-full h-full p-4">예약하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
