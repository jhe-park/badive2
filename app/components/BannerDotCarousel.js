'use client'
import React, { useState, useEffect } from 'react';

const BannerDotCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { id: 1, content: "Slide 1", bgColor: "bg-blue-500", image: "/banner/banner1.png" },
    { id: 2, content: "Slide 2", bgColor: "bg-cyan-400", image: "/banner/banner2.png" },
    { id: 3, content: "Slide 3", bgColor: "bg-green-500", image: "/banner/banner3.png" },
    { id: 4, content: "Slide 4", bgColor: "bg-yellow-500", image: "/banner/banner4.png" },
    { id: 5, content: "Slide 5", bgColor: "bg-red-500", image: "/banner/banner5.png" },
    { id: 6, content: "Slide 6", bgColor: "bg-purple-500", image: "/banner/banner6.png" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3초마다 슬라이드 변경

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full">
      {/* 캐러셀 컨테이너 */}
      <div className="relative w-full h-full">
        {/* 현재 슬라이드만 표시 */}
        <div className="w-full h-full">
          <div className="relative w-full h-full flex justify-center items-center">
            <div className="xl:max-w-[500px] md:max-w-[250px] max-w-[72px] aspect-[5/6] relative max-h-[600px]">
              <img 
                src={slides[currentSlide].image} 
                alt={`Slide ${currentSlide + 1}`} 
                className="w-full h-full object-cover" 
              />
              
              {/* 도트 네비게이션 - 이미지 내부 하단에 배치 */}
              <div className="absolute md:bottom-4 bottom-0 left-0 right-0 flex justify-center">
                <div className="flex items-center justify-center gap-1 md:gap-2 bg-opacity-50 p-2 rounded-full">
                  {slides.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      onClick={() => goToSlide(dotIndex)}
                      className={`w-1 h-1 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        currentSlide === dotIndex
                          ? 'bg-white scale-110'
                          : 'bg-gray-400 hover:bg-gray-200'
                      }`}
                      aria-label={`Go to slide ${dotIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDotCarousel;