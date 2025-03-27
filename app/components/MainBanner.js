"use client"

import { useRef, useState } from 'react'
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { SlControlPause } from "react-icons/sl";

const MainBanner = () => {
  const VIDEO_SOURCE = [
    'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4',
    'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4',
    'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4',
  ]
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

  return (<section className='relative md:h-[100vh] w-full bg-black'>
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
      preload='auto'
      playsInline={true}
      webkit-playsinline="true"
      key={`main-video-${page}`}
    >
      <source src={VIDEO_SOURCE[page]} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>)
}

export default MainBanner