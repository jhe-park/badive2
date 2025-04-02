'use client'

import MainSectionHeader from './MainSectionHeader'
import ViewMoreButton from './ViewMoreButton'
import { useImageAnimation } from '../../hooks/useAnimation'

const MainCurriculum = () => {
  const CURRICULUMS = [
    {
      img: '/curriculum/program1.png',
      link: 'https://www.badive.co.kr/programs/scuberdiving',
    },
    {
      img: '/curriculum/program2.png',
      link: 'https://www.badive.co.kr/programs/freediving',
    },
    {
      img: '/curriculum/program3.png',
      link: 'https://www.badive.co.kr/programs/mermaid',
    },
    {
      img: '/curriculum/program4.png',
      link: 'https://www.badive.co.kr/programs/underwater',
    },
  ]

  const duration = {
    0: 'duration-150',
    1: 'duration-300',
    2: 'duration-500',
    3: 'duration-700',
  }

  const { containerRef } = useImageAnimation('curriculum')

  return (
    <section className='bg-white px-[15px] pb-[29px] sm:pb-[25px] lg:pb-11 w-full'>
      <MainSectionHeader title='BADIVE 교육프로그램' />
      <div className='grid grid-cols-1
      gap-5 sm:gap-y-[11px] sm:gap-x-[9px] md:gap-x-[15px] sm:grid-cols-2 md:grid-cols-4' ref={containerRef}>
        {CURRICULUMS.map((item, idx) => <a key={item.img} href={item.link} className='relative curriculum overflow-hidden rounded-[15px] sm:rounded-[30px]'>
          <img src={item.img} alt={item.link} className={['transform transition-transform ease-out w-full', duration[idx]].join(' ')} />
          <ViewMoreButton className={'[&>span]:!text-white [&>span]:!border-white absolute z-10 bottom-2 right-[21px] sm:bottom-[15px] md:bottom-[21px] md:right-[23px] lg:bottom-[15px] lg:right-6'} />
        </a>
        )}
      </div>
    </section>
  )
}
export default MainCurriculum
