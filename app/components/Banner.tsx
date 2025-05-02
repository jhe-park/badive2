'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import BannerDotCarousel from './BannerDotCarousel';
export default function Banner() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectMode, setSelectMode] = useState('mode1');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {}, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log('Auto-play was prevented:', error);
          });
      }
    }
  }, [videoRef, selectMode]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const getVideoSource = () => {
    switch (selectMode) {
      case 'mode1':
        return 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1_av1.mp4';
      case 'mode2':
        return 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2_av1.mp4';
      case 'mode3':
        return 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3_av1.mp4';
      default:
        return 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1_av1.mp4';
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="relative h-[40vh] w-full bg-white md:h-[100vh]">
        <video
          ref={videoRef}
          className="h-full w-full object-fill"
          autoPlay
          muted
          loop
          playsInline={true}
          webkit-playsinline="true"
          key={selectMode}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
        >
          <source src={getVideoSource()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-[8%] left-[0%] flex flex-col items-start justify-center gap-2 rounded px-4 py-2 text-white md:bottom-[10%] md:left-[5%] md:gap-8">
          <div className="flex flex-row gap-2 md:gap-4">
            <Button
              className="group relative h-6 bg-white text-xs font-bold text-black opacity-25 hover:opacity-100 md:h-16 md:w-36 md:text-2xl"
              // color=""
              variant="solid"
              onPress={() =>
                router.push(
                  selectMode === 'mode1'
                    ? '/programs/scuberdiving'
                    : selectMode === 'mode2'
                      ? '/programs/freediving'
                      : selectMode === 'mode3'
                        ? '/programs/mermaid'
                        : '/',
                )
              }
            >
              <span className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-50"></span>
              <span className="relative">자세히보기</span>
            </Button>
            <Button
              className="group relative h-6 bg-white text-xs font-bold text-black opacity-25 hover:opacity-100 md:h-16 md:w-36 md:text-2xl"
              // color=""
              variant="flat"
              onPress={() => router.push('/instructors/bdn')}
            >
              <span className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-50"></span>
              <span className="relative">강사소개</span>
            </Button>
            <button onClick={togglePlayPause}>
              {isPlaying ? (
                <FaPauseCircle className="text-2xl opacity-25 hover:opacity-100 md:text-6xl" />
              ) : (
                <FaPlayCircle className="text-2xl opacity-25 hover:opacity-100 md:text-6xl" />
              )}
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 z-10 flex h-8 w-[90%] max-w-[900px] -translate-x-1/2 translate-y-1/2 transform space-x-0 bg-black md:h-24">
          <button
            className="w-1/3 overflow-hidden whitespace-nowrap rounded-l bg-black px-2 py-1 text-[8px] text-white sm:text-[10px] md:px-4 md:py-2 md:text-[18px] lg:text-[22px]"
            onClick={() => setSelectMode('mode1')}
          >
            SCUBA DIVING
          </button>
          <div className="w-px bg-white"></div>
          <button
            className="w-1/3 overflow-hidden whitespace-nowrap bg-black px-2 py-1 text-[8px] text-white sm:text-[10px] md:px-4 md:py-2 md:text-[18px] lg:text-[22px]"
            onClick={() => setSelectMode('mode2')}
          >
            FREEDIVING
          </button>
          <div className="w-px bg-white"></div>
          <button
            className="w-1/3 overflow-hidden whitespace-nowrap bg-black px-2 py-1 text-[8px] text-white sm:text-[10px] md:px-4 md:py-2 md:text-[18px] lg:text-[22px]"
            onClick={() => setSelectMode('mode3')}
          >
            MERMAID
          </button>
        </div>
      </div>
      <div
        className="relative grid aspect-[375/200] w-full grid-cols-5 md:aspect-[768/450] xl:aspect-[1920/1000]"
        style={{
          backgroundImage: "url('/banner/bannerlower.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="col-span-2 flex h-full w-full items-center justify-center">
          <div className="flex h-full w-2/3 items-center justify-center md:w-1/2">
            <BannerDotCarousel></BannerDotCarousel>
          </div>
        </div>
        <div style={{ lineHeight: '1' }} className="col-span-3 flex h-full w-full flex-col items-center justify-center gap-y-2 md:gap-y-12">
          <div style={{ lineHeight: '1' }} className="text-[20px] font-bold italic text-[#D3D3D3CC] opacity-80 md:text-[40px] lg:text-[80px]">
            Open The Sea Gate
          </div>
          <div style={{ lineHeight: '1.2' }} className="text-[16px] text-[#D3D3D3CC] opacity-80 md:text-[30px] lg:text-[48px]">
            the soul of diving
          </div>
        </div>
      </div>
    </>
  );
}
