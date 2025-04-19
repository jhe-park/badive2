'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { IoIosPlayCircle } from 'react-icons/io';

import useInstructor from '@/app/store/useInstructor';
import useModalOpen from '@/app/store/useModalOpen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import ReactPlayer from 'react-player';

export default function VerticalCarousel({ images, index, setIndex }) {
  const { instructor, setInstructor } = useInstructor();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { isOpen, setIsOpen } = useModalOpen();
  const modalRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'y',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  const onSelect = () => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    setIndex(newIndex);
  };

  const handleImageClick = image => {
    setIsModalOpen(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpen(false);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if (modalRef.current.webkitRequestFullscreen) {
        modalRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const scrollPrev = () => {
    if (selectedIndex > 0) {
      emblaApi?.scrollTo(selectedIndex - 1);
    }
  };

  const scrollNext = () => {
    if (selectedIndex < images.length - 1) {
      emblaApi?.scrollTo(selectedIndex + 1);
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="relative mx-auto h-1/2 w-full">
      <div className="absolute -left-8 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-2">
        <button onClick={scrollPrev} className="text-white transition-colors hover:text-blue-500" aria-label="이전 슬라이드">
          <FaArrowUpLong className="h-6 w-6" />
        </button>

        {images.map((_, index) => (
          <button
            key={index}
            className={`h-6 w-3 rounded-full transition-all duration-300 ${selectedIndex === index ? 'scale-125 bg-blue-500' : 'bg-white'}`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}

        <button onClick={scrollNext} className="text-white transition-colors hover:text-blue-500" aria-label="다음 슬라이드">
          <FaArrowDownLong className="h-6 w-6" />
        </button>
      </div>

      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full flex-col">
          {images.map((image, index) => (
            <div key={index} className="group relative h-[400px] w-[600px] flex-[0_0_100%] cursor-pointer" onClick={() => handleImageClick(image)}>
              <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === 0} />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
                <IoIosPlayCircle className="h-20 w-20 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div ref={modalRef} className="relative flex h-full w-full items-center justify-center">
            <div className="absolute right-0 top-0 z-50 m-4 flex gap-x-5">
              <button onClick={toggleFullScreen}>
                {isFullScreen ? <BiExitFullscreen className="h-8 w-8 text-white" /> : <BiFullscreen className="h-8 w-8 text-white" />}
              </button>
              <button onClick={closeModal}>
                <IoMdClose className="h-10 w-10 text-white" />
              </button>
            </div>

            <ReactPlayer url={images[selectedIndex].videoUrl} playing controls width="80%" height="80%" />
          </div>
        </div>
      )}
    </div>
  );
}
