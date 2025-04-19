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
    image: '/programnew/underwater3.png',
    subtitle: '마스터 언더워터 댄스(D3)',
    description: '최고의 기술로 빚어내는 물속의 걸작',
    lines: [
      {
        image: '/programnew/icon1.png',
        text: '준비중',
        highlight: '',
      },
      {
        image: '/programnew/icon12.png',
        text: '준비중',
        highlight: '',
      },
      {
        image: '/programnew/icon2.png',
        text: '준비중',
        highlight: '',
      },
    ],
    condition: '※ 만 6세 이상, 베이직 언더워터 댄스 수료자 참여  가능 ',
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
        description1: `<div>준비중중</div>`,
        description2: `
        
        `,
      },
      {
        title: '스튜디오',
        description1: `<div>준비중중</div>`,
        description2: `
        `,
      },
      {
        title: '다이빙풀',
        description1: `<div>준비중중</div>`,
        description2: `
        `,
      },
    ],
    groupImage: '/programnew/underwatergroup.png',
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
