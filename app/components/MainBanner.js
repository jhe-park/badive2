'use client'

import { useEffect, useRef, useState } from 'react'
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { SlControlPause } from "react-icons/sl";
import { useTextAnimation } from '../../hooks/useAnimation'
import MainSlider from './MainSlider'
import gsap from 'gsap'

const MainBanner = () => {
  const VIDEO_SOURCE = [
    {
      link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4',
      poster: '/banner/poster1.png',
    },
    {
      link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4',
      poster: '/banner/poster2.png',
    },
    {
      link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4',
      poster: '/banner/poster3.png',
    },
  ]
  const MAIN_IMAGES = [
    '/banner/open_the_gate1.png',
    '/banner/open_the_gate2.png',
    '/banner/open_the_gate3.png',
    '/banner/open_the_gate4.png',
    '/banner/open_the_gate5.png',
  ]
  const buttons = [
    {
      label: '자세히보기',
      link: [
        'https://www.badive.co.kr/programs/scuberdiving',
        'https://www.badive.co.kr/programs/freediving',
        'https://www.badive.co.kr/programs/mermaid',
      ]
    },
    {
      label: '소속강사',
      link: 'https://www.badive.co.kr/instructors/bdn'
    }
  ]
  const iconClass = 'rounded-full w-5 h-5 sm:w-[34px] sm:h-[34px] inline-flex bg-[#00000099] border border-black text-white cursor-pointer'

  const videoRef = useRef(null);
  const [videoPage, setVideoPage] = useState(0)
  const [imgPage, setImgPage] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const slideRef = useRef(null)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  // const [isMobile, setIsMobile] = useState(false)

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      return
    }

    videoRef.current.pause();
  };

  /**
   * 
   * @param {'next' | 'prev'} status 
   */
  const handleVideoPage = (status) => {
    if (status === 'next') {
      setVideoPage((prev) => prev < VIDEO_SOURCE.length - 1 ? prev + 1 : 0)
      return
    }
    setVideoPage((prev) => prev !== 0 ? prev - 1 : VIDEO_SOURCE.length - 1)
  }

  // useEffect(() => {
  //   if (typeof window === 'undefined') return

  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 481)
  //   }

  //   checkMobile()
  //   window.addEventListener('resize', checkMobile)
  //   return () => window.removeEventListener('resize', checkMobile)
  // }, [])

  useEffect(() => {
    if (!slideRef.current) return

    gsap.from(slideRef.children, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.2,
    })
  }, [])

  useEffect(() => {
    if (!slideRef.current) return

    gsap.to(slideRef.current, {
      x: `-${imgPage * 100}%`,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, [imgPage])

  const nextImage = () => {
    setImgPage((prev) => (prev + 1) % MAIN_IMAGES.length)
  }

  const prevImage = () => {
    setImgPage((prev) => (prev - 1 + MAIN_IMAGES.length) % MAIN_IMAGES.length)
  }

  const startAutoSlide = () => {
    intervalRef.current = setInterval(nextImage, 3000)
  }

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const restartAutoSlideAfterDelay = () => {
    stopAutoSlide()
    timeoutRef.current = setTimeout(() => {
      startAutoSlide()
    }, 1000) // 1초 후 다시 시작
  }

  // 모바일 터치 이벤트
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    restartAutoSlideAfterDelay()
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage() // 왼쪽 스와이프 → 다음
      else prevImage() // 오른쪽 스와이프 → 이전
    }
  }

  useEffect(() => {
    startAutoSlide()
    return () => {
      stopAutoSlide()
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const { containerRef: textRef } = useTextAnimation()

  return (
    <>
      <section className='relative w-full bg-black md:h-screen'>
        <div className='z-10 absolute top-0 left-0 w-full h-full inline-flex items-end
          px-3 pb-[11px]
          sm:px-[26px] sm:pb-[22px]
          md:px-[30px] md:pb-[38px]
          lg:pb-[53px]
        '>
          <div className='flex items-center justify-between w-full'>
            <div className='inline-flex gap-[6px] sm:gap-5'>
              {buttons.map((btn) =>
                <a
                  href={typeof btn.link === 'string' ? btn.link : btn.link[videoPage]}
                  key={btn.label}
                  className='text-white bg-[#FFFFFF26] font-bold rounded-[10px] text-nowrap
                  text-[13px] py-[6px] px-3
                  sm:text-xl sm:py-[13px] sm:px-8
                  md:text-2xl md:py-[11px] md:px-11
                '>
                  {btn.label}
                </a>
              )}
            </div>
            <div className='inline-flex items-start justify-center gap-1 mt-5 sm:gap-2'>
              <button className={[iconClass, '!bg-[#FFFFFF30] !border-0 p-1 sm:p-[6px]'].join(' ')} onClick={togglePlayPause}>
                <SlControlPause className='w-full h-full' />
              </button>
              <button className={[iconClass].join(' ')} onClick={() => handleVideoPage('prev')}>
                <RiArrowLeftWideLine className='w-full h-full' />
              </button>
              <button className={[iconClass].join(' ')} onClick={() => handleVideoPage('next')}>
                <RiArrowRightWideLine className='w-full h-full' />
              </button>
            </div>
          </div>
        </div>
        <video ref={videoRef}
          className="object-fill w-full h-full"
          autoPlay
          muted
          loop
          poster={VIDEO_SOURCE[videoPage].poster}
          preload='auto'
          playsInline={true}
          key={`main-video-${videoPage}`}
        >
          <source src={VIDEO_SOURCE[videoPage].link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className='bg-black h-[682px] sm:h-[958px] md:h-[1001px] w-full flex flex-col justify-between'>
        <div
          ref={textRef}
          className={[
            'transform transition-transform duration-300 ease-out',
          ].join(' ')}
        >
          <h1
            className='italic text-center text-white font-bold text-nowrap
            text-3xl leading-[40px] pt-[106px]
            sm:text-[70px] sm:leading-[60px] sm:pt-[134px]
            md:text-[90px] md:leading-[80px]
            lg:pt-[156px]
          '>
            Open The Sea Gate
          </h1>
          <h6
            className='italic text-center text-white
            text-2xl leading-[40px]
            sm:text-[45px] sm:leading-[60px]
            md:text-[50px]
          '>
            the soul of diving
          </h6>
        </div>
        <MainSlider />
        
      </section>
    </>
  )
}

export default MainBanner