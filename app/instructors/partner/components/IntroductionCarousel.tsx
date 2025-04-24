import { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import Image from 'next/image';
import { partnerItems } from './items';
import { Divider } from '@heroui/react';

function IntroductionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInteractingWithButton, setIsInteractingWithButton] = useState(false);

  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setIsMobile(!window.matchMedia('(min-width: 768px)').matches);

    const handleResize = () => {
      setIsMobile(!window.matchMedia('(min-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    const newIndex = currentIndex === partnerItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? partnerItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = index => {
    setCurrentIndex(index);
  };

  const handleTouchStart = e => {
    if (isInteractingWithButton) return;

    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
  };

  const handleTouchMove = e => {
    if (isInteractingWithButton || !isDraggingRef.current) return;

    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = e => {
    if (isInteractingWithButton || !isDraggingRef.current) return;

    const diffX = startXRef.current - currentXRef.current;
    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
    isDraggingRef.current = false;
  };

  // const handleButtonClick = (e, callback) => {
  //   e.stopPropagation();
  //   callback();
  // };

  return (
    <>
      <div className="relative h-full w-[90vw] overflow-hidden md:h-full md:max-w-[1280px]">
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {partnerItems.map((item, index) => (
            <div key={index} className="flex min-w-full flex-col gap-y-2 md:gap-x-4 md:gap-y-12 lg:flex-row">
              {/* 오른쪽 섹션 - 모바일에서는 위로 */}
              <div className="relative order-1 flex w-full items-center justify-center md:order-2 md:py-12 md:pl-0 lg:w-1/3">
                <div
                  className="relative aspect-[3/5] w-[80%] max-w-[300px] cursor-pointer md:w-full"
                  onTouchStart={e => {
                    e.stopPropagation();
                    handleTouchStart(e);
                  }}
                  onTouchMove={e => {
                    e.stopPropagation();
                    handleTouchMove(e);
                  }}
                  onTouchEnd={e => {
                    e.stopPropagation();
                    handleTouchEnd(e);
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                >
                  <Image src={item.right.image} alt={`${item.left.title} 이미지`} fill priority className="rounded-2xl object-cover" />
                </div>
              </div>

              {/* 왼쪽 섹션 - 모바일에서는 아래로 */}
              <div className="relative order-2 flex w-full flex-col items-center justify-start gap-y-2 md:gap-y-6 md:py-12 lg:order-1 lg:w-[60%] lg:pl-24 lg:pr-0">
                {/* <div className="hidden md:block absolute top-0 left-0 text-[200px] font-bold text-gray-200 opacity-20">
                  01
                </div> */}
                <div className="text-center text-2xl font-bold md:text-left md:text-[45px]">{item.left.title}</div>
                <div className="text-center text-lg md:mt-6 md:text-left md:text-[25px]" style={{ color: '#902020' }}>
                  {item.left.subtitle}
                </div>
                <Divider className="w-[250px] bg-[#B27400]" orientation="horizontal" />
                <div
                  className={`text-center text-sm md:text-[20px] ${expandedIndex !== index && isMobile ? 'line-clamp-6' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.left.description }}
                  style={{ lineHeight: '1.5' }}
                />
                <button
                  onTouchStart={e => {
                    e.stopPropagation();
                    setIsInteractingWithButton(true);
                  }}
                  onTouchEnd={e => {
                    e.stopPropagation();
                    setIsInteractingWithButton(false);
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    setExpandedIndex(expandedIndex === index ? null : index);
                  }}
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
          onClick={e => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-[1vw] top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/50 p-2 transition-colors hover:bg-white/80 md:block"
          aria-label="Previous slide"
        >
          <FaCircleChevronLeft className="text-2xl text-gray-500 md:text-7xl" />
        </button>

        <button
          onClick={e => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-[1vw] top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/50 p-2 transition-colors hover:bg-white/80 md:block"
          aria-label="Next slide"
        >
          <FaCircleChevronRight className="text-2xl text-gray-500 md:text-7xl" />
        </button>
      </div>
      {/* 페이지네이션 인디케이터 */}
      <div className="z-5 my-12 flex w-[90%] items-center justify-between md:max-w-[1280px]">
        {partnerItems.map((item, index) => (
          <div key={index} className="flex flex-1 flex-col items-center justify-center gap-y-4">
            <div
              className={`relative flex h-12 w-12 flex-col items-center justify-center rounded-full transition-all duration-300 md:h-24 md:w-24 ${
                currentIndex === index ? 'border-3 border-[#0077B6] bg-gray-200 opacity-100' : 'bg-gray-200 opacity-50 hover:opacity-80'
              }`}
              aria-label={`Slide ${index + 1}`}
            >
              <Image
                src={item.small}
                alt={`Slide ${index + 1}`}
                fill
                className="cursor-pointer rounded-full object-cover"
                onClick={e => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
              />
            </div>
            <div className="w-full text-center text-xs md:text-[18px]">{item.smallTitle}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default IntroductionCarousel;
