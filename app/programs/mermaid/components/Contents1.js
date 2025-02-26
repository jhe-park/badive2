import React from "react";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Button } from "@heroui/react";
export default function () {
  const data = {
    title: "머메이드",
    image: "/programnew/mermaid1.png",
    subtitle: "베이직 머메이드",
    description: "인어의 매력을 담은 특별한 워터 스포츠 기초 과정",
    lines: [
      {
        image: "/programnew/icon1.png",
        text: "이론수업",
        highlight: "",
      },
      {
        image: "/programnew/icon2.png",
        text: "베이직 머메이드 다이빙 기술 교육",
        highlight: "",
      },
      {
        image: "/programnew/icon2.png",
        text: "제한 수역(다이빙 풀) 교육",
        highlight: "",
      },
    ],
    condition: "※ 만 6세 이상 가능 ",
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
        description: "입장료, 장비대여",
      },
    ],
    guideCondition: [
      {
        title: "＊머메이드 서울 교육은 3인이상 가능합니다.",
      },
      {
        title:
          "＊ 모든 강습은 개인에 따라 일정이 추가 되거나 변경될 수 있습니다.  ",
      },
    ],
  };
  return (
    <div
      style={{ fontFamily: "Hakgyoansim" }}
      className="w-[90vw] md:w-[66vw] h-full flex flex-col items-center justify-center pt-24"
    >
      <div className="w-full h-full py-12 md:mpy-0 md:aspect-[1280/655] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <Image src="/programnew/upper.png" alt="frame" fill />
        </div>
        <div className="ml-[12vw] w-1/3 aspect-[555/126] flex flex-col items-center justify-center relative">
          <Image src="/programnew/bubble1.png" alt="frame" fill />
        </div>

        <div className="flex flex-col items-center justify-center z-10">
          <p className="text-[24px] md:text-[64px] font-bold">
            이제 안전한 다이빙을 원한다면
          </p>
          <p className="text-[24px] md:text-[64px] font-bold">
            <span className="text-[#0054CA]">바다이브</span>와 함께 !{" "}
          </p>
        </div>
      </div>

      {/* <div className="font-bold w-full flex items-center justify-center text-[20px] md:text-[64px]  mt-12 mb-7 md:mt-36 md:mb-20">
        바다이브에서만 볼 수 있는
        <span className="text-[#0054CA]">특별 혜택</span>!
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-y-12">
        <div className="w-full h-full md:aspect-[1280/559] flex flex-col md:flex-row justify-between items-center md:p-12">
          <div className="w-full  md:w-[55%] flex flex-col items-start justify-evenly h-full">
            <div className="flex flex-col justify-center items-center md:items-start w-full">
              <div className="text-[20px] md:text-[32px] ">
                해양실습의 선택 조건!
              </div>
              <div className="text-[24px] md:text-[64px] font-bold text-[#0053C9]">
                해양실습 보험 가입
              </div>
            </div>

            <div className="text-[16px] md:text-[32px] flex flex-col justify-center items-center md:items-start w-full">
              <p>바다이브에서만 가능한 안전한 해양실습 보험 가입!</p>
              <p>'스포츠 안전 공제 보험'을 바다이브 회원이신</p>
              <p>모든 회원분들에게 가입 후 교육을 진행합니다.</p>
            </div>
            <div className="text-[10px] md:text-[20px] text-[#7A7A7A] flex flex-col justify-center items-center w-full text-center md:text-start">
              <p className="text-center md:text-start w-full">
                *오픈워터다이버 강습 필수 참여
              </p>
            </div>
          </div>
          <div className="relative w-[60%] aspect-[1/1] md:w-[400px] md:h-[400px] ">
            <Image src="/programnew/insurance.png" alt="frame" fill />
          </div>
        </div>
        <div className="w-full h-full md:aspect-[1280/500] flex flex-col md:flex-row justify-between items-center md:p-12">
          <div className="relative w-[60%] aspect-[1/1] md:w-[400px] md:h-[400px] order-2 md:order-1">
            <Image src="/programnew/exercise.png" alt="frame" fill />
          </div>
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full md:order-2">
            <div className="flex flex-col justify-center items-center md:items-start">
              <div className="text-[20px] md:text-[32px] ">
                차별화된 체계적인 교육 실습 !{" "}
              </div>
              <div className="text-[24px] md:text-[64px] font-bold text-[#0053C9]">
                수영장 실습 3회!{" "}
              </div>
            </div>

            <div className="text-[16px] md:text-[32px] flex flex-col justify-center items-center md:items-start">
              <p>바다이브에서는 더욱 확실한 </p>
              <p>기초 교육을 위해 수영장 실습 3회 진행 !</p>
              <p>바다이브 회원분들은 기초적인 수영장 교육을</p>
              <p>더욱 체계적으로 받으실 수 있습니다. </p>
            </div>
          </div>
        </div>
        <div className="w-full aspect-[1280/600] flex flex-col md:flex-row justify-between items-center md:p-12">
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full ">
            <div className="flex flex-col justify-center items-center md:items-start">
              <div className="text-[20px] md:text-[32px] ">
                다양하게 다이빙을 즐기기 위한 투어 !
              </div>
              <div className="text-[24px] md:text-[64px] font-bold text-[#0053C9]">
                매월 정기투어 진행!
              </div>
            </div>

            <div className="text-[16px] md:text-[32px] flex flex-col justify-center items-center md:items-start">
              <p className="text-center md:text-left">
                매월 라이센스를 보유한 회원분들을 대상으로 한 펀다이빙 정기투어
                !
              </p>
              <p className="text-center md:text-left">
                안전한 다이빙을 위한 수영장 실습 교육투어 진행!
              </p>
              <p className="text-center md:text-left">
                바다이브에서는 매월 바다이브 회원들을 대상으로 정기투어와
                교육투어를 진행합니다.
              </p>
            </div>
          </div>
          <div className="relative w-[60%] aspect-[1/1] md:w-[400px] md:h-[400px] order-2 md:order-2">
            <Image src="/programnew/tour.png" alt="frame" fill />
          </div>
        </div>
        <div className="w-full aspect-[1280/650] flex flex-col md:flex-row justify-between items-center md:p-12">
          <div className="relative w-[60%] aspect-[1/1] md:w-[400px] md:h-[400px] order-2 md:order-1">
            <Image src="/programnew/incheon.png" alt="frame" fill />
          </div>
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start justify-evenly h-full md:order-2">
            <div className="flex flex-col justify-center items-center md:items-start">
              <div className="text-[20px] md:text-[32px] ">
                더욱 즐거운 다이빙을 하기 위한 연습!{" "}
              </div>
              <div className="text-[24px] md:text-[64px] font-bold text-[#0053C9]">
                인천 수영장 개인연습 가능!
              </div>
            </div>

            <div className="text-[16px] md:text-[32px] gap-y-4 flex flex-col justify-center items-center md:items-start">
              <p className="text-center md:text-left">
                바다이브에서는 회원분들을 위해 개인연습이 가능하도록 인천
                수영장을 개방합니다.
              </p>
              <p className="text-center md:text-left">
                다이빙 풀 입장 예약을 하시면 언제든지 수영장에서 개인연습이
                가능합니다.{" "}
              </p>
              <p className="text-[10px] md:text-[20px] text-[#7A7A7A]">
                ※ 협회 연회비, 수영장입장료, 장비렌탈, 강사입장료 별도
              </p>
              <p className="text-[10px] md:text-[20px] text-[#0077B6]">
                자세히 보러가기 →
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#BAEBFF] h-full md:aspect-[1280/800] flex justify-between items-center flex-col mt-12 md:mt-0 py-12 md:py-6">
        <div className="w-full flex flex-col items-center justify-center h-full font-bold text-[24px] md:text-[64px] text-center gap-y-10 md:gap-y-20">
          <div className="text-center w-full">
            바다이브만의 장점{" "}
            <span className="text-[#0054CA]">한눈에 보기</span>
          </div>
          <div className="w-[80%] aspect-[948/433] flex flex-col md:flex-row items-center justify-between gap-x-6">
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-y-7">
              <div className="flex flex-col items-center justify-between text-white bg-[#4793FF] w-full aspect-[3/2] rounded-3xl p-6">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    독보적인 강습 프로그램{" "}
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    교육실습 무조건 3회!{" "}
                  </div>
                </div>
                <div className="flex  items-center justify-end w-full">
                  <div className="w-16 aspect-[75/85] relative">
                    <Image src="/programnew/show1.png" alt="frame" fill />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between text-white bg-[#0053C9] w-full aspect-[3/2] rounded-3xl p-6">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    가격이 부담된다면 !
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    무료클래스 진행 !
                  </div>
                </div>
                <div className="flex  items-center justify-end w-full">
                  <HiOutlineArrowNarrowRight className="text-white text-[30px] " />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-y-7 mt-7 md:mt-0">
              <div className="flex flex-col items-center justify-between text-white bg-[#0053C9] w-full aspect-[3/2] rounded-3xl p-6">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    체계적인 강습
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    전문적인 강사들 보유{" "}
                  </div>
                </div>
                <div className="flex  items-center justify-end w-full">
                  <HiOutlineArrowNarrowRight className="text-white text-[30px] " />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-between gap-y-7 mt-7 md:mt-0">
              <div className="flex flex-col items-center justify-between text-white bg-[#0053C9] w-full aspect-[3/2] rounded-3xl p-6">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    더욱 나아진 다이빙을 위해
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    개인연습 수영장 보유
                  </div>
                </div>
                <div className="flex  items-center justify-end w-full">
                  <HiOutlineArrowNarrowRight className="text-white text-[30px] " />
                </div>
              </div>
              <div className="flex flex-col items-center justify-between text-white bg-[#4793FF] w-full aspect-[3/2] rounded-3xl p-6">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="text-[15px] md:text-[20px] font-medium">
                    색다른 다이빙 투어{" "}
                  </div>
                  <div className="text-[20px] md:text-[30px] font-bold">
                    월 정기투어 진행 !
                  </div>
                </div>
                <div className="flex  items-center justify-end w-full">
                  <div className="w-16 aspect-[69/78] relative">
                    <Image src="/programnew/show2.png" alt="frame" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full flex flex-col items-center justify-center h-full font-bold text-[64px] text-center mt-20 mb-12 md:mt-40 md:mb-20">
        <p className="text-[24px] md:text-[64px]">
          바다이브 <span className="text-[#0054CA]">{data.title}</span>
          <br className="md:hidden" /> 강습 프로그램
        </p>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center h-full font-bold text-[64px] text-center mb-6 md:mt-40 md:mb-20">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-y-10">
          <div className="w-[90vw] md:w-[500px] aspect-[500/400] relative">
            <Image className="rounded-3xl" src={data.image} alt="frame" fill />
          </div>
          <div>
            <div className="text-[24px] md:text-[50px] font-bold text-[#0053C9]">
              {data.subtitle}
            </div>
            <div className="text-[18px] md:text-[36px] font-medium ">
              {data.description}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-y-10 md:gap-y-20">
          <div className="flex flex-col items-start justify-center gap-y-4 md:gap-y-10 w-full mt-6 md:mt-0 font-medium">
            {data.lines.map((item, index) => (
              <div
                key={index}
                className="text-[18px] md:text-[36px] flex flex-row items-center justify-center gap-x-4 w-full"
              >
                <img src={item.image} alt="frame" className="w-10 h-10" />
                <p>
                  {item.text}{" "}
                  <span className="text-[#0077B6]">{item.highlight}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="text-[12px] md:text-[20px] text-[#7A7A7A] font-medium">
              {data.condition}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center h-full font-bold text-[64px] text-center md:mt-20 bg-[#BAEBFF] py-12">
        <div className="text-[24px] md:text-[64px] font-bold">
          실제 강습 받으신 회원님의
          <br className="md:hidden" />
          <span className="text-[#0054CA]">솔직 리뷰</span>!
        </div>
        <div className="text-[16px] md:text-[35px]">
          회원리뷰 <span className="text-[#FF9D00]">4.9</span> 실제 회원님들이
          <br className="md:hidden" />
          추천하시는 바다이브 강습 !{" "}
        </div>
        <div className="w-full flex flex-col md:flex-row items-start justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[90vw] md:w-[500px] aspect-[500/250] relative md:-mr-20 ">
              <Image src="/programnew/chatbubble1.png" alt="frame" fill />
            </div>
            <div className="w-[90vw] md:w-[500px] aspect-[500/250] relative md:-mr-20 ">
              <Image src="/programnew/chatbubble2.png" alt="frame" fill />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:mt-[125px]">
            <div className="w-[90vw] md:w-[500px] aspect-[500/250] relative md:-mr-20 ">
              <Image src="/programnew/chatbubble3.png" alt="frame" fill />
            </div>
            <div className="w-[90vw] md:w-[500px] aspect-[500/250] relative md:-mr-20 ">
              <Image src="/programnew/chatbubble4.png" alt="frame" fill />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full md:aspect-[1280/1400] flex flex-col items-center justify-center font-bold text-[64px] mt-8 md:mt-16">
        <div className="w-[90%] md:w-[60%] aspect-[832/1200] relative">
          <Image src="/programnew/phone.png" alt="frame" fill />
        </div>
      </div>

      <div className="w-full h-full md:aspect-[1280/693] flex flex-col items-center justify-evenly text-[24px] md:text-[64px] mt-30 bg-[#BAEBFF] py-12 md:py-0 px-4 md:px-0 mb-12 md:mb-0 mt-12 md:mt-0">
        <div className="text-[24px] md:text-[64px] font-bold">
          강습 받기 전,{" "}
          <span className="text-[#0053C9]">필수로 알아야 할 사항 ! </span>
        </div>
        <div className="flex flex-col items-start justify-start text-[20px] md:text-[40px]">
          {data.guide.map((item, index) => (
            <div key={index}>
              <span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">
                {item.title}
              </span>{" "}
              {item.description}
            </div>
          ))}
          {/* <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">준비물:</span> 수영복, 세면도구, 수건, 수모(수영 모자)</div>
            <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">포함사항:</span> 교육비, 자격증 발급(교재비 포함)</div>
            <div><span className="text-[20px] md:text-[40px] text-[#0053C9] font-bold">불포함사항:</span> 입장료, 장비대여&공기통대여, 해양실습 </div> */}
        </div>
        <div className="flex flex-col items-center justify-center ">
          {data.guideCondition.map((item, index) => (
            <div
              key={index}
              className="text-[12px] md:text-[20px] text-[#7A7A7A]"
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center mt-6 md:mt-0">
          <Button className="font-bold w-[50%] md:w-[20%] py-4 md:py-12 bg-[#0053C9] text-white rounded-3xl text-[20px] md:text-[40px]">
            예약하기
          </Button>
        </div>
      </div>
    </div>
  );
}
