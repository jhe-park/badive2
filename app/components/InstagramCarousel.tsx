'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { IoIosPlayCircle } from 'react-icons/io';
import Link from 'next/link';
import SlideUp from '@/components/animation/SlideUp';

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
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image.png',
      title: 'Image 1',
      link: 'https://www.instagram.com/reel/DHcTNJ3TWfC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      id: 2,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_1.png',
      title: 'Image 2',
      link: 'https://www.instagram.com/reel/DHkNC0FTFqd/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      id: 3,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_2.png',
      title: 'Image 3',
      link: 'https://www.instagram.com/p/DHkEYO6TP-l/',
    },
    {
      id: 4,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_3.png',
      title: 'Image 4',
      link: 'https://www.instagram.com/p/DCDlRhbSIH6/',
    },
    {
      id: 5,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_4.png',
      title: 'Image 5',
      link: 'https://www.instagram.com/reel/DHcaNCxTC9F/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      id: 6,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_5.png',
      title: 'Image 6',
      link: 'https://www.instagram.com/reel/DHcno9vRKu9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      id: 7,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_6.png',
      title: 'Image 7',
      link: 'https://www.instagram.com/reel/DHmf5OwTodc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      id: 8,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/image_7.png',
      title: 'Image 8',
      link: 'https://www.instagram.com/reel/DHaMp9Lzw1s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const maxIndex = isMobile ? images.length - 3 : images.length - 4;
      return prev === 0 ? maxIndex : Math.max(0, prev - 1);
    });
  };

  const handleNext = () => {
    const maxIndex = isMobile ? images.length - 3 : images.length - 4;
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = e => {
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

  const handleTouchStart = e => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = e => {
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
      className="relative flex h-full w-full items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Buttons */}
      <div className="absolute -top-0 right-3 hidden gap-2 md:-top-0 md:right-0 md:flex">
        <button onClick={handlePrev} className="z-10 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200" aria-label="Previous slides">
          <ChevronLeft className="z-10 h-5 w-5" />
        </button>
        <button onClick={handleNext} className="z-10 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200" aria-label="Next slides">
          <ChevronRight className="z-10 h-5 w-5" />
        </button>
      </div>

      {/* Images Container */}
      <SlideUp>
        <div className="relative overflow-hidden md:mt-0">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (isMobile ? 3 : 4))}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={image.id} className="relative w-1/3 flex-none px-2 md:w-1/4">
                <div className="group relative aspect-[300/450] w-full overflow-hidden rounded-lg bg-gray-100">
                  <Image src={image.url} alt={image.title} fill className="transition-transform duration-300 ease-out group-hover:scale-105" />
                  {/* Play Button */}
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Play ${image.title}`}
                  >
                    <Link href={image.link} target="_blank">
                      <IoIosPlayCircle className="h-10 w-10 md:h-20 md:w-20" />
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
