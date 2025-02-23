import React from 'react'
import StoryCarousel from './StoryCarousel'

export default function Story() {
  return (
    <div className=" w-full h-full md:h-[400px] flex flex-col justify-center items-start gap-y-5 px-[2vw] py-[1vw] pt-12 md:pt-0">
      <div className='flex gap-x-5 justify-center md:justify-start items-center w-full mt-0 md:mt-12'>
        <img src="/logo/youtube_story.png" alt="" className='h-8 w-auto md:h-12' />
        <div className='text-2xl md:text-[36px] font-bold'>BADIVE DIVING STORY</div>
      </div>
      
      <StoryCarousel></StoryCarousel>

    </div>
  )
}
