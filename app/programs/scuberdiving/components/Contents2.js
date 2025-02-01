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
      <div className="w-full h-[400px] md:h-[800px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex items-center justify-center py-6 md:py-24">
          <div className="relative w-full md:w-2/3 h-48 md:h-full">
            <Image
              src={"/program/contents2_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
          <div className="text-lg md:text-2xl">Open Water Diver</div>
          <div className="text-2xl md:text-5xl font-bold">오픈워터 다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-sm md:text-3xl">낮은 수심 펀다이빙 가능</div>
        </div>
      </div>

      <div
        className="w-full my-6 md:my-12 h-full md:h-[380px] flex flex-col items-center justify-evenly gap-y-5 p-2 md:p-0"
        style={{
          backgroundImage: "url(/program/contents1_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-2xl md:text-5xl font-bold text-center md:text-start">
          스쿠버다이빙 첫번째 다이버 라이센스!
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          <p>
            <span className="font-bold">만 10세부터 취득</span> 할 수 있는
            다이버 자격증 교육과정
          </p>
          <p>(청소년은 주니어 오픈워터 다이버 인증)</p>
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          ※ 라이센스를 이수하게 되면{" "}
          <span className="font-bold">18m 이하의 펀 다이빙</span> 가능
        </div>
      </div>

      <div className="w-full h-full md:h-[600px] my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">오픈워터 다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black"></Divider>
        <div className="text-sm md:text-3xl text-center md:text-start">
          이론교육 1회 + 제한수역(다이빙풀) 3회 교육 + 개방수역(바다해양) 교육
        </div>
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-y-5 gap-x-12 w-4/5">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-full md:h-[300px]">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              스쿠버다이빙의 기본적인 원리를 이해하는 이론과 안전수칙
            </div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-full md:h-[300px]">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              제한수역
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              스쿠버 장비 사용법 기본 스킬 연습 안전수칙 주의사항 숙지
            </div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-full md:h-[300px]">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              개방수역
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              제한수역에서 배운 교육내용을 토대로 실제 바다환경에서 실시하고
              활용
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full md:h-[500px] my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">오픈워터 다이버 자격증 발급 </div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="text-sm md:text-3xl flex flex-col justify-center items-center gap-x-2 bg-[#BBD1EA] rounded-lg p-5 w-4/5 h-[200px] gap-y-5 overflow-hidden">
          <div>
            -교육 이후 제한수역에서 3회이상 다이빙 및 로그 작성(3회 이상의 입수
            및 출수)
          </div>
          <div>-최소 100분 이상의 실제 보텀타임(ABT)</div>
          <div>-스쿠버 장비 셋트 3회이상 조립 및 해체</div>
        </div>
      </div>

      <div className="w-full h-full my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-10 md:gap-y-20">
        <div className="text-2xl md:text-5xl font-bold">오픈워터 다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 p-5 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BBD1EA] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            이론교육
          </div>

          <div className="text-sm md:text-3xl">
            ■ 스쿠버 다이빙의 기본적인 원리들을 이해하기 위한 이론지식과
            안전수칙을 배웁니다.{" "}
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000]">
            · 수압이 몸에 주는 영향 ·장비선택법 및 준비물 ·다이빙 계획 시 고려할
            사항
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-10 md:gap-y-5 p-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2  h-12 bg-[#A1C6EA] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            제한수역(다이빙풀)
          </div>

          <div className="text-sm md:text-3xl">
            <p className="text-center">
              ■ 수영장 다이풀에서 안전하고 쉽고 재미있게 시작할 수 있는
              과정입니다.
            </p>
            <p className="text-center">
              (*오픈워터 훈련 다이빙을 위한 기술훈련은 수심 5m입니다.){" "}
            </p>
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] text-center">
            <p>
              · 스쿠버장비 결합 및 점검법 등 장비 사용법 ·기본 스킬
              연습(압력평형,마스크물빼기,호흡기찾기,부력조절,상승 및 하강 등){" "}
            </p>
            <p>·안전수칙 및 주의사항 숙지</p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 p-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2 h-12 bg-[#507DBC] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
            개방수역(바다해양)
          </div>

          <div className="text-sm md:text-3xl">
            ■ 개방수역(다이빙풀)에서 배운 교육내용을 실제 다이빙 환경인 바다에서
            실습하여 실제 다이빙 환경에 적응하는 훈련입니다.
          </div>
          <div className="text-sm md:text-3xl text-[#8D0000] text-center">
            <p>· 오픈워터 개방수역 훈련은 15m이내에서 실시합니다.</p>
            <p>(* 오픈워터의 개방수역은 최대 수심 20m입니다.)</p>
          </div>
        </div>

        <div className="text-sm md:text-3xl flex flex-col justify-evenly items-start gap-x-2 rounded-lg md:p-5 w-[80%] md:w-4/6 gap-y-2 px-2 md:px-12 border-2 border-black mt-6 md:mt-12 py-6">
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
          ※ 모든 강습 일정은 개인에 따라 교육 일정이 추가 되거나 변경될 수
          있습니다.{" "}
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
