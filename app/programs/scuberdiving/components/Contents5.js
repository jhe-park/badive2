import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function Contents5() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-full md:h-[800px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex items-center justify-center py-6 md:py-24">
          <div className="relative w-full md:w-2/3 h-48 md:h-full">
            <Image
              src={"/program/contents5_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-y-2 md:gap-y-5">
          <div className="text-lg md:text-2xl">Master Scuba Diver</div>
          <div className="text-2xl md:text-5xl font-bold">마스터 다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-sm md:text-3xl">최고 중의 최고, 엘리트 다이버</div>
        </div>
      </div>

      <div
        className="w-full my-6 md:my-12 h-full md:h-[380px] flex flex-col items-center justify-evenly gap-y-5 p-2 md:p-0"
        style={{
          backgroundImage: "url(/program/contents5_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-2xl md:text-5xl font-bold text-center md:text-start">
          최고 중의 최고 엘리트 다이버 !
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          <p>
            <span className="font-bold">다이버 리더쉽 스킬</span>을 배우는 교육 과정
          </p>
        </div>
        <div className="text-sm md:text-3xl text-center md:text-start">
          <p>
            ※ <span className="font-bold">만 18세 이상, 오픈워터, 어드밴스, 레시큐 다이버 자격 취득 및 5가지 PADI 스페셜티 코스 자격증 및</span>
          </p>
          <p>
            ※ <span className="font-bold">최소 50회 다이빙 로그 필요</span>
          </p>
        </div>
      </div>

      <div className="w-full h-full my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">마스터 다이버 다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black md:my-12"></Divider>

        <div className="flex flex-col md:flex-row items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full my-2 md:my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-full md:h-[400px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              STEP1
            </div>
            <div className="text-sm md:text-3xl w-2/3">다이버 리더쉽 스킬 교육</div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-full md:h-[400px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              STEP2
            </div>
            <div className="text-sm md:text-3xl w-2/3">
              교육 오리엔테이션과 교육 및 안전, 보험과 관련된 서류 작성
            </div>
          </div>
          <div className="hidden md:flex w-1/3 h-full items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-full md:h-[400px] overflow-hidden">
            <div className="text-lg md:text-3xl bg-white rounded-lg p-2 w-full text-center">
              STEP3
            </div>
            <div className="text-sm md:text-3xl w-2/3">스페셜 티 코스 참가</div>
          </div>
        </div>
        <div className="w-4/5 h-full flex items-center justify-center gap-y-5 flex-col text-sm md:text-3xl bg-[#65AFFF] py-6  px-2 md:py-12 md:px-0">
          <div className="font-bold bg-white w-[90%] py-2 text-center">
            마스터 다이빙 자격증 취득 후
          </div>
          <div className="text-white flex flex-col items-center justify-evenly gap-y-2">
            <p className="text-center">
              다이빙을 계획하고 조직하고 지시함으로 훈련 및 비훈련 관련 다이빙 액티비티를 감독 가능
            </p>
            <p className="text-center">
              모든 다이버 코스들의 트레이닝 세션 동안 인스트럭터를 보조하며, 독립적으로 오픈 워터 다이버 코스 학생들을
            </p>
            <p className="text-center">
              오픈 워터 다이브 코스 트레이닝 및 가이드 가능
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-full my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">마스터 다이버 자격증 발급 자격</div>
        <Divider className="w-full h-1 md:my-12 bg-black"></Divider>

        <div className="text-sm md:text-4xl flex font-bold flex-col justify-center items-center gap-x-2 bg-[#CCE6F4] rounded-lg p-5 w-4/5 h-full gap-y-5 overflow-hidden py-6 md:py-12">
          <div>-만 18세 이상 </div>
          <div>
            -오픈워터 다이버, 어드밴스 오픈워터 다이버 라이센스 소지자(or 타 단체에서 동등 자격을 가지신 분들)
          </div>
          <div>
            -EFR 응급조치 자격증 (or 타 단체에서 동등 자격을 가지신 분들)
          </div>
          <div>
            -레스큐 다이버 라이센스 소지자(or 타 단체에서 동증자격을 가지신 분들)
          </div>
          <div>-50회 이상의 다이브 로그기록을 가지고 있으신 분</div>
          <div>-지난 12개월 이내에 의사가 서명한 건강진술서(PDF제출)</div>
        </div>
      </div>

      <div className="w-full h-full my-6 md:my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-2xl md:text-5xl font-bold">마스터 다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black md:my-12"></Divider>

        <div className="w-full h-full flex flex-col items-center justify-evenly gap-y-8 md:gap-y-14">
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-8 md:py-12 gap-y-5 mt-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2 bg-[#BBD1EA] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
              SETP1
            </div>

            <div className="text-sm md:text-3xl px-4 md:px-0">
              ■ 다이브 리더쉽 스킬을 배우게 됩니다.
            </div>
            <div className="text-sm md:text-3xl text-[#8D0000] flex flex-col items-center justify-evenly px-4 md:px-0">
              <p>
                · 워터스킬과 스테미너 엑서사이즈를 완성하게 될 뿐 아니라, 다른 사람들이 그들의 스쿠버 능력을 개선하도록 도와주고
              </p>
              <p>
                문제를 해결하고 조작하는 능력을 키우게 해주는 트레이닝 엑서사이즈를 실행하게 됩니다.
              </p>
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-8 md:py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2 h-12 bg-[#A1C6EA] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
              STEP2
            </div>

            <div className="text-sm md:text-3xl gap-y-3 flex flex-col items-center justify-evenly">
              <div className="px-4 md:px-0">
                <p className="text-center">
                  ■ 교육 오리엔테이션과 교육 및 안전, 보험과 관련된 서류를 작성합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-8 md:py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2 h-12 bg-[#507DBC] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
              STEP3
            </div>

            <div className="text-sm md:text-3xl px-4 md:px-0">
              <p>■ 협의된 최소 5가지의 스페셜티 코스에 참가합니다.</p>
              <p>
                ■ 스페셜티 코스는 담당강사와의 상담을 통하여 본인이 원하거나 추천받은 스페셜 티 코스를 선택하여 참여 가능합니다.
              </p>
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-8 md:py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/2 h-12 bg-[#65AFFF] rounded-full flex items-center justify-center text-center text-lg md:text-3xl font-bold py-2">
              스페셜티 선택
            </div>

            <div className="text-sm md:text-3xl flex flex-col items-center justify-evenly w-[95%] px-4 md:px-0">
              <p>
                프로젝트 어웨어 / 산호암초 보존 / 응급산소 제공자 / 장비 스페셜리스트 / 나이트룩스 / 디지털수중사진(DUP) / 조류다이빙 / AWARE 어류식별 다이빙 / 다중수심 다이빙 / 정밀 부력조절 / 보트다이빙 / 수중 자연주의자 / 수중스쿠버(DPV)다이빙 / 드라이슈트 다이빙 / 야간 다이빙 / 수중항법 다이빙 / 수중비디오 다이빙 / 아이스 다이빙 / 딥다이빙 / 사이드 마운트 다이빙 / 난파선 다이빙 / 동굴 다이빙 / 수생과 인양 다이빙
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm md:text-3xl flex flex-col justify-evenly items-start gap-x-2 p-3 md:p-5 w-4/5 gap-y-2 px-4 md:px-12 border-2 border-black mt-6 md:mt-12">
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
            <span className="font-bold">- 불포함사항:</span> 입장료, 장비풀세트&공기탱크 대여비, 체험강습비, 자격증 발급비, 해양실습비
          </div>
        </div>

        <div className="text-sm md:text-3xl">
          ※ 모든 강습 일정은 개인에 따라 교육 일정이 추가 되거나 변경될 수 있습니다.
        </div>

        <div className="w-1/2 md:w-full h-full flex items-center justify-center my-6 md:my-24">
          <Link className="flex items-center justify-center gap-x-2" href="/book">
            <Button className="text-2xl md:text-6xl font-bold w-full h-full p-4">
              예약하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
