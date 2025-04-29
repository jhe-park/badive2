import MainTitle from '@/app/programs/components/MainTitle';
import TopHeader from '@/app/programs/components/TopHeader';
import Instruction from '../../components/Instruction';
import MainDetail from '../../components/MainDetail';
import MiddleBanner from '../../components/MiddleBanner';
import Phone from '../../components/Phone';
import Requirement from '../../components/Requirement';
import Review from '../../components/Review';
import SpecialAdvantage from '../../components/SpecialAdvantage';
import Strength from '../../components/Strength';

export default function () {
  const data = {
    title: '스쿠버 다이빙',
    image: '/programnew/scuberdiving5.png',
    subtitle: '마스터 다이버',
    description: '최고 중의 최고! 엘리트 다이버 ',
    lines: [
      {
        image: '/programnew/icon1.png',
        text: '이론 교육',
        highlight: '2회',
      },
      {
        image: '/programnew/icon2.png',
        text: '제한수역(다이빙풀) 교육',
        highlight: '3회',
      },
      {
        image: '/programnew/icon3.png',
        text: '개방수역(바다해양) 교육',
        highlight: '',
      },
      {
        image: '/programnew/icon4.png',
        text: '마스터 다이버 자격증 발급',
        highlight: '',
      },
    ],
    condition: '※만 18세 이상, 오픈워터, 어드밴스, 레시큐 다이버 자격 취득<br/>※ 5가지 스페셜 티 코스 자격증 필요<br/>※ 최소 50회 다이빙 로그 필요<br/>※ 마스터 강습 비용은 별도 문의 ',
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
        title: '이론교육',
        description1: ``,
        description2: `
        <div> NASE KOREA PPT 강습 · 다이버 플랜짜기 및 통솔 방법 · 다이빙 과학, 생리학, 다이빙 환경, 장비, 다이빙 계획 짜기 등 · 이론 문제 풀기</div>
<div>이론 문제 해설 · 최상급 수신호 익히기 · 수신호 연습하기</div>
        `,
      },
      {
        title: '제한수역(다이빙풀)',
        description1: ``,
        description2: `
        <div>비치, 10미터, 15미터, 20미터에서 초급다이버 인솔해보기 · 딥, 네비게이션, 야간, 수객과 인양, 수중 측량 등 스페셜 티로 기량 상승</div>
<div> 5개 이상의 스페셜티와 100회 이상의 깡수면 · 다이빙 계획 수립</div>
        `,
      },
      {
        title: '개방수역(바다해양)',
        description1: ``,
        description2: `
        <div>세션 훈련에서 습득한 스킬을 실제 바다에서 시나리오로 적용 훈련 </div>
        `,
      },
      {
        title: '라이센스 발급',
        description1: ``,
        description2: `<div>마스터 다이버 자격증 발급 ( 만 18세이상, 오픈워터, 어드밴스, 레시큐 다이버 자격 취득자, 5가지 PADI 스페셜 티 코스 자격증 필요, 최소 50회 다이빙 로그 필요) </div>`,
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
