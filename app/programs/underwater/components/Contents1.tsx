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
    title: '언더워터 댄스',
    image: '/programnew/underwater1.png',
    subtitle: '베이직 언더워터 댄스 (D1)',
    description: '물결처럼 부드럽게 언더워터 댄스 입문 과정',
    lines: [
      {
        image: '/programnew/icon1.png',
        text: '이론수업',
        highlight: '1세션',
      },
      {
        image: '/programnew/icon12.png',
        text: '스튜디오',
        highlight: '1세션',
      },
      {
        image: '/programnew/icon2.png',
        text: '다이빙 풀',
        highlight: '1세션',
      },
    ],
    condition: '※ 만 6세 이상 가능 ',
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
    guideCondition: [
      {
        title: '＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.  ',
      },
    ],
    instruction: [
      {
        title: '이론교육',
        description1: `<div>베이직 언더워터 댄스를 배우기 전, 기본 이론을 다루는 과정</div>`,
        description2: `
        <div>언더워터 댄스 역사- 숨참기  ·물과 인체에 대한 이해  ·춤의 기본기 ·마인드 셋 ·안전</div>  
        `,
      },
      {
        title: '스튜디오',
        description1: `<div>물에 들어가기 전, 거울이 있는 연습실에서 미리 스킬을 연습해보는 과정</div>`,
        description2: `
        <div>스트레칭 · 바디 컨디셔닝 ·베이직 언더워터 댄스 스킬 ·안전 및 레스큐 ·페이스 및 헤어 컨트롤 </div> 
        `,
      },
      {
        title: '다이빙풀',
        description1: `<div>물속에서 언더워터 댄스를 하기 위한 스킬을 배우는 과정</div>`,
        description2: `
        <div>물에 떠 있기 · 부력조절 ·베이직 언더워터 댄스 스킬 · 안전 및 레스큐 · 페이스 및 헤어 컨트롤 </div> 
        `,
      },
    ],
    groupImage: '/programnew/underwatergroup.png',
  };

  return (
    <div style={{ fontFamily: 'Hakgyoansim' }} className="w-full lg:max-w-[1280px] h-full flex flex-col items-center justify-center mt-7">
      <TopHeader></TopHeader>
      <MainTitle data={data}></MainTitle>
      <MainDetail data={data}></MainDetail>
      <Instruction data={data} />
      <MiddleBanner data={data}></MiddleBanner>

      <Review></Review>
      <Phone></Phone>
      <Requirement data={data}></Requirement>
    </div>
  );
}
