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
                <div className="absolute top-0 left-0 text-[200px] font-bold text-gray-200 opacity-20">
                  01
                </div>
                <div className="text-[100px] font-bold">{item.left.title}</div>
                <div className="text-[32px]" style={{ color: "#902020" }}>
                  {item.left.subtitle}
                </div>
                <div
                  className="text-[30px] text-center"
                  dangerouslySetInnerHTML={{ __html: item.left.description1 }}
                ></div>
                <div className="flex justify-between items-center">
                  <div
                    className="text-[30px] text-center"
                    dangerouslySetInnerHTML={{ __html: item.left.description2 }}
                  ></div>
                  <div
                    className="text-[30px] text-center"
                    dangerouslySetInnerHTML={{ __html: item.left.description3 }}
                  ></div>
                </div>
              </div>
              {/* 오른쪽 섹션 */}
              <div className="w-1/2 h-full relative pr-[8vw] flex justify-center items-center">
                <div className="w-2/3 h-2/3 relative">
                  <Image
                    src={item.right.image}
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
      {/* <div className="flex gap-24 z-5 my-12">
        {items.map((item, index) => (
          <div className="flex flex-col items-center justify-center gap-y-4">
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-24 h-24 rounded-full transition-all duration-300 relative flex flex-col items-center justify-center ${
                currentIndex === index
                  ? "bg-gray-200 opacity-100 border-3 border-[#0077B6]"
                  : "bg-gray-200 opacity-50 hover:opacity-80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Image
                src={item.small}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="w-full text-2xl text-center">{item.smallTitle}</div>
          </div>
        ))}
      </div> */}
    </>
  );
}

export default IntroductionCarousel;
