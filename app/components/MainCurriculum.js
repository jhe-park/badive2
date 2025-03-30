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
  const { containerRef } = useImageAnimation('curriculum')

  return (
    <section className='bg-white'>
      <MainSectionHeader title='BADIVE 교육프로그램' />
      <div className='grid gap-5 sm:gap-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-4' ref={containerRef}>
        {CURRICULUMS.map((item) =>
          <a key={item.img} href={item.link} className='relative curriculum'>
            <img src={item.img} alt={item.link} className='transform transition-transform duration-300 ease-out' />
            <ViewMoreButton className={'[&>span]:!text-white [&>span]:!border-white absolute z-10 bottom-2 right-[21px] sm:bottom-[15px] md:bottom-[21px] md:right-[23px] lg:bottom-[15px] lg:right-6'} />
          </a>)}
      </div>
    </section>
  )
}
export default MainCurriculum