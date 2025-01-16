import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";
function IntroductionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 예시 데이터
  const items = [
    {
      left: { title: "왼쪽 1", image: "/image1-left.jpg" },
      right: { title: "오른쪽 1", image: "/image1-right.jpg" },
    },
    {
      left: { title: "왼쪽 2", image: "/image2-left.jpg" },
      right: { title: "오른쪽 2", image: "/image2-right.jpg" },
    },
    {
      left: { title: "왼쪽 3", image: "/image1-left.jpg" },
      right: { title: "오른쪽 3", image: "/image1-right.jpg" },
    },
    {
      left: { title: "왼쪽 4", image: "/image1-left.jpg" },
      right: { title: "오른쪽 4", image: "/image1-right.jpg" },
    },
    // 더 많은 아이템 추가 가능
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // 페이지 직접 이동 함수 추가
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative w-[90vw] h-full overflow-hidden ">
        {/* 캐러셀 컨텐츠 */}
        <div
          className="flex h-full "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {/* 모든 슬라이드를 한번에 렌더링 */}
          {items.map((item, index) => (
            <div key={index} className="flex min-w-full">
              {/* 왼쪽 섹션 */}
              <div className="w-1/2 h-full relative pl-[8vw] flex flex-col justify-center items-center gap-y-10">
                <div className="text-[100px] font-bold">정은지 강사</div>
                <div className="text-[32px]" style={{ color: "#902020" }}>
                  서울 잠실, 경기 용인 | 스쿠버다이빙, 프리다이빙 강습 가능{" "}
                </div>
                <div className="text-[30px] text-center">
                  <p>
                    - 한국 최초 여자 프리다이빙 강사 / 강사훈련관
                    <br />
                    (SSI, PADI, CMAS, PTRD, EFR, React right)
                  </p>

                  <p>- 전) SSI KOREA, SCUBAPRO 한국 본사 근무</p>

                  <p>
                    - 졸) 한국해양대학교 해양과학기술대학
                    <br />
                    수중잠수과학기술학과 대학원 석사
                  </p>

                  <p>- 현) MINDSET freediving school 대표</p>

                  <p>
                    - SBS 정글의 법칙 in 캐리비언 / 사모아 / 뉴칼레도니아 편
                    촬영
                  </p>

                  <p>- 2015, 2017, 2018 해군 2함대 프리다이빙 교육</p>

                  <p>- 2015 진해 해군특수전전단(UDT) 교육</p>

                  <p>- 2015 필리핀 세부 해군 교육</p>

                  <p>- 2018~2022 진해 해난구조전대(SSU) 교육</p>

                  <p>- 2018~2023 경기소방학교 특수구조사 과정 교육</p>

                  <p>- 2017~2021 해양경찰교육원 구조대원 양성과정 교육</p>

                  <p>- 2022~2023 창원 해양경찰서 구조대 집중 교육훈련</p>

                  <p>- 2022 TEDxYonseiUniversity 프리다이빙 강연</p>
                </div>
              </div>

              {/* 오른쪽 섹션 */}
              <div className="w-1/2 h-full relative pr-[8vw] flex justify-center items-center">
                <div className="w-2/3 h-2/3 relative">
                  <Image
                    src="/instructors/expert1.png"
                    fill
                    className="object-cover rounded-2xl"
                    alt="expert1"
                  ></Image>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 화살표 버튼 */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Previous slide"
        >
          <FaCircleChevronLeft size={52} className="text-gray-500" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Next slide"
        >
          <FaCircleChevronRight size={52} className="text-gray-500" />
        </button>
      </div>
      {/* 페이지네이션 인디케이터 수정 */}
      <div className="flex gap-24 z-5 my-12">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-24 h-24 rounded-full transition-all duration-300 relative ${
              currentIndex === index
                ? "bg-gray-200 opacity-100 border-3 border-[#0077B6]"
                : "bg-gray-200 opacity-50 hover:opacity-80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image
              src={`/instructors/expert1small.png`}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default IntroductionCarousel;
