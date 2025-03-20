import React from 'react'
import ResortCarousel from './ResortCarousel'


export default function Resort() {
  return (
    <div className=" w-full h-full md:h-auto md:max-w-[1280px] xl:aspect-[1280/522] md:aspect-[768/422] aspect-[375/275] flex flex-col justify-evenly items-start">
      <div className='flex  gap-x-5 justify-center xl:justify-start items-center w-full'>
        <p className='text-2xl md:text-[35px] font-bold'>BADIVE 협력 리조트</p>
      </div>
      <ResortCarousel></ResortCarousel>

    </div>  )
}
