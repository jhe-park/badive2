'use client'

import { useTextAnimation } from '../../hooks/useAnimation'

const MainSectionHeader = ({ title }) => {
  const { containerRef } = useTextAnimation()
  
  return (<h1 ref={containerRef}
    className='font-freesentationVF font-bold section-title flex items-center justify-center text-nowrap
      gap-[10px] text-3xl py-[50px]
      sm:gap-[14px] sm:text-[40px] sm:py-24
      md:gap-[27px] md:text-[50px] md:py-[115px]
      lg:gap-[27px] lg:py-[100px]
      w-full h-auto transform transition-transform duration-300 ease-out
    '>
    <img src='/story/title.png' className='w-[50px] h-[50px]' />
    {title}
  </h1>)
}
export default MainSectionHeader