import { Button, Divider } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function Contents4() {
  return (
    <div className="flex h-full w-[80vw] flex-col items-center justify-center">
      <div className="flex h-[800px] w-full">
        <div className="flex h-full w-1/2 items-center justify-center py-24">
          <div className="relative h-full w-2/3">
            <Image src={'/program/contents4_1.png'} alt="scubadiving" fill className="object-cover" />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Master Freediving</div>
          <div className="text-[64px] font-bold">마스터 프리다이버</div>
          <Divider className="h-1 w-1/2 bg-black"></Divider>
          <div className="text-3xl">기술과 지식을 결합한 프리다이빙의 완성</div>
        </div>
      </div>

      <div
        className="my-12 flex h-[380px] w-full flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: 'url(/program/contents4_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-5xl font-bold">최상위 엘리트 레벨의 과정, 마스터 프리다이버! </div>
        <div className="text-3xl">
          <p>
            <span className="font-bold">대수심 다이빙을 위한 진보된 지식과 스킬</span>을 배우는 과정
          </p>
        </div>
        <div className="text-3xl">
          ※ 만<span className="font-bold"> 18세 이상</span>가능(2년 이내 EFR 또는 CPR 이수하신 분)
        </div>
      </div>

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 프리다이버 교육 안내</div>
        <Divider className="my-12 h-1 w-full bg-black"></Divider>
        <div className="text-5xl">이론 + 제한수역(1회) + 해양교육(2회)</div>
        <div className="my-12 flex h-full w-4/5 items-center justify-evenly gap-x-12 gap-y-5">
          <div className="flex h-[400px] w-full flex-col items-center justify-start gap-y-5 overflow-hidden rounded-lg bg-[#BBD1EA] p-5">
            <div className="w-full rounded-lg bg-white p-2 text-center text-3xl">이론</div>
            <div className="flex w-[90%] flex-col items-center justify-evenly text-3xl">
              <p>마우스필 이퀄라이징,</p>
              <p>프리다이빙과 감압병,</p>
              <p>프리다이빙을 위한 식사와</p>
              <p>식단, 딥다이빙을 위한 장비,</p>
              <p>FRC다이빙, </p>
              <p>프리다이빙을 위한 호흡법,</p>
            </div>
          </div>
          <div className="flex h-full w-1/3 items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex h-[400px] w-full flex-col items-center justify-start gap-y-5 overflow-hidden rounded-lg bg-[#A1C6EA] p-5">
            <div className="w-full rounded-lg bg-white p-2 text-center text-3xl">제한수역 실습</div>
            <div className="flex w-[90%] flex-col items-center justify-evenly text-3xl">
              <p>숨참기(스테틱 압니어)</p>
              <p>3분 30초, 수평 잠영</p>
              <p>(다이나믹 압니어) 70미터,</p>
              <p>DNF 테크닉,</p>
              <p>BO다이버 레스큐/ </p>
              <p>구조호흡을 포함한 30미터</p>
              <p>끌기 </p>
            </div>
          </div>
          <div className="flex h-full w-1/3 items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex h-[400px] w-full flex-col items-center justify-start gap-y-5 overflow-hidden rounded-lg bg-[#507DBC] p-5">
            <div className="w-full rounded-lg bg-white p-2 text-center text-3xl">해양교육</div>
            <div className="flex w-[90%] flex-col items-center justify-evenly text-3xl">
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

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-20">
        <div className="text-5xl font-bold">마스터 프리다이버 교육 과정</div>
        <Divider className="h-1 w-full bg-black"></Divider>

        <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
          <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#BAEBFF] py-2 text-center text-3xl font-bold">
            이론
          </div>

          <div className="text-3xl">■ 마스터 프리 다이빙 이론 강습 </div>
          <div className="text-3xl text-[#8D0000]">
            <p>· 마우스필 이퀄라이징 ·프리다이빙과 감압병 ·프리다이빙을 위한 식사와 식단 ·딥다이빙을 위한 장비</p>
            <p>·FRC다이빙 ·프리다이빙을 위한 호흡법 </p>
          </div>
        </div>

        <div className="relative flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
          <div className="absolute left-1/2 top-0 flex h-12 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#BBDBFE] py-2 text-center text-3xl font-bold">
            제한수역 실습(1~2회)
          </div>

          <div className="text-3xl">
            <p className="text-center">■ 강사님과 함께 수영장에서 프리다이빙 스킬을 숙달하는 과정</p>
          </div>
          <div className="text-center text-3xl text-[#8D0000]">
            <p>· 스태틱 압니어(숨참기) 3분30초 · 수평 잠영(다이나믹 압니어) 70미터</p>
            <p>·DNF 테크닉 ·BO다이버 레스큐 / 구조 호흡을 포함한 30미터 끌기</p>
          </div>
        </div>

        <div className="relative flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
          <div className="absolute left-1/2 top-0 flex h-12 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#90CAF9] py-2 text-center text-3xl font-bold">
            해양교육(2회)
          </div>

          <div className="text-3xl">■ 실전처럼 해양에서 프리다이빙 스킬을 연습하는 과정입니다. </div>
          <div className="text-center text-3xl text-[#8D0000]">
            <p>· 마우스필 이퀄라이징 ·수직하강(CWT) 32~40미터 · FRC 다이빙 ·CNF 테크닉</p>
            <p>·BO 다이버 구조(수심 15미터) 후 구조 호흡을 포함한 50미터 끌기</p>
          </div>
        </div>

        <div className="mt-12 flex h-[248px] w-4/5 flex-col items-start justify-evenly gap-x-2 gap-y-2 border-2 border-black p-5 px-12 text-3xl">
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

        <div className="text-3xl">※ 모든 강습 일정은 개인에 따라 교육 일정이 추가 되거나 변경될 수 있습니다. </div>

        <div className="my-24 flex h-[100px] w-full items-center justify-center">
          <Link className="flex items-center justify-center gap-x-2" href="/book">
            <Button className="h-full w-full p-4 text-6xl font-bold">예약하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
