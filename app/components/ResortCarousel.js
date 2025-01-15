'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SlideUp from '@/components/animation/SlideUp';
const FourImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 예시 이미지 데이터
  const images = [
    { id: 1, url: "/resort/resort1.png", title: "필리핀 세부 스컬 리조트",link:"http://www.skuldive.com"},
    { id: 2, url: "/resort/resort2.png", title: "필리핀 말라파스쿠아 드래곤제이원 리조트",link:'https://m.dragonj1dive.com' },
    { id: 3, url: "/resort/resort3.png", title: "필리핀 보홀 딥블루 리조트",link:'http://www.deepblue-bohol.co.kr' },
    { id: 4, url: "/resort/resort4.png", title: "필리핀 코론 박스터 리조트",link:"" },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, images.length - 4) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= images.length - 4 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full h-full p-4 px-[3vw]">
      {/* Main Container with Side Arrows */}
      <div className="relative group h-full">
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
            className="flex transition-transform duration-300 ease-out gap-6 h-full"
            style={{
              transform: `translateX(-${currentIndex * (25 + 1.5)}%)`
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="flex-none w-1/4 h-full"
              >
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md h-full w-full">
                  {image.link ? (
                    <a
                      href={image.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </a>
                  ) : (
                    <div className="block w-full h-full">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
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