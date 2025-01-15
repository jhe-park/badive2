import React, { useState, useEffect } from 'react';

const DotCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { id: 1, content: "Slide 1", bgColor: "bg-blue-500" },
    { id: 2, content: "Slide 2", bgColor: "bg-green-500" },
    { id: 3, content: "Slide 3", bgColor: "bg-red-500" },
    { id: 4, content: "Slide 4", bgColor: "bg-yellow-500" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Carousel Container */}
      <div className="relative h-64 overflow-hidden rounded-lg">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-500 flex items-center justify-center text-white text-2xl font-bold ${
              slide.bgColor
            } ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {slide.content}
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

export default DotCarousel;