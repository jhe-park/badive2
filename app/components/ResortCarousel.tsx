'use client';

import useModalOpen from '@/app/store/useModalOpen';
import SlideUp from '@/components/animation/SlideUp';
import { createClient } from '@/utils/supabase/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const MultiImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [resortData, setResortData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isOpen, setIsOpen } = useModalOpen();
  const modalRef = useRef(null);

  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);

  const supabase = createClient();

  const getData = async () => {
    const { data, error } = await supabase.from('resort').select('*');
    if (error) {
      console.log(error);
    }
    setResortData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const images = [
    {
      id: 1,

      url: '/resort/resort1.png',
      title: '필리핀 세부 스컬 리조트',
      link: 'http://www.skuldive.com',
    },
    {
      id: 2,
      url: '/resort/resort2.png',
      title: '필리핀 말라파스쿠아 드래곤제이원 리조트',
      link: 'https://m.dragonj1dive.com',
    },
    {
      id: 3,
      url: '/resort/resort3.png',
      title: '필리핀 보홀 딥블루 리조트',
      link: 'http://www.deepblue-bohol.co.kr',
    },
    {
      id: 4,
      url: '/resort/resort4.png',
      title: '필리핀 코론 박스터 리조트',
      link: '',
    },
  ];

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const maxIndex = isMobile ? resortData.length - 2 : resortData.length - 3;
      return prev === 0 ? maxIndex : Math.max(0, prev - 1);
    });
  };

  const handleNext = () => {
    const maxIndex = isMobile ? resortData.length - 2 : resortData.length - 3;
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleImageClick = image => {
    if (image.url) {
      window.open(image.url, '_blank');
    }
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

  const handleTouchStart = e => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = e => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50; // 스와이프 인식 최소 거리

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  console.log('resortData:', resortData);

  return (
    <div className="relative w-full" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="absolute -top-0 right-3 hidden gap-2 md:-top-16 md:right-0 md:flex">
        <button onClick={handlePrev} className="z-10 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200" aria-label="Previous slides">
          <ChevronLeft className="z-10 h-5 w-5" />
        </button>
        <button onClick={handleNext} className="z-10 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200" aria-label="Next slides">
          <ChevronRight className="z-10 h-5 w-5" />
        </button>
      </div>

      <SlideUp>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (isMobile ? 2 : 3))}%)`,
            }}
          >
            {resortData.map((image, index) => (
              <div key={image.id} className="relative w-1/2 flex-none md:w-1/3" style={{ padding: index !== resortData.length - 1 ? '0 10px' : '0' }}>
                <div className="group relative aspect-[4/3] h-auto max-h-[120px] w-full overflow-hidden rounded-lg bg-gray-100 md:max-h-[180px] xl:max-h-[250px]">
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 ease-out hover:cursor-pointer group-hover:scale-105"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-medium md:text-lg">{image.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideUp>
    </div>
  );
};

export default MultiImageCarousel;
