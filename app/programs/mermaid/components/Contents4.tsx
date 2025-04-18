import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function Contents4() {
  return (
    <div className="w-[80vw] h-full flex flex-col items-center justify-center">
      <div className="w-full h-[800px] flex ">
        <div className="w-1/2 h-full flex items-center justify-center py-24">
          <div className="relative w-2/3 h-full">
            <Image
              src={"/program/contents4_1.png"}
              alt="scubadiving"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Master Freediving</div>
          <div className="text-[64px] font-bold">마스터 프리다이버</div>
          <Divider className="w-1/2 h-1 bg-black"></Divider>
          <div className="text-3xl">기술과 지식을 결합한 프리다이빙의 완성</div>
        </div>
      </div>

      <div
        className="w-full my-12 h-[380px] flex flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: "url(/program/contents4_2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-5xl font-bold">
          최상위 엘리트 레벨의 과정, 마스터 프리다이버!{" "}
        </div>
        <div className="text-3xl ">
          <p>
            <span className="font-bold">
              대수심 다이빙을 위한 진보된 지식과 스킬
            </span>
            을 배우는 과정
          </p>
        </div>
        <div className="text-3xl ">
          ※ 만<span className="font-bold"> 18세 이상</span>가능(2년 이내 EFR
          또는 CPR 이수하신 분)
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 프리다이버 교육 안내</div>
        <Divider className="w-full h-1 bg-black my-12"></Divider>
        <div className="text-5xl">이론 + 제한수역(1회) + 해양교육(2회)</div>
        <div className="flex  items-center justify-evenly gap-y-5 gap-x-12 w-4/5 h-full my-12">
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#BBD1EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              이론
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-evenly">
              <p>마우스필 이퀄라이징,</p>
              <p>프리다이빙과 감압병,</p>
              <p>프리다이빙을 위한 식사와</p>
              <p>식단, 딥다이빙을 위한 장비,</p>
              <p>FRC다이빙, </p>
              <p>프리다이빙을 위한 호흡법,</p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#A1C6EA] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              제한수역 실습
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-evenly">
              <p>숨참기(스테틱 압니어)</p>
              <p>3분 30초, 수평 잠영</p>
              <p>(다이나믹 압니어) 70미터,</p>
              <p>DNF 테크닉,</p>
              <p>BO다이버 레스큐/ </p>
              <p>구조호흡을 포함한 30미터</p>
              <p>끌기 </p>
            </div>
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex flex-col items-center justify-start gap-y-5 w-full bg-[#507DBC] rounded-lg p-5 h-[400px] overflow-hidden">
            <div className="text-3xl bg-white rounded-lg p-2 w-full text-center">
              해양교육
            </div>
            <div className="text-3xl w-[90%] flex flex-col items-center justify-evenly">
              <p>마우스필 이퀄라이징,</p>
              <p>수직하강(CWT)32~</p>
              <p>40미터, FRC 다이빙,</p>
              <p>CNF 테크닉,</p>
              <p>BO 다이버 구조</p>
              <p>(수심 15미터) 후 </p>
              <p>구조호흡을 포함한</p>
              <p>50미터 끌기</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full my-12 flex flex-col items-center justify-evenly gap-y-20">
        <div className="text-5xl font-bold">마스터 프리다이버 교육 과정</div>
        <Divider className="w-full h-1 bg-black"></Divider>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5 mt-12 ">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-[#BAEBFF] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            이론
          </div>

          <div className="text-3xl">
          ■ 마스터 프리 다이빙 이론 강습                    </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 마우스필 이퀄라이징 ·프리다이빙과 감압병 ·프리다이빙을 위한 식사와 식단 ·딥다이빙을 위한 장비</p>
            <p>·FRC다이빙 ·프리다이빙을 위한 호흡법 </p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#BBDBFE] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            제한수역 실습(1~2회)
          </div>

          <div className="text-3xl">
            <p className="text-center">
            ■ 강사님과 함께 수영장에서 프리다이빙 스킬을 숙달하는 과정</p>
          </div>
          <div className="text-3xl text-[#8D0000] text-center">
            <p>
            · 스태틱 압니어(숨참기) 3분30초  · 수평 잠영(다이나믹 압니어) 70미터 
            </p>
            <p>·DNF 테크닉 ·BO다이버 레스큐 / 구조 호흡을 포함한 30미터 끌기</p>
          </div>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-evenly border-2 border-black relative py-12 gap-y-5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-12 bg-[#90CAF9] rounded-full flex items-center justify-center text-center text-3xl font-bold py-2">
            해양교육(2회)
          </div>

          <div className="text-3xl">
          ■ 실전처럼 해양에서 프리다이빙 스킬을 연습하는 과정입니다.            </div>
          <div className="text-3xl text-[#8D0000] text-center">
            <p>· 마우스필 이퀄라이징  ·수직하강(CWT) 32~40미터 · FRC 다이빙 ·CNF 테크닉</p>
            <p>·BO 다이버 구조(수심 15미터) 후 구조 호흡을 포함한 50미터 끌기</p>
            
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
