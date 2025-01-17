import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@nextui-org/react";
export default function Contents1() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program/contents1_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Experience Diving</div>
          <div className="text-5xl font-bold">체험다이빙</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">
            수중세계를 경험해보고 싶으신 분들을 위한 프로그램
          </div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program/contents1_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          라이센스 없이 다이빙이 가능한 체험코스 !
        </div>
        <div className="text-3xl ">
          누구나 상관없이{" "}
          <span className="font-bold">전문 강사의 직접 감독</span>하에 안전하게
          다이빙 가능 !
        </div>
        <div className="text-3xl ">
          <span className="font-bold">※스쿠버다이빙 라이센스(자격증)</span> 없는
          분들도 전부 다 가능
        </div>
      </div>

      <div className="w-full h-[600px] my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">체험다이빙 코스 안내</div>
        <Divider className="w-full h-1 bg-black"></Divider>
        <div className="text-5xl">라이센스 관계 없이 체험가능</div>
        <div className="text-3xl flex justify-center items-center gap-x-2 bg-[#BBD1EA] rounded-lg p-5 w-4/5">
          <FaRegCheckCircle />
          체험 다이빙은 라이선스(자격증) 이 없어도 가능한 체험 코스입니다.
        </div>
        <div className="text-3xl flex justify-center items-center gap-x-2 bg-[#BBD1EA] rounded-lg p-5 w-4/5">
          <FaRegCheckCircle />만 10세부터 만 60세까지 참가할 수 있습니다.
        </div>
        <div className="text-3xl flex justify-center items-center gap-x-2 bg-[#BBD1EA] rounded-lg p-5 w-4/5">
          <FaRegCheckCircle />
          다이빙 전문 강사의 인솔하에 초보자도 안전하게 다이빙 가능합니다.
        </div>
      </div>
      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">체험다이빙 코스 </div>
        <Divider className="w-full h-1 bg-black mt-12"></Divider>

        <div className="text-3xl flex flex-col justify-center items-center gap-x-2 bg-[#BBD1EA] rounded-lg p-5 w-4/5 gap-y-5 overflow-hidden py-6 mt-12">
          <div>• 만 10세 이상부터 체험할 수 있으며 체험 비용이 발생합니다.</div>
          <div>
            • 호흡기 지급과 전문적인 스쿠버 다이빙 교육으로 물에 대한 공포증이
            있거나 수영을 하지 못해도 체험 가능합니다.
          </div>
          <div>• 체험 다이빙 전 명단과 동의서를 작성 후 체험을 진행합니다.</div>
          <div>
            • 체험 다이빙 후 개인샤워 용품은 개별적으로 준비 부탁드립니다.{" "}
          </div>
          <div>
            • 체험 다이빙 일정은 담당 강사와 협의 후에 확정 후 진행됩니다.{" "}
          </div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">체험다이빙 코스 주의사항</div>
        <Divider className="w-full h-1 bg-black mt-12"></Divider>

        <div className="text-3xl flex flex-col justify-center items-center gap-x-2 bg-[#BBD1EA] rounded-lg p-5 w-4/5 gap-y-1 overflow-hidden py-6 mt-12">
          <div>
            • 만 19세 미만 청소년은 프로그램 이용 시 반드시 보호자가 동행하시기
            바랍니다.
          </div>
          <div>
            • 임산부, 노약자, 심혈관계 질환자, 고막 이상자, 호흡기 질환자 등은
            체험이 불가능 합니다.
          </div>
          <div>
            • 기침 등 호흡기 증상, 발열, 두통 등의 증상이 있다면 체험을
            자제해주시고, 주최 측 판단으로 체험이 제한될 수 있습니다.
          </div>
          <div>
            • 안전과 해상안전법에 따라 음주시 체험은 불가합니다. 음주로 인한
            당일 체험 취소는 환불되지 않습니다.{" "}
          </div>
          <div>• 당일 체험을 희망할 시 고객센터에 문의 부탁드립니다.</div>
          <div>• 기상악화로인해 스케줄이 변동되거나 취소될 수 있습니다. </div>
          <div className="text-red-500">
            • 체험 다이빙 할 때는 담당 강사에 인솔하에 안전하게 진행되며, 담당
            강사의 지시를 따르지 않고,{" "}
          </div>
          <div className="text-red-500">
            • 개별행동·단독행동으로 발생한 사고는 업체가 책임지지 않습니다.{" "}
          </div>
        </div>

        <div className="text-3xl flex flex-col justify-evenly items-start gap-x-2 rounded-lg p-5 w-4/6 gap-y-2  px-12 border-2 border-black mt-12 py-6">
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

        <div className="w-full h-[100px] flex items-center justify-center">
          <Link className="flex items-center justify-center gap-x-2" href='/book'>
          <Button className="text-6xl font-bold w-full h-full p-4">예약하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
