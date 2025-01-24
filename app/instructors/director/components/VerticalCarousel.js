'use client'
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const VerticalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { id: 0, src: "/instructors/expert1verticalcarousel1.png", alt: "Slide 1" },
    { id: 1, src: "/instructors/expert1verticalcarousel1.png", alt: "Slide 2" },
    { id: 2, src: "/instructors/expert1verticalcarousel1.png", alt: "Slide 3" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex gap-6 w-full max-w-3xl mx-auto">
      {/* 왼쪽 navigation 영역 */}
      <div className="flex flex-col justify-center items-center gap-4">
        {/* 위쪽 화살표 */}
        <button
          onClick={prevSlide}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {/* dot pagination */}
        <div className="flex flex-col gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 아래쪽 화살표 */}
        <button
          onClick={nextSlide}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* 이미지 슬라이더 */}
      <div className="relative flex-1 overflow-hidden h-[400px]">
        <div
          className="flex flex-col transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <img
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[400px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;