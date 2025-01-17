import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function Contents2() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program2/contents2_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Freediving</div>
          <div className="text-[64px] font-bold">프리다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">
            한계를 넘고, 더 깊은 심연으로 프리다이버
          </div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program2/contents1_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          기초기술을 정확히 배우는, 프리다이버!{" "}
        </div>
        <div className="text-3xl ">
          <p>
            프리다이빙에 대한
            <span className="font-bold">
              {" "}
              전반적인 이해를 돕고, 안전하고 효율적인 다이빙을 위해 필요한 기술
            </span>
            을 익히는 과정
          </p>
          <p>(청소년은 주니어 오픈워터 다이버 인증)</p>
        </div>
        <div className="text-3xl ">
          ※ 만<span className="font-bold">15세 이상</span> 가능
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">어드밴스 다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>
        <div className="text-5xl">
          이론 + 제한수역 실습(2회) + 해양교육(2회)
        </div>
        <div className="flex  items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>프리다이빙 호흡,</p>
              <p>프리다이빙 장비,</p>
              <p>프리다이빙 종목, </p>
              <p>압력평형 방법/ 이해</p>
              <p>(이퀄라이징)</p>
              <p>물리학, 생리학 등</p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              제한수역 실습
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>숨참기(스테틱 압니어), </p>
              <p>입수방법 덕다이빙, </p>
              <p>수평 잠영(다이나믹 압니어)</p>
              <p>올바른 피닝 기술</p>
              <p>LMC 와 BO 상황의</p>
              <p>적절한 구조 </p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              해양교육
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>수직하강(CWT) </p>
              <p>10~16미터,</p>
              <p>효율적인 피닝과 자세,</p>
              <p>세이프티버디, </p>
              <p>수중 구조(레스큐)</p>
            </div>
          </div>
        </div>
        
      </div>
      

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-20">
        <div className="text-5xl font-bold">오픈워터 다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BAEBFF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            이론
          </div>

          <div className="text-3xl">
          ■ 프리 다이빙 이론 강습
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 수압이 몸에 주는 영향 ·장비선택법 및 준비물 ·다이빙 계획 시 고려할
            사항</p>
            <p>·프리다이빙 물리학 ·프리다이빙 생리학 ·포유류 잠수 반사, ·프리다이빙 안전(LMC와 BO 상황구조) </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#BBDBFE] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            제한수역 실습(1~2회)
          </div>

          <div className="text-3xl">
            <p className="text-center">
            ■ 강사님과 함께 수영장에서 프리다이빙 스킬을 숙달하는 과정 
            </p>
            
          </div>
          <div className="text-3xl text-[#8D0000] text-center">
            <p>
            · 스쿠버장비 결합 및 점검법 등 장비 사용법 ·기본 스킬
            연습(압력평형,마스크물빼기,호흡기찾기,부력조절,상승 및 하강 등){" "}
            </p>
            <p>·올바른 피닝 기술 · LMC와 BO 상황의 적절한 구조 ·숨참기 1분 30초 · 수평잠영 25미터 </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#90CAF9] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            해양교육(2회)
          </div>

          <div className="text-3xl">
          ■ 실전처럼 해양에서 프리다이빙 스킬을 연습하는 과정입니다.  
          </div>
          <div className="text-3xl text-[#8D0000] text-center">
            <p>· 수직하강(CWT) 10~16미터  ·효율적인 피닝과 자세 · 세이프티버디 ·수중 구조(레스큐)</p>
            
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
