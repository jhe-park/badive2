import Instruction from '../../components/Instruction';
import MainDetail from '../../components/MainDetail';
import MainTitle from '../../components/MainTitle';
import MiddleBanner from '../../components/MiddleBanner';
import Phone from '../../components/Phone';
import Requirement from '../../components/Requirement';
import Review from '../../components/Review';
import TopHeader from '../../components/TopHeader';

export default function () {
  const data = {
    title: '프리다이빙',
    image: '/programnew/freediving3.png',
    subtitle: '어드밴스드 프리다이버(레벨3)',
    description: '지식과 기술을 결합한 진정한 프리다이빙의 시작',
    lines: [
      {
        image: '/programnew/icon1.png',
        text: '이론수업',
        highlight: '1회',
      },
      {
        image: '/programnew/icon2.png',
        text: '얕은수심교육',
        highlight: '1회',
      },
      {
        image: '/programnew/icon2.png',
        text: '깊은수심교육',
        highlight: '3회',
      },
    ],
    condition: '※만15세이상 가능',
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
        description: '입장료, 장비대여',
      },
    ],
    instruction: [
      {
        title: '이론교육',
        description1: `<div>프리다이빙 이론강습</div>`,
        description2: `
        <div>프렌젤의 이해와 연습 · 폐 구조의 이해와 폐압착 예방 · 프리폴의 이해와 연습 ·프리다이빙 루틴 만들기 </div>  
        `,
      },
      {
        title: '얕은수심교육',
        description1: `<div>반복 연습을 통해 프리다이빙 스킬을 배우고 숙달하는 과정</div>`,
        description2: `
        <div>Static(수중 숨참기)  ·DYN(핀을 사용한 다이나믹)  ·버디시스템 연습 ·중성부력찾기 </div> 
        `,
      },
      {
        title: '깊은수심교육',
        description1: `<div>깊은 수심에 대한 적응과정</div>`,
        description2: `
        <div>CWT (수직하강)  · 프리폴 연습 ·효율적이고 적절한 바디포지션  ·버디시스템 연습 ·수면/수중 LMC 구조와 블랙아웃 레스큐</div> 
        `,
      },
    ],
    groupImage: '/programnew/freedivinggroup.png',
    price: [
      { title: '레벨3', originalPrice: 680000, discountPrice: null, description: null, borderColor: '#0053C9' },
      { title: '레벨1+2+3', originalPrice: 1000000, discountPrice: 800000, description: null, borderColor: '#0053C9' },
    ],
  };
  return (
    <div style={{ fontFamily: 'Hakgyoansim' }} className="mt-7 flex h-full w-full flex-col items-center justify-center lg:max-w-[1280px]">
      <TopHeader></TopHeader>
      <MainTitle data={data}></MainTitle>
      <MainDetail data={data}></MainDetail>
      <Instruction data={data} />
      <MiddleBanner data={data}></MiddleBanner>
      {/* <SpecialAdvantage></SpecialAdvantage> */}
      {/* <Strength></Strength> */}
      <Review></Review>
      <Phone></Phone>
      <Requirement data={data}></Requirement>
    </div>
  );
}
