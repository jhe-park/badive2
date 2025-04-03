'use client'

import { useEffect, useRef, useState } from 'react'
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { SlControlPause } from "react-icons/sl";
import { gsap } from 'gsap'

const MainBanner = () => {
  const VIDEO_SOURCE = [
    {
      link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1_av1.mp4',
      poster: '/banner/poster1.png',
    },
    {
      link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2_av1.mp4',
      poster: '/banner/poster2.png',
    },
    {
      link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3_av1.mp4',
      poster: '/banner/poster3.png',
    },
    // {
    //   link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4',
    //   poster: '/banner/poster1.png',
    // },
    // {
    //   link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4',
    //   poster: '/banner/poster2.png',
    // },
    // {
    //   link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4',
    //   poster: '/banner/poster3.png',
    // },
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
  const [page, setPage] = useState(0)

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

  const imageRef = useRef(null)
  const mainTextRef = useRef(null)
  const subTextRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // 1. 이미지 먼저 등장 (0초에 시작)
    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 50, scrollTrigger: { toggleActions: 'play none none reverse'} },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )

    // 2. 텍스트는 약간 딜레이 줘서 (1초 후에 시작)
    tl.fromTo(
      mainTextRef.current,
      { opacity: 0, y: 50, scrollTrigger: { toggleActions: 'play none none reverse'} },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '+=0.2' // 0.3초 뒤에 시작
    )

    // 2. 텍스트는 약간 딜레이 줘서 (1초 후에 시작)
    tl.fromTo(
      subTextRef.current,
      { opacity: 0, y: 50, scrollTrigger: { toggleActions: 'play none none reverse'} },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '+=0.3' // 0.2초 뒤에 시작
    )
  }, [])

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
            <div className='inline-flex items-start justify-center gap-1 sm:gap-2 absolute z-10 
            right-4 sm:right-[26px] md:right-[30px] lg:right-11
            bottom-[34px] sm:bottom-2 md:bottom-5
            '>
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
          poster={VIDEO_SOURCE[page].poster}
          preload='auto'
          playsInline={true}
          key={`main-video-${page}`}
        >
          <source src={VIDEO_SOURCE[page].link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className='h-[550px] sm:h-[813px] md:h-[1001px] w-full flex flex-col justify-between bg-black relative '>
        <img
          ref={imageRef}
          alt='open_the_gate'
          src='/banner/open_the_gate1.png'
          className='w-full h-full object-cover transform transition-transform duration-300 ease-out'
        />
        <div className='absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center'>
          <h1
            ref={mainTextRef}
            className='transform transition-transform duration-300 ease-out font-freesentationVF italic text-center text-white font-bold text-nowrap
          text-[35px] leading-[40px]
          sm:text-[70px] sm:leading-[45px]
          md:text-[90px] md:leading-[80px]
        '>
            Open The Sea Gate
          </h1>
          <h6
            ref={subTextRef}
            className='transform transition-transform duration-300 ease-out font-freesentationVF font-light italic text-center text-white
          text-[25px] leading-[40px]
          sm:text-[45px] sm:leading-[60px]
          md:text-[50px]
        '>
            the soul of diving
          </h6>
        </div>
      </section>
    </>
  )
}

export default MainBanner