import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FaChevronRight } from "react-icons/fa";

export default function Contents1() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[400px] md:h-[800px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex items-center justify-center py-6 md:py-24">
          <div className="relative w-full md:w-2/3 h-48 md:h-full">
            <Image
              src={"/program2/contents1_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
          <div className="text-lg md:text-2xl">Basic Freediving</div>
          <div className="text-2xl md:text-5xl font-bold">베이직 프리다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-sm md:text-3xl">프리다이빙 입문자를 위한 완벽한 출발점</div>
        </div>
      </div>

      <div
        className="w-full my-6 md:my-12 h-full md:h-[380px] flex flex-col items-center justify-evenly gap-y-5 p-2 md:p-0"
        style={{
          backgroundImage: "url(/program2/contents1_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-2xl md:text-5xl font-bold text-center md:text-start">
          프리다이빙의 기본, 베이직 프리다이버!
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          누구나 상관없이 <span className="font-bold">프리다이빙의 기본 기술과 이론</span>을
          더욱 심도있게 배울 수 있는 과정
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          ※ 만 <span className="font-bold">12세 이상</span> 가능
        </div>
      </div>

      <div className="w-full h-full my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">베이직 프리다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black md:my-12"></Divider>
        <div className="text-sm md:text-3xl">이론 + 제한수역 실습(1~2회)</div>
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full md:my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-full md:h-[300px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              <p>프리다이빙 호흡,</p>
              <p>프리다이빙 장비,</p>
              <p>프리다이빙 종목,</p>
              <p>압력평형 방법/이해</p>
              <p>(이퀄라이징)</p>
              <p>레스큐(BO /LMC)</p>
            </div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-full md:h-[300px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              제한수역
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              <p>-스태틱(숨참기) 1분 30초</p>
              <p>
                -수면 BO 레스큐 다이나믹 실습 수영장 (K26 or 딥스테이션) 에서
                프리다이빙 스킬 숙달 과정
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5 md:gap-y-20">
        <div className="text-2xl md:text-5xl font-bold">오픈워터 다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 h-full flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-6 md:mt-12 mb-6 md:mb-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BBD1EA] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2 ">
            이론
          </div>

          <div className="text-sm md:text-3xl px-4 md:px-0">
            ■ 프리 다이빙 이론 강습
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] px-4 md:px-0">
            <p>· 프리다이빙 호흡 ·프리다이빙 장비 ·프리다이빙 종목, · 압력평형방법/ 이해(이퀄라이징) · 레스큐(BO/LMC)</p>
            <p>·프리다이빙 물리학 ·프리다이빙 생리학 ·포유류 잠수 반사 ·이론시험 75점 이상</p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mb-6 md:mb-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 h-12 bg-[#A1C6EA] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            제한수역 실습(1~2회)
          </div>

          <div className="text-sm md:text-3xl px-4 md:px-0">
            <p className="text-center">
              ■ 강사님과 함께 수영장에서 프리다이빙 스킬을 숙달하는 과정
            </p>
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] px-4 md:px-0">
            <p>
              · 스태틱(숨참기) 1분 30초   ·수면 BO 레스큐 · 다이나믹 실습
            </p>
            <p>·수영장(K26 or 딥스테이션) 에서 프리다이빙 스킬 숙달 과정 </p>
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
