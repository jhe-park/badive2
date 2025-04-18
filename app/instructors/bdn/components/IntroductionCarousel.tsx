import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { items } from "./items";
import useInstructor from '@/app/store/useInstructor'
import { Divider } from "@heroui/react";

function IntroductionCarousel() {
  const { instructor, setInstructor } = useInstructor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

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

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const diffX = startX - currentX;
    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
    isDragging = false;
  };

  // 더보기 버튼 클릭 이벤트 핸들러 - 이벤트 전파 방지
  const handleMoreClick = (e, index) => {
    e.stopPropagation(); // 이벤트 전파 중지
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div
        className="relative w-[90vw] md:max-w-[1280px] overflow-hidden h-full md:h-full"
      >
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
            <div key={index} className="flex min-w-full flex-col lg:flex-row gap-y-2 md:gap-y-12 md:gap-x-4 ">
              {/* 오른쪽 섹션 - 모바일에서는 위로 */}
              <div className="w-full lg:w-1/3 md:py-12 relative md:pl-0 flex justify-center items-center order-1 md:order-2">
                <div
                  className="relative w-[80%] md:w-full max-w-[300px] aspect-[3/5]"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <Image
                    src={item.right.image}
                    alt={`${item.left.title} 이미지`}
                    fill
                    priority
                    // sizes="(max-width: 768px) 80vw, 300px"
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* 왼쪽 섹션 - 모바일에서는 아래로 */}
              <div className="w-full lg:w-[60%] md:py-12 relative  lg:pl-24 lg:pr-0 flex flex-col justify-start items-center gap-y-2 md:gap-y-6 order-2 lg:order-1">
                {/* <div className="hidden md:block absolute top-0 left-0 text-[200px] font-bold text-gray-200 opacity-20">
                  01
                </div> */}
                <div
                  className="text-2xl md:text-[45px] font-bold text-center md:text-left"
                  style={{ pointerEvents: 'none' }}
                >
                  {item.left.title}
                </div>
                <div
                  className="text-lg md:mt-6 md:text-[25px] text-center md:text-left"
                  style={{ color: "#902020", pointerEvents: 'none' }}
                >
                  {item.left.subtitle}
                </div>
                <Divider className="w-[250px] bg-[#B27400]" orientation="horizontal" />
                <div
                  className={`text-sm md:text-[20px] text-center  ${
                    expandedIndex !== index && isMobile ? 'line-clamp-6' : ''
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.left.description }}
                  style={{lineHeight: "1.5"}}
                ></div>
                <button
                  onClick={(e) => handleMoreClick(e, index)}
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
          className="hidden md:block absolute left-[1vw] top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Previous slide"
        >
          <FaCircleChevronLeft className="text-gray-500 text-2xl md:text-7xl" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-[1vw] top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Next slide"
        >
          <FaCircleChevronRight className="text-gray-500 text-2xl md:text-7xl" />
        </button>
      </div>
      {/* 페이지네이션 인디케이터 수정 */}
      <div className="flex z-5 my-12 w-[90%] md:max-w-[1280px] justify-between items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-y-4 flex-1">
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
            <div className="w-full text-xs md:text-[18px] text-center">{item.smallTitle}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default IntroductionCarousel;
