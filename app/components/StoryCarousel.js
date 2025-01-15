'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
const MultiImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 예시 이미지 데이터
  const images = [
    { id: 1, url: "/api/placeholder/200/150", title: "Image 1" },
    { id: 2, url: "/api/placeholder/200/150", title: "Image 2" },
    { id: 3, url: "/api/placeholder/200/150", title: "Image 3" },
    { id: 4, url: "/api/placeholder/200/150", title: "Image 4" },
    { id: 5, url: "/api/placeholder/200/150", title: "Image 5" },
    { id: 6, url: "/api/placeholder/200/150", title: "Image 6" },
    { id: 7, url: "/api/placeholder/200/150", title: "Image 7" },
    { id: 8, url: "/api/placeholder/200/150", title: "Image 8" }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, images.length - 5) : Math.max(0, prev - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= images.length - 5 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* Navigation Buttons */}
      <div className="absolute right-0 -top-10 flex gap-2">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next slides"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Images Container */}
      <div className="relative overflow-hidden h-full pt-5">
        <div 
          className="flex transition-transform duration-300 ease-out gap-4 h-full"
          style={{
            transform: `translateX(-${currentIndex * (20 + 1)}%)`
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="flex-none w-1/5 h-full relative group"
            >
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative w-full h-full group">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="transition-transform duration-300 ease-out group-hover:scale-105"
                />
                {/* Play Button */}
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Play ${image.title}`}
                >
                  ▶
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiImageCarousel;