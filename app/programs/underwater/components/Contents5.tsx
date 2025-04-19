import { Button, Divider } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function Contents5() {
  return (
    <div className="flex h-full w-[80vw] flex-col items-center justify-center">
      <div className="flex h-[800px] w-full">
        <div className="flex h-full w-1/2 items-center justify-center py-24">
          <div className="relative h-full w-2/3">
            <Image src={'/program/contents5_1.png'} alt="scubadiving" fill className="object-cover" />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-5">
          <div className="text-2xl">Master Scuba Diver</div>
          <div className="text-5xl font-bold">마스터 다이버</div>
          <Divider className="h-1 w-1/2 bg-black"></Divider>
          <div className="text-3xl">최고 중의 최고, 엘리트 다이버</div>
        </div>
      </div>

      <div
        className="my-12 flex h-[380px] w-full flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: 'url(/program/contents5_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-5xl font-bold">최고 중의 최고 엘리트 다이버 ! </div>
        <div className="text-3xl">
          <p>
            <span className="font-bold">다이버 리더쉽 스킬</span>을 배우는 교육 과정
          </p>
        </div>
        <div className="flex flex-col items-center justify-evenly gap-y-5 text-3xl">
          <p>
            ※ <span className="font-bold">※ 만 18세 이상, 오픈워터, 어드밴스, 레시큐 다이버 자격 취득 및 5가지 PADI 스페셜티 코스 자격증 및</span>
          </p>
          <p>
            ※ <span className="font-bold">최소 50회 다이빙 로그 필요</span>
          </p>
        </div>
      </div>

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 다이버 다이버 교육 안내</div>
        <Divider className="my-12 h-1 w-full bg-black"></Divider>

        <div className="my-12 flex h-full w-4/5 items-center justify-evenly gap-x-12 gap-y-5">
          <div className="flex h-[400px] w-full flex-col items-center justify-start gap-y-5 overflow-hidden rounded-lg bg-[#BBD1EA] p-5">
            <div className="w-full rounded-lg bg-white p-2 text-center text-3xl">STEP1</div>
            <div className="w-2/3 text-3xl">다이버 리더쉽 스킬 교육</div>
          </div>
          <div className="flex h-full w-1/3 items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex h-[400px] w-full flex-col items-center justify-start gap-y-5 overflow-hidden rounded-lg bg-[#A1C6EA] p-5">
            <div className="w-full rounded-lg bg-white p-2 text-center text-3xl">STEP2 </div>
            <div className="w-2/3 text-3xl">교육 오리엔테이션과 교육 및 안전, 보험과 관련된 서류 작성</div>
          </div>
          <div className="flex h-full w-1/3 items-center justify-center">
            <FaChevronRight className="text-7xl text-sky-600"></FaChevronRight>
          </div>
          <div className="flex h-[400px] w-full flex-col items-center justify-start gap-y-5 overflow-hidden rounded-lg bg-[#507DBC] p-5">
            <div className="w-full rounded-lg bg-white p-2 text-center text-3xl">STEP3</div>
            <div className="w-2/3 text-3xl">스페셜 티 코스 참가</div>
          </div>
        </div>
        <div className="flex h-full w-4/5 flex-col items-center justify-center gap-y-5 bg-[#65AFFF] py-12 text-3xl">
          <div className="w-[90%] bg-white py-2 text-center font-bold text-[#AE0000]">마스터 다이빙 자격증 취득 후</div>
          <div className="flex flex-col items-center justify-evenly gap-y-2 text-white">
            <p className="text-center">다이빙을 계획하고 조직하고 지시함으로 훈련 및 비훈련 관련 다이빙 액티비티를 감독 가능</p>
            <p className="text-center">모든 다이버 코스들의 트레이닝 세션 동안 인스트럭터를 보조하며, 독립적으로 오픈 워터 다이버 코스 학생들을</p>
            <p className="text-center">오픈 워터 다이브 코스 트레이닝 및 가이드 가능</p>
          </div>
        </div>
      </div>

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 다이버 자격증 발급 자격 </div>
        <Divider className="my-12 h-1 w-full bg-black"></Divider>

        <div className="flex h-full w-4/5 flex-col items-center justify-center gap-x-2 gap-y-5 overflow-hidden rounded-lg bg-[#CCE6F4] p-5 py-12 text-4xl font-bold">
          <div>-만 18세 이상 </div>
          <div>-오픈워터 다이버, 어드밴스 오픈워터 다이버 라이센스 소지자(or 타 단체에서 동등 자격을 가지신 분들)</div>
          <div>-EFR 응급조치 자격증 (or 타 단체에서 동등 자격을 가지신 분들) </div>
          <div>-레스큐 다이버 라이센스 소지자(or 타 단체에서 동증자격을 가지신 분들)</div>
          <div>-50회 이상의 다이브 로그기록을 가지고 있으신 분</div>
          <div>-지난 12개월 이내에 의사가 서명한 건강진술서(PDF제출) </div>
        </div>
      </div>

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 다이버 교육 과정</div>
        <Divider className="my-12 h-1 w-full bg-black"></Divider>

        <div className="flex h-full w-full flex-col items-center justify-evenly gap-y-14">
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#BBD1EA] py-2 text-center text-3xl font-bold">
              SETP1
            </div>

            <div className="text-3xl">■ 다이브 리더쉽 스킬을 배우게 됩니다.</div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 워터스킬과 스테미너 엑서사이즈를 완성하게 될 뿐 아니라, 다른 사람들이 그들의 스쿠버 능력을 개선하도록 도와주고</p>
              <p>문제를 해결하고 조작하는 능력을 키우게 해주는 트레이닝 엑서사이즈를 실행하게 됩니다.</p>
            </div>
          </div>

          <div className="relative flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex h-12 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#A1C6EA] py-2 text-center text-3xl font-bold">
              STEP2
            </div>

            <div className="flex flex-col items-center justify-evenly gap-y-3 text-3xl">
              <div>
                <p className="text-center">■ 교육 오리엔테이션과 교육 및 안전, 보험과 관련된 서류를 작성합니다.</p>
              </div>
            </div>
          </div>

          <div className="relative flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex h-12 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#507DBC] py-2 text-center text-3xl font-bold">
              STEP3{' '}
            </div>

            <div className="text-3xl">
              <p>■ 협의된 최소 5가지의 스페셜티 코스에 참가합니다.</p>
              <p>■ 스페셜티 코스는 담당강사와의 상담을 통하여 본인이 원하거나 추천받은 스페셜 티 코스를 선택하여 참여 가능합니다. </p>
            </div>
          </div>

          <div className="relative flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex h-12 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#65AFFF] py-2 text-center text-3xl font-bold">
              스페셜티 선택
            </div>

            <div className="flex w-[95%] flex-col items-center justify-evenly text-3xl">
              <p>
                프로젝트 어웨어 / 산호암초 보존 / 응급산소 제공자 / 장비 스페셜리스트 / 나이트룩스 / 디지털수중사진(DUP) / 조류다이빙 / AWARE 어류식별 다이빙 /
                다중수심 다이빙 / 정밀 부력조절 / 보트다이빙 / 수중 자연주의자 / 수중스쿠버(DPV)다이빙 / 드라이슈트 다이빙 / 야간 다이빙 / 수중항법 다이빙 /
                수중비디오 다이빙 / 아이스 다이빙 / 딥다이빙 / 사이드 마운트 다이빙 / 난파선 다이빙 / 동굴 다이빙 / 수생과 인양 다이빙
              </p>
            </div>
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
