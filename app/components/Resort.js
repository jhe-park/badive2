import React from 'react'
import ResortCarousel from './ResortCarousel'


export default function Resort() {
  return (
    <div className=" w-full h-full md:h-auto md:w-[1280px] md:aspect-[1280/540] flex flex-col justify-evenly items-start my-6 md:my-0">
      <div className='flex  gap-x-5 justify-center md:justify-start items-center w-full'>
        <p className='text-2xl md:text-[35px] font-bold'>BADIVE 협력 리조트</p>
      </div>
      <ResortCarousel></ResortCarousel>

    </div>  )
}
