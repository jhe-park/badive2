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
              src={"/program4/contents2_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Advanced Underwater Dance</div>
          <div className="text-[64px] font-bold">
            어드밴스드 언더워터 댄스(D2)
          </div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">
            물속에서 펼쳐지는 한계없는 움직임의 예술
          </div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program4/contents2_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          한계를 넘어선 춤사위, 어드밴스드 언더워터 댄스{" "}
        </div>
        <div className="text-3xl ">
          <p>
            수심을 자유롭게 드나들며 심화된{" "}
            <span className="font-bold">언더워터 댄스 스킬 </span>
          </p>
        </div>
        <div className="text-3xl ">
          ※ 만
          <span className="font-bold">
            6세 이상 베이직 언더워터 댄스 과정 수료자 참여 가능
          </span>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">
          어드밴스드 언더워터 댄스 교육 안내
        </div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>
        <div className="flex  items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론(1세션){" "}
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>물과 인체에 대한 이해,</p>
              <p>메이크업, 어드밴스드</p>
              <p>언더워터 댄스 스킬,</p>
              <p>마인드셋, 안전</p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              스튜디오(1세션){" "}
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>스트레칭, 바디 컨디셔닝, </p>
              <p>어드밴스드 바디 무브먼트, </p>
              <p>언더워터 댄스 스킬,</p>
              <p>프리스타일 테크닉</p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              풀(3세션){" "}
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-start gap-y-2">
              <p>물에 떠있기, 부력조절,</p>
              <p>어드밴스드 언더워터 댄스 </p>
              <p>스킬, 프리스타일, </p>
              <p>의상 및 소품 컨트롤,</p>
              <p>안전 및 레스큐</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-20">
        <div className="text-5xl font-bold">
          어드밴스드 언더워터 댄스 교육 과정{" "}
        </div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BAEBFF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            이론(1세션)
          </div>

          <div className="text-3xl">
            ■ 언드밴스드 언더워터 댄스를 배우기 전, 기본 이론을 다루는
            과정입니다.{" "}
          </div>
          <div className="text-3xl text-[#8D0000]">
            <p>
              · 물과 인체에 대한 이해 ·메이크업 ·어드밴스드 언더워터 댄스 스킬
              ·마인드 셋 ·안전
            </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#BBDBFE] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            스튜디오(1세션)
          </div>

          <div className="text-3xl">
            <p className="text-center">
              ■ 물에 들어가기 전, 거울이 있는 연습실에서 미리 스킬을 연습해보는
              과정입니다.{" "}
            </p>
          </div>
          <div className="text-3xl text-[#8D0000] text-center">
            <p>
              · 스트레칭 ·바디 컨디셔닝 ·어드밴스드 바디 무브먼트 ·언더워터 댄스
              스킬 ·프리스타일 테크닉
            </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#90CAF9] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            풀(3세션)
          </div>

          <div className="text-3xl">
            ■ 물속에서 언더워터 댄스를 하기 위한 스킬을 배우는 과정입니다.{" "}
          </div>
          <div className="text-3xl text-[#8D0000] text-center">
            <p>
              · 물에 떠있기 ·부력조절 · 어드밴스드 언더워터 댄스 스킬
              ·프리스타일 ·의상 및 소품 컨트롤 ·안전 및 레스큐
            </p>
          </div>
        </div>
        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#468FAF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            수업내용
          </div>

          <div className="text-3xl space-y-2 flex flex-col items-center justify-center text-center">
            <p>
              <span className="font-bold">※ 정원:</span> 1~4명
            </p>
            <p>
              <span className="font-bold">※ 시간:</span> 5세션, 1세션 당 2시간
            </p>
            <p>
              <span className="font-bold">※ 수심:</span> 발 닿는 곳 ~ 6m (학생
              역량에 맞추어 진행합니다.)
            </p>
            <p>
              <span className="font-bold">※ 수강조건:</span> 만 6세 이상
            </p>
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
