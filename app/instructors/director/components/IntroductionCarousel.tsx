import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { Divider } from '@heroui/react';
import Image from 'next/image';
import { items } from './items';
import useInstructor from '@/app/store/useInstructor';

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
  const goToSlide = index => {
    setCurrentIndex(index);
    setInstructor(items[index].left.title);
  };

  const handleTouchStart = e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = e => {
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
        className="relative h-full w-[90vw] overflow-hidden md:h-full md:max-w-[1280px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex min-w-full flex-col gap-y-2 md:gap-x-4 md:gap-y-12 lg:flex-row">
              {/* 오른쪽 섹션 - 모바일에서는 위로 */}
              <div className="relative order-1 flex w-full items-center justify-center md:order-2 md:py-12 md:pl-0 lg:w-1/3">
                <div className="relative aspect-[3/5] w-[80%] max-w-[300px] md:w-full">
                  <Image src={item.right.image} alt={`${item.left.title} 이미지`} fill priority className="rounded-2xl object-cover" />
                </div>
              </div>

              {/* 왼쪽 섹션 - 모바일에서는 아래로 */}
              <div className="relative order-2 flex w-full flex-col items-center justify-start gap-y-2 md:gap-y-6 md:py-12 lg:order-1 lg:w-[60%] lg:pl-24 lg:pr-0">
                <div className="text-center text-2xl font-bold md:text-left md:text-[45px]">{item.left.title}</div>
                <div className="text-center text-lg md:mt-6 md:text-left md:text-[25px]" style={{ color: '#902020' }}>
                  {item.left.subtitle}
                </div>
                <Divider className="w-[250px] bg-[#B27400]" orientation="horizontal" />
                <div
                  className={`text-center text-sm md:text-[20px] ${expandedIndex !== index && isMobile ? 'line-clamp-6' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.left.description1 }}
                  style={{ lineHeight: '1.5' }}
                ></div>
                <div className={`flex items-center justify-between gap-x-4 ${expandedIndex !== index && isMobile ? 'hidden' : ''}`}>
                  <div
                    className="text-center text-sm md:text-[20px]"
                    dangerouslySetInnerHTML={{ __html: item.left.description2 }}
                    style={{ lineHeight: '1.5' }}
                  ></div>
                  <div
                    className="text-center text-sm md:text-[20px]"
                    dangerouslySetInnerHTML={{ __html: item.left.description3 }}
                    style={{ lineHeight: '1.5' }}
                  ></div>
                </div>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="mt-2 text-sm text-[#902020] hover:underline md:hidden"
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
          className="absolute left-[1vw] top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/50 p-2 transition-colors hover:bg-white/80 md:block"
          aria-label="Previous slide"
        >
          <FaCircleChevronLeft className="text-2xl text-gray-500 md:text-7xl" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-[1vw] top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/50 p-2 transition-colors hover:bg-white/80 md:block"
          aria-label="Next slide"
        >
          <FaCircleChevronRight className="text-2xl text-gray-500 md:text-7xl" />
        </button>
      </div>

      {/* 페이지네이션 인디케이터 */}
      {/* <div className="flex z-5 my-12 w-[90%] md:max-w-[1280px] justify-between items-center">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-y-4 flex-1">
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
      </div> */}
    </>
  );
}

export default IntroductionCarousel;
