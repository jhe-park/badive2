import React from 'react'
import ResortCarousel from './ResortCarousel'


export default function Resort() {
  return (
    <div className=" w-full h-[540px] flex flex-col justify-center items-start gap-y-5 px-[2vw] py-[1vw]">
      <div className='flex  gap-x-5 justify-center items-center'>
        <p className='text-[36px] font-bold'>BDN 협력 리조트</p>
      </div>
      <ResortCarousel></ResortCarousel>

    </div>  )
}
