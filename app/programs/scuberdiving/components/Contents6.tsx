import React from 'react';
import Image from 'next/image';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Button } from '@heroui/react';
import TopHeader from '@/app/programs/components/TopHeader';
import MainTitle from '@/app/programs/components/MainTitle';
import MainDetail from '../../components/MainDetail';
import { Divider } from '@heroui/react';
import Instruction from '../../components/Instruction';
import MiddleBanner from '../../components/MiddleBanner';
import Review from '../../components/Review';
import Phone from '../../components/Phone';
import Requirement from '../../components/Requirement';
import SpecialAdvantage from '../../components/SpecialAdvantage';
import Strength from '../../components/Strength';

export default function () {
  const data = {
    title: '스쿠버 다이빙',
    image: '/programnew/scuberdiving6.png',
    subtitle: '스페셜 티',
    description: '스쿠버 다이빙 스킬 업그레이드!',
    lines: [
      {
        image: '/programnew/icon7.png',
        text: '딥 다이빙',
        highlight: '',
      },
      {
        image: '/programnew/icon8.png',
        text: '디지털 영상(촬영)',
        highlight: '',
      },
      {
        image: '/programnew/icon9.png',
        text: '드라이슈트 다이버 과정',
        highlight: '',
      },
      {
        image: '/programnew/icon10.png',
        text: '그 외 스페셜 티 선택 과정 ',
        highlight: '',
      },
    ],
    condition: '※ 스페셜 티는 교육과정에 따라 이수하는데 필요한 시간이 다를 수 있음<br/>※ 스페셜 티 강습 비용은 별도 문의 ',
    guide: [
      {
        title: '-장소(수영장):',
        description: '강사와 협의 후 결정',
      },
      {
        title: '-준비물:',
        description: '수영복, 세면도구, 수건, 수모(수영 모자)',
      },
      {
        title: '-포함사항:',
        description: '교육비, 자격증 발급(교재비 포함)',
      },
      {
        title: '-불포함사항:',
        description: '입장료, 장비대여&공기통대여, 체험강습비',
      },
    ],
    instruction: [
      {
        title: '딥 다이빙',
        description1: ``,
        description2: `
        <div>최대 수심 40m 무감압 오픈워터 다이빙을 계획하고 실수 할 수 있도록 훈련하는 과정</div>

        `,
      },
      {
        title: '디지털 영상(촬영)',
        description1: ``,
        description2: `
        <div>비치, 10미터, 15미터, 20미터에서 초급다이버 인솔해보기 · 딥, 네비게이션, 야간, 수객과 인양, 수중 측량 등 스페셜 티로 기량 상승</div>
        `,
      },
      {
        title: '드라이슈트 다이버 과정',
        description1: ``,
        description2: `
        <div>드라이 슈트 착용법 · 드라이슈트 납무게 산출 및 수면에서의 부력점검 · 직립 또는 수평자세로 하강 및 상승</div>
        <div>수중에서 인플레이터 호스 분리 및 다시 연결 하기 등 </div>
        `,
      },
      {
        title: '그 외 스페셜 티 선택 과정',
        description1: ``,
        description2: `<div>장비 전문가 과정/ 수중 자연주의자 과정/ 야간 다이빙 과정/ 프로젝트 어웨어 / 산호암초 보존/ 응급산소 제공자 / 나이트 룩스/ 조류다이빙 / AWARE 어류식별 다이빙 / 다중수심 다이빙  </div>
        <div>정밀 부력조절 / 보트 다이빙 /수중스쿠터(DPV)다이빙 /드라이슈트 다이빙 /야간 다이빙 /수중항법 다이빙 /수중비디오 다이빙 /아이스 다이빙/사이드 마운트 다이빙  /난파선 다이빙 / 동굴 다이빙 /수생과 인양 다이빙</div>
        `,
      },
    ],
    groupImage: '/programnew/scubergroup.png',
  };
  return (
    <div style={{ fontFamily: 'Hakgyoansim' }} className="mt-7 flex h-full w-full flex-col items-center justify-center lg:max-w-[1280px]">
      <TopHeader></TopHeader>
      <MainTitle data={data}></MainTitle>
      <MainDetail data={data}></MainDetail>
      <Instruction data={data} />
      <MiddleBanner data={data}></MiddleBanner>
      <SpecialAdvantage></SpecialAdvantage>
      <Strength></Strength>
      <Review></Review>
      <Phone></Phone>
      <Requirement data={data}></Requirement>
    </div>
  );
}
