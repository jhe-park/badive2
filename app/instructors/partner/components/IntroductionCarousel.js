import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { items } from "./items";
import { Divider } from "@heroui/react";

function IntroductionCarousel() {
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
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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

  return (
    <>
      <div
        className="relative w-[90vw] md:w-[1280px] overflow-hidden h-full md:h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex min-w-full flex-col md:flex-row gap-y-2 md:gap-y-12 md:gap-x-4">
              {/* 오른쪽 섹션 - 모바일에서는 위로 */}
              <div className="w-full md:w-fit md:py-12 relative md:pl-0 flex justify-center items-center order-1 md:order-2">
                <div className="w-[300px] h-[500px] relative">
                  <Image
                    src={item.right.image}
                    fill
                    className="object-contain rounded-2xl"
                    alt="expert1"
                  />
                </div>
              </div>

              {/* 왼쪽 섹션 - 모바일에서는 아래로 */}
              <div className="w-full md:w-[60%] md:py-12 relative md:pl-24 md:pr-0 flex flex-col justify-start items-center gap-y-2 md:gap-y-6 order-2 md:order-1">
                {/* <div className="hidden md:block absolute top-0 left-0 text-[200px] font-bold text-gray-200 opacity-20">
                  01
                </div> */}
                <div className="text-2xl md:text-[45px] font-bold text-center md:text-left">{item.left.title}</div>
                <div className="text-lg md:mt-6 md:text-[25px] text-center md:text-left" style={{ color: "#902020" }}>
                  {item.left.subtitle}
                </div>
                <Divider className="w-[250px] bg-[#B27400]" orientation="horizontal" />
                <div
                  className={`text-sm md:text-[20px] text-center ${
                    expandedIndex !== index && isMobile ? 'line-clamp-6' : ''
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.left.description }}
                  style={{lineHeight: "1.5"}}
                />
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
          className="absolute left-[1vw] top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Previous slide"
        >
          <FaCircleChevronLeft className="text-gray-500 text-2xl md:text-7xl" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-[1vw] top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full transition-colors z-10"
          aria-label="Next slide"
        >
          <FaCircleChevronRight className="text-gray-500 text-2xl md:text-7xl" />
        </button>
      </div>
      {/* 페이지네이션 인디케이터 */}
      <div className="flex gap-2 md:gap-24 z-5 my-12 w-[90%] md:w-full justify-center items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-y-4">
            <div
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
