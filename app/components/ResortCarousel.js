'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FourImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 예시 이미지 데이터
  const images = [
    { id: 1, url: "/api/placeholder/280/200", title: "Image 1" },
    { id: 2, url: "/api/placeholder/280/200", title: "Image 2" },
    { id: 3, url: "/api/placeholder/280/200", title: "Image 3" },
    { id: 4, url: "/api/placeholder/280/200", title: "Image 4" },
    { id: 5, url: "/api/placeholder/280/200", title: "Image 5" },
    { id: 6, url: "/api/placeholder/280/200", title: "Image 6" },
    { id: 7, url: "/api/placeholder/280/200", title: "Image 7" },
    { id: 8, url: "/api/placeholder/280/200", title: "Image 8" }
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
    <div className="relative w-full p-4 px-[3vw]">
      {/* Main Container with Side Arrows */}
      <div className="relative group h-[250px]">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

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
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

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