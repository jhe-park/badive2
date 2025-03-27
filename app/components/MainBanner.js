'use client'

import { useEffect, useRef, useState } from 'react'
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { SlControlPause } from "react-icons/sl";

const MainBanner = () => {
  const VIDEO_SOURCE = [
    'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4',
    'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4',
    'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4',
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
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false)
  const [page, setPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
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
  const handlePage = (status) => {
    if (status === 'next') {
      setPage((prev) => prev < VIDEO_SOURCE.length - 1 ? prev + 1 : 0)
      return
    }
    setPage((prev) => prev !== 0 ? prev - 1 : VIDEO_SOURCE.length - 1)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 481)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!imageRef.current) return
    if (typeof window === 'undefined') return
    if (!isMobile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (imageRef.current) observer.observe(imageRef.current)
    return () => observer.disconnect()
  }, [isMobile])

  return (
    <>
      <section className='relative md:h-screen w-full bg-black'>
        <div className='z-10 absolute top-0 left-0 w-full h-full inline-flex items-end
          px-3 pb-[11px]
          sm:px-[26px] sm:pb-[22px]
          md:px-[30px] md:pb-[38px]
          lg:pb-[53px]
        '>
          <div className='flex justify-between items-center w-full'>
            <div className='inline-flex gap-[6px] sm:gap-5'>
              {buttons.map((btn) =>
                <a
                  href={typeof btn.link === 'string' ? btn.link : btn.link[page]}
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
            <div className='inline-flex items-start justify-center gap-1 sm:gap-2'>
              <button className={[iconClass, '!bg-[#FFFFFF30] !border-0 p-1 sm:p-[6px]'].join(' ')} onClick={togglePlayPause}>
                <SlControlPause className='w-full h-full' />
              </button>
              <button className={[iconClass].join(' ')} onClick={() => handlePage('prev')}>
                <RiArrowLeftWideLine className='w-full h-full' />
              </button>
              <button className={[iconClass].join(' ')} onClick={() => handlePage('next')}>
                <RiArrowRightWideLine className='w-full h-full' />
              </button>
            </div>
          </div>
        </div>
        <video ref={videoRef}
          className="w-full h-full object-fill"
          autoPlay
          muted
          loop
          poster='/banner/poster.png'
          preload='auto'
          playsInline={true}
          key={`main-video-${page}`}
        >
          <source src={VIDEO_SOURCE[page]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className='bg-black h-[682px] sm:h-[958px] md:h-[1001px] w-full flex flex-col justify-between'>
        <div>
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
        <div
          ref={imageRef}
          className={[
            'transition-all duration-700 ease-in-out',
            isMobile && isVisible ? 'animate-slide-in-bottom translate-y-10 opacity-0'
              : ''
          ].join(' ')}>
          <img
            alt='open_the_gate'
            src='/banner/open_the_gate.png'
            className='mx-auto
            mb-[90px] sm:mb-[134px] md:mb-[147px] lg:mb-[114px] 
            h-auto sm:h-[489px] md:h-[503px]
            '
          />
        </div>
      </section>
    </>
  )
}

export default MainBanner