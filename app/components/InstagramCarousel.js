"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";
import Link from "next/link";
import SlideUp from "@/components/animation/SlideUp";

const InstagramCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 예시 이미지 데이터
  const images = [
    {
      id: 1,
      url: "/instagram/instagram1.png",
      title: "Image 1",
      link: "https://www.instagram.com/p/DDCXjI4PXW7/",
    },
    {
      id: 2,
      url: "/instagram/instagram2.png",
      title: "Image 2",
      link: "https://www.instagram.com/p/DCn34ESv1un/",
    },
    {
      id: 3,
      url: "/instagram/instagram3.png",
      title: "Image 3",
      link: "https://www.instagram.com/p/DCOXIM2v3Hc/",
    },
    {
      id: 4,
      url: "/instagram/instagram4.png",
      title: "Image 4",
      link: "https://www.instagram.com/p/DCDlRhbSIH6/",
    },
    {
      id: 5,
      url: "/instagram/instagram5.png",
      title: "Image 5",
      link: "https://www.instagram.com/p/DCq0tXpy_6a/",
    },
    {
      id: 6,
      url: "/instagram/instagram6.png",
      title: "Image 6",
      link: "https://www.instagram.com/p/DD1Ej-8Pgg-/",
    },
    {
      id: 7,
      url: "/instagram/instagram7.png",
      title: "Image 7",
      link: "https://www.instagram.com/p/DB0QqcWpEKt/",
    },
    {
      id: 8,
      url: "/instagram/instagram8.png",
      title: "Image 8",
      link: "https://www.instagram.com/p/DCEG-W9vWi6/",
    },
    {
      id: 9,
      url: "/instagram/instagram9.png",
      title: "Image 9",
      link: "https://www.instagram.com/p/DCSqGN8oPLn/",
    },
    {
      id: 10,
      url: "/instagram/instagram10.png",
      title: "Image 10",
      link: "https://www.instagram.com/p/DDO4WI0vzo6/",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = isMobile ? images.length - 2 : images.length - 4;
      return prev === 0 ? maxIndex : Math.max(0, prev - 1);
    });
  };

  const handleNext = () => {
    const maxIndex = isMobile ? images.length - 2 : images.length - 4;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;
    if (diff > 50) {
      handleNext();
      setIsDragging(false);
    } else if (diff < -50) {
      handlePrev();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (diff > 50) {
      handleNext();
      setIsDragging(false);
    } else if (diff < -50) {
      handlePrev();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full aspect-[1280/500]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Buttons */}
      <div className="absolute right-3 md:right-0 -top-0 md:-top-16 flex gap-2">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
          aria-label="Previous slides"
        >
          <ChevronLeft className="w-5 h-5 z-10" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
          aria-label="Next slides"
        >
          <ChevronRight className="w-5 h-5 z-10" />
        </button>
      </div>

      {/* Images Container */}
      <SlideUp >
        <div className="relative overflow-hidden aspect-[1280/500] mt-10 md:mt-0 ">
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{
              transform: `translateX(-${currentIndex * (100 / (isMobile ? 2 : 4))}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="flex-none w-1/2 md:w-1/3 h-full relative"
                style={{ padding: index !== images.length - 1 ? '0 10px' : '0' }}
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
                    <Link href={image.link} target="_blank">
                      <IoIosPlayCircle className="w-10 md:w-20 h-10 md:h-20" />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
    </div>
  );
};

export default InstagramCarousel;
