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
              src={"/program3/contents2_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Mermaid</div>
          <div className="text-[64px] font-bold">머메이드</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">
            물속에서 펼쳐지는 우아한 모험, 머메이드{" "}
          </div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program3/contents2_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          역동적인 머메이드 스킬을 개발하는, 머메이드!{" "}
        </div>
        <div className="text-3xl ">
          지식 개발 및 베이직 머메이드를 넘어 더욱
          <span className="font-bold">
            역동적인 머메이드 스킬을 개발하는 최소 2회의 수중 스킬 세션 포함
            과정
          </span>
        </div>
        <div className="text-3xl ">
          ※ 만<span className="font-bold"> 10세 이상 </span>누구나 참가 가능
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
              <p>머메이드 e러닝으로 자율학습을 통해 지식개발</p>
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
              <p>
                머메이딩, 레스큐 / 문제 관리 스킬 및 머메이드 다이빙의 진행을
                배우고 또 준비하기 위한 두번의 제한 수역 세션
              </p>
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
              <p>
                돌핀(버터플라이) 킥, C자형 및 U자형 사이드 턴 과 같은 머메이드
                스킬, 후진 공중제비 회전, 수중 핸드 쉐이킹 등 -그외 일부 스킬
              </p>
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
          ■ e러닝을 통해 PADI 베이직 머메이드 e러닝을 독립적으로 공부하는 과정입니다.           </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 머메이드 e러닝으로 자율학습을 통해 지식 개발</p>
          </div>
        </div>
        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BBDBFE] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            02
          </div>

          <div className="text-3xl">
          ■ 더욱 역동적인 머메이드 스킬을 개발하는 최소 2회의 수중 스킬 세션입니다.  
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 머메이딩, 레스큐 / 문제 관리 스킬   ·머메이드 다이빙의 진행을 배우고 준비하기 위한 두번의 제한 수역 세션</p>
          </div>
        </div>
        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BCCBFD] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            03
          </div>

          <div className="text-3xl">
          ■ 다른 유형의 다이빙과는 별개로, 수중 자기 표현 예술로 만드는 스킬을 배우는 과정입니다. 
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 돌핀(버터플라이)킥  ·C자형 및 U자형 사이드 턴과 같은 머메이드 스킬, </p>
            <p>· 후진 공중제비 회전 ·수중 핸드 쉐이킹 ·머메이드 버블 ·백 글라이드 등 </p>
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
