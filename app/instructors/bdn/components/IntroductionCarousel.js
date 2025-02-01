import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { items } from "./items";
import useInstructor from '@/app/store/useInstructor'

function IntroductionCarousel() {
  const { instructor, setInstructor } = useInstructor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(!window.matchMedia('(min-width: 768px)').matches);
    
    const handleResize = () => {
      setIsMobile(!window.matchMedia('(min-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setInstructor(items[newIndex].left.title);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setInstructor(items[newIndex].left.title);
  };

  // 페이지 직접 이동 함수 추가
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setInstructor(items[index].left.title);
  };
  return (
    <>
      <div className="relative w-[90vw] overflow-hidden h-full md:h-full">
        {/* 캐러셀 컨텐츠 */}
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {/* 모든 슬라이드를 한번에 렌더링 */}
          {items.map((item, index) => (
            <div key={index} className="flex min-w-full flex-col md:flex-row gap-y-2 md:gap-y-12">
              {/* 오른쪽 섹션 - 모바일에서는 위로 */}
              <div className="w-2/3 md:w-1/2 md:py-12 relative md:px-[8vw] md:pr-[8vw] md:pl-0 flex justify-center items-center order-1 md:order-2 justify-center w-full">
                <div className="w-2/3 h-[30vh] md:h-full md:w-2/3 relative">
                  <Image
                    src={item.right.image}
                    fill
                    className="object-cover rounded-2xl"
                    alt="expert1"
                  ></Image>
                </div>
              </div>

              {/* 왼쪽 섹션 - 모바일에서는 아래로 */}
              <div className="w-full md:w-1/2 md:py-12 relative px-[8vw] md:pl-[8vw] md:pr-0 flex flex-col justify-center items-center gap-y-2 md:gap-y-12 order-2 md:order-1">
                <div className="hidden md:block absolute top-0 left-0 text-[200px] font-bold text-gray-200 opacity-20">
                  01
                </div>
                <div className="text-2xl md:text-[100px] font-bold text-center md:text-left">{item.left.title}</div>
                <div className="text-lg md:mt-6 md:text-[32px] text-center md:text-left" style={{ color: "#902020" }}>
                  {item.left.subtitle}
                </div>
                <div
                  className={`text-sm md:text-[30px] text-center md:[&>p:not(:last-child)]:mb-8 ${
                    expandedIndex !== index && isMobile ? 'line-clamp-6' : ''
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.left.description }}
                ></div>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="text-[#902020] text-sm hover:underline mt-2 md:hidden"
                >
                  {expandedIndex === index ? '접기' : '더보기'}
                </button>
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
      <div className="flex gap-2 md:gap-24 z-5 my-12 w-[90%] md:w-full justify-center items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-y-4">
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-12 h-12 md:w-24 md:h-24 rounded-full transition-all duration-300 relative flex flex-col items-center justify-center ${
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
            <div className="w-full text-xs md:text-2xl text-center">{item.smallTitle}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default IntroductionCarousel;
