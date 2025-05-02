'use client';

import useModalOpen from '@/app/store/useModalOpen';
import SlideUp from '@/components/animation/SlideUp';
import { Z_INDEX } from '@/constants/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { IoIosPlayCircle, IoMdClose } from 'react-icons/io';
import ReactPlayer from 'react-player';

const MultiImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isOpen, setIsOpen } = useModalOpen();
  // 모달 컨테이너에 대한 ref 추가
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // 예시 이미지 데이터
  const images = [
    {
      id: 1,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/youtube_1.png',
      title: '',
      link: 'https://youtu.be/zzZoKMPZeqY',
    },
    {
      id: 2,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/2.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      id: 3,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/3.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      id: 4,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/4.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      id: 5,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/5.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      id: 6,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/6.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      id: 7,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/7.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      id: 8,
      url: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/8.png',
      title: '',
      link: 'https://www.youtube.com/@badive_official',
    },
  ];

  // 컴포넌트 마운트 시 window width 설정
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    const itemsPerView = windowWidth < 768 ? 2 : 4;
    setCurrentIndex(prev => (prev === 0 ? Math.max(0, images.length - itemsPerView) : Math.max(0, prev - 1)));
  };

  const handleNext = () => {
    const itemsPerView = windowWidth < 768 ? 2 : 4;
    setCurrentIndex(prev => (prev >= images.length - itemsPerView ? 0 : prev + 1));
  };

  const handleVideoClick = url => {
    setCurrentVideoUrl(url);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setIsOpen(false);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if (modalRef.current.webkitRequestFullscreen) {
        modalRef.current.webkitRequestFullscreen();
      } else if (modalRef.current.msRequestFullscreen) {
        modalRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  // Fullscreen 변경 이벤트 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen((document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) as any);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

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
      className="relative w-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute -top-0 right-3 hidden gap-2 md:-top-12 md:right-0 md:flex">
        <button
          onClick={handlePrev}
          className="z-10 rounded-full bg-gray-100 p-2 transition-colors hover:cursor-pointer hover:bg-gray-200"
          aria-label="Previous slides"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={handleNext}
          className="z-10 rounded-full bg-gray-100 p-2 transition-colors hover:cursor-pointer hover:bg-gray-200"
          aria-label="Next slides"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <SlideUp>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (windowWidth < 768 ? 2 : 4))}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative flex w-1/2 flex-none flex-col items-center justify-center px-2 md:w-1/4"
                onClick={() => handleImageClick(image)}
              >
                <div className="group relative mx-auto mt-2 aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 md:mt-0">
                  {image.url ? (
                    <Image src={image.url} alt={image.title} fill className="object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-black"></div>
                  )}
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Play ${image.title}`}
                    onClick={() => handleVideoClick(image.link)}
                  >
                    <IoIosPlayCircle className="h-10 w-10 md:h-20 md:w-20" />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm md:text-[18px]">{image.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
      {/* Modal for Image and Video */}
      {isModalOpen && selectedImage && (
        <div
          style={{
            zIndex: Z_INDEX.STORY_CAROUSEL,
          }}
          // z-[1000]
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
        >
          <div ref={modalRef} className="relative flex h-full w-full items-center justify-center" style={{ isolation: 'isolate' }}>
            <div className="absolute right-0 top-0 z-50 m-4 flex gap-x-5">
              <button className="" onClick={toggleFullScreen}>
                {isFullScreen ? <BiExitFullscreen className="h-8 w-8 text-white" /> : <BiFullscreen className="h-8 w-8 text-white" />}
              </button>
              <button className="" onClick={closeModal}>
                <IoMdClose className="h-10 w-10 text-white" />
              </button>
            </div>

            <ReactPlayer className="react-player" url={selectedImage.link} playing controls width="80%" height="80%" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageCarousel;
