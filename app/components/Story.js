import React from 'react'
import StoryCarousel from './StoryCarousel'

export default function Story() {
  return (
    <div className=" w-full md:w-[768px] lg:w-[1280px] h-full md:h-auto md:aspect-[768/266] lg:aspect-[1280/338] flex flex-col justify-between items-start lg:px-[34px] lg:py-[30px] md:px-[5px] md:py-[30px]">
      <div className='flex gap-x-5 justify-center md:justify-start items-center w-full mt-0 '>
        <img src="/logo/youtube_story.png" alt="" className='h-8 w-auto md:h-12' />
        <div className='text-2xl md:text-[35px] font-bold'>BADIVE DIVING STORY</div>
      </div>
      
      <StoryCarousel></StoryCarousel>

    </div>
  )
}
