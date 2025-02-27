import React from 'react'
import ResortCarousel from './ResortCarousel'


export default function Resort() {
  return (
    <div className=" w-full md:w-[66vw] md:aspect-[1280/540] h-[40vh] flex flex-col justify-evenly items-start">
      <div className='flex  gap-x-5 justify-center md:justify-start items-center w-full'>
        <p className='text-2xl md:text-[35px] font-bold'>BADIVE 협력 리조트</p>
      </div>
      <ResortCarousel></ResortCarousel>

    </div>  )
}
