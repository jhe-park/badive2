'use client'

import MainSectionHeader from './MainSectionHeader'
import ViewMoreButton from './ViewMoreButton'
import { useTextAnimation, useImageAnimation } from '../../hooks/useAnimation'

const MainInstructor = () => {
  const textClass = 'text-[#004EA2] font-bold'
  const { containerRef: textRef } = useTextAnimation()
  const { containerRef: imageRef } = useImageAnimation()

  return (
    <section className='bg-white'>
      <MainSectionHeader title='BADIVE 소속강사' />
      <div className='text-lg sm:text-3xl md:text-[35px] text-center transform transition-transform duration-300 ease-out' ref={textRef}>
        <span className={textClass}>바다</span>를 사랑하는 전문가들이 <span className={textClass}>당신의 첫걸음을 함께</span>합니다
      </div>
      <a className='mt-[47px] relative max-w-[1720px] block mx-auto' href='/instructors/bdn' ref={imageRef}>
        <img src='/instructor/main_instructor.png' alt='main_instructor' className='transform transition-transform duration-300 ease-out' />
        <ViewMoreButton className={'absolute z-10 bottom-2 right-[21px] sm:bottom-[15px] md:bottom-[21px] md:right-[23px] lg:bottom-[15px] lg:right-6'} useStroke />
      </a>
    </section>
  )
}
export default MainInstructor