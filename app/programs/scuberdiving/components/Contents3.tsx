import MainTitle from "@/app/programs/components/MainTitle";
import TopHeader from "@/app/programs/components/TopHeader";
import Instruction from "../../components/Instruction";
import MainDetail from "../../components/MainDetail";
import MiddleBanner from "../../components/MiddleBanner";
import Phone from "../../components/Phone";
import Requirement from "../../components/Requirement";
import Review from "../../components/Review";
import SpecialAdvantage from "../../components/SpecialAdvantage";
import Strength from "../../components/Strength";
export default function () {
  const data = {
    title: "스쿠버 다이빙",
    image: "/programnew/scuberdiving3.png",
    subtitle: "어드밴스 다이버",
    description: "한 단계 더! 스쿠버 다이빙 중급 다이버 코스",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론 교육",
        highlight: "1회",
      },
      {
        image: "/programnew/icon2.png",
        text: "제한수역(다이빙풀) 교육",
        highlight: "3회",
      },
      {
        image: "/programnew/icon3.png",
        text: "개방수역(바다해양) 교육",
        highlight: "",
      },
      {
        image: "/programnew/icon4.png",
        text: "어드밴스 다이버 자격증 발급",
        highlight: "",
      },
    ],
    condition:"※오픈워터 다이버 자격증 소지한 사람 대상",
    guide: [
      {
        title: "-장소(수영장):",
        description: "강사와 협의 후 결정",
      },
      {
        title: "-준비물:",
        description: "수영복, 세면도구, 수건, 수모(수영 모자)",
      },
      {
        title: "-포함사항:",
        description: "교육비, 자격증 발급(교재비 포함)",
      },
      {
        title: "-불포함사항:",
        description: "입장료, 장비대여&공기통대여, 해양실습",
      },
    ],
    instruction: [
      {
        title: "이론교육",
        description1: ``,
        description2: `
        <div>NASE KOREA PPT 강습 · 다이버 예절 - 이마에 마스크 올리지 않기,  탱크  세우지 않기 등</div>
<div>호흡법 + 공기고갈 대처법 · 다이빙 플랜짜기· 버디 장비 점검하기 · 네비게이션 · 플러그 차기 요령  ·중급 수신호</div>
        `,
      },
      {
        title: "제한수역(다이빙풀)",
        description1: ``,
        description2: `
        <div>맨몸 입수 · 피벗 만들기, 한손으로 마스크 다시 착용하기 · 마스크 없이 다이빙 하기</div>
<div>수중 장비점검  · 수신호로 버디와 의사교환하기 · 베일아웃  ·네비게이션  ·플로그 킥 ·장비 정리 및 보관법</div>
        `,
      },
      {
        title: "개방수역(바다해양)",
        description1: ``,
        description2: `
        <div>세션 훈련에서 습득한 스킬을 실제 바다에서 시나리오로 적용 훈련</div>
        `,
      },
      {
        title: "라이센스 발급",
        description1: ``,
        description2: `<div>어드밴스 다이버 자격증 발급 (오픈워터 다이버 라이센스 소지자 대상)</div>`,
      },
    ],
    groupImage: "/programnew/scubergroup.png",
  };
  return (
    <div
    style={{ fontFamily: "Hakgyoansim" }}
    className="w-full lg:max-w-[1280px] h-full flex flex-col items-center justify-center mt-7"
  >
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
