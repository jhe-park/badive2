import React from 'react'
import StoryCarousel from './StoryCarousel'

export default function Story() {
  return (
    <div className=" w-full md:w-[66vw] h-full md:aspect-[1280/400] flex flex-col justify-evenly items-start ">
      <div className='flex gap-x-5 justify-center md:justify-start items-center w-full mt-0 '>
        <img src="/logo/youtube_story.png" alt="" className='h-8 w-auto md:h-12' />
        <div className='text-2xl md:text-[35px] font-bold'>BADIVE DIVING STORY</div>
      </div>
      
      <StoryCarousel></StoryCarousel>

    </div>
  )
}
