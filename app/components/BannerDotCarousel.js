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
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      {/* Carousel Container */}
      <div className="relative flex flex-col items-center">
        {/* Slides */}
        <div className="w-full overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="w-full flex-shrink-0 flex justify-center items-center"
              >
                <img 
                  src={slide.image} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full aspect-[5/6] object-cover max-w-[500px]" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Dot Navigation - 이미지 바로 아래에 배치 */}
        <div className="mt-2 flex justify-center">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => goToSlide(dotIndex)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === dotIndex
                    ? 'bg-black scale-110'
                    : 'bg-white hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDotCarousel;