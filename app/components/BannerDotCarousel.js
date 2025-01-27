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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full ">
      {/* Carousel Container */}
      <div className="relative h-full overflow-hidden rounded-lg">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-500 flex items-center justify-center text-white text-2xl font-bold  ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover opacity-50" />
            
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerDotCarousel;