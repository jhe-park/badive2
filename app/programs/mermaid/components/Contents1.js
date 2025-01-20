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
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program3/contents1_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Basic Mermaid</div>
          <div className="text-[64px] font-bold">베이직 머메이드</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">
            인어의 꿈을 현실로! 머메이드 다이빙 입문 코스
          </div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program3/contents1_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          인어의 매력을 담은 특별한 워터 스포츠, 베이직 머메이드!
        </div>
        <div className="text-3xl ">
          기본적인 머메이드 다이빙의
          <span className="font-bold">
            {" "}
            배경과 문화, 주요 안전 고려사항, 장비, 기본 수중스킬{" "}
          </span>
          학습 과정
        </div>
        <div className="text-3xl ">
          ※ 만<span className="font-bold"> 6세 이상 </span>누구나 참가 가능
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">베이직 머메이드 교육 안내</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>

        <div className="flex  items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-[300px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              STEP1
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>베이직 머메이드 e러닝을 사용하여 자율학습 </p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-[300px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              STEP2
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>베이직 머메이드 다이빙 스킬, 문제 예방 및 처리하기</p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-[300px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              STEP3
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>머메이드 다이빙 방법, 머메이드 다이빙 연습 -제한 수역 세션</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-20">
        <div className="text-5xl font-bold">베이직 머메이드 교육 과정</div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BAEBFF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            01
          </div>

          <div className="text-3xl">
            ■ e러닝을 통해 PADI 베이직 머메이드 e러닝을 독립적으로 공부하는
            과정입니다.{" "}
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 베이직 머메이드 e러닝을 사용하여 자율학습</p>
          </div>
        </div>
        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BBDBFE] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            02
          </div>

          <div className="text-3xl">
            ■ 기본적인 다이빙 기술, 문제 예방, 자기 구조 기술 다이빙 방법을
            배웁니다.{" "}
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 베이직 머메이드 다이빙 스킬 ·문제 예방 및 처리하기</p>
          </div>
        </div>
        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BCCBFD] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            03
          </div>

          <div className="text-3xl">
            ■ 머메이드 다이빙을 하는 방법을 배우고, 연습하기 위한 제한 수역 세션
            과정입니다.{" "}
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 머메이드 다이빙 방법 ·머메이드 다이빙 연습</p>
          </div>
        </div>

        <div className="text-3xl flex flex-col justify-evenly items-start gap-x-2  p-5 w-4/5 h-[248px] gap-y-2  px-12 border-2 border-black mt-12">
          <div>
            <span className="font-bold">- 장소(수영장):</span> 강사와 협의 후
            결정
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

        <div className="text-3xl">
          ※ 모든 강습 일정은 개인에 따라 교육 일정이 추가 되거나 변경될 수
          있습니다.{" "}
        </div>

        <div className="text-3xl">
          ※ 머메이드 서울 교육 과정은 3인이상만 예약이 가능합니다.
        </div>

        <div className="w-full h-[100px] flex items-center justify-center my-24">
          <Link
            className="flex items-center justify-center gap-x-2"
            href="/book"
          >
            <Button className="text-6xl font-bold w-full h-full p-4">
              예약하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
