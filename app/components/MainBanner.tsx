'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { SlControlPause } from 'react-icons/sl';

const VIDEO_SOURCE_MOBILE_SAFARI = [
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4',
    poster: '/banner/poster1.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4',
    poster: '/banner/poster2.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4',
    poster: '/banner/poster3.webp',
  },
];

const VIDEO_SOURCE_MOBILE = [
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1_av1_1320.mp4',
    poster: '/banner/poster1.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2_av1_1320.mp4',
    poster: '/banner/poster2.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3_av1_1320.mp4',
    poster: '/banner/poster3.webp',
  },
];

const VIDEO_SOURCE_SAFARI = [
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1.mp4',
    poster: '/banner/poster1.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2.mp4',
    poster: '/banner/poster2.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3.mp4',
    poster: '/banner/poster3.webp',
  },
];

const VIDEO_SOURCE = [
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_1_av1.mp4',
    poster: '/banner/poster1.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_2_av1.mp4',
    poster: '/banner/poster2.webp',
  },
  {
    link: 'https://jhedata.s3.ap-southeast-2.amazonaws.com/banner_3_av1.mp4',
    poster: '/banner/poster3.webp',
  },
];

const buttons = [
  {
    label: '자세히보기',
    link: ['/programs/scuberdiving', '/programs/freediving', '/programs/mermaid'],
  },
  {
    label: '소속강사',
    link: '/instructors/bdn',
  },
];

const iconClass = 'rounded-full w-5 h-5 sm:w-[34px] sm:h-[34px] inline-flex bg-[#00000099] border border-black text-white cursor-pointer';

const MainBanner: React.FC<{ isSafari: boolean }> = ({ isSafari }) => {
  const videoRef = useRef(null);
  const [page, setPage] = useState(0);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  };

  /**
   *
   * @param {'next' | 'prev'} status
   */
  const handlePage = status => {
    if (status === 'next') {
      setPage(prev => (prev < VIDEO_SOURCE.length - 1 ? prev + 1 : 0));
      return;
    }
    setPage(prev => (prev !== 0 ? prev - 1 : VIDEO_SOURCE.length - 1));
  };

  const imageRef = useRef(null);
  const mainTextRef = useRef(null);
  const subTextRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. 이미지 먼저 등장 (0초에 시작)
    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 50, scrollTrigger: { toggleActions: 'play none none reverse' } },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
    );

    // 2. 텍스트는 약간 딜레이 줘서 (1초 후에 시작)
    tl.fromTo(
      mainTextRef.current,
      { opacity: 0, y: 50, scrollTrigger: { toggleActions: 'play none none reverse' } },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '+=0.2', // 0.3초 뒤에 시작
    );

    // 2. 텍스트는 약간 딜레이 줘서 (1초 후에 시작)
    tl.fromTo(
      subTextRef.current,
      { opacity: 0, y: 50, scrollTrigger: { toggleActions: 'play none none reverse' } },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '+=0.3', // 0.2초 뒤에 시작
    );
  }, []);

  return (
    <>
      <section className="relative w-full bg-black md:h-screen">
        <div className="absolute left-0 top-0 z-10 inline-flex h-full w-full items-end px-3 pb-[11px] sm:px-[26px] sm:pb-[22px] md:px-[30px] md:pb-[38px] lg:pb-[53px]">
          <div className="flex w-full items-center justify-between">
            <div className="inline-flex gap-[6px] sm:gap-5">
              {buttons.map(btn => (
                <a
                  href={typeof btn.link === 'string' ? btn.link : btn.link[page]}
                  key={btn.label}
                  className="text-nowrap rounded-[10px] bg-[#FFFFFF26] px-3 py-[6px] text-[13px] font-bold text-white sm:px-8 sm:py-[13px] sm:text-xl md:px-11 md:py-[11px] md:text-2xl"
                >
                  {btn.label}
                </a>
              ))}
            </div>
            <div className="absolute bottom-[34px] right-4 z-10 inline-flex items-start justify-center gap-1 sm:bottom-2 sm:right-[26px] sm:gap-2 md:bottom-5 md:right-[30px] lg:right-11">
              <button className={[iconClass, '!border-0 !bg-[#FFFFFF30] p-1 sm:p-[6px]'].join(' ')} onClick={togglePlayPause}>
                <SlControlPause className="h-full w-full" />
              </button>
              <button className={[iconClass].join(' ')} onClick={() => handlePage('prev')}>
                <RiArrowLeftWideLine className="h-full w-full" />
              </button>
              <button className={[iconClass].join(' ')} onClick={() => handlePage('next')}>
                <RiArrowRightWideLine className="h-full w-full" />
              </button>
            </div>
          </div>
        </div>
        <video
          ref={videoRef}
          className="h-full w-full object-fill"
          autoPlay
          muted
          loop
          poster={VIDEO_SOURCE[page].poster}
          preload="auto"
          playsInline={true}
          key={`main-video-${page}`}
        >
          {isSafari ? (
            <source src={VIDEO_SOURCE_MOBILE_SAFARI[page].link} media="(max-width: 500px)" type="video/mp4" />
          ) : (
            <source src={VIDEO_SOURCE_MOBILE[page].link} media="(max-width: 500px)" type="video/mp4" />
          )}
          {isSafari ? (
            <source src={VIDEO_SOURCE_SAFARI[page].link} media="(min-width: 500px)" type="video/mp4" />
          ) : (
            <source src={VIDEO_SOURCE[page].link} media="(min-width: 500px)" type="video/mp4" />
          )}
          Your browser does not support the video tag.
        </video>
      </section>
      <section className="relative flex h-[550px] w-full flex-col justify-between bg-black sm:h-[813px] md:h-[1001px]">
        <img
          ref={imageRef}
          alt="open_the_gate"
          loading="lazy"
          src="/banner/open_the_gate1.webp"
          className="h-full w-full transform object-cover transition-transform duration-300 ease-out"
        />
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
          <h1
            ref={mainTextRef}
            className="transform text-nowrap text-center font-freesentationVF text-[35px] font-bold italic leading-[40px] text-white transition-transform duration-300 ease-out sm:text-[70px] sm:leading-[45px] md:text-[90px] md:leading-[80px]"
          >
            Open The Sea Gate
          </h1>
          <h6
            ref={subTextRef}
            className="transform text-center font-freesentationVF text-[25px] font-light italic leading-[40px] text-white transition-transform duration-300 ease-out sm:text-[45px] sm:leading-[60px] md:text-[50px]"
          >
            the soul of diving
          </h6>
        </div>
      </section>
    </>
  );
};

export default MainBanner;
