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
    image: '/programnew/freediving2.png',
    subtitle: '프리다이버(레벨2)',
    description: '기초기술을 정학히 배우는 프리다이버 초급 과정',
    lines: [
      {
        image: '/programnew/icon1.png',
        text: '이론수업',
        highlight: '1회',
      },
      {
        image: '/programnew/icon2.png',
        text: '얕은수심교육',
        highlight: '2회',
      },
      {
        image: '/programnew/icon2.png',
        text: '깊은수심교육',
        highlight: '2회',
      },
    ],
    condition: '※만12세이상 가능',
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
        <div>프리다이빙 장비 · 프리다이빙 호흡법 · 압력평형방법 ·프리다이빙 물리학 ·프리다이빙 생리학  ·프리다이빙 안전(LMC와 BO상황구조)  </div>  
        `,
      },
      {
        title: '얕은수심교육',
        description1: `<div>강사님과 함께 기본적인 스킬을 배우고 숙달하는 과정</div>`,
        description2: `
        <div>장비 사용 방법· 적절한 호흡법과 바디포지션 · Static(수중 숨참기)  ·DYN(핀을 사용한 다이나믹)  ·효율적인 피닝과 자세</div> 
        `,
      },
      {
        title: '깊은수심교육',
        description1: `<div>깊은 수심에 대한 적응과 기본이 되는 자세들을 숙달하는 과정</div>`,
        description2: `
        <div>귀의 압력평형(이퀄라이징) · 덕다이빙 자세연습 · CWT (수직하강)  · 수면/수중 LMC 구조와 블랙아웃 레스큐</div> 
        `,
      },
    ],
    groupImage: '/programnew/freedivinggroup.png',
    price: [
      { title: '레벨1+2', originalPrice: 520000, discountPrice: 416000, description: null, borderColor: '#0053C9' },
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
