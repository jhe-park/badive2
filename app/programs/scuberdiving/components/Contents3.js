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
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program/contents3_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Advanced Open Water Diver</div>
          <div className="text-5xl font-bold">어드밴스 다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">조금 더 깊은 수심 펀다이빙 가능</div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program/contents3_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          한 단계 더! 스쿠버 다이빙 중급 다이버 코스
        </div>
        <div className="text-3xl ">
          <p>
            <span className="font-bold">
              오픈워터 다이버 자격증 소지한 사람
            </span>
            을 대상으로 한 교육과정
          </p>
        </div>
        <div className="text-3xl ">
          ※ <span className="font-bold">18m 이상 30m 이하의 딥 다이빙</span>{" "}
          가능
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">어드밴스 다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>
        <div className="text-5xl">
          이론교육 1회 + 제한수역(다이빙풀) 3회 교육 + 개방수역(바다해양) 교육
        </div>
        <div className="flex  items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론
            </div>
            <div className="text-3xl w-2/3">
              다이빙 물리학과 생리학 다이빙 장비 점검 다이빙 계획 수립
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              제한수역
            </div>
            <div className="text-3xl w-2/3">
              마스크 벗기 다시 착용하기 레귤레이터 되찾기 물빼기 예비용 공기
              공급원 사용 장비 탈부착 등
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              개방수역
            </div>
            <div className="text-3xl w-2/3">
              제한수역에서 배운 교육내용을 토대로 실제 바다환경에서 실시하고
              활용
            </div>
          </div>
        </div>
        <div className="w-4/5 h-[200px] flex items-center justify-center gap-y-5 flex-col text-3xl bg-[#65AFFF]">
          <div className="font-bold bg-white w-[90%] py-2 text-center">
            제한 수역(다이빙풀) 스페셜티 교육(선택)
          </div>
          <div className="text-white flex flex-col items-center justify-evenly gap-y-2">
            <p className="text-center">
              레저 다이빙의 여러 특수한 주제에 대해 집중적으로 훈련하는 과정{" "}
            </p>
            <p className="text-center">
              수중촬영 / 야간다이빙 / 딥다이빙/ 물고기식별 / 난파선다이빙 /
              드라이슈트 등
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">어드밴스 다이버 자격증 발급 </div>
        <Divider className="w-full h-1 my-12 bg-black"></Divider>

        <div className="text-4xl flex font-bold flex-col justify-center items-center gap-x-2 bg-[#CCE6F4] rounded-lg p-5 w-4/5 h-[200px] gap-y-5 overflow-hidden">
          <div>-교육 이후 제한수역에서 3회이상 다이빙 및 로그 작성</div>
          <div>-2개 이상의 스페셜티 해양실습</div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">어드밴스 다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>

        <div className="w-full h-full flex flex-col items-center justify-evenly gap-y-14">
          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BBD1EA] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              이론교육
            </div>

            <div className="text-3xl">
              · 다이빙 물리학 및 생리학 ·다이빙 장비 점검 ·자연 지형지물 이용
              방법 및 나침반 사용법 ·다이빙 계획 수립
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#A1C6EA] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              제한수역(다이빙풀)
            </div>

            <div className="text-3xl">
              <p className="text-center">
                · 마스크 벗기 및 다시 착용하기 ·장비 탈부착 ·레귤레이터 되찾기
                및 물빼기 ·방향찾기
              </p>
              <p className="text-center">
                ·예비용 공기 공급원 사용하기 ·부력조절하면서 수영, 정지, 수심 및
                방향 변경하기{" "}
              </p>
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#507DBC] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
              개방수역(바다해양)
            </div>

            <div className="text-3xl">
              <p>
                ■ 제한수역(다이빙풀)에서 배운 교육 내용을 실제 다이빙 환경인
                바다에서 실습하여{" "}
              </p>
              <p>실제 다이빙 환경에 적응하는 훈련과정입니다. </p>
            </div>
          </div>

          <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#65AFFF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            제한수역(다이빙풀) 스페셜티(선택)
            </div>

            <div className="text-3xl">
              <p>
              · 수중촬영  · 야간다이빙 · 딥다이빙 · 물고기식별 · 난파선다이빙 · 드라이슈트 등
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

        <div className="w-full h-[100px] flex items-center justify-center">
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
