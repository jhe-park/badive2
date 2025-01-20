import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { Button } from "@nextui-org/react";

export default function Contents4() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program4/contents4_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Underwater Dance Instructor</div>
          <div className="text-[64px] font-bold">언더워터 댄스 강사</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">물속에서 창조되는 독창적 퍼포먼스</div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program4/contents4_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          물속에서의 화려한 예술의 향연, 언더워터 댄스 강사{" "}
        </div>
        <div className="text-3xl ">
          <p>언더워터 댄서를 양성하는 강사가 되는 과정</p>
        </div>
        <div className="text-3xl ">
          <span className="font-bold">
            {" "}
            ※ 어드밴스드 언더워터 댄스 수료자 대상
          </span>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-20">
        <div className="text-5xl font-bold">
          언더워터 댄스강사 과정 교육 안내
        </div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#468FAF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            수업내용
          </div>

          <div className="text-3xl w-full flex flex-col items-center justify-center space-y-2">
            <p> ※ 총 4일 과정</p>
            <p>※ DI 언더워터 댄스 강사(어드밴스드 언더워터 댄스 수료자 대상)</p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#A9D6E5] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            업그레이드{" "}
          </div>

          <div className="text-3xl w-full flex flex-col items-center justify-center space-y-2">
            <p>
              {" "}
              언더워터 댄스 강사 과정 수료자는 추가적인 자격 조건을 만족하면,
              아래의 강사 자격으로{" "}
            </p>
            <p>업그레이드 할 수 있습니다.</p>
          </div>
          <div className="text-3xl w-full flex flex-col items-center justify-center space-y-2 mt-6">
            <p>★ DIT 언더워터 댄스 트레이너</p>
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
