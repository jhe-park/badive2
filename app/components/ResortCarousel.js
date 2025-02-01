"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideUp from "@/components/animation/SlideUp";

const FourImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 2 : 4);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 클린업 함수
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 예시 이미지 데이터
  const images = [
    {
      id: 1,
      url: "/resort/resort1.png",
      title: "필리핀 세부 스컬 리조트",
      link: "http://www.skuldive.com",
    },
    {
      id: 2,
      url: "/resort/resort2.png",
      title: "필리핀 말라파스쿠아 드래곤제이원 리조트",
      link: "https://m.dragonj1dive.com",
    },
    {
      id: 3,
      url: "/resort/resort3.png",
      title: "필리핀 보홀 딥블루 리조트",
      link: "http://www.deepblue-bohol.co.kr",
    },
    {
      id: 4,
      url: "/resort/resort4.png",
      title: "필리핀 코론 박스터 리조트",
      link: "",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, images.length - itemsToShow) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= images.length - itemsToShow ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full h-full px-[3vw] flex justify-center items-center">
      {/* Main Container with Side Arrows */}
      <div className="relative group h-full w-[80%] md:w-full flex items-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <SlideUp>
          {/* Images Container */}
          <div className="relative overflow-hidden h-full">
            <div
              className="flex transition-transform duration-300 ease-out gap-4 md:gap-6 h-full p-2"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className={`flex-none w-[calc(50%-8px)] md:w-[calc(25%-16px)] h-full`}
                >
                  <div className="aspect-video rounded-lg overflow-hidden h-full w-full">
                    <a
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer rounded-lg"
                      />
                    </a>

                    <div className="text-sm md:text-[18px] resort-title text-center mt-2 bg-white bg-opacity-75 p-2 rounded flex justify-center items-center">
                      {image.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideUp>
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Next slides"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FourImageCarousel;
