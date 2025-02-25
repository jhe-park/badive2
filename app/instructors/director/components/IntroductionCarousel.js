import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { items } from "./items";
function IntroductionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="relative w-[66vw] overflow-hidden h-full md:h-full md:min-h-[60vh]">
        {/* 캐러셀 컨텐츠 */}
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex min-w-full flex-col-reverse md:flex-row gap-y-2 md:gap-y-12">
              {/* 왼쪽 섹션 */}
              <div className="w-full md:w-1/2 md:py-12 relative px-[8vw] md:pl-[8vw] md:pr-0 flex flex-col justify-center items-center gap-y-2 md:gap-y-12">
                <div className="hidden md:block absolute top-0 left-0 text-[200px] font-bold text-gray-200 opacity-20">
                  01
                </div>
                <div className="text-2xl md:text-[100px] font-bold text-center md:text-left">{item.left.title}</div>
                <div className="text-lg md:mt-6 md:text-[32px] text-center md:text-left" style={{ color: "#902020" }}>
                  {item.left.subtitle}
                </div>
                <div
                  className="text-sm md:text-[30px] text-center md:[&>p:not(:last-child)]:mb-8"
                  dangerouslySetInnerHTML={{ __html: item.left.description1 }}
                  style={{lineHeight: "1"}}
                ></div>
                <div className="flex justify-between items-center">
                  <div
                    className="text-sm md:text-[30px] text-center"
                    dangerouslySetInnerHTML={{ __html: item.left.description2 }}
                    style={{lineHeight: "1.5"}}
                  ></div>
                  <div
                    className="text-sm md:text-[30px] text-center"
                    dangerouslySetInnerHTML={{ __html: item.left.description3 }}
                    style={{lineHeight: "1.5"}}
                  ></div>
                </div>
              </div>
              {/* 오른쪽 섹션 */}
              <div className="w-full md:w-1/2 md:py-12 relative md:px-[8vw] md:pr-[8vw] md:pl-0 flex justify-center items-center">
                <div className="w-2/3 h-[30vh] md:h-full relative">
                  <Image
                    src={item.right.image}
                    fill
                    className="object-contain rounded-2xl"
                    alt="expert1"
                  ></Image>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 화살표 버튼 */}
        {/* <button
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
        </button> */}
      </div>
      {/* 페이지네이션 인디케이터 */}
      
    </>
  );
}

export default IntroductionCarousel;
