'use client';

import { useImageAnimation } from '../../hooks/useAnimation';
import MainSectionHeader from './MainSectionHeader';
import ViewMoreButton from './ViewMoreButton';

const MainCurriculum = () => {
  const CURRICULUMS = [
    {
      img: '/curriculum/program1.avif',
      link: '/programs/scuberdiving',
    },
    {
      img: '/curriculum/program2.avif',
      link: '/programs/freediving',
    },
    {
      img: '/curriculum/program3.avif',
      link: '/programs/mermaid',
    },
    {
      img: '/curriculum/program4.avif',
      link: '/programs/underwater',
    },
  ];

  const duration = {
    0: 'duration-150',
    1: 'duration-300',
    2: 'duration-500',
    3: 'duration-700',
  };

  const { containerRef } = useImageAnimation('curriculum');

  return (
    <section className="w-full bg-white px-[15px] pb-[29px] sm:pb-[25px] lg:pb-11">
      <MainSectionHeader title="BADIVE 교육프로그램" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-[9px] sm:gap-y-[11px] md:grid-cols-4 md:gap-x-[15px]" ref={containerRef}>
        {CURRICULUMS.map((item, idx) => (
          <a key={item.img} href={item.link} className="curriculum relative overflow-hidden rounded-[15px] sm:rounded-[30px]">
            <img loading="lazy" src={item.img} alt={item.link} className={['w-full transform transition-transform ease-out', duration[idx]].join(' ')} />
            <ViewMoreButton
              useReverse={false}
              onClick={() => {}}
              className={
                'absolute bottom-2 right-[21px] z-10 sm:bottom-[15px] md:bottom-[21px] md:right-[23px] lg:bottom-[15px] lg:right-6 [&>span]:!border-white [&>span]:!text-white'
              }
            />
          </a>
        ))}
      </div>
    </section>
  );
};
export default MainCurriculum;
