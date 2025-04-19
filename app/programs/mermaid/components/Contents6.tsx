import { Button, Divider } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { GoShieldCheck } from 'react-icons/go';

export default function Contents6() {
  return (
    <div className="flex h-full w-[80vw] flex-col items-center justify-center">
      <div className="flex h-[800px] w-full">
        <div className="flex h-full w-1/2 items-center justify-center py-24">
          <div className="relative h-full w-2/3">
            <Image src={'/program/contents6_1.png'} alt="scubadiving" fill className="object-cover" />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-5">
          <div className="text-5xl font-bold">스페셜 티</div>
          <Divider className="h-1 w-1/2 bg-black"></Divider>
          <div className="text-3xl">스쿠버 다이빙 스킬업 과정</div>
        </div>
      </div>

      <div
        className="my-12 flex h-[380px] w-full flex-col items-center justify-evenly gap-y-5"
        style={{
          backgroundImage: 'url(/program/contents6_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-5xl font-bold">스쿠버 다이버 다이빙 스킬 업그레이드! </div>
        <div className="text-3xl">
          <p>
            <span className="font-bold">레저 다이빙의 여러 특수한 주제</span>에 대해 집중적으로 훈련하는 기본패턴 프로그램
          </p>
        </div>
        <div className="flex flex-col items-center justify-evenly gap-y-5 text-3xl">
          <p>
            ※ <span className="font-bold">※ 스페셜 티는 교육과정에 따라 이수하는데 필요시간이 다를 수 있음</span>
          </p>
        </div>
      </div>

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">마스터 다이버 다이버 교육 안내</div>
        <Divider className="my-12 h-1 w-full bg-black"></Divider>

        <div className="grid w-4/5 grid-cols-3 gap-12">
          <div className="relative col-span-1 flex h-24 items-center rounded-lg bg-[#EDF2FB]">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center text-2xl">딥 다이빙</div>
          </div>
          <div className="relative col-span-1 flex h-24 items-center rounded-lg bg-[#EDF2FB]">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center text-2xl">디지털 영상(촬영)</div>
          </div>
          <div className="relative col-span-1 flex h-24 items-center rounded-lg bg-[#EDF2FB]">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center text-2xl">드라이슈트 다이버 과정</div>
          </div>
          <div className="relative col-span-1 flex h-24 items-center rounded-lg bg-[#C1D3F2]">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center text-2xl">장비 전문가 과정</div>
          </div>
          <div className="relative col-span-1 flex h-24 items-center rounded-lg bg-[#C1D3F2]">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center text-2xl">수중 자연주의자 과정</div>
          </div>
          <div className="relative col-span-1 flex h-24 items-center rounded-lg bg-[#C1D3F2]">
            <div className="absolute left-[5%]">
              <GoShieldCheck className="text-5xl text-sky-600" />
            </div>
            <div className="flex h-full w-full items-center justify-center text-2xl">야간 다이빙 과정</div>
          </div>
        </div>
        <div className="mt-12 flex h-full w-4/5 flex-col items-center justify-center gap-y-10 bg-[#65AFFF] py-12 text-3xl">
          <div className="w-[90%] bg-white py-2 text-center font-bold">그 외 스페셜 티</div>
          <div className="flex w-[90%] flex-col items-center justify-evenly gap-y-2 text-white">
            <p className="text-center">프로젝트 어웨어 ·산호 암초 보존 · 응급산소 제공자 · 나이트룩스 · 조류 다이빙 · AWARE 어류식별 다이빙</p>
            <p className="text-center">다중 수심 다이빙 · 정밀 부력조절 · 보트 다이빙 · 수중스쿠터(DPV)다이빙 · 드라이슈트 다이빙</p>
            <p className="text-center">야간 다이빙 · 수중항법 다이빙 · 수중비디오 다이빙 · 아이스 다이빙 · 사이드 마운트 다이빙 · 난파선 다이빙</p>
            <p className="text-center">동굴 다이빙 · 수생과 인양 다이빙</p>
          </div>
        </div>
      </div>

      <div className="my-12 flex h-full w-full flex-col items-center justify-evenly gap-y-5">
        <div className="text-5xl font-bold">스페셜 티 교육 과정</div>
        <Divider className="my-12 h-1 w-full bg-black"></Divider>

        <div className="flex h-full w-full flex-col items-center justify-evenly gap-y-14">
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDF2FB] py-2 text-center text-3xl font-bold">
              01
            </div>

            <div className="text-3xl">■ 딥다이빙</div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 최대수심 40m 무감압 오픈워터 다이빙을 계획하고 실수할 수 있도록 훈련하는 과정</p>
            </div>
          </div>
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDF2FB] py-2 text-center text-3xl font-bold">
              02
            </div>

            <div className="text-3xl">■ 디지털 영상(촬영) </div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 비디오와 사진을 포함하여 다양한 수중 영상 장비 사용법에 대해 훈련하는 과정 </p>
            </div>
          </div>
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDF2FB] py-2 text-center text-3xl font-bold">
              03
            </div>

            <div className="text-3xl">■ 드라이슈트 다이버 과정 </div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 드라이 슈트 착용법 · 드라이슈트 납무게 산출 및 수면에서의 부력 점검 · 직립 또는 수평자세로 하강 및 상승 </p>
              <p>· 수중에서 인플레이터 호스 분리 및 다시 연결하기 · 드라이슈트 배출밸브 오픈 후 중성부력 유지하기</p>
              <p>· 드라이슈트 침수 대처 등 응급사항 훈련 </p>
            </div>
          </div>
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDF2FB] py-2 text-center text-3xl font-bold">
              04
            </div>

            <div className="text-3xl">■ 장비전문가 과정 </div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 올바른 다이빙 장비 관리 요령과 스쿠버 시스템의 작동 방법에 대해 훈련하는 과정 </p>
            </div>
          </div>
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDF2FB] py-2 text-center text-3xl font-bold">
              05
            </div>

            <div className="text-3xl">■ 수중 자연주의자 과정 </div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 다이버들이 과학적인 방법을 사용하여 자료 수집과 훈련 장소의 동물 및 식물들을 인식하는 방법을 훈련하는 과정 </p>
            </div>
          </div>
          <div className="relative mt-12 flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#EDF2FB] py-2 text-center text-3xl font-bold">
              06
            </div>

            <div className="text-3xl">■ 야간 다이빙 과정 </div>
            <div className="flex flex-col items-center justify-evenly text-3xl text-[#8D0000]">
              <p>· 일몰 후부터 일출 전까지의 사이에 실시된 다이빙을 의미하며, 야간 다이빙 준비를 위한 상세 다이빙 계획 수립, </p>
              <p>위험 요인 인식 및 예방법 등을 훈련하는 과정</p>
            </div>
          </div>

          <div className="relative flex w-4/5 flex-col items-center justify-evenly gap-y-5 border-2 border-black py-12">
            <div className="absolute left-1/2 top-0 flex h-12 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#65AFFF] py-2 text-center text-3xl font-bold">
              스페셜티 선택
            </div>

            <div className="flex w-[95%] flex-col items-center justify-evenly text-3xl">
              <p>
                프로젝트 어웨어 / 산호암초 보존 / 응급산소 제공자 / 나이트룩스 / 조류다이빙 / AWARE 어류식별 다이빙 / 다중수심 다이빙 / 정밀 부력조절 /
                보트다이빙 / 수중스쿠버(DPV)다이빙 / 드라이슈트 다이빙 / 야간 다이빙 / 수중항법 다이빙 / 수중비디오 다이빙 / 아이스 다이빙 / 사이드 마운트
                다이빙 / 난파선 다이빙 / 동굴 다이빙 / 수생과 인양 다이빙
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
