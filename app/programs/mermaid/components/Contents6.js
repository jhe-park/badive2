import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { GoShieldCheck } from "react-icons/go";

export default function Contents6() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program/contents6_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-5xl font-bold">스페셜 티</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">스쿠버 다이빙 스킬업 과정</div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program/contents6_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          스쿠버 다이버 다이빙 스킬 업그레이드!{" "}
        </div>
        <div className="text-3xl ">
          <p>
            <span className="font-bold">레저 다이빙의 여러 특수한 주제</span>에
            대해 집중적으로 훈련하는 기본패턴 프로그램
          </p>
        </div>
        <div className="text-3xl flex flex-col items-center justify-evenly gap-y-5">
          <p>
            ※{" "}
            <span className="font-bold">
              ※ 스페셜 티는 교육과정에 따라 이수하는데 필요시간이 다를 수 있음
            </span>
          </p>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 다이버 다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>

        <div className="w-4/5 grid grid-cols-3 gap-12 ">
          <div className="col-span-1 flex items-center relative h-24 bg-[#EDF2FB] rounded-lg">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="w-full h-full flex items-center justify-center text-2xl">
              딥 다이빙
            </div>
          </div>
          <div className="col-span-1 flex items-center relative h-24 bg-[#EDF2FB] rounded-lg">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="w-full h-full flex items-center justify-center text-2xl">
              디지털 영상(촬영)
            </div>
          </div>
            <div className="col-span-1 flex items-center relative h-24 bg-[#EDF2FB] rounded-lg">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="w-full h-full flex items-center justify-center text-2xl">
              드라이슈트 다이버 과정
            </div>
          </div>
          <div className="col-span-1 flex items-center relative h-24 bg-[#C1D3F2] rounded-lg">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="w-full h-full flex items-center justify-center text-2xl">
              장비 전문가 과정
            </div>
          </div>
          <div className="col-span-1 flex items-center relative h-24 bg-[#C1D3F2] rounded-lg">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="w-full h-full flex items-center justify-center text-2xl">
              수중 자연주의자 과정
            </div>
          </div>
          <div className="col-span-1 flex items-center relative h-24 bg-[#C1D3F2] rounded-lg">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="w-full h-full flex items-center justify-center text-2xl">
              야간 다이빙 과정
            </div>
          </div>
        </div>
        <div className="w-4/5 h-full flex items-center justify-center gap-y-10 flex-col text-3xl bg-[#65AFFF] py-12 mt-12">
          <div className="font-bold bg-white w-[90%] py-2 text-center">
            그 외 스페셜 티
          </div>
          <div className="text-white flex flex-col items-center justify-evenly gap-y-2 w-[90%]">
            <p className="text-center">
              프로젝트 어웨어 ·산호 암초 보존 · 응급산소 제공자 · 나이트룩스 ·
              조류 다이빙 · AWARE 어류식별 다이빙
            </p>
            <p className="text-center">
              다중 수심 다이빙 · 정밀 부력조절 · 보트 다이빙 ·
              수중스쿠터(DPV)다이빙 · 드라이슈트 다이빙
            </p>
            <p className="text-center">
              야간 다이빙 · 수중항법 다이빙 · 수중비디오 다이빙 · 아이스 다이빙
              · 사이드 마운트 다이빙 · 난파선 다이빙
            </p>
            <p className="text-center">동굴 다이빙 · 수생과 인양 다이빙</p>
          </div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">스페셜 티 교육 과정</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>

        <div className="w-full h-full flex flex-col items-center justify-evenly gap-y-14">
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#EDF2FB] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              01
            </div>

            <div className="text-3xl">■ 딥다이빙</div>
            <div className="text-3xl text-[#8D0000] flex flex-col items-center justify-evenly">
              <p>
                · 최대수심 40m 무감압 오픈워터 다이빙을 계획하고 실수할 수
                있도록 훈련하는 과정
              </p>
            </div>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#EDF2FB] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              02
            </div>

            <div className="text-3xl">■ 디지털 영상(촬영) </div>
            <div className="text-3xl text-[#8D0000] flex flex-col items-center justify-evenly">
              <p>
                · 비디오와 사진을 포함하여 다양한 수중 영상 장비 사용법에 대해
                훈련하는 과정{" "}
              </p>
            </div>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#EDF2FB] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              03
            </div>

            <div className="text-3xl">■ 드라이슈트 다이버 과정 </div>
            <div className="text-3xl text-[#8D0000] flex flex-col items-center justify-evenly">
              <p>
                · 드라이 슈트 착용법 · 드라이슈트 납무게 산출 및 수면에서의 부력
                점검 · 직립 또는 수평자세로 하강 및 상승{" "}
              </p>
              <p>
                · 수중에서 인플레이터 호스 분리 및 다시 연결하기 · 드라이슈트
                배출밸브 오픈 후 중성부력 유지하기
              </p>
              <p>· 드라이슈트 침수 대처 등 응급사항 훈련 </p>
            </div>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#EDF2FB] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              04
            </div>

            <div className="text-3xl">■ 장비전문가 과정 </div>
            <div className="text-3xl text-[#8D0000] flex flex-col items-center justify-evenly">
              <p>
                · 올바른 다이빙 장비 관리 요령과 스쿠버 시스템의 작동 방법에
                대해 훈련하는 과정{" "}
              </p>
            </div>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#EDF2FB] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              05
            </div>

            <div className="text-3xl">■ 수중 자연주의자 과정 </div>
            <div className="text-3xl text-[#8D0000] flex flex-col items-center justify-evenly">
              <p>
                · 다이버들이 과학적인 방법을 사용하여 자료 수집과 훈련 장소의
                동물 및 식물들을 인식하는 방법을 훈련하는 과정{" "}
              </p>
            </div>
          </div>
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#EDF2FB] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              06
            </div>

            <div className="text-3xl">■ 야간 다이빙 과정 </div>
            <div className="text-3xl text-[#8D0000] flex flex-col items-center justify-evenly">
              <p>
                · 일몰 후부터 일출 전까지의 사이에 실시된 다이빙을 의미하며,
                야간 다이빙 준비를 위한 상세 다이빙 계획 수립,{" "}
              </p>
              <p>위험 요인 인식 및 예방법 등을 훈련하는 과정</p>
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#65AFFF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              스페셜티 선택
            </div>

            <div className="text-3xl flex flex-col items-center justify-evenly w-[95%]">
              <p>
                프로젝트 어웨어 / 산호암초 보존 / 응급산소 제공자 / 나이트룩스 /
                조류다이빙 / AWARE 어류식별 다이빙 / 다중수심 다이빙 / 정밀
                부력조절 / 보트다이빙 / 수중스쿠버(DPV)다이빙 / 드라이슈트
                다이빙 / 야간 다이빙 / 수중항법 다이빙 / 수중비디오 다이빙 /
                아이스 다이빙 / 사이드 마운트 다이빙 / 난파선 다이빙 / 동굴
                다이빙 / 수생과 인양 다이빙
              </p>
            </div>
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
