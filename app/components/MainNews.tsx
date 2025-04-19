'use client';

import { useEffect, useState } from 'react';
import { RiArrowLeftWideLine, RiArrowRightWideLine } from 'react-icons/ri';
import { useTextAnimation } from '../../hooks/useAnimation';
import useTouch from '../../hooks/useTouch';

const MainNews = () => {
  const NEWS = [
    {
      title: '바다이브 오픈이벤트!',
      description: '모든 라이센스 교육 프로그램을 결제하신 회원분들께 다이빙 매쉬 더블백을 선물로 드립니다',
      category: 'EVENT',
      date: '2025-03-24',
      link: '/community/notification/51',
    },
    {
      title: '바다이브 무료클래스',
      description: '매주 화요일 스쿠버 다이빙 원포인트 레슨과 매주 목요일 스쿠버 다이빙 무료 체험다이빙 진행!',
      category: 'NOTICE',
      date: '2025-03-24',
      link: '/community/notification/52',
    },
    {
      title: '한국 여성 최초 프리다이빙 강사',
      description: '',
      category: 'NEWS',
      date: '2025-03-24',
    },
    {
      title: '언더워터<br/>머메이드 강사',
      description: '',
      category: 'NEWS',
      date: '',
    },
    {
      title: '소식',
      description: '',
      category: 'NEWS',
      date: '',
    },
  ];

  const CATEGORY_COLOR = {
    EVENT: 'text-[#0077B6]',
    NOTICE: 'text-[#FFB703]',
    NEWS: 'text-[#FD0000]',
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getVisibleCount = () => {
      const width = window.innerWidth;

      if (width < 1281) return setVisibleCount(1);
      return setVisibleCount(3);
    };

    getVisibleCount();
    window.addEventListener('resize', getVisibleCount);
    return () => window.removeEventListener('resize', getVisibleCount);
  }, []);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= NEWS.length - visibleCount;

  const next = () => {
    if (!isLast) setCurrentIndex(prev => prev + 1);
  };

  const prev = () => {
    if (!isFirst) setCurrentIndex(prev => prev - 1);
  };

  const { containerRef: newRef } = useTextAnimation('news');
  const { containerRef: textRef } = useTextAnimation();
  const { containerRef: titleRef } = useTextAnimation();

  const { wrapperRef } = useTouch(prev, next, currentIndex, visibleCount);

  return (
    <section className="w-full bg-black pb-[50x] sm:pb-[100px]">
      <h1
        ref={titleRef}
        className="flex h-auto w-full transform items-center justify-center gap-[10px] py-[50px] text-3xl font-bold text-white transition-transform duration-300 ease-out sm:gap-[14px] sm:py-24 sm:text-[40px] md:gap-[27px] md:py-[115px] md:text-[50px] lg:gap-[27px] lg:py-[100px]"
      >
        <img loading="lazy" src="/news/title.webp" className="h-[50px] w-[50px]" />
        BADIVE 소식
      </h1>
      <p
        className="mb-[50px] transform whitespace-normal break-keep text-center text-[25px] leading-[45px] text-white transition-transform duration-300 ease-out sm:mb-[81px] sm:text-[40px] sm:leading-[65px] md:text-[48px]"
        ref={textRef}
      >
        바다이브의
        <br />
        최신 소식과 이벤트를 알려드립니다.
      </p>
      <div className="mx-auto flex items-center font-eland lg:max-w-[1700px]">
        <button onClick={prev}>
          <RiArrowLeftWideLine className="h-12 w-12 text-white" />
        </button>
        <div className="w-full overflow-hidden" ref={wrapperRef}>
          <div
            className="flex text-white"
            style={{ transform: `translateX(-${(100 / visibleCount) * currentIndex}%)`, transition: 'transform 0.4s ease-out' }}
            ref={newRef}
          >
            {NEWS.map(item => (
              <ul key={item.title} className="news shrink-0 px-2 text-center sm:px-4 md:px-5 lg:px-[18px]" style={{ width: `${100 / visibleCount}%` }}>
                <a
                  href={item.link}
                  className="flex h-[326px] transform flex-col justify-between border border-white px-[14px] pb-7 pt-12 transition-transform duration-300 ease-out xs:!py-[52px] xs:px-[52px] sm:h-[389px] sm:px-8 sm:!pb-7 sm:!pt-12"
                >
                  <div className="whitespace-normal break-keep">
                    <p className="mb-[24px] flex items-center justify-center gap-2 text-2xl">
                      <span className={[CATEGORY_COLOR[item.category], 'font-freesentation text-base'].join(' ')}>●</span>
                      {item.category}
                    </p>
                    <h4
                      className="mb-5 font-freesentation text-[28px] leading-7 sm:text-[32px] md:leading-[40px] lg:text-[30px]"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></h4>
                    <h6 className="font-freesentation text-xl sm:text-[23px] md:text-xl lg:leading-[23px]">{item.description}</h6>
                  </div>
                  <span className="text-lg sm:text-2xl">{item.date}</span>
                </a>
              </ul>
            ))}
          </div>
        </div>
        <button onClick={next}>
          <RiArrowRightWideLine className="h-12 w-12 text-white" />
        </button>
      </div>
    </section>
  );
};
export default MainNews;
